import {readFileSync,writeFileSync,mkdirSync,cpSync,readdirSync,rmSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {dirname,resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const read=p=>readFileSync(resolve(root,p),'utf8');
const write=(p,s)=>{const target=resolve(root,p);mkdirSync(dirname(target),{recursive:true});writeFileSync(target,s);};
const esc=v=>String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const catalog=JSON.parse(read('data/checklist.json'));
const ids=new Set();
for(const c of catalog.checks){if(ids.has(c.id)||!c.title||!c.check||!c.roles.length||!c.roles.every(r=>catalog.roles[r]))throw Error('Invalid checklist record '+c.id);ids.add(c.id);}
const statuses=[['not-assessed','Not assessed'],['pass','Pass'],['fail','Needs work'],['not-applicable','Not applicable'],['not-tested','Not tested']];
const options=entries=>entries.map(([v,t])=>`<option value="${esc(v)}">${esc(t)}</option>`).join('');
const select=(name,label,entries)=>`<label>${label}<select name="${name}"><option value="">All ${name==='kind'?'types':name==='status'?'results':name==='role'?'roles':'topics'}</option>${options(entries)}</select></label>`;
const checks=catalog.checks.map(c=>`<article class="check-item" id="${c.id}" data-check-id="${c.id}">
<div class="check-meta"><span>${c.id} / ${esc(c.topic)}</span><span class="pill">${esc(c.classification)}</span></div>
<h2>${esc(c.title)}</h2><p>${esc(c.check)}</p>
<div class="check-row"><p><strong>Suggested lead</strong><br>${esc(catalog.roles[c.lead])}<br>Shared with ${esc(c.roles.slice(1).map(r=>catalog.roles[r]).join(', '))}</p><label for="status-${c.id}">Result for ${c.id}<select id="status-${c.id}" data-entry-status data-enhance disabled>${options(statuses)}</select></label></div>
<details><summary>Guidance, evidence &amp; notes</summary><dl><dt>Evidence to collect</dt><dd>${esc(c.evidence)}</dd><dt>Stage</dt><dd>${esc(c.stage)}</dd><dt>Related requirements</dt><dd>${c.criteria.length?esc('WCAG '+c.criteria.join(', ')+'. Verify applicability, exceptions and method.'):'Contextual practice or product requirement; substantiate any normative mapping separately.'}</dd><dt>Source locations</dt><dd>${esc(c.sources.join(' · '))} · <a href="/about/#sources">Source key</a></dd></dl><label for="note-${c.id}" data-note-label>Evidence and notes (optional)</label><textarea id="note-${c.id}" maxlength="10000" aria-describedby="hint-${c.id}" data-entry-note data-enhance disabled></textarea><p id="hint-${c.id}" data-na-hint hidden>Add a reason before this counts as not applicable.</p></details></article>`).join('\n');
const page=`---\ntitle: Your accessibility checklist\nlayout: default\nsection: checklist\n---
<div class="page-head"><p class="eyebrow">Put it into practice</p><h1>A shared checklist. Your next steps.</h1><p class="lead">Choose the work that fits your role. Record what you’ve checked, what needs attention, and what you still need to learn.</p></div>
<a11y-checklist><p class="note" data-js-note>All guidance is available below. Enable JavaScript to filter checks and save progress on this device.</p><div class="checklist-layout"><aside class="filters" aria-label="Checklist filters"><form data-filters><fieldset data-enhance disabled><legend>Make it yours</legend><label>Find a check<input type="search" name="q" maxlength="200" placeholder="Try tables, labels, focus…"></label>${select('role','Your role',Object.entries(catalog.roles))}${select('topic','Topic',[...new Set(catalog.checks.map(c=>c.topic))].sort().map(t=>[t,t]))}${select('kind','Check type',[...new Set(catalog.checks.map(c=>c.classification))].sort().map(t=>[t,t]))}${select('status','Result',statuses)}<button type="button" data-clear-filters>Clear filters</button></fieldset></form><p class="filter-hint">Checks can belong to several roles. Filters change the view, not your saved progress. Your filter URL can be shared.</p></aside>
<div><div class="progress-panel"><div class="progress-top"><strong data-reviewed>0 of ${catalog.checks.length} reviewed</strong><span>Across your whole checklist</span></div><progress value="0" max="${catalog.checks.length}" aria-label="Checks reviewed"></progress><p data-progress-detail>0 passed · 0 need work · 0 not applicable · 0 not tested</p><p>Reviewed includes failures and explained exclusions. It is not a conformance score.</p></div>
<p class="status-banner" data-storage-warning role="status"></p><div class="check-toolbar"><h2 class="sr-only" data-results-title tabindex="-1">Checklist results</h2><p data-count role="status">${catalog.checks.length} checks shown</p><div class="check-tools"><button type="button" data-export data-enhance disabled>Export progress</button><button type="button" data-import data-enhance disabled>Import</button><button type="button" data-reset data-enhance disabled>Start over</button></div></div><p class="small" data-message role="status">Progress stays in this browser on this device. Export to keep a copy or move it elsewhere.</p><input type="file" accept="application/json,.json" data-import-file hidden>
<p class="empty" data-empty hidden>No checks match these filters. Try a different role or topic, or clear the filters.</p>${checks}</div></div>
<dialog data-reset-dialog aria-labelledby="reset-title"><h2 id="reset-title">Start over?</h2><p>This clears results and notes for all ${catalog.checks.length} checks on this browser, including checks hidden by your filters. Your filters stay the same.</p><form method="dialog" class="actions"><button autofocus value="cancel">Keep my progress</button><button type="button" data-confirm-reset>Clear all progress</button></form></dialog>
<dialog data-import-dialog aria-labelledby="import-title"><h2 id="import-title">Import progress?</h2><p data-import-summary></p><form method="dialog" class="actions"><button autofocus value="cancel">Keep current progress</button><button type="button" data-confirm-import>Replace progress</button></form></dialog>
<script type="application/json" data-catalog>${JSON.stringify(catalog).replaceAll('<','\\u003c')}</script></a11y-checklist>`;
write('content/checklist.html',page);
write('static/data/checklist.json',JSON.stringify(catalog,null,2));
write('static/data/rhds-sources.json',read('data/rhds-sources.json'));
write('static/data/rhds-component-sources.json',read('data/rhds-component-sources.json'));
const skillData=JSON.parse(read('data/skills.json'));
write('skills/shared/catalog.json',JSON.stringify(catalog,null,2));
let listing='---\ntitle: Modular AI skills\nlayout: default\nsection: skills\n---\n<div class="page-head"><p class="eyebrow">Work with an assistant</p><h1>Small skills. Connected thinking.</h1><p class="lead">Give an assistant the right task, the right context and a clear idea of what evidence it can collect. Compose these modules into recipes for your phase of work.</p></div><div class="actions"><a class="button primary" href="/downloads/a11y-oop-skills.zip" download>Download the skill pack ↓</a><a class="button" href="/skills/recipes/">Explore workflow recipes →</a></div><p class="small">Tool-agnostic Markdown · Shared JSON catalog · PF / RHDS / Felt provider references · React / Web Component runtime references</p><div class="skills-list">';
const packageDir=resolve(root,'.alloy/skill-package');rmSync(packageDir,{recursive:true,force:true});mkdirSync(packageDir,{recursive:true});
for(const [i,skill] of skillData.entries()){
 const raw=read(`skills/${skill.name}/SKILL.md`);
 if(!raw.startsWith(`---\nname: ${skill.name}\n`))throw Error('Skill name mismatch '+skill.name);
 listing+=`<article class="skill-row"><span class="number">0${i+1}</span><div><h2><a href="/skills/${skill.name}/">${esc(skill.title)}</a></h2><p>${esc(skill.description)}</p></div><a href="/downloads/${skill.name}.zip" download aria-label="Download ${esc(skill.title)} skill">Download ↓</a></article>`;
 const body=raw.replace(/^---\n[\s\S]*?\n---\n/,'');
 write(`content/skills/${skill.name}.md`,`---\ntitle: ${JSON.stringify(skill.title)}\nlayout: default\nsection: skills\n---\n\n<div class="page-head"><p class="eyebrow">AI skills / Portable module</p><h1>${esc(skill.title)}</h1><p class="lead">${esc(skill.description)}</p><div class="actions"><a class="button" href="/downloads/${skill.name}.zip" download>Download self-contained skill</a><a href="/skills/recipes/">Use in a recipe →</a></div></div>\n\n<div class="prose">\n\n${body.replace(/^\s*# [^\n]*\n/,'').replaceAll('../shared/','/skills/shared/')}\n\n</div>\n`);
 write(`static/skills/${skill.name}/SKILL.md`,raw);
 const moduleDir=resolve(packageDir,skill.name);mkdirSync(moduleDir,{recursive:true});
 writeFileSync(resolve(moduleDir,'SKILL.md'),raw.replaceAll('../shared/','references/shared/'));
 cpSync(resolve(root,'skills/shared'),resolve(moduleDir,'references/shared'),{recursive:true});
 mkdirSync(resolve(root,'static/downloads'),{recursive:true});
 const zip=resolve(root,`static/downloads/${skill.name}.zip`);rmSync(zip,{force:true});
 execFileSync('zip',['-qr',zip,skill.name],{cwd:packageDir});
}
listing+='</div><aside class="note"><strong>A clean slate, grounded in the review.</strong> These are new draft modules, not renamed copies of the PF skills. Each download contains its own shared references; the pack includes all eight. Skills guide work—they do not provide browser tools or independently certify accessibility.</aside>';
write('content/skills/index.html',listing);
cpSync(resolve(root,'skills/shared'),resolve(root,'static/skills/shared'),{recursive:true});
const zip=resolve(root,'static/downloads/a11y-oop-skills.zip');rmSync(zip,{force:true});execFileSync('zip',['-qr',zip,...skillData.map(s=>s.name)],{cwd:packageDir});
console.log(`Prepared ${catalog.checks.length} static checklist records and ${skillData.length} self-contained skill packages.`);
