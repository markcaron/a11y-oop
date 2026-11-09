import {STORAGE_KEY, STATUSES, validateState, summarize, matches} from './checklist-state.js';
class A11yChecklist extends HTMLElement {
  connectedCallback() {
    if (this.ready) return;
    this.ready = true;
    this.catalog = JSON.parse(this.querySelector('[data-catalog]').textContent);
    this.knownIds = new Set(this.catalog.checks.map(c=>c.id));
    this.entries = Object.create(null);
    this.canSave = true;
    this.cards = new Map([...this.querySelectorAll('[data-check-id]')].map(el=>[el.dataset.checkId,el]));
    this.message = this.querySelector('[data-message]');
    this.storageWarning = this.querySelector('[data-storage-warning]');
    this.form = this.querySelector('[data-filters]');
    this.filters = Object.fromEntries(['q','role','topic','kind','status'].map(key=>[key,this.form.elements.namedItem(key)]));
    this.querySelectorAll('[data-enhance]').forEach(el=>el.disabled=false);
    this.querySelector('[data-js-note]').hidden = true;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) this.entries = validateState(JSON.parse(raw), this.knownIds).entries;
    } catch {
      this.canSave = false;
      this.storageWarning.textContent = 'Saved progress could not be read. Your saved data has not been overwritten. You can export this session, or use Start over to clear this checklist’s saved data.';
    }
    const params = new URL(location.href).searchParams;
    for (const [key,input] of Object.entries(this.filters)) {
      const value = params.get(key) || '';
      if (input instanceof HTMLSelectElement) input.value = [...input.options].some(o=>o.value===value) ? value : '';
      else input.value = value.slice(0,200);
    }
    this.paintEntries();
    this.form.addEventListener('submit',event=>event.preventDefault());
    this.form.addEventListener('input',()=>{this.applyFilters(true);this.updateProgress();});
    this.querySelector('[data-clear-filters]').addEventListener('click',()=>{this.form.reset();this.applyFilters(true);this.updateProgress();});
    this.addEventListener('change',event=>{
      if (event.target.matches('[data-entry-status]')) this.edit(event.target.closest('[data-check-id]'));
    });
    this.addEventListener('input',event=>{
      if (event.target.matches('[data-entry-note]')) this.edit(event.target.closest('[data-check-id]'),false);
    });
    this.resetDialog = this.querySelector('[data-reset-dialog]');
    this.querySelector('[data-reset]').addEventListener('click',()=>this.resetDialog.showModal());
    this.querySelector('[data-confirm-reset]').addEventListener('click',()=>this.reset());
    this.querySelector('[data-export]').addEventListener('click',()=>this.exportProgress());
    this.querySelector('[data-import]').addEventListener('click',()=>this.querySelector('[data-import-file]').click());
    this.querySelector('[data-import-file]').addEventListener('change',event=>this.readImport(event.target));
    this.querySelector('[data-confirm-import]').addEventListener('click',()=>this.importProgress());
    window.addEventListener('popstate',()=>{
      const url = new URL(location.href);
      for (const [key,input] of Object.entries(this.filters)) input.value=url.searchParams.get(key)||'';
      this.applyFilters();
    });
    window.addEventListener('storage',event=>{
      if (event.key !== STORAGE_KEY) return;
      try {this.entries=event.newValue ? validateState(JSON.parse(event.newValue),this.knownIds).entries : Object.create(null);this.paintEntries();this.updateProgress();this.applyFilters();this.message.textContent='Progress updated from another tab.';} catch {this.storageWarning.textContent='Another tab saved an unsupported progress format. This tab’s progress is unchanged.';}
    });
    this.applyFilters();
    this.updateProgress();
  }
  paintEntries() {
    for (const [id,card] of this.cards) {
      const item = this.entries[id] || {status:'not-assessed',note:''};
      card.querySelector('[data-entry-status]').value=item.status;
      card.querySelector('[data-entry-note]').value=item.note;
      this.updateNote(card,item.status);
    }
  }
  updateNote(card,status) {
    const note=card.querySelector('[data-entry-note]');
    if(status==='not-applicable')card.querySelector('details').open=true;
    note.required=status==='not-applicable';
    card.querySelector('[data-note-label]').textContent = status==='not-applicable' ? 'Why this does not apply (required)' : 'Evidence and notes (optional)';
    card.querySelector('[data-na-hint]').hidden=status!=='not-applicable'||Boolean(note.value.trim());
  }
  edit(card, refilter=true) {
    const hadFocus=card.contains(document.activeElement);
    const id=card.dataset.checkId;
    const status=card.querySelector('[data-entry-status]').value;
    const note=card.querySelector('[data-entry-note]').value;
    this.entries[id]={status,note};
    this.updateNote(card,status);
    this.save();
    this.updateProgress();
    if (refilter) {
      this.applyFilters();
      if (card.hidden && hadFocus) this.querySelector('[data-results-title]').focus();
    }
  }
  save() {
    if (!this.canSave) return;
    try {localStorage.setItem(STORAGE_KEY,JSON.stringify(this.snapshot()));this.message.textContent='Progress saved on this device.';}
    catch {this.canSave=false;this.storageWarning.textContent='Your browser could not save progress. Changes are kept in this tab only. Export progress before leaving.';}
  }
  snapshot() {return {schemaVersion:1,catalogVersion:this.catalog.schemaVersion,updatedAt:new Date().toISOString(),entries:this.entries};}
  updateProgress() {
    const s=summarize(this.catalog.checks,this.entries);
    this.querySelector('[data-reviewed]').textContent=`${s.reviewed} of ${s.total} reviewed`;
    this.querySelector('progress').value=s.reviewed;
    this.querySelector('progress').max=s.total;
    this.querySelector('[data-progress-detail]').textContent=`${s.passed} passed · ${s.failed} need work · ${s.excluded} not applicable · ${s.notTested} not tested`;
  }
  applyFilters(updateURL=false) {
    const filters=Object.fromEntries(Object.entries(this.filters).map(([k,input])=>[k,input.value.trim()]));
    let count=0;
    for (const check of this.catalog.checks) {
      const visible=matches(check,filters,this.entries[check.id]);
      this.cards.get(check.id).hidden=!visible;
      if (visible) count++;
    }
    this.querySelector('[data-count]').textContent=`${count} of ${this.catalog.checks.length} checks shown`;
    this.querySelector('[data-empty]').hidden=count!==0;
    if (updateURL) {
      const url=new URL(location.href);
      for (const [key,value] of Object.entries(filters)) {if(value)url.searchParams.set(key,value);else url.searchParams.delete(key);}
      history.replaceState(null,'',url);
    }
  }
  reset() {
    this.entries=Object.create(null);
    try {localStorage.removeItem(STORAGE_KEY);this.canSave=true;this.storageWarning.textContent='';}
    catch {this.canSave=false;this.storageWarning.textContent='This browser could not remove saved data. This tab has been reset, but old progress may return when you reload.';}
    this.paintEntries();this.updateProgress();this.applyFilters();this.resetDialog.close();
    this.message.textContent='All checklist results and notes cleared. Your filters are unchanged.';
  }
  exportProgress() {
    const blob=new Blob([JSON.stringify(this.snapshot(),null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download='a11y-oop-progress.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
    this.message.textContent='Progress exported. This file includes your notes.';
  }
  async readImport(input) {
    const file=input.files?.[0];input.value='';if(!file)return;
    try {
      if(file.size>2_000_000)throw new Error('Choose a progress file smaller than 2 MB.');
      this.pendingImport=validateState(JSON.parse(await file.text()),this.knownIds);
      this.querySelector('[data-import-summary]').textContent=`Replace this device’s progress with ${Object.keys(this.pendingImport.entries).length} imported records? ${this.pendingImport.skipped} unrecognized records will be ignored. Export your current progress first if you want to keep a copy.`;
      this.querySelector('[data-import-dialog]').showModal();
    } catch(error) {this.message.textContent=`Import failed: ${error.message}`;}
  }
  importProgress() {
    if(!this.pendingImport)return;
    this.entries=this.pendingImport.entries;this.pendingImport=null;
    this.save();this.paintEntries();this.updateProgress();this.applyFilters();
    this.querySelector('[data-import-dialog]').close();
    this.message.textContent='Progress imported.'+(this.canSave?'':' Export before leaving; saving is unavailable.');
  }
}
customElements.define('a11y-checklist',A11yChecklist);
