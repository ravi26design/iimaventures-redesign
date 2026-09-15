# IIMA Ventures — Greylock-style redesign

Static prototype of the new home page and `/portfolio/` page, modelled on the
layout and effects of greylock.com, set in IIMA Ventures' own Montserrat.

## Run it

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000/ (home) and http://localhost:8000/portfolio.html.

## Files

| File | Purpose |
| --- | --- |
| `index.html` + `home.css` + `home.js` | Home page: hero, logo grid, founder stories carousel, offerings, themes, timeline, quote |
| `portfolio.html` + `script.js` | Portfolio page: Theme / Industry filters and the full logo grid |
| `styles.css` + `nav.js` | Shared system: tokens, the iimaventures.com header (dropdowns, Get Support button, mobile menu), footer, logo grid, red hover line |
| `assets/logos/` | One logo per company, trimmed to its bounding box |
| `assets/img/` | Campus photos from iimaventures.com (placeholders for founder photos) |

## Updating content

- **Portfolio companies:** edit the `COMPANIES` array in `script.js`
  (`name`, `url`, `logo`, `theme[]`, `industry[]`). Filter options come from
  `THEME_ORDER` / `INDUSTRY_ORDER`; counts are computed.
- **Home logo wall:** `HOME_LOGOS` in `home.js` (15 entries fill a 5 x 3 grid).
- **Founder stories:** `STORIES` in `home.js` — add `image` (photo), `logo`,
  `text`, `meta[]`. Slides auto-advance every 5 s, pause on hover, and support
  drag, arrows and dots. Replace the campus placeholders with founder photos.
- **Timeline:** `TIMELINE` in `home.js`; a third value of `true` highlights the year in red.

## Logo guidelines

- Transparent PNG or SVG, no padding. Dark or full-colour on light background.
  White-only logos need recolouring first (see `galaxeye.svg`, `mimo.png`, `navanc.png`).
- Grid cells show every logo inside the same 32px-high, 60%-wide box in greyscale,
  switching to full colour with a red underline on hover. A per-logo `scale`
  value (0.8 to 1.3) in the data balances visual weight, so wide letter-spaced
  marks and compact symbols read at the same size.

## Design notes

- Type: Montserrat (as on iimaventures.com). Display headings Medium 500 at
  Greylock's scale (81–88px desktop), labels Bold 700 uppercase with 0.14em tracking.
- Colours: paper `#ededed`, charcoal `#2d2d24`, hairline `#ddded3`, IIMA red `#ea3732`.
- Effects: blur-in hero, scale-in media block, marquee, staggered logo rise-in,
  red underline on hover, line-draw decorations, fade-to-paper photo stories.
