/* IIMA Ventures — Home page behaviour */

/* ---------- data ----------
   11 founder stories, cycling through the 4 campus photos we have on hand
   until real founder/company photography replaces them (see README). */
const STORIES = [
  { name: "Agnikul Cosmos", logo: "assets/logos/agnikul.png", url: "https://agnikul.in", image: "assets/img/home-1.jpg",
    text: "A pioneer in India’s private space sector, building the world’s largest single-piece 3D-printed rocket engine.",
    meta: ["Deep tech", "Space tech", "Chennai"] },
  { name: "Tookitaki", logo: "assets/logos/tookitaki.png", url: "https://tookitaki.ai", image: "assets/img/home-2.jpg",
    text: "The world’s leading anti-financial-crime platform for fintechs and banks.",
    meta: ["AI portfolio", "Fintech", "Singapore · Bengaluru"] },
  { name: "5C Network", logo: "assets/logos/5c-network.png", url: "https://5cnetwork.com", image: "assets/img/home-4.jpg",
    text: "India’s largest and most trusted AI-assisted radiology interpretation platform.",
    meta: ["AI portfolio", "Healthcare", "Bengaluru"] },
  { name: "GUVI", logo: "assets/logos/guvi.png", url: "https://guvi.in", image: "assets/img/home-3.jpg",
    text: "India’s first skilling platform for technology education in multiple Indian languages.",
    meta: ["Digital acceleration", "Skilling & livelihood", "Chennai"] },
  { name: "Kaleidofin", logo: "assets/logos/kaleidofin.png", url: "https://kaleidofin.com", image: "assets/img/home-1.jpg",
    text: "AI-driven savings, credit and insurance products built for India’s informal and underserved workforce.",
    meta: ["Digital acceleration", "Fintech", "Chennai"] },
  { name: "Unbox Robotics", logo: "assets/logos/unbox.png", url: "https://unboxrobotics.com", image: "assets/img/home-2.jpg",
    text: "Grid-based autonomous sortation robots that cut warehouse and last-mile fulfilment costs.",
    meta: ["AI portfolio", "Robotics", "Pune"] },
  { name: "Riskcovry", logo: "assets/logos/riskcovry.svg", url: "https://riskcovry.com", image: "assets/img/home-3.jpg",
    text: "Insurance-as-a-service infrastructure that lets any business embed and sell insurance in minutes.",
    meta: ["Digital acceleration", "Fintech", "Mumbai"] },
  { name: "GalaxEye", logo: "assets/logos/galaxeye.svg", url: "https://galaxeye.space", image: "assets/img/home-4.jpg",
    text: "Dual-sensor SAR and optical satellites delivering all-weather, day-and-night Earth imagery.",
    meta: ["Deep tech", "Space tech", "Bengaluru"] },
  { name: "PierSight", logo: "assets/logos/piersight.svg", url: "https://piersight.space", image: "assets/img/home-1.jpg",
    text: "SAR satellite constellations built for round-the-clock maritime domain awareness.",
    meta: ["Deep tech", "Space tech", "Ahmedabad"] },
  { name: "The E-Plane Company", logo: "assets/logos/eplane.png", url: "https://eplane.ai", image: "assets/img/home-2.jpg",
    text: "Electric flying vehicles engineered to make short-haul air mobility quiet, clean and affordable.",
    meta: ["Deep tech", "Aerospace & defence", "Chennai"] },
  { name: "Sagar Defence", logo: "assets/logos/sagar-defence.png", url: "https://sagardefence.com", image: "assets/img/home-4.jpg",
    text: "Advancing India’s maritime security through autonomous technology innovations.",
    meta: ["Deep tech", "Aerospace & defence", "Mumbai"] },
];

/* ---------- stories carousel ---------- */
(function buildStories() {
  const AUTO_MS = 2000; /* auto-advance interval */
  const frame = document.querySelector(".stories-frame");
  const track = document.getElementById("stories-track");
  const counter = document.getElementById("stories-count");
  const viewport = document.getElementById("stories-viewport");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
  });

  function go(i) {
    index = (i + STORIES.length) % STORIES.length;
    track.style.transform = `translate3d(${-index * 100}%, 0, 0)`;
    track.querySelectorAll(".story").forEach((s, k) => s.classList.toggle("is-active", k === index));
    if (counter) counter.textContent = `${String(index + 1).padStart(2, "0")} / ${STORIES.length}`;
  }
  function restart() {
    clearInterval(timer);
    frame.classList.remove("is-paused");
    if (reduceMotion) return;
    timer = setInterval(() => go(index + 1), AUTO_MS);
  }
  function pause() {
    clearInterval(timer);
    frame.classList.add("is-paused");
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
  viewport.addEventListener("mouseenter", pause);
  viewport.addEventListener("mouseleave", restart);

  /* mouse-wheel / trackpad scroll while hovering the section advances slides
     instead of scrolling the page — one slide per gesture, with a short
     cooldown so a single trackpad swipe doesn't skip several slides at once */
  let wheelLocked = false;
  viewport.addEventListener("wheel", e => {
    e.preventDefault();
    if (wheelLocked) return;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 8) return;
    wheelLocked = true;
    go(index + (delta > 0 ? 1 : -1));
    restart();
    setTimeout(() => { wheelLocked = false; }, 3000);
  }, { passive: false });

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

  /* hero media: grows from ~82% to 100% width over the first stretch of scrolling.
     Styles are written inline (not via a CSS variable) so every browser repaints reliably. */
  const media = document.getElementById("hero-media");
  const mediaImg = media ? media.querySelector("img") : null;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const INSET = 9;   /* % clipped from each side at the top of the page */
  const ZOOM = 0.1;  /* extra image scale at the top of the page */
  let lastP = -1;
  const applyMedia = p => {
    if (p === lastP) return;
    lastP = p;
    media.style.clipPath = `inset(0 ${(INSET * (1 - p)).toFixed(2)}% round 2px)`;
    media.style.webkitClipPath = media.style.clipPath;
    if (mediaImg) mediaImg.style.transform = `scale(${(1 + ZOOM * (1 - p)).toFixed(4)})`;
  };
  const updateMedia = () => {
    if (!media) return;
    if (reduce) { applyMedia(1); return; }
    const header = document.getElementById("site-header");
    const headerH = header ? header.getBoundingClientRect().height : 0;
    const offsetTop = media.getBoundingClientRect().top + window.scrollY;
    const travel = Math.max(120, offsetTop - headerH - 24);
    const p = Math.min(1, Math.max(0, window.scrollY / travel));
    applyMedia(Math.round(p * 1000) / 1000);
  };
  window.addEventListener("scroll", updateMedia, { passive: true });
  window.addEventListener("resize", updateMedia);
  window.addEventListener("load", updateMedia);
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
