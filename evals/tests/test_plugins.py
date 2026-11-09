"""Plugin structure and installation portability; not live host or model evals."""
import importlib.util
import json
from pathlib import Path
import shutil
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location('plugins', ROOT / 'scripts/plugins.py')
plugins = importlib.util.module_from_spec(spec)
spec.loader.exec_module(plugins)


class PluginTests(unittest.TestCase):
    def copy_plugin(self, folder):
        destination = Path(folder) / 'installed-plugin'
        shutil.copytree(ROOT / 'plugins/a11y-review', destination)
        return destination

    def test_installed_plugin_without_authoring_checkout(self):
        with tempfile.TemporaryDirectory() as folder:
            source = Path(folder) / 'authoring'
            shutil.copytree(ROOT / 'plugins/a11y-review', source / 'plugins/a11y-review')
            installed = Path(folder) / 'installed-plugin'
            shutil.copytree(source / 'plugins/a11y-review', installed)
            shutil.rmtree(source)
            result = plugins.validate_plugin(installed)
            self.assertEqual(set(result['skills']), {'a11y-source-audit','a11y-keyboard-test','a11y-report'})

    def test_marketplace_resolves_all_plugins(self):
        self.assertEqual([p['name'] for p in plugins.validate_marketplace(ROOT)], ['a11y-review'])

    def test_missing_reference_rejected(self):
        with tempfile.TemporaryDirectory() as folder:
            installed = self.copy_plugin(folder)
            (installed / 'contracts/scope.md').unlink()
            with self.assertRaisesRegex(ValueError, 'Missing referenced'):
                plugins.validate_plugin(installed)

    def test_reference_outside_plugin_rejected_even_if_file_exists(self):
        with tempfile.TemporaryDirectory() as folder:
            installed = self.copy_plugin(folder)
            (Path(folder) / 'outside.md').write_text('Authoring-only resource')
            skill = installed / 'skills/a11y-report/SKILL.md'
            skill.write_text(skill.read_text() + '\n[escape](../../../outside.md)\n')
            with self.assertRaisesRegex(ValueError, 'leaves installable root'):
                plugins.validate_plugin(installed)

    def test_mismatched_manifests_rejected(self):
        with tempfile.TemporaryDirectory() as folder:
            installed = self.copy_plugin(folder)
            path = installed / '.cursor-plugin/plugin.json'
            value = json.loads(path.read_text())
            value['description'] = 'Different description'
            path.write_text(json.dumps(value))
            with self.assertRaisesRegex(ValueError, 'do not match'):
                plugins.validate_plugin(installed)

    def test_no_skills_rejected(self):
        with tempfile.TemporaryDirectory() as folder:
            installed = self.copy_plugin(folder)
            shutil.rmtree(installed / 'skills')
            with self.assertRaisesRegex(ValueError, 'no discoverable skills'):
                plugins.validate_plugin(installed)

    def test_invalid_skill_frontmatter_rejected(self):
        with tempfile.TemporaryDirectory() as folder:
            installed = self.copy_plugin(folder)
            path = installed / 'skills/a11y-report/SKILL.md'
            path.write_text(path.read_text().replace('name: a11y-report', 'name: wrong'))
            with self.assertRaisesRegex(ValueError, 'name/description'):
                plugins.validate_plugin(installed)

    def test_bad_marketplace_source_rejected(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            value = json.loads((ROOT / '.claude-plugin/marketplace.json').read_text())
            value['plugins'][0]['source'] = '../outside'
            for platform in plugins.PLATFORMS:
                (root / platform).mkdir()
                (root / platform / 'marketplace.json').write_text(json.dumps(value))
            with self.assertRaisesRegex(ValueError, 'invalid marketplace source'):
                plugins.validate_marketplace(root)


if __name__ == '__main__':
    unittest.main()
