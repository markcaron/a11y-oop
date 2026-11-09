"""Validate the skills foundation without installing packages or building a site."""
from pathlib import Path
import hashlib
import json
import re
import sys
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
errors = []

for name in ["content", "layouts", "static", "_site", ".alloy", "node_modules", "alloy.config.yaml"]:
    if (ROOT / name).exists():
        errors.append(f"Site-only path in skills workspace: {name}")

for path in (ROOT / "sources/legacy").glob("*.json"):
    try:
        json.loads(path.read_text())
    except (ValueError, OSError) as exc:
        errors.append(f"Invalid JSON {path.relative_to(ROOT)}: {exc}")

ledger = json.loads((ROOT / "sources/legacy/rhds-sources.json").read_text())
for entry in ledger["files"]:
    source = ROOT / "vendor/rhds/accessibility" / Path(entry["path"]).name
    if not source.is_file() or hashlib.sha256(source.read_bytes()).hexdigest() != entry["sha256"]:
        errors.append(f"Missing or changed upstream source: {source.relative_to(ROOT)}")

# Upstream snapshots retain original links; validate only authored Markdown.
authored = [*ROOT.glob("*.md"), *(ROOT / "docs").glob("*.md"), ROOT / "sources/README.md"]
for path in authored:
    body = re.sub(r"^```[^\n]*\n.*?^```[ \t]*$", "", path.read_text(), flags=re.M | re.S)
    for target in re.findall(r"!?\[[^\]\n]*\]\(([^)]+)\)", body):
        target = target.strip().split(' "', 1)[0].strip("<>")
        parsed = urlsplit(target)
        if parsed.scheme or parsed.netloc or not parsed.path:
            continue
        resolved = (path.parent / unquote(parsed.path)).resolve()
        if not resolved.is_relative_to(ROOT) or not resolved.exists():
            errors.append(f"Broken or nonportable local link in {path.relative_to(ROOT)}: {target}")

if errors:
    print("\n".join(errors), file=sys.stderr)
    sys.exit(1)
print(f"Validated {len(authored)} authored Markdown files, legacy JSON, {len(ledger['files'])} RHDS source hashes, and site separation.")
