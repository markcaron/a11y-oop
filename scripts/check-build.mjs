import {readFileSync,readdirSync,statSync,existsSync} from 'node:fs';
import {resolve,join} from 'node:path';
const root=resolve(import.meta.dirname,'../_site');
const walk=p=>readdirSync(p).flatMap(n=>{const f=join(p,n);return statSync(f).isDirectory()?walk(f):[f];});
const pages=walk(root).filter(p=>p.endsWith('.html'));
const failures=[];
for(const page of pages){
 const html=readFileSync(page,'utf8');
 if((html.match(/<h1\b/g)||[]).length!==1)failures.push(page+': expected one main h1');
 if(!html.includes('id="main"'))failures.push(page+': missing main target');
 if(/\{%|\{\{/.test(html))failures.push(page+': unrendered template syntax');
 const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
 if(ids.length!==new Set(ids).size)failures.push(page+': duplicate ids');
 for(const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
  const value=match[1].replaceAll('&amp;','&');
  if(!value.startsWith('/')||value.startsWith('//'))continue;
  const url=new URL(value,'https://example.test');
  let file=join(root,decodeURIComponent(url.pathname));
  if(url.pathname.endsWith('/'))file=join(file,'index.html');
  if(!existsSync(file))failures.push(page+': missing '+value);
  else if(url.hash && file.endsWith('.html')){
   const target=decodeURIComponent(url.hash.slice(1));
   if(!readFileSync(file,'utf8').includes('id="'+target+'"'))failures.push(page+': missing fragment '+value);
  }
 }
}
if(failures.length){console.error(failures.join('\n'));process.exit(1);}
console.log(`Verified ${pages.length} built pages: main headings, IDs, templates, local files and cross-page fragments.`);
