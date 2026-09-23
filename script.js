/* IIMA Ventures — Portfolio page behaviour
   Data comes straight from the shared sheet (Name / Website / Theme / Industry). */

/* Bump this whenever a logo file under assets/logos/ is edited in place (recropped,
   recoloured, SVG attributes changed, etc.) so browsers that already cached the old
   bytes at this URL fetch the new version instead of reusing a stale image. */
const ASSET_VERSION = "2026-09-23-logos-9";
const withVersion = src => `${src}?v=${ASSET_VERSION}`;

const COMPANIES = [
  { name: "Karta AI",            url: "https://getkarta.ai",            logo: "assets/logos/karta.png", scale: 1.09,            theme: ["Digital Acceleration", "AI Portfolio"], industry: ["Enterprise", "AI"] },
  { name: "FactriKa",            url: "https://factrika.com",           logo: "assets/logos/factrika.png", scale: 0.9,         theme: ["Digital Acceleration"],                industry: ["Digital Infrastructure"] },
  { name: "Zeny",                url: "https://zeny.co.in",             logo: "assets/logos/zeny.svg", scale: 0.87,             theme: ["Digital Acceleration", "Inclusion"],   industry: ["Fintech"] },
  { name: "Xaults",              url: "https://xaults.com",             logo: "assets/logos/xaults.png", scale: 0.84,           theme: ["Digital Acceleration"],                industry: ["Fintech"] },
  { name: "NPrep",               url: "https://nprep.in",               logo: "assets/logos/nprep.png", scale: 1.0,            theme: ["Digital Acceleration"],                industry: ["Skilling & Livelihood"] },
  { name: "SarvDhan",            url: "https://sarvdhan.com",           logo: "assets/logos/sarvdhan.png", scale: 1.06,         theme: ["Digital Acceleration"],                industry: ["Fintech"] },
  { name: "Kaleidofin",          url: "https://kaleidofin.com",         logo: "assets/logos/kaleidofin.png", scale: 0.85,       theme: ["Digital Acceleration"],                industry: ["Fintech"] },
  { name: "Navanc",              url: "https://navanc.com",             logo: "assets/logos/navanc.png", scale: 0.63,           theme: ["Digital Acceleration", "AI Portfolio"], industry: ["Fintech"] },
  { name: "Finarkein",           url: "https://finarkein.com",          logo: "assets/logos/finarkein.svg", scale: 1.23,        theme: ["Digital Acceleration"],                industry: ["Digital Infrastructure"] },
  { name: "Tookitaki",           url: "https://tookitaki.ai",           logo: "assets/logos/tookitaki.png", scale: 1.02,        theme: ["AI Portfolio"],                        industry: ["Fintech"] },
  { name: "Chara",               url: "https://chara.co.in",            logo: "assets/logos/chara.svg", scale: 1.01,            theme: ["Climate & Sustainability"],            industry: ["Mobility"] },
  { name: "The E-Plane Company",  url: "https://eplane.ai",              logo: "assets/logos/eplane.png", scale: 1.15,           theme: ["Deep Tech"],                           industry: ["Aerospace & Defense"] },
  { name: "Unbox Robotics",      url: "https://unboxrobotics.com",      logo: "assets/logos/unbox.png", scale: 1.22,            theme: ["AI Portfolio", "Deep Tech"],           industry: ["Robotics"] },
  { name: "GUVI",                url: "https://guvi.in",                logo: "assets/logos/guvi.png", scale: 1.15,             theme: ["Digital Acceleration"],                industry: ["Skilling & Livelihood"] },
  { name: "Mimo Technologies",   url: "https://mimo-technologies.com",  logo: "assets/logos/mimo.png", scale: 0.71,             theme: ["Digital Acceleration"],                industry: ["Skilling & Livelihood"] },
  { name: "Riskcovry",           url: "https://riskcovry.com",          logo: "assets/logos/riskcovry.svg", scale: 0.89,        theme: ["Digital Acceleration"],                industry: ["Fintech"] },
  { name: "Kosh",                url: "https://getkosh.com",            logo: "assets/logos/kosh.png", scale: 0.98,             theme: ["Digital Acceleration"],                industry: ["Fintech"] },
  { name: "Entitled",            url: "https://entitled.co.in",         logo: "assets/logos/entitled.svg", scale: 0.93,         theme: ["Digital Acceleration"],                industry: ["Fintech"] },
  { name: "Frontier Markets",    url: "https://frontiermkts.com",       logo: "assets/logos/frontier-markets.png", scale: 1.21, theme: ["Digital Acceleration"],                industry: ["Skilling & Livelihood"] },
  { name: "5C Network",          url: "https://5cnetwork.com",          logo: "assets/logos/5c-network.png", scale: 1.04,       theme: ["AI Portfolio", "Deep Tech"],           industry: ["Healthcare", "AI"] },
  { name: "Agnikul Cosmos",      url: "https://agnikul.in",             logo: "assets/logos/agnikul.png", scale: 0.87,          theme: ["Deep Tech"],                           industry: ["Space Tech"] },
  { name: "Piersight",           url: "https://piersight.space",        logo: "assets/logos/piersight.svg", scale: 0.93,        theme: ["Deep Tech"],                           industry: ["Space Tech"] },
  { name: "Galaxeye",            url: "https://galaxeye.space",         logo: "assets/logos/galaxeye.svg", scale: 1.0,         theme: ["Deep Tech"],                           industry: ["Space Tech"] },
  { name: "Sagar Defence",       url: "https://sagardefence.com",       logo: "assets/logos/sagar-defence.png", scale: 0.84,    theme: ["Deep Tech"],                           industry: ["Aerospace & Defense"] },
];

const THEME_ORDER = ["Digital Acceleration", "AI Portfolio", "Inclusion", "Climate & Sustainability", "Deep Tech"];
const INDUSTRY_ORDER = ["Enterprise", "AI", "Digital Infrastructure", "Fintech", "Skilling & Livelihood", "Healthcare", "Space Tech", "Aerospace & Defense", "Mobility", "Robotics"];

const state = { theme: new Set(), industry: new Set() };

const grid = document.getElementById("logo-grid");
const countEl = document.getElementById("filter-count");
const clearBtn = document.getElementById("filter-clear");
const chipsEl = document.getElementById("active-chips");
const emptyEl = document.getElementById("empty-state");

/* ---------- helpers ---------- */
const CHECK_SVG = '<svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 6.5l2.6 2.6L10 3.5"/></svg>';
const X_SVG = '<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M2 2l8 8M10 2l-8 8"/></svg>';

function countFor(key, value) {
  return COMPANIES.filter(c => c[key].includes(value)).length;
}

function matches(company) {
  const themeOk = state.theme.size === 0 || company.theme.some(t => state.theme.has(t));
  const industryOk = state.industry.size === 0 || company.industry.some(i => state.industry.has(i));
  return themeOk && industryOk;
}

/* ---------- filter menus ---------- */
function buildMenu(key, values) {
  const wrap = document.querySelector(`.filter[data-filter="${key}"]`);
  const menu = wrap.querySelector(".filter-menu");
  const trigger = wrap.querySelector(".filter-trigger");

  values.forEach(value => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "filter-option";
    btn.setAttribute("role", "checkbox");
    btn.setAttribute("aria-checked", "false");
    btn.dataset.value = value;
    btn.innerHTML = `<span class="box">${CHECK_SVG}</span><span class="label">${value}</span><span class="num">${countFor(key, value)}</span>`;
    btn.addEventListener("click", () => {
      if (state[key].has(value)) state[key].delete(value); else state[key].add(value);
      btn.setAttribute("aria-checked", state[key].has(value) ? "true" : "false");
      wrap.classList.toggle("has-selection", state[key].size > 0);
      render();
    });
    menu.appendChild(btn);
  });

  trigger.addEventListener("click", e => {
    e.stopPropagation();
    const open = wrap.classList.contains("is-open");
    closeMenus();
    if (!open) {
      wrap.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
    }
  });
}

