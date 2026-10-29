(() => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menu.setAttribute('aria-expanded', String(isOpen));
      menu.setAttribute('aria-label', isOpen ? 'Sluit navigatie' : 'Open navigatie');
    });
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) {nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');}
    });
  }
  const input = document.querySelector('#timeline-search');
  const filters = [...document.querySelectorAll('[data-filter]')];
  const entries = [...document.querySelectorAll('.timeline-item')];
  const count = document.querySelector('#result-count');
  const noResults = document.querySelector('#no-results');
  if (input && entries.length) {
    let cat = 'alles';
    const refresh = () => {
      const term = input.value.trim().toLocaleLowerCase('nl-NL');
      let found = 0;
      entries.forEach(entry => {
        const ok = (cat === 'alles' || entry.dataset.cat === cat) && (!term || entry.dataset.search.includes(term));
        entry.hidden = !ok;
        if (ok) found++;
      });
      if (count) count.textContent = `${found} van ${entries.length} gebeurtenissen weergegeven`;
      if (noResults) noResults.hidden = found !== 0;
    };
    filters.forEach(btn => btn.addEventListener('click', () => {
      cat = btn.dataset.filter;
      filters.forEach(b => { const active = b === btn; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active)); });
      refresh();
    }));
    input.addEventListener('input', refresh);
    refresh();
  }
})();