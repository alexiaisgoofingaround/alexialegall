/* APP: helpers, page renderers, router. No content lives here; edit assets/js/data/ instead.
   Jekyll equivalent: _layouts/*.liquid */

/* ================= 1. HELPERS ================= */
const LABEL = Object.fromEntries(Object.values(SKILLS).flat());           // id -> label
const count = id => PROJ.filter(p => p.skills.includes(id)).length;       // projects per skill
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const typeset = el => { if (window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([el]); };
const chip = id => `<button class="chip" data-skill="${id}">${LABEL[id]}</button>`;
const $ = id => document.getElementById(id);

/* ================= 2. CV PAGE ================= */
const entries = list => list.map(([when, title, org, one, x]) => `
  <details class="entry" data-skills="${x.skills.join(' ')}">
    <summary>
      <span class="when">${when}</span>
      <span><h3>${title}</h3><span class="org">${org}</span><span class="one">${one}</span></span>
      <span class="plus" aria-hidden="true">+</span>
    </summary>
    <div class="more">
      <ul>${x.details.map(d => `<li>${d}</li>`).join('')}</ul>
      <div class="chips">${x.skills.map(chip).join('')}</div>
      ${x.projects.map(p => `<button class="seeproj" data-p="${p}">See project: ${PROJ.find(q => q.id === p).title}</button>`).join('')}
    </div>
  </details>`).join('');

function renderCV() {
  $('skills').innerHTML = Object.entries(SKILLS).map(([group, list]) => `
    <div class="skillgroup"><h3>${group}</h3>
      <div class="chips">${list.map(([id, label]) =>
        `<button class="chip" data-skill="${id}">${label}<span class="n">${count(id)}</span></button>`).join('')}</div>
    </div>`).join('');
  $('lang').innerHTML = `<p style="margin:0">${LANGS.map(([l, lv]) => `${l}, ${lv}`).join('<br>')}</p>`;
  $('exp').innerHTML = entries(EXP);
  $('edu').innerHTML = entries(EDU);
  $('hob').innerHTML = HOB.map(([t, d]) => `<div class="hobby"><h3>${t}</h3><p>${d}</p></div>`).join('');

  /* hover a sidebar skill -> dim CV entries that don't use it */
  const cvEl = document.querySelector('.cv');
  $('skills').addEventListener('pointerover', e => {
    const c = e.target.closest('[data-skill]');
    if (!c) return;
    cvEl.classList.add('dim');
    document.querySelectorAll('.cv .entry').forEach(en =>
      en.classList.toggle('hit', en.dataset.skills.split(' ').includes(c.dataset.skill)));
  });
  $('skills').addEventListener('pointerleave', () => cvEl.classList.remove('dim'));
}

/* ================= 3. PROJECTS PAGE ================= */
let active = "all";

function renderProjects() {
  const used = [...new Set(PROJ.flatMap(p => p.skills))];
  $('filter').innerHTML = [["all","All"], ...used.map(id => [id, LABEL[id]])]
    .map(([id, label]) => `<button data-f="${id}" aria-pressed="${active === id}">${label}</button>`).join('');

  const list = PROJ.filter(p => active === "all" || p.skills.includes(active));
  $('mosaic').innerHTML =
    (list.length
      ? list.map(p => `
          <button class="tile${p.big && active === "all" ? " big" : ""}" style="background:${p.color}" data-p="${p.id}">
            <div><h3>${p.title}</h3><small>${p.when} · ${p.skills.slice(0,3).map(s => LABEL[s]).join(', ')}</small></div>
          </button>`).join('')
      : `<p class="empty">No project uses this skill yet.</p>`)
    + (active === "all" ? `<div class="tile tpl"><div><h3>New project</h3><small>Copy projects/_template.js</small></div></div>` : "");
}

/* ================= 4. PROJECT DETAIL PAGE ================= */
function renderDetail(id) {
  const p = PROJ.find(x => x.id === id);
  if (!p) return go('projects');

  const block = ([kind, a, b]) => {
  if (kind === "fig")   return `<figure><div class="ph" style="background:${b}">image placeholder</div><figcaption>${a}</figcaption></figure>`;
  if (kind === "video") return `<figure><video controls playsinline preload="metadata" src="${b}"></video><figcaption>${a}</figcaption></figure>`;
  if (kind === "embed") return `<figure><iframe src="${b}" title="${a}" loading="lazy" allowfullscreen></iframe><figcaption>${a}</figcaption></figure>`;
  return `<p>${a}</p>`;
};
  const results = p.results.length
    ? p.results.map(block).join('')
    : `<p style="color:var(--soft)">No results written yet.</p>`;

  const subs = p.subs ? `
    <h2>Sub-projects</h2>
    <div class="subs">${p.subs.map(s => {
      const q = PROJ.find(x => x.id === s);
      return `<button data-p="${s}"><b>${q.title}</b>${q.when}</button>`; }).join('')}</div>` : '';

  const res = (p.resources.length
      ? `<ul class="res">${p.resources.map(([l, u, k]) => `<li><a href="${u}">${l}</a><span>${k}</span></li>`).join('')}</ul>`
      : `<p style="color:var(--soft)">No resources yet.</p>`)
    + (p.code ? `<pre><code>${esc(p.code)}</code></pre>` : '');

  const el = $('dbody');
  el.innerHTML = `
    <button class="back" data-go="projects">← All projects</button>
    <h1>${p.title}</h1>
    <p class="meta">${p.when}</p>
    <div class="chips">${p.skills.map(chip).join('')}</div>
    <h2>Description</h2><p>${p.description}</p>
    ${subs}
    <h2>Results</h2>${results}
    <h2>Resources</h2>${res}`;
  typeset(el);
}

/* ================= 5. ROUTER ================= */
function go(page, arg) {
  document.querySelectorAll('.page').forEach(s => s.classList.toggle('on', s.id === page));
  const tab = page === 'detail' ? 'projects' : page;
  document.querySelectorAll('nav [data-go]').forEach(b => {
    if (b.dataset.go === tab) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
  });
  if (page === 'projects') { active = arg || "all"; renderProjects(); }
  if (page === 'detail') renderDetail(arg);
  window.scrollTo(0, 0);
}

/* data-go=page | data-skill=id (filtered projects) | data-f=id (change filter) | data-p=id (project page) */
document.addEventListener('click', e => {
  const t = e.target.closest('[data-go],[data-skill],[data-f],[data-p]');
  if (!t) return;
  if (t.dataset.go) go(t.dataset.go);
  else if (t.dataset.skill) go('projects', t.dataset.skill);
  else if (t.dataset.f) { active = t.dataset.f; renderProjects(); }
  else if (t.dataset.p) go('detail', t.dataset.p);
});

/* ================= 6. BOOT ================= */
renderCV();
go('cv');
