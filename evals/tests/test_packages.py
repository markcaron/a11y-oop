"""Packaging regressions; not assistant behavior evaluations."""
import copy
import hashlib
import importlib.util
import json
from pathlib import Path
import shutil
import tempfile
import unittest
import zipfile

ROOT = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location('packager', ROOT / 'scripts/package.py')
pkg = importlib.util.module_from_spec(spec)
spec.loader.exec_module(pkg)


class PackageTests(unittest.TestCase):
    def setUp(self):
        self.manifest = pkg.validate(ROOT)

    def test_installed_packages_have_no_checkout_dependency(self):
        with tempfile.TemporaryDirectory() as folder:
            folder = Path(folder)
            source = folder / 'authoring'
            shutil.copytree(ROOT, source, ignore=shutil.ignore_patterns('.git','dist','__pycache__'))
            archives = pkg.build(source, folder / 'downloads')
            shutil.rmtree(source)
            for archive in archives:
                with zipfile.ZipFile(archive) as zipped:
                    zipped.extractall(folder / 'installed')
                installed = folder / 'installed' / archive.stem
                record = json.loads((installed / 'PACKAGE.json').read_text())
                self.assertTrue((installed / 'SKILL.md').is_file())
                for relative, checksum in record['files'].items():
                    path = installed / relative
                    self.assertEqual(hashlib.sha256(path.read_bytes()).hexdigest(), checksum)
                    targets = pkg.markdown_links(path.read_text()) if path.suffix == '.md' else []
                    if path.name == 'catalog.json':
                        targets += [check['reference'] for check in json.loads(path.read_text())['checks']]
                    for target in targets:
                        linked = pkg.local_target(installed, path, target)
                        if linked is not None:
                            self.assertTrue((installed / linked).is_file(), target)
                self.assertNotIn('../../contracts/', (installed / 'SKILL.md').read_text())
                self.assertFalse((installed / 'references/vendor').exists())

    def test_cycle_rejected(self):
        manifest = copy.deepcopy(self.manifest)
        manifest['resources']['contracts/scope.md']['required'] = ['contracts/scope.md']
        with self.assertRaisesRegex(ValueError, 'cycle'):
            pkg.closure(manifest, 'skills/a11y-source-audit/SKILL.md')

    def test_missing_declaration_rejected(self):
        manifest = copy.deepcopy(self.manifest)
        del manifest['resources']['contracts/results.md']
        with self.assertRaisesRegex(ValueError, 'Undeclared'):
            pkg.closure(manifest, 'skills/a11y-report/SKILL.md')

    def test_unshipped_link_rejected(self):
        with tempfile.TemporaryDirectory() as folder:
            source = Path(folder) / 'source'
            shutil.copytree(ROOT, source, ignore=shutil.ignore_patterns('.git','dist','__pycache__'))
            path = source / 'skills/a11y-report/SKILL.md'
            path.write_text(path.read_text() + '\n[unshipped](../../README.md)\n')
            with self.assertRaisesRegex(ValueError, 'Unshipped'):
                pkg.validate(source)

    def test_path_escape_rejected(self):
        with self.assertRaisesRegex(ValueError, 'Unsafe'):
            pkg.safe_path(ROOT, '../outside.md')

    def test_optional_reading_does_not_expand_closure(self):
        manifest = copy.deepcopy(self.manifest)
        before = pkg.closure(manifest, 'skills/a11y-report/SKILL.md')
        manifest['resources']['contracts/scope.md']['optionalReading'] = ['https://www.w3.org/WAI/']
        self.assertEqual(before, pkg.closure(manifest, 'skills/a11y-report/SKILL.md'))

    def test_archives_are_reproducible(self):
        with tempfile.TemporaryDirectory() as folder:
            first = pkg.build(ROOT, Path(folder) / 'first')
            second = pkg.build(ROOT, Path(folder) / 'second')
            self.assertEqual([p.read_bytes() for p in first], [p.read_bytes() for p in second])


if __name__ == '__main__':
    unittest.main()
