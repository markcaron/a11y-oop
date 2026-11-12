"""Validate the plugin marketplace, skill references, and authored file links."""
from plugins import ROOT, check_link, markdown_links, validate_marketplace


def main():
    plugins = validate_marketplace(ROOT)
    for name in ['content','layouts','static','vendor','sources/legacy','_site','.alloy','alloy.config.yaml','dist','packaging']:
        if (ROOT / name).exists():
            raise ValueError(f'Unexpected site or standalone-build path: {name}')
    count = 0
    for path in ROOT.rglob('*.md'):
        if any(part in {'.git','__pycache__'} for part in path.relative_to(ROOT).parts):
            continue
        for target in markdown_links(path.read_text()):
            check_link(ROOT, path, target)
        count += 1
    print(f'Validated {len(plugins)} plugin(s), {sum(len(p["skills"]) for p in plugins)} skills, manifests/catalogs, and {count} Markdown files.')


if __name__ == '__main__':
    main()
