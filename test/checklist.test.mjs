import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validateState,summarize,matches,STORAGE_KEY} from '../static/assets/checklist-state.js';
const catalog=JSON.parse(readFileSync(new URL('../data/checklist.json',import.meta.url)));
const known=new Set(catalog.checks.map(c=>c.id));
test('shared table checks appear for multiple roles without duplicating records',()=>{
 const table=catalog.checks.filter(c=>c.topic==='Tables and structured data');
 assert.equal(table.length,4);
 for(const role of ['content','design','dev','qa'])assert(table.some(c=>matches(c,{role})));
 assert(table.find(c=>c.id==='TAB01').roles.includes('design')); 
 assert.equal(known.size,catalog.checks.length);
});
test('source lookup and intersecting filters preserve honest empty results',()=>{
 assert.equal(catalog.checks.filter(c=>matches(c,{q:'H061'})).length,1);
 assert.equal(catalog.checks.filter(c=>matches(c,{role:'delivery',topic:'Tables and structured data'})).length,0);
 assert(matches(catalog.checks[0],{status:'not-assessed'}));
});
test('import validates transactionally, skips removed checks and strips unrelated fields',()=>{
 const v=validateState({schemaVersion:1,entries:{TAB01:{status:'pass',note:'Tested with headers',unexpected:1},REMOVED:{status:'pass',note:''}}},known);
 assert.deepEqual(v.entries.TAB01,{status:'pass',note:'Tested with headers'});assert.equal(v.skipped,1);
 assert.throws(()=>validateState({schemaVersion:99,entries:{}},known));
 assert.throws(()=>validateState({schemaVersion:1,entries:{TAB01:{status:'complete',note:''}}},known));
 assert.throws(()=>validateState({schemaVersion:1,entries:{TAB01:{status:'pass',note:{}}}},known));
 assert.throws(()=>validateState({schemaVersion:1,entries:[]},known));
});
test('failures count as reviewed, not-tested and unexplained exclusions do not',()=>{
 const checks=['TAB01','TAB02','TAB03','TAB04'].map(id=>({id}));
 const s=summarize(checks,{TAB01:{status:'pass',note:''},TAB02:{status:'fail',note:'association lost'},TAB03:{status:'not-applicable',note:'  '},TAB04:{status:'not-tested',note:'AT unavailable'}});
 assert.deepEqual(s,{total:4,reviewed:2,passed:1,failed:1,excluded:0,notTested:1});
 assert.equal(summarize([{id:'TAB03'}],{TAB03:{status:'not-applicable',note:'No data table in scope'}}).excluded,1);
});
test('all 90 supplied checklist items retain valid normalized destinations',()=>{
 assert.equal(catalog.heydonSourceMap.length,90);
 for(const row of catalog.heydonSourceMap){assert(row.mappedTo.length);for(const id of row.mappedTo)assert(known.has(id));}
 assert.equal(STORAGE_KEY,'a11y-oop:checklist:v1');
});
