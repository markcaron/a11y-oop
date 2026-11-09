"""Check declared package dependencies, local file links, and site separation."""
from package import ROOT, local_target, markdown_links, validate


def main():
    manifest = validate(ROOT)
    for name in ['content','layouts','static','vendor','sources/legacy','_site','.alloy','alloy.config.yaml']:
        if (ROOT / name).exists():
            raise ValueError(f'Unexpected site snapshot: {name}')
    count = 0
    for path in ROOT.rglob('*.md'):
        if any(part in {'dist','.git','__pycache__'} for part in path.relative_to(ROOT).parts):
            continue
        for target in markdown_links(path.read_text()):
            linked = local_target(ROOT, path, target)
            if linked is not None and not (ROOT / linked).is_file():
                raise ValueError(f'Broken local file link: {path.relative_to(ROOT)} → {target}')
        count += 1
    print(f'Validated {len(manifest["skills"])} skills, package closures, {count} Markdown files, and site separation.')


if __name__ == '__main__':
    main()
