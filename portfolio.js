/* IIMA Ventures — Portfolio page behaviour.
   Dedicated to portfolio.html only (the home page keeps its own, unrelated
   COMPANIES list and dual Theme/Industry filter in script.js — this file
   never touches that). Company data lives in portfolio-data.js. */

const state = { category: null }; /* null = All */

const grid = document.getElementById("logo-grid");
const tabsEl = document.getElementById("category-tabs");
const countEl = document.getElementById("filter-count");
const emptyEl = document.getElementById("empty-state");

function countFor(cat) {
  return cat ? PORTFOLIO_COMPANIES.filter(c => c.category === cat).length : PORTFOLIO_COMPANIES.length;
}

function matches(company) {
  return !state.category || company.category === state.category;
}

/* ---------- category tabs ---------- */
function buildTabs() {
  const makeTab = (label, value) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cat-tab";
    btn.dataset.value = value || "";
    btn.innerHTML = `<span class="captions">${label}</span><span class="cat-tab-count">${countFor(value)}</span>`;
    btn.setAttribute("aria-pressed", value === state.category ? "true" : "false");
    btn.addEventListener("click", () => {
      state.category = value || null;
      syncTabs();
      render();
    });
    tabsEl.appendChild(btn);
  };
  makeTab("All", null);
  PORTFOLIO_CATEGORIES.forEach(cat => makeTab(cat, cat));
  syncTabs();
}

function syncTabs() {
  tabsEl.querySelectorAll(".cat-tab").forEach(btn => {
    const value = btn.dataset.value || null;
    btn.setAttribute("aria-pressed", value === state.category ? "true" : "false");
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
  const linkable = !!company.url;
  const el = document.createElement(linkable ? "a" : "div");
  el.className = "logo-cell";
  if (linkable) {
    el.href = company.url;
    el.target = "_blank";
    el.rel = "noopener";
    el.setAttribute("aria-label", `${company.name} (opens in a new tab)`);
  } else {
    el.setAttribute("role", "img");
    el.setAttribute("aria-label", company.name);
    el.classList.add("logo-cell--unlinked");
  }
  el.style.setProperty("--delay", `${Math.min(index, 20) * 30}ms`);
  el.innerHTML = `
    <img src="${company.logo}" alt="${company.name}" loading="lazy" decoding="async">
    <span class="name" aria-hidden="true">${company.name}</span>
    ${linkable ? '<span class="line" aria-hidden="true"></span>' : ""}`;
  return el;
}

function columnsNow() {
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
  const visible = PORTFOLIO_COMPANIES.filter(matches);

  grid.innerHTML = "";
  visible.forEach((c, i) => {
    const cell = cellFor(c, i);
    grid.appendChild(cell);
    io.observe(cell);
  });
  padGrid(visible.length);

  clearTimeout(render.fallback);
  render.fallback = setTimeout(() => {
    grid.querySelectorAll(".logo-cell:not(.is-visible)").forEach(el => el.classList.add("is-visible"));
  }, 900);

  const n = visible.length;
  countEl.textContent = `${n} ${n === 1 ? "company" : "companies"} shown`;
  emptyEl.hidden = n > 0;
}

/* ---------- boot ---------- */
buildTabs();
render();
