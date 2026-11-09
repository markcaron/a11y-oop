import {createServer} from 'node:http';
import {readFileSync,readdirSync,statSync,existsSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve,join,extname} from 'node:path';
const root=resolve(import.meta.dirname,'..'),site=join(root,'_site');
const walk=p=>readdirSync(p).flatMap(n=>{const f=join(p,n);return statSync(f).isDirectory()?walk(f):[f];});
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.avif':'image/avif','.zip':'application/zip','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8'};
const server=createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');
 if(url.pathname==='/__audit/results'&&req.method==='POST'){
  if(req.headers.origin && req.headers.origin!==`http://${req.headers.host}`){res.writeHead(403).end();return;}
  let body='';for await(const chunk of req){body+=chunk;if(body.length>20000000)throw Error('Report too large');}
  const data=JSON.parse(body);if(!['pages','states'].includes(data.mode)||!Array.isArray(data.scans)||!data.scans.length)throw Error('Invalid report');
  const scheme=data.scans[0].colorScheme,width=data.scans[0].viewport.width;if(!['light','dark'].includes(scheme)||![1280,320].includes(width))throw Error('Invalid configuration');
  mkdirSync(join(root,'audits'),{recursive:true});const file=`audits/axe-${data.mode}-${scheme}-${width}.json`;writeFileSync(join(root,file),JSON.stringify(data,null,2));res.writeHead(200,{'Content-Type':'application/json'}).end(JSON.stringify({path:file}));return;
 }
 if(url.pathname==='/__audit/pages'){res.writeHead(200,{'Content-Type':'application/json'}).end(JSON.stringify(walk(site).filter(p=>p.endsWith('.html')).map(p=>p.slice(site.length).replace(/index\.html$/,''))));return;}
 let file=url.pathname==='/__audit/'?join(root,'test/browser-audit.html'):url.pathname==='/__audit/axe.min.js'?join(root,'node_modules/axe-core/axe.min.js'):resolve(site,'.'+decodeURIComponent(url.pathname));
 if(file!==site&&!file.startsWith(site+'/')&&!['/__audit/','/__audit/axe.min.js'].includes(url.pathname)){res.writeHead(403).end();return;}
 if(existsSync(file)&&statSync(file).isDirectory())file=join(file,'index.html');
 if(!existsSync(file)){res.writeHead(404).end('Not found');return;}
 res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','Cache-Control':'no-store'}).end(readFileSync(file));
 }catch(error){res.writeHead(500).end(error.message);}});
server.listen(3027,'127.0.0.1',()=>console.log('Audit runner: http://127.0.0.1:3027/__audit/'));
