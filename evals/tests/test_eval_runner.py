import argparse
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
import subprocess

ROOT = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location('run_evals', ROOT / 'scripts/run_evals.py')
runner = importlib.util.module_from_spec(spec)
spec.loader.exec_module(runner)


class RunnerTests(unittest.TestCase):
    def args(self, output, **changes):
        args = dict(case=['native-control-attribution-and-evidence'], suite='all', list=False,
                    execute=False, model='test-model', codex='codex', output_dir=output,
                    mode='both', reasoning='medium', dimension='evidence fidelity', timeout=30)
        args.update(changes)
        return argparse.Namespace(**args)

    def test_selection_excludes_live_browser_cases(self):
        selected = runner.cases(ROOT)
        self.assertTrue(selected)
        self.assertTrue(all(c['skill'] in runner.SKILLS for c in selected))
        self.assertNotIn('form-keyboard-broken', {c['id'] for c in selected})

    def test_rejects_repository_output_and_fixture_escape(self):
        with self.assertRaises(ValueError):
            runner.outside_repo(ROOT / 'evals/runs', ROOT)
        with self.assertRaises(ValueError):
            runner.fixture_path(ROOT, '../../AGENTS.md')

    def test_prepare_never_runs_model_or_grades(self):
        with tempfile.TemporaryDirectory() as output:
            original = subprocess.run
            def only_git(command, **kwargs):
                self.assertEqual(command[0], 'git')
                return original(command, **kwargs)
            with patch.object(runner.subprocess, 'run', side_effect=only_git):
                runner.run(self.args(output))
            runs = list(Path(output).glob('a11y-eval-*'))
            self.assertEqual(len(runs), 1)
            results = json.loads((runs[0] / 'results.json').read_text())
            self.assertEqual([r['execution'] for r in results], ['prepared', 'prepared'])
            self.assertTrue(all(r['grade'] == 'not reviewed' for r in results))
            self.assertFalse(list(Path(output).glob('a11y-case-*')))

    def test_batch_defers_all_rubrics_and_snapshots_until_execution_ends(self):
        seen = []
        def fake_cli(command, **kwargs):
            if command[0] == 'git':
                return subprocess.CompletedProcess(command, 0, stdout='revision\n')
            if '--version' in command:
                return subprocess.CompletedProcess(command, 0, stdout='test cli\n')
            work = Path(command[command.index('-C') + 1])
            seen.append(work)
            self.assertFalse(list(work.rglob('rubric.json')))
            self.assertFalse((work / 'evals').exists())
            self.assertNotEqual(work.parent, Path(output))
            self.assertNotIn(Path(output), work.parents)
            self.assertFalse(list(Path(output).rglob('rubric.json')))
            self.assertFalse(list(Path(output).rglob('plugin-snapshot')))
            self.assertEqual((work / 'plugin').exists(), len(seen) % 2 == 1)
            if (work / 'plugin').exists():
                skill = work / 'plugin/skills/a11y-report/SKILL.md'
                target = (skill.parent / '../../references/rendered-semantics.md').resolve()
                self.assertTrue(target.is_file())
                self.assertEqual(target, work / 'plugin/references/rendered-semantics.md')
                self.assertIn('relative to the file containing each link', kwargs['input'])
            self.assertIn('read-only', command)
            self.assertNotIn('Retain F-01', kwargs['input'])
            Path(command[command.index('-o') + 1]).write_text('A response requiring human assessment.')
            return subprocess.CompletedProcess(command, 0)
        with tempfile.TemporaryDirectory() as output:
            with patch.object(runner.shutil, 'which', return_value='/fake/codex'), patch.object(runner.subprocess, 'run', side_effect=fake_cli):
                runner.run(self.args(output, execute=True, case=['native-control-attribution-and-evidence', 'form-inspection-provenance']))
            self.assertEqual(len(set(seen)), 4)
            self.assertEqual(len(list(Path(output).rglob('rubric.json'))), 4)
            archived = next(Path(output).glob('a11y-eval-*/plugin-snapshot'))
            self.assertEqual(runner.digest(archived), runner.digest(ROOT / 'plugins/a11y-review'))
            self.assertTrue(all(not p.exists() for p in seen))
            results = json.loads(next(Path(output).glob('a11y-eval-*/results.json')).read_text())
            self.assertTrue(all(r['grade'] == 'needs review' for r in results))

    def test_timeout_is_not_a_behavioral_pass(self):
        def fake_cli(command, **kwargs):
            if command[0] == 'git' or '--version' in command:
                return subprocess.CompletedProcess(command, 0, stdout='test\n')
            raise subprocess.TimeoutExpired(command, 1)
        with tempfile.TemporaryDirectory() as output:
            with patch.object(runner.shutil, 'which', return_value='/fake/codex'), patch.object(runner.subprocess, 'run', side_effect=fake_cli):
                runner.run(self.args(output, execute=True, mode='on'))
            result = json.loads(next(Path(output).glob('a11y-eval-*/results.json')).read_text())[0]
            self.assertEqual(result['execution'], 'timeout')
            self.assertEqual(result['grade'], 'not graded')
            self.assertTrue(list(Path(output).rglob('rubric.json')))
            self.assertTrue(list(Path(output).rglob('plugin-snapshot')))

    def test_interruption_preserves_rubric_after_child_exits(self):
        def fake_cli(command, **kwargs):
            if command[0] == 'git' or '--version' in command:
                return subprocess.CompletedProcess(command, 0, stdout='test\n')
            self.assertFalse(list(Path(output).rglob('rubric.json')))
            self.assertFalse(list(Path(output).rglob('plugin-snapshot')))
            raise KeyboardInterrupt()
        with tempfile.TemporaryDirectory() as output:
            with patch.object(runner.shutil, 'which', return_value='/fake/codex'), patch.object(runner.subprocess, 'run', side_effect=fake_cli):
                with self.assertRaises(KeyboardInterrupt):
                    runner.run(self.args(output, execute=True))
            result = json.loads(next(Path(output).glob('a11y-eval-*/results.json')).read_text())[0]
            self.assertEqual(result['execution'], 'interrupted')
            self.assertTrue(list(Path(output).rglob('rubric.json')))
            self.assertTrue(list(Path(output).rglob('plugin-snapshot')))

    def test_execution_requires_explicit_model(self):
        with tempfile.TemporaryDirectory() as output:
            with self.assertRaises(ValueError):
                runner.run(self.args(output, execute=True, model=None))
            self.assertEqual(list(Path(output).iterdir()), [])


if __name__ == '__main__':
    unittest.main()
