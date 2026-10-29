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
  // Tel af tot 1 januari 2028 00:00 uur in Nederland (CET, UTC+01:00).
  // Deze datum is de start van het jubileumjaar en geen aangekondigd feestmoment.
  const countdown = document.getElementById('jubileum-countdown');
  if (countdown) {
    const targetTime = Date.parse('2028-01-01T00:00:00+01:00');
    const nodes = ['days', 'hours', 'minutes', 'seconds'].map(key => document.getElementById('count-' + key));
    const status = document.getElementById('countdown-status');
    let intervalId;
    const tick = () => {
      const remainingMs = Math.max(0, targetTime - Date.now());
      const remaining = Math.ceil(remainingMs / 1000);
      const days = Math.floor(remaining / 86400);
      const hours = Math.floor((remaining % 86400) / 3600);
      const minutes = Math.floor((remaining % 3600) / 60);
      const seconds = remaining % 60;
      [String(days), String(hours).padStart(2, '0'), String(minutes).padStart(2, '0'), String(seconds).padStart(2, '0')]
        .forEach((value, i) => { if (nodes[i]) nodes[i].textContent = value; });
      if (remainingMs === 0) {
        if (intervalId) clearInterval(intervalId);
        if (status) status.textContent = 'Het jubileumjaar 2028 is begonnen!';
      }
    };
    tick();
    intervalId = setInterval(tick, 1000);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) tick(); });
  }

})();