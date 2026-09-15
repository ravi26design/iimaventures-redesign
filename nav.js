/* Shared header behaviour: sticky state, mobile menu, dropdowns on touch/keyboard */
(function () {
  const header = document.getElementById("site-header");
  const nav = document.getElementById("site-nav");
  const toggle = document.getElementById("nav-toggle");
  if (!header || !nav || !toggle) return;

  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", open ? "false" : "true");
    nav.classList.toggle("is-open", !open);
    document.body.classList.toggle("nav-open", !open);
  });

  /* dropdown toggles: hover works via CSS on desktop; clicks handle touch + mobile */
  nav.querySelectorAll(".has-dropdown").forEach(item => {
    const btn = item.querySelector(".dropdown-toggle");
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const open = item.classList.contains("is-open");
      nav.querySelectorAll(".has-dropdown.is-open").forEach(i => {
        i.classList.remove("is-open");
        i.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false");
      });
      if (!open) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
    item.addEventListener("keydown", e => {
      if (e.key === "Escape") { item.classList.remove("is-open"); btn.setAttribute("aria-expanded", "false"); }
    });
  });
  document.addEventListener("click", e => {
    if (e.target.closest(".has-dropdown")) return;
    nav.querySelectorAll(".has-dropdown.is-open").forEach(i => {
      i.classList.remove("is-open");
      i.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false");
    });
  });
})();
