/* IIMA Ventures — Portfolio page behaviour.
   Dedicated to portfolio.html only (the home page keeps its own, unrelated
   COMPANIES list, filters and stories carousel in script.js/home.js — this
   file never touches either). Data lives in portfolio-data.js. */

/* ---------- category tabs (no "All"; first category selected by default) --- */
(function categoryFilter() {
  const state = { category: PORTFOLIO_CATEGORIES[0] };

  const grid = document.getElementById("logo-grid");
  const tabsEl = document.getElementById("category-tabs");
  const countEl = document.getElementById("filter-count");

  function countFor(cat) {
    return PORTFOLIO_COMPANIES.filter(c => c.category === cat).length;
  }

  function buildTabs() {
    PORTFOLIO_CATEGORIES.forEach(cat => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cat-tab";
      btn.dataset.value = cat;
      btn.innerHTML = `<span class="captions">${cat}</span><span class="cat-tab-count">${countFor(cat)}</span>`;
      btn.setAttribute("aria-pressed", cat === state.category ? "true" : "false");
      btn.addEventListener("click", () => {
        state.category = cat;
        syncTabs();
        render();
      });
      tabsEl.appendChild(btn);
    });
  }

  function syncTabs() {
    tabsEl.querySelectorAll(".cat-tab").forEach(btn => {
      btn.setAttribute("aria-pressed", btn.dataset.value === state.category ? "true" : "false");
    });
  }

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
    el.style.setProperty("--s", company.scale || 1);
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
    const visible = PORTFOLIO_COMPANIES.filter(c => c.category === state.category);

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
  }

  buildTabs();
  render();
})();

/* ---------- hero founder-stories carousel (same pattern as the home page's) --- */
(function buildHeroStories() {
  const AUTO_MS = 2000;
  const frame = document.querySelector(".stories-frame");
  const track = document.getElementById("stories-track");
  const counter = document.getElementById("stories-count");
  const viewport = document.getElementById("stories-viewport");
  if (!frame || !track) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let index = 0;
  let timer;

  PORTFOLIO_HERO_STORIES.forEach((s, i) => {
    const slide = document.createElement("article");
    slide.className = "story";
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", `${i + 1} of ${PORTFOLIO_HERO_STORIES.length}`);
    slide.innerHTML = `
      <div class="story-media"><img src="${s.image}" alt="" draggable="false" loading="${i === 0 ? "eager" : "lazy"}" decoding="async"></div>
      <div class="story-body">
        <div class="story-logo" style="--s:${s.scale || 1}"><img src="${s.logo}" alt="${s.name}" draggable="false"></div>
        <div>
          <p class="story-text">${s.text}</p>
          <div class="story-meta">
            ${s.meta.map(m => `<span class="body">${m}</span>`).join('<span class="dot" aria-hidden="true"></span>')}
            <span class="dot" aria-hidden="true"></span>
            ${s.url ? `<a class="story-link body" href="${s.url}" target="_blank" rel="noopener">Visit ${s.name}</a>` : ""}
          </div>
        </div>
      </div>`;
    track.appendChild(slide);
  });

  function go(i) {
    index = (i + PORTFOLIO_HERO_STORIES.length) % PORTFOLIO_HERO_STORIES.length;
    track.style.transform = `translate3d(${-index * 100}%, 0, 0)`;
    track.querySelectorAll(".story").forEach((s, k) => s.classList.toggle("is-active", k === index));
    if (counter) counter.textContent = `${String(index + 1).padStart(2, "0")} / ${PORTFOLIO_HERO_STORIES.length}`;
  }
  function restart() {
    clearInterval(timer);
    if (reduceMotion) return;
    timer = setInterval(() => go(index + 1), AUTO_MS);
  }

  document.getElementById("stories-prev").addEventListener("click", () => { go(index - 1); restart(); });
  document.getElementById("stories-next").addEventListener("click", () => { go(index + 1); restart(); });

  /* pointer drag */
  let startX = 0, dx = 0, dragging = false;
  viewport.addEventListener("pointerdown", e => {
    dragging = true; startX = e.clientX; dx = 0;
    track.classList.add("is-dragging");
    viewport.setPointerCapture(e.pointerId);
  });
  viewport.addEventListener("pointermove", e => {
    if (!dragging) return;
    dx = e.clientX - startX;
    track.style.transform = `translate3d(calc(${-index * 100}% + ${dx}px), 0, 0)`;
  });
  const endDrag = () => {
    if (!dragging) return;
    dragging = false;
    track.classList.remove("is-dragging");
    if (Math.abs(dx) > 60) go(index + (dx < 0 ? 1 : -1)); else go(index);
    restart();
  };
  viewport.addEventListener("pointerup", endDrag);
  viewport.addEventListener("pointercancel", endDrag);
  viewport.addEventListener("pointerleave", endDrag);

  /* horizontal scroll gesture navigates; a plain vertical scroll is left
     completely alone so the page always scrolls normally under the cursor */
  let wheelLocked = false;
  viewport.addEventListener("wheel", e => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault();
    if (wheelLocked) return;
    if (Math.abs(e.deltaX) < 8) return;
    wheelLocked = true;
    go(index + (e.deltaX > 0 ? 1 : -1));
    restart();
    setTimeout(() => { wheelLocked = false; }, 3000);
  }, { passive: false });

  go(0);
  restart();
})();

/* ---------- footer year ---------- */
(function footerYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
})();
