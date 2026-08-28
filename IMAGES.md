# Adding Real Images — Where & How

Three spots in the site currently use CSS-drawn placeholder "interface art" instead of real screenshots. Everything else (logo, icons, colors) is already final. This guide is copy-paste-exact: find the block, replace it, done.

All images should live in a new `assets/images/` folder (create it next to `assets/fonts/`).

---

## 1. Hero — two floating device mockups

**File names:** `assets/images/hero-primary.jpg` (the large panel) and `assets/images/hero-secondary.jpg` (the small overlapping one). A real screenshot of any finished project works well here — NEXKART or Maway Logistics are good picks since they're real, live builds.

**Recommended size:** 1600×1100px for the primary, 900×900px for the secondary. Both get cropped by the frame, so a busy/detailed screenshot (a dashboard or product grid) reads better than a mostly-empty page.

**Find this** (around line 782):
```html
<div class="hero-device large parallax" data-speed="-0.08">
  <div class="device-bar"><i></i><i></i><i></i></div>
  <div class="interface-art">
    <div class="art-kicker"></div>
    <div class="art-title"></div>
    <div class="art-title"></div>
    <div class="art-grid"><div class="art-panel"></div><div class="art-panel"></div></div>
  </div>
</div>
<div class="hero-device small parallax" data-speed="0.12">
  <div class="device-bar"><i></i><i></i><i></i></div>
  <div class="interface-art">
    <div class="art-kicker"></div>
    <div class="art-title"></div>
    <div class="art-grid"><div class="art-panel"></div><div class="art-panel"></div></div>
  </div>
</div>
```

**Replace with:**
```html
<div class="hero-device large parallax" data-speed="-0.08">
  <div class="device-bar"><i></i><i></i><i></i></div>
  <img src="assets/images/hero-primary.jpg" alt="Kachi Studio project preview" style="width:100%;height:100%;object-fit:cover">
</div>
<div class="hero-device small parallax" data-speed="0.12">
  <div class="device-bar"><i></i><i></i><i></i></div>
  <img src="assets/images/hero-secondary.jpg" alt="Kachi Studio project preview" style="width:100%;height:100%;object-fit:cover">
</div>
```

---

## 2. Selected Work — the screen mockup in each project card

Each of the 4 project cards has its own placeholder. **Find `renderProjects()` in the `<script>` tag** (search for `function renderProjects`). Inside it, the template has this block, repeated once per project via the `${...}` loop:

```html
<div class="screen-stack parallax" data-speed="${index % 2 ? '0.06' : '-0.05'}">
  <div class="screen">
    <div class="screen-top"><i></i><i></i><i></i></div>
    <div class="screen-body">
      <div class="fake-line short"></div>
      <div class="fake-line"></div>
      <div class="fake-line"></div>
      <div class="fake-block"></div>
    </div>
  </div>
  <div class="screen">
    <div class="screen-top"><i></i><i></i><i></i></div>
    <div class="screen-body">
      <div class="fake-line short"></div>
      <div class="fake-line"></div>
      <div class="fake-block"></div>
    </div>
  </div>
</div>
```

**Replace with:**
```html
<div class="screen-stack parallax" data-speed="${index % 2 ? '0.06' : '-0.05'}">
  <div class="screen">
    <div class="screen-top"><i></i><i></i><i></i></div>
    <img src="assets/images/work-${project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.jpg" alt="${project.name} screenshot" style="width:100%;height:100%;object-fit:cover">
  </div>
</div>
```
This drops the second fake screen and uses one real screenshot per project — cleaner than trying to source two angles of the same site. The filename is built from the project name automatically, so:
- NEXKART → `assets/images/work-nexkart.jpg`
- Maway Logistics → `assets/images/work-maway-logistics.jpg`
- Ember & Co → `assets/images/work-ember-co.jpg`
- YINACH Collections → `assets/images/work-yinach-collections.jpg`

**Recommended size:** 1200×1500px (portrait — these tiles are tall). A full-page screenshot of the real site, or a cropped hero-section shot, both work.

---

## 3. What We Build (04) — the service preview panel

This one's shared by all 6 services (the content swaps via JavaScript as you scroll — see `applyServiceContent()` in the script). Find this (around line 861):

```html
<div class="service-ui-inner">
  <div class="service-ui-title" id="serviceUiTitle">Business<br>Websites</div>
  <div class="service-ui-grid"><i></i><i></i><i></i></div>
</div>
```

Realistically, six services swapping to six different photos in sync with scroll is a bigger job than a straight code swap — it needs a 7th field in the `SERVICES` array (an image path per service) and a couple of lines in `applyServiceContent()` to swap a background image the same way it currently swaps the tone color. **Flag this one for a follow-up pass rather than doing it solo** — happy to wire it in once you've got six representative shots picked out (one per service: business site, e-commerce, school/hotel, restaurant/real estate, logistics, custom app).

---

## Quick reference

| Spot | Files | Size |
|---|---|---|
| Hero | `hero-primary.jpg`, `hero-secondary.jpg` | 1600×1100, 900×900 |
| Work (×4) | `work-<project-name>.jpg` | 1200×1500 |
| Services (×6) | needs a code change first — see above | — |

Keep everything as `.jpg` (or `.webp` if you want smaller files) — the CSS already handles rounded corners and shadows on these frames, so the images themselves should just be plain rectangular screenshots.

---

## 4. `work.html` — same images as #2, same kind of edit

The full portfolio page (`work.html`, added since this guide was first written) uses the same 4 project screenshots as the homepage's Work section — the `work-<project-name>.jpg` files from #2 above. Its placeholder block looks like this inside `renderWork()` in the `<script>` tag:

```html
const visualInner = `
  <div class="wc-screen">
    <div class="wc-screen-top"><i></i><i></i><i></i></div>
    <div class="wc-screen-body">
      <div class="wc-fake-line short"></div>
      <div class="wc-fake-line"></div>
      <div class="wc-fake-block"></div>
    </div>
  </div>`;
```

**Replace with:**
```html
const visualInner = `<img src="assets/images/work-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.jpg" alt="${p.name} screenshot" style="width:100%;height:100%;object-fit:cover">`;
```

Same files as #2 — add each screenshot once, both pages use it.
