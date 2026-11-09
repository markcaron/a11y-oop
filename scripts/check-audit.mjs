import {readFileSync,readdirSync,statSync} from 'node:fs';
import {resolve,join} from 'node:path';
const root=resolve(import.meta.dirname,'..'),site=join(root,'_site');
const walk=p=>readdirSync(p).flatMap(n=>{const f=join(p,n);return statSync(f).isDirectory()?walk(f):[f];});
const paths=new Set(walk(site).filter(f=>f.endsWith('.html')).map(p=>p.slice(site.length).replace(/index\.html$/,'')));
const profile=['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice'];
let total=0,incomplete=0;
for(const width of [1280,320])for(const scheme of ['light','dark'])for(const mode of ['pages','states']){
 const file=`audits/axe-${mode}-${scheme}-${width}.json`,r=JSON.parse(readFileSync(join(root,file)));
 if(r.mode!==mode||profile.some(t=>!r.tags.includes(t)))throw Error('Wrong profile: '+file);
 if(new Date(r.startedAt).getTime()<statSync(join(site,'index.html')).mtimeMs)throw Error('Stale scan; rerun after build: '+file);
 if(r.scans.length!==(mode==='pages'?paths.size:3))throw Error('Incomplete coverage: '+file);
 if(mode==='pages' && new Set(r.scans.map(s=>s.path)).size!==paths.size)throw Error('Duplicate page coverage: '+file);
 for(const s of r.scans){
  if(mode==='pages'&&!paths.has(s.path))throw Error('Unknown page '+s.path);
  if(s.viewport.width!==width||s.colorScheme!==scheme||!s.enhanced)throw Error('Wrong runtime: '+file);
  if(s.violations.length||s.horizontalOverflow)throw Error('Failed scan: '+file+' '+s.path+' '+s.state);
  total++;incomplete+=s.incomplete.length;
 }
}
console.log(`${total} rendered scans passed; ${incomplete} incomplete rule results retained for triage. This is not a conformance certification.`);
