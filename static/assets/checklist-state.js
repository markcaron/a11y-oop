export const STORAGE_KEY = 'a11y-oop:checklist:v1';
export const STATUSES = ['not-assessed', 'pass', 'fail', 'not-applicable', 'not-tested'];
export function validateState(value, knownIds) {
  if (!value || value.schemaVersion !== 1 || !value.entries || typeof value.entries !== 'object' || Array.isArray(value.entries)) throw new Error('This file does not use the supported progress format.');
  const entries = Object.create(null);
  let skipped = 0;
  for (const [id, item] of Object.entries(value.entries)) {
    if (!knownIds.has(id)) { skipped++; continue; }
    if (!item || !STATUSES.includes(item.status) || typeof item.note !== 'string' || item.note.length > 10000) throw new Error(`The progress record for ${id} is invalid.`);
    entries[id] = {status:item.status, note:item.note};
  }
  return {entries, skipped};
}
export function summarize(checks, entries) {
  const result = {total:checks.length, reviewed:0, passed:0, failed:0, excluded:0, notTested:0};
  for (const c of checks) {
    const entry = entries[c.id];
    if (entry?.status === 'pass') { result.passed++; result.reviewed++; }
    if (entry?.status === 'fail') { result.failed++; result.reviewed++; }
    if (entry?.status === 'not-applicable' && entry.note.trim()) { result.excluded++; result.reviewed++; }
    if (entry?.status === 'not-tested') result.notTested++;
  }
  return result;
}
export function matches(check, filters, entry = {}) {
  const text = [check.id,check.title,check.check,check.topic,check.evidence,...check.sources].join(' ').toLowerCase();
  return (!filters.q || text.includes(filters.q.toLowerCase())) && (!filters.role || check.roles.includes(filters.role)) && (!filters.topic || check.topic === filters.topic) && (!filters.kind || check.classification === filters.kind) && (!filters.status || (entry.status || 'not-assessed') === filters.status);
}
