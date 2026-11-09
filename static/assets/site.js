if (document.querySelector('a11y-checklist')) {
  import('./checklist.js').catch(()=>{
    const note=document.querySelector('[data-js-note]');
    if(note){note.hidden=false;note.textContent='Interactive controls could not load. All checklist guidance remains available below. Reload to try again.';}
  });
}
for (const link of document.querySelectorAll('.doc-nav a')) {
  if(new URL(link.href).pathname===location.pathname)link.setAttribute('aria-current','page');
}
for (const table of document.querySelectorAll('.prose table')) {
  const region=document.createElement('div');region.className='table-scroll';region.tabIndex=0;
  region.setAttribute('role','region');region.setAttribute('aria-label',table.caption?.textContent||'Scrollable data table');
  table.before(region);region.append(table);
}

// Code examples need a keyboard stop only when their content actually overflows.
for (const pre of document.querySelectorAll('.prose pre')) {
  const update = () => {
    if (pre.scrollWidth > pre.clientWidth + 1) pre.tabIndex = 0;
    else pre.removeAttribute('tabindex');
  };
  new ResizeObserver(update).observe(pre);
  update();
}
