"""Build standalone draft skill ZIPs from an explicit dependency graph."""
import argparse
import hashlib
import json
import os
from pathlib import Path, PurePosixPath
import re
from urllib.parse import unquote, urlsplit
import zipfile

ROOT = Path(__file__).resolve().parents[1]
LINK = re.compile(r'(!?\[[^\]\n]*\]\()([^\s)]+)(\))')


def safe_path(root, relative):
    path = PurePosixPath(relative)
    if path.is_absolute() or '..' in path.parts or '\\' in relative:
        raise ValueError(f'Unsafe resource path: {relative}')
    candidate = root / relative
    if not candidate.resolve().is_relative_to(root.resolve()) or candidate.is_symlink():
        raise ValueError(f'Resource escapes root: {relative}')
    if not candidate.is_file():
        raise ValueError(f'Missing resource: {relative}')
    return candidate


def closure(manifest, entry):
    visited, active = set(), set()
    def walk(path):
        if path in active:
            raise ValueError(f'Dependency cycle: {path}')
        if path in visited:
            return
        if path not in manifest['resources']:
            raise ValueError(f'Undeclared dependency: {path}')
        active.add(path)
        for dependency in manifest['resources'][path]['required']:
            walk(dependency)
        active.remove(path)
        visited.add(path)
    walk(entry)
    return sorted(visited)


def local_target(root, path, target):
    parsed = urlsplit(target.strip('<>'))
    if parsed.scheme or parsed.netloc or not parsed.path:
        return None
    resolved = (path.parent / unquote(parsed.path)).resolve()
    if not resolved.is_relative_to(root.resolve()):
        raise ValueError(f'Nonportable link in {path}: {target}')
    return resolved.relative_to(root.resolve()).as_posix()


def markdown_links(body):
    body = re.sub(r'^```[^\n]*\n.*?^```[ \t]*$', '', body, flags=re.M | re.S)
    return [match.group(2) for match in LINK.finditer(body)]


def validate(root):
    root = root.resolve()
    manifest = json.loads((root / 'packaging/skills.json').read_text())
    if manifest['status'] != 'draft':
        raise ValueError('Draft-only packager: behavioral release gate is outstanding')
    for name, spec in manifest['skills'].items():
        if not re.fullmatch(r'a11y-[a-z0-9-]+', name) or spec['entry'] != f'skills/{name}/SKILL.md':
            raise ValueError(f'Invalid skill entry: {name}')
        files = closure(manifest, spec['entry'])
        body = safe_path(root, spec['entry']).read_text()
        if not body.startswith(f'---\nname: {name}\ndescription: ') or '\n---\n' not in body[4:]:
            raise ValueError(f'Invalid skill frontmatter: {name}')
        for relative in files:
            path = safe_path(root, relative)
            for optional in manifest['resources'][relative]['optionalReading']:
                if urlsplit(optional).scheme not in ('http', 'https'):
                    raise ValueError(f'Optional reading must be external: {optional}')
            targets = markdown_links(path.read_text()) if path.suffix == '.md' else []
            if path.suffix == '.json':
                content = json.loads(path.read_text())
                if relative == 'checks/catalog.json':
                    ids = [check['id'] for check in content['checks']]
                    if len(ids) != len(set(ids)):
                        raise ValueError('Duplicate check IDs')
                    targets += [check['reference'] for check in content['checks']]
            for target in targets:
                linked = local_target(root, path, target)
                if linked is not None and linked not in files:
                    raise ValueError(f'Unshipped local link in {relative}: {target}')
    return manifest


def build(root, output):
    root, output = root.resolve(), output.resolve()
    manifest = validate(root)
    output.mkdir(parents=True, exist_ok=True)
    archives = []
    for name, spec in manifest['skills'].items():
        files = closure(manifest, spec['entry'])
        mapping = {p: ('SKILL.md' if p == spec['entry'] else 'references/' + p) for p in files}
        payload = {}
        for path in files:
            source = safe_path(root, path)
            contents = source.read_bytes()
            if source.suffix == '.md':
                def rewrite(match):
                    target = match.group(2)
                    linked = local_target(root, source, target)
                    if linked is None:
                        return match.group(0)
                    relative = os.path.relpath(mapping[linked], str(PurePosixPath(mapping[path]).parent)).replace(os.sep, '/')
                    parsed = urlsplit(target)
                    suffix = ('?' + parsed.query if parsed.query else '') + ('#' + parsed.fragment if parsed.fragment else '')
                    return match.group(1) + relative + suffix + match.group(3)
                contents = LINK.sub(rewrite, source.read_text()).encode()
            payload[mapping[path]] = contents
        for support in ['LICENSE', 'NOTICE']:
            payload[support] = safe_path(root, support).read_bytes()
        record = {'name':name, 'version':manifest['version'], 'status':'draft', 'files':{p:hashlib.sha256(b).hexdigest() for p,b in sorted(payload.items())}}
        payload['PACKAGE.json'] = (json.dumps(record, indent=2) + '\n').encode()
        destination = output / f'{name}.zip'
        with zipfile.ZipFile(destination, 'w', compression=zipfile.ZIP_DEFLATED) as archive:
            for path, contents in sorted(payload.items()):
                info = zipfile.ZipInfo(f'{name}/{path}', date_time=(1980,1,1,0,0,0))
                info.compress_type = zipfile.ZIP_DEFLATED
                info.external_attr = 0o100644 << 16
                archive.writestr(info, contents)
        archives.append(destination)
    return archives


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, default=ROOT / 'dist')
    args = parser.parse_args()
    for archive in build(ROOT, args.output):
        print(archive)
