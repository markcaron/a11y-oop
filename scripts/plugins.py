"""Validate complete plugin directories and their local reference boundaries."""
import json
from pathlib import Path
import re
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
PLATFORMS = ('.claude-plugin', '.cursor-plugin')
LINK = re.compile(r'!?\[[^\]\n]*\]\(([^\s)]+)\)')


def markdown_links(body):
    body = re.sub(r'^```[^\n]*\n.*?^```[ \t]*$', '', body, flags=re.M | re.S)
    return LINK.findall(body)


def check_link(root, path, target):
    parsed = urlsplit(target.strip('<>'))
    if parsed.scheme or parsed.netloc or not parsed.path:
        return
    resolved = (path.parent / unquote(parsed.path)).resolve()
    if not resolved.is_relative_to(root.resolve()):
        raise ValueError(f'Reference leaves installable root: {path}: {target}')
    if not resolved.is_file():
        raise ValueError(f'Missing referenced file: {path}: {target}')


def matching_json(paths):
    raw = [path.read_bytes() for path in paths]
    if any(value != raw[0] for value in raw[1:]):
        raise ValueError(f'Manifests/catalogs do not match: {paths}')
    return json.loads(raw[0])


def validate_plugin(root):
    root = root.resolve()
    manifest = matching_json([root / platform / 'plugin.json' for platform in PLATFORMS])
    if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', manifest['name']):
        raise ValueError('Invalid plugin name')
    if not manifest.get('description') or not manifest.get('author', {}).get('name'):
        raise ValueError('Plugin needs description and author')
    if 'version' in manifest or 'mcpServers' in manifest:
        raise ValueError('Plugin manifests must omit version and mcpServers')
    skills = sorted((root / 'skills').glob('*/SKILL.md'))
    if not skills:
        raise ValueError('Plugin has no discoverable skills')
    for skill in skills:
        body = skill.read_text()
        match = re.match(r'\A---\n(.*?)\n---\n', body, flags=re.S)
        if not match:
            raise ValueError(f'Missing skill frontmatter: {skill}')
        fields = dict(re.findall(r'^([a-z-]+): ([^\n]+)$', match.group(1), flags=re.M))
        if fields.get('name') != skill.parent.name or not fields.get('description', '').strip():
            raise ValueError(f'Invalid skill name/description: {skill}')
    for path in root.rglob('*'):
        if path.is_symlink():
            raise ValueError(f'Plugin must be self-contained without symlinks: {path}')
        if not path.is_file():
            continue
        if path.suffix == '.md':
            for target in markdown_links(path.read_text()):
                check_link(root, path, target)
        if path.suffix == '.json':
            content = json.loads(path.read_text())
            if path == root / 'references/checks.json':
                ids = [check['id'] for check in content['checks']]
                if len(ids) != len(set(ids)):
                    raise ValueError('Duplicate check IDs')
                vocabulary = content['stateVocabulary']
                if not vocabulary or len(vocabulary) != len(set(vocabulary)):
                    raise ValueError('Invalid state vocabulary')
                state_lists = [content['coverageRequirements']['states']] + [check['states'] for check in content['checks']]
                for states in state_lists:
                    if not states or set(states) - set(vocabulary):
                        raise ValueError('Unknown or missing catalog state')
                for check in content['checks']:
                    check_link(root, path, check['reference'])
    for legal in ['LICENSE', 'NOTICE']:
        if not (root / legal).is_file():
            raise ValueError(f'Plugin is missing {legal}')
    return {'name': manifest['name'], 'skills': [path.parent.name for path in skills]}


def validate_marketplace(root):
    root = root.resolve()
    catalog = matching_json([root / platform / 'marketplace.json' for platform in PLATFORMS])
    if not catalog.get('name') or not catalog.get('owner', {}).get('name'):
        raise ValueError('Marketplace needs name and owner')
    plugins = []
    seen = set()
    for entry in catalog['plugins']:
        name = entry['name']
        if name in seen or entry['source'] != f'./plugins/{name}':
            raise ValueError('Duplicate name or invalid marketplace source')
        seen.add(name)
        plugin = (root / entry['source']).resolve()
        if not plugin.is_relative_to(root):
            raise ValueError('Marketplace source escapes repository')
        info = validate_plugin(plugin)
        if info['name'] != name:
            raise ValueError('Marketplace/plugin names differ')
        plugins.append(info)
    discovered = {path.parent.parent.name for path in (root / 'plugins').glob('*/.claude-plugin/plugin.json')}
    if not plugins or seen != discovered:
        raise ValueError('Marketplace and plugin directories differ')
    return plugins
