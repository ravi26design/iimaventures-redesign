/* IIMA Ventures — Portfolio page behaviour.
   Dedicated to portfolio.html only (the home page keeps its own, unrelated
   COMPANIES list, filters and stories carousel in script.js/home.js — this
   file never touches either). Data lives in portfolio-data.js. */

/* ---------- Theme / Industry filters (same pattern as the home page's) --- */
(function themeIndustryFilter() {
  const state = { theme: new Set(), industry: new Set() };

  const grid = document.getElementById("logo-grid");
  const clearBtn = document.getElementById("filter-clear");
  const chipsEl = document.getElementById("active-chips");
  const emptyEl = document.getElementById("empty-state");

  const CHECK_SVG = '<svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 6.5l2.6 2.6L10 3.5"/></svg>';
  const X_SVG = '<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M2 2l8 8M10 2l-8 8"/></svg>';

  function countFor(key, value) {
    const field = key === "theme" ? "category" : "industry";
    return PORTFOLIO_COMPANIES.filter(c => c[field] === value).length;
  }

  function matches(company) {
    const themeOk = state.theme.size === 0 || state.theme.has(company.category);
    const industryOk = state.industry.size === 0 || state.industry.has(company.industry);
    return themeOk && industryOk;
  }

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

  const DEFAULT_LIMIT = 36;

  function render() {
    const anyFilterActive = state.theme.size + state.industry.size > 0;
    const matched = PORTFOLIO_COMPANIES.filter(matches);
    const visible = anyFilterActive ? matched : matched.slice(0, DEFAULT_LIMIT);

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

    emptyEl.hidden = visible.length > 0;
    clearBtn.hidden = !anyFilterActive;
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

  buildMenu("theme", PORTFOLIO_CATEGORIES);
  buildMenu("industry", PORTFOLIO_INDUSTRIES);
  render();
})();

/* ---------- hero founder-stories carousel (same pattern as the home page's) --- */
(function buildHeroStories() {
  const frame = document.querySelector(".stories-frame");
  const track = document.getElementById("stories-track");
  const viewport = document.getElementById("stories-viewport");
  if (!frame || !track) return;
  let index = 0;

  PORTFOLIO_HERO_STORIES.forEach((s, i) => {
    const slide = document.createElement("article");
    slide.className = "story";
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", `${i + 1} of ${PORTFOLIO_HERO_STORIES.length}`);
    slide.innerHTML = `
      <div class="story-media"><img src="${s.image}" alt="" draggable="false" loading="${i === 0 ? "eager" : "lazy"}" decoding="async"></div>
      <div class="story-body">
        ${s.logo ? `<div class="story-logo" style="--s:${s.scale || 1}"><img src="${s.logo}" alt="${s.name}" draggable="false"></div>` : ""}
        <div>
          <p class="story-text">${s.text}</p>
        </div>
      </div>`;
    track.appendChild(slide);
  });

  function go(i) {
    index = (i + PORTFOLIO_HERO_STORIES.length) % PORTFOLIO_HERO_STORIES.length;
    track.style.transform = `translate3d(${-index * 100}%, 0, 0)`;
    track.querySelectorAll(".story").forEach((s, k) => s.classList.toggle("is-active", k === index));
  }

  document.getElementById("stories-prev").addEventListener("click", () => { go(index - 1); });
  document.getElementById("stories-next").addEventListener("click", () => { go(index + 1); });

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
    setTimeout(() => { wheelLocked = false; }, 3000);
  }, { passive: false });

  go(0);
})();

/* ---------- footer year ---------- */
(function footerYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
})();