function closeMenus() {
  document.querySelectorAll(".filter.is-open").forEach(f => {
    f.classList.remove("is-open");
    f.querySelector(".filter-trigger").setAttribute("aria-expanded", "false");
  });
}
document.addEventListener("click", e => { if (!e.target.closest(".filter")) closeMenus(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenus(); });

function syncMenuState() {
  document.querySelectorAll(".filter").forEach(wrap => {
    const key = wrap.dataset.filter;
    wrap.classList.toggle("has-selection", state[key].size > 0);
    wrap.querySelectorAll(".filter-option").forEach(btn => {
      btn.setAttribute("aria-checked", state[key].has(btn.dataset.value) ? "true" : "false");
    });
  });
}

/* ---------- grid ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    }
  });
}, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

function cellFor(company, index) {
  const a = document.createElement("a");
  a.className = "logo-cell";
  a.href = company.url;
  a.target = "_blank";
  a.rel = "noopener";
  a.setAttribute("aria-label", `${company.name} (opens in a new tab)`);
  a.style.setProperty("--delay", `${Math.min(index, 12) * 40}ms`);
  a.style.setProperty("--s", company.scale || 1);
  a.innerHTML = `
    <img src="${withVersion(company.logo)}" alt="${company.name}" loading="lazy" decoding="async">
    <span class="name" aria-hidden="true">${company.name}</span>
    <span class="line" aria-hidden="true"></span>`;
  return a;
}

/* fill the last row with blank paper cells so the hairline grid ends cleanly */
function columnsNow() {
  /* read the live column count from the grid itself so it always matches the CSS breakpoints */
  const cols = getComputedStyle(grid).gridTemplateColumns.split(" ").filter(Boolean).length;
  return cols || 2;
}
function padGrid(count) {
  grid.querySelectorAll(".logo-filler").forEach(el => el.remove());
  const cols = columnsNow();
  const remainder = count % cols;
  if (remainder === 0) return;
  for (let i = 0; i < cols - remainder; i++) {
    const filler = document.createElement("div");
    filler.className = "logo-filler";
    filler.setAttribute("aria-hidden", "true");
    grid.appendChild(filler);
  }
}
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => padGrid(grid.querySelectorAll(".logo-cell").length), 120);
});

function render() {
  const visible = COMPANIES.filter(matches);

  grid.innerHTML = "";
  visible.forEach((c, i) => {
    const cell = cellFor(c, i);
    grid.appendChild(cell);
    io.observe(cell);
  });
  padGrid(visible.length);

  /* safety net: if the observer never fires (old browsers, background tabs), show everything */
  clearTimeout(render.fallback);
  render.fallback = setTimeout(() => {
    grid.querySelectorAll(".logo-cell:not(.is-visible)").forEach(el => el.classList.add("is-visible"));
  }, 900);

  const n = visible.length;
  countEl.textContent = `${n} ${n === 1 ? "company" : "companies"} shown`;
  emptyEl.hidden = n > 0;

  const anyFilter = state.theme.size + state.industry.size > 0;
  clearBtn.hidden = !anyFilter;
  renderChips();
}

function renderChips() {
  chipsEl.innerHTML = "";
  ["theme", "industry"].forEach(key => {
    state[key].forEach(value => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip";
      chip.innerHTML = `${value}${X_SVG}`;
      chip.setAttribute("aria-label", `Remove ${value} filter`);
      chip.addEventListener("click", () => {
        state[key].delete(value);
        syncMenuState();
        render();
      });
      chipsEl.appendChild(chip);
    });
  });
}

clearBtn.addEventListener("click", () => {
  state.theme.clear();
  state.industry.clear();
  syncMenuState();
  render();
});

/* ---------- marquee ---------- */
function buildMarquee() {
  const track = document.getElementById("marquee-track");
  if (!track) return; /* home page has no marquee strip */
  const pick = COMPANIES.slice(0, 16);
  const html = pick.map(c => `<img src="${withVersion(c.logo)}" alt="" title="${c.name}">`).join("");
  track.innerHTML = html + html; /* duplicated for a seamless loop */
}

/* ---------- header / nav ---------- */
const header = document.getElementById("site-header");
window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
}, { passive: true });

/* ---------- boot ---------- */
buildMenu("theme", THEME_ORDER);
buildMenu("industry", INDUSTRY_ORDER);
buildMarquee();
render();
document.getElementById("year").textContent = new Date().getFullYear();
