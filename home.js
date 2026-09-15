/* IIMA Ventures — Home page behaviour */

/* ---------- data ---------- */
const STORIES = [
  { name: "Agnikul Cosmos", logo: "assets/logos/agnikul.png", scale: 1.3, url: "https://agnikul.in", image: "assets/img/home-1.jpg",
    text: "A pioneer in India’s private space sector, building the world’s largest single-piece 3D-printed rocket engine.",
    meta: ["Deep tech", "Space tech", "Chennai"] },
  { name: "Tookitaki", logo: "assets/logos/tookitaki.png", scale: 1.1, url: "https://tookitaki.ai", image: "assets/img/home-2.jpg",
    text: "The world’s leading anti-financial-crime platform for fintechs and banks.",
    meta: ["AI portfolio", "Fintech", "Singapore · Bengaluru"] },
  { name: "5C Network", logo: "assets/logos/5c-network.png", scale: 0.9, url: "https://5cnetwork.com", image: "assets/img/home-4.jpg",
    text: "India’s largest and most trusted AI-assisted radiology interpretation platform.",
    meta: ["AI portfolio", "Healthcare", "Bengaluru"] },
  { name: "GUVI", logo: "assets/logos/guvi.png", scale: 1.15, url: "https://guvi.in", image: "assets/img/home-3.jpg",
    text: "India’s first skilling platform for technology education in multiple Indian languages.",
    meta: ["Digital acceleration", "Skilling & livelihood", "Chennai"] },
  { name: "Sagar Defence", logo: "assets/logos/sagar-defence.png", scale: 0.85, url: "https://sagardefence.com", image: "assets/img/home-1.jpg",
    text: "Advancing India’s maritime security through autonomous technology innovations.",
    meta: ["Deep tech", "Aerospace & defence", "Mumbai"] },
];

/* ---------- stories carousel ---------- */
(function buildStories() {
  const track = document.getElementById("stories-track");
  const dots = document.getElementById("stories-dots");
  const viewport = document.getElementById("stories-viewport");
  let index = 0;
  let timer;

  STORIES.forEach((s, i) => {
    const slide = document.createElement("article");
    slide.className = "story";
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", `${i + 1} of ${STORIES.length}`);
    slide.innerHTML = `
      <div class="story-media"><img src="${s.image}" alt="" draggable="false" loading="${i === 0 ? "eager" : "lazy"}" decoding="async"></div>
      <div class="story-body">
        <div class="story-logo"><img src="${s.logo}" alt="${s.name}" draggable="false"></div>
        <div>
          <p class="story-text">${s.text}</p>
          <div class="story-meta">
            ${s.meta.map(m => `<span class="body">${m}</span>`).join('<span class="dot" aria-hidden="true"></span>')}
            <span class="dot" aria-hidden="true"></span>
            <a class="story-link body" href="${s.url}" target="_blank" rel="noopener">Visit ${s.name}</a>
          </div>
        </div>
      </div>`;
    track.appendChild(slide);

    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "stories-dot";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", `Go to story ${i + 1}`);
    dot.addEventListener("click", () => { go(i); restart(); });
    dots.appendChild(dot);
  });

  function go(i) {
    index = (i + STORIES.length) % STORIES.length;
    track.style.transform = `translate3d(${-index * 100}%, 0, 0)`;
    track.querySelectorAll(".story").forEach((s, k) => s.classList.toggle("is-active", k === index));
    dots.querySelectorAll(".stories-dot").forEach((d, k) => d.setAttribute("aria-selected", k === index ? "true" : "false"));
  }
  function restart() {
    clearInterval(timer);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer = setInterval(() => go(index + 1), 5000); /* auto-advance every 5s */
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
  viewport.addEventListener("mouseenter", () => clearInterval(timer));
  viewport.addEventListener("mouseleave", restart);

  go(0);
  restart();
})();

/* ---------- scroll reveals ---------- */
(function reveals() {
  const targets = document.querySelectorAll(".reveal-on-scroll, .builders-lines, .quote-lines");
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add(entry.target.classList.contains("logo-cell") ? "is-visible" : "is-inview");
      io.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });
  targets.forEach(t => io.observe(t));

  /* safety net for environments where the observer never fires */
  setTimeout(() => {
    document.querySelectorAll(".reveal-on-scroll:not(.is-inview)").forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-inview");
    });
  }, 1500);

  /* hero media: grows from ~68% to 100% width over the first stretch of scrolling */
  const media = document.getElementById("hero-media");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let ticking = false;
  const updateMedia = () => {
    ticking = false;
    if (reduce) { media.style.setProperty("--p", 1); return; }
    /* 0 at the top of the page, 1 once the block has scrolled up to sit just under the header */
    const header = document.getElementById("site-header");
    const headerH = header ? header.getBoundingClientRect().height : 0;
    const offsetTop = media.getBoundingClientRect().top + window.scrollY;
    const travel = Math.max(120, offsetTop - headerH - 24);
    const p = Math.min(1, Math.max(0, window.scrollY / travel));
    media.style.setProperty("--p", p.toFixed(3));
  };
  const onScrollMedia = () => { if (!ticking) { ticking = true; requestAnimationFrame(updateMedia); } };
  window.addEventListener("scroll", onScrollMedia, { passive: true });
  window.addEventListener("resize", onScrollMedia);
  updateMedia();
})();

/* ---------- header / nav ---------- */
(function header() {
  const header = document.getElementById("site-header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  document.getElementById("year").textContent = new Date().getFullYear();
})();
