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

  const data={
    helmond:["Nederland · Helmond","Helmond is het vertrekpunt","Van deze Brabantse stad lopen eeuwenoude en nieuwe verbindingen naar de wereld.","geschiedenis.html"],
    mechelen:["België · Mechelen","Een historische verbinding met België","Helmond kende historische contacten met Mechelen en latere internationale uitwisselingen.","helmonders.html#mechelen"],
    polen:["Polen · Zielona Góra","Een voormalige stedenband","Helmond en Zielona Góra onderhielden een stedenband die in 2014 formeel eindigde.","helmonders.html#polen"],
    afrika:["West- en Centraal-Afrika","Vlisco in de Afrikaanse modewereld","In Helmond geproduceerde stoffen kregen in West- en Centraal-Afrika een eigen culturele betekenis.","gemaakt-in-helmond.html#vlisco"],
    indonesie:["Indonesië","De wortels van de waxprint","Indonesische batik vormde een belangrijke inspiratiebron voor de latere Helmondse waxprints.","gemaakt-in-helmond.html#vlisco"],
    tokio:["Japan · Tokio","Helmond op het Olympisch podium","Janssen-Fritsen leverde turntoestellen voor onder meer de Olympische Spelen in Tokio.","gemaakt-in-helmond.html#janssen"],
    nicaragua:["Nicaragua · San Marcos","Samenwerking met San Marcos","De Stichting Helmond–San Marcos steunt al tientallen jaren inwoners van San Marcos.","helmonders.html#san-marcos"],
    brazilie:["Brazilië · Amazonegebied","Internationale betrokkenheid","Vanuit Helmond werd het werk van pater Toon Gruijters in het Amazonegebied ondersteund.","helmonders.html#brazilie"],
    ghana:["Ghana","Stiphout en Ghana","MOV Stiphout ondersteunt diverse initiatieven in Ghana.","helmonders.html#ghana"],
    suriname:["Suriname","De koloniale geschiedenis","De wereldverbindingen van Helmond omvatten ook kolonialisme en slavernij. Lees de historische context.","naam-helmond.html#suriname"]
  };
  const pins=[...document.querySelectorAll('[data-pin]')];
  if(pins.length){
    pins.forEach(pin=>pin.addEventListener('click',()=>{
      const item=data[pin.dataset.pin];if(!item)return;
      pins.forEach(p=>{const selected=p===pin;p.classList.toggle('selected',selected);p.setAttribute('aria-pressed',String(selected));});
      document.getElementById('map-place').textContent=item[0];
      document.getElementById('map-title').textContent=item[1];
      document.getElementById('map-description').textContent=item[2];
      document.getElementById('map-link').href=item[3];
    }));
  }
  const worldSearch=document.getElementById('world-search');
  const worldCards=[...document.querySelectorAll('[data-world-category]')];
  if(worldSearch&&worldCards.length){
    let category='alles';
    const update=()=>{
      const term=worldSearch.value.trim().toLocaleLowerCase('nl-NL');
      let visible=0;
      worldCards.forEach(card=>{
        const show=(category==='alles'||card.dataset.worldCategory===category)&&(!term||card.dataset.worldText.includes(term));
        card.hidden=!show;if(show)visible++;
      });
      document.getElementById('world-count').textContent=visible+' van '+worldCards.length+' wereldverhalen';
      document.getElementById('world-empty').hidden=visible!==0;
    };
    document.querySelectorAll('[data-category]').forEach(b=>b.addEventListener('click',()=>{
      category=b.dataset.category;
      document.querySelectorAll('[data-category]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});
      update();
    }));
    worldSearch.addEventListener('input',update);update();
  }

})();
