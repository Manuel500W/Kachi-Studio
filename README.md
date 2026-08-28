# Kachi Studio — Site (Fixed)

This is your approved editorial design with every bug I found corrected. Structure, content, and design intent are unchanged — this is a bug-fix pass, not a redesign.

## Round 2 — pre-GitHub fixes (this pass)

**The big one: `position: sticky` was silently broken sitewide.** `overflow-x: hidden` on `<html>`/`<body>` (there to stop an unrelated horizontal-scroll issue) has a well-known side effect: it disables `position: sticky` for every descendant, no exceptions. That's the actual cause of both the "04 / What We Build" white gap **and** the section not feeling pinned — it was never pinning. Switched to `overflow-x: clip`, which contains overflow the same way but doesn't carry that side effect. Confirmed live: the section now genuinely pins, steps 01→06 correctly, and the transition into Capabilities has zero gap.

That one change had two knock-on bugs of its own, both fixed:
- A hidden SVG (used for the Instagram icon gradient) expanded to full page width once the overflow band-aid was gone — given explicit `width:0` in its own style, not just its attributes.
- Removing the band-aid also exposed a real, pre-existing mobile bug: CSS Grid items default to `min-width: auto`, so a long word in a project heading was forcing whole rows wider than the screen on phones, instead of wrapping. Fixed by setting `min-width: 0` on the grid items across every section that goes single-column on mobile.

**Other fixes, in the order you listed them:**
1. **Work section cursor + links.** The "View Project" cursor was tied to the entire card (title, description, tags — everywhere), not just the clickable area. Scoped it to just the visual tile. The "Explore chapter" prompt was a plain `<span>` with no destination — clicking did nothing. NEXKART and Maway Logistics now link to their real, live builds; Ember & Co and YINACH Collections don't have confirmed live URLs, so their cards say "Concept build — no live link yet" instead of implying a click that goes nowhere. The "See more on the full portfolio" link was already correctly wired to bymanuel-dev.vercel.app — confirmed live, no change needed.
2. **04 / What We Build.** Covered above — this was the root cause.
3. **05 / Capabilities.** All three columns (not just Engineering) rewritten from bare tech-name bullets to a label + one-line description per item, with a hover accent. "Node.js and APIs" is now "Node.js & APIs — Server logic, authentication, and third-party integrations," same treatment across Design/Engineering/Performance.
4. **Footer socials.** Kept LinkedIn — for a B2B-facing dev agency it's still a real credibility signal even if it's not where you'll get inbound leads, and it costs nothing to include. All four platforms now render as actual brand-colored icon badges (LinkedIn blue, Instagram's real gradient, X in black, WhatsApp green) instead of plain text names.
5. **`IMAGES.md`** — added, see below.

## Round 3 — this pass

**New pages:**
- **`work.html`** — the full portfolio, no longer an external link. "See more on the full portfolio" now goes here instead of bymanuel-dev.vercel.app. Projects live in a `PROJECTS` array at the top of this page's script — copy a block to add one, delete a block to remove one, same pattern as the homepage.
- **`privacy-policy.html`** and **`terms-of-service.html`** — added, linked in every page's footer. Written specifically for a small independent Nigerian web practice, not generic boilerplate — worth a read before it goes live, since I'm not a lawyer and can't tell you these are airtight, just that they're honest and specific rather than templated filler.

**Structural change:** pulled the CSS out of `index.html` into `assets/css/styles.css`, shared by all four pages now. This was necessary once there was more than one page — four copies of the same styles would drift out of sync fast. Verified byte-for-byte the same rendering before and after the move.

**Fixes, in the order you listed them:**
1. **Real project links.** Ember & Co → ember-and-co.vercel.app, YINACH Collections → yinachcollections-store.vercel.app. All four projects now link out correctly.
2. **Hero gradient.** Pushed the blue glow lighter and wider — see "Where things live" below for the exact line.
3. **The SCROLL indicator bug.** Real bug, not a design choice: `.scroll-cue` was a third item dropped into the hero's 2-column grid, so it stretched to that column's full width, and its own internal layout then shoved the word "Scroll" to the left edge and its little animated line to the right edge of that stretched box — same element, two ends of the screen. Fixed to size to its own content and sit bottom-left, matching the left-aligned editorial style used everywhere else on the site (I'd steer away from centering it — centering would be the one centered element on an otherwise consistently left-aligned page).
4. **Portfolio page.** Covered above.
5. **Legal pages.** Covered above.
6. **Services transition.** Slowed down and given a rise — outgoing content now fades and drops slightly, incoming content fades and rises into place, instead of a flat instant cross-fade. This is driven by the same function whether triggered by scrolling (desktop pin) or tapping a step number (mobile), so mobile already benefits from the same improved motion without needing a separate mobile-specific effect.
7. **Capabilities copy.** Removed the remaining tech-stack language from Engineering ("Node.js & APIs," "MongoDB-backed" → "Built From Scratch," "Secure By Default," "Room To Grow") and softened Performance's jargon too ("SEO Foundations," "Core Web Vitals" → "Found Online," "Feels Instant") so none of the three columns require technical knowledge to read as competent. Design didn't need changes — it was already client-friendly.
8. **Logo in the Method box.** The decorative "K" is now your actual mark (cropped and made properly transparent from the image you sent — the first crop attempt still had an opaque white square behind it; fixed before it shipped).
9. **Site icons.** Favicon and apple-touch-icon now use your logo mark. Built a proper Open Graph/Twitter share image (`assets/images/og-cover.jpg`) combining the mark with the site's real typography and hero gradient, rather than just stretching the bare mark into a banner — previously there was no favicon or share image at all.
11. **Full recheck** — see "What I verified" below.

## What I verified (round 3)
- All four pages load with zero console errors and zero failed network requests.
- Every internal link across all four pages (nav, footer, cross-page) resolves to a real page — checked programmatically, not just by eye.
- Sticky pin, project links, and the services transition re-tested live after every change that touched them.
- No horizontal overflow at 1440px, 390px, or 375px, on any of the four pages.
- No-JS and reduced-motion fallbacks re-tested on `index.html` after the CSS/structural changes — content still fully visible in both cases.
```
index.html            — homepage
work.html             — full portfolio (add/remove/edit projects here)
privacy-policy.html   — legal
terms-of-service.html — legal
assets/css/styles.css — shared styles for all four pages
assets/fonts/         — self-hosted Inter variable font
assets/images/        — logo mark, OG/share image
api/contact.js        — Vercel serverless function powering the contact form
package.json          — declares the Resend dependency for the API function
.vscode/settings.json — carried over from your copy, untouched
```

## Where things live (for future tweaks)
- **Hero gradient (the "ash" glow):** `assets/css/styles.css`, the `.hero::before` rule. It's the middle item of a 3-part `background` list — a `radial-gradient(circle at 82% 18%, ...)`. To push it lighter/wider still: raise the first opacity value (currently `.48`) and/or the final size (currently `42rem`). To pull it back toward black: lower both.
- **Services transition timing:** `index.html`, inside `setService()` — the `380` (milliseconds) in `window.setTimeout(...)`. The matching CSS is in `styles.css` under `.service-title, .service-desc, .service-index, .service-ui, .service-plate::after` — the `.5s` transition duration and the `translateY` distance on the `.is-switching` rules just below it.
- **Portfolio entries:** `work.html`, the `PROJECTS` array near the top of the `<script>` tag — same array shape as the homepage's.
- **Legal page text:** `privacy-policy.html` / `terms-of-service.html`, inside `.legal-body` — plain HTML paragraphs, no data arrays, edit directly.

## What was actually broken, and what I changed

**1. Inter was never loading.** The whole design is typeset in "Inter," but nothing in the file loaded it — no `<link>`, no `@font-face`. Every visitor was silently seeing their OS default font (Segoe UI, Arial, etc.) instead of the intended typography. Self-hosted the real Inter **variable** font (not fixed static weights) so the specific in-between weights the design uses (760, 780, 820, 850...) render exactly as authored instead of snapping to the nearest default.

**2. The contact form would have failed on every submission.** `contact.js` sat at the project root. Vercel only auto-detects serverless functions inside an `/api` folder — a file elsewhere is never exposed as a route. `fetch('/api/contact')` would 404 every time once deployed, silently falling back to the "message us on WhatsApp instead" error. Moved the file to `api/contact.js`.

**3. The hero headline was overflowing off-screen.** "Experiences" ran past its column and got clipped by the hero's `overflow: hidden` — you'd have shipped a homepage with a cut-off word as the first thing anyone sees. Rebalanced the hero grid to give the headline more room and brought the type scale down to a size that actually fits, with a safety net (`overflow-wrap`) so this can't silently happen again if the headline text ever changes. Confirmed by rendering it, at both desktop and mobile widths — not just calculated.

**4. Most of the page could go permanently invisible.** Every `.reveal` / `.reveal-group` section (which is most of the page — the statement, work, capabilities, process, about, proof) was hidden via plain CSS with no fallback. If JavaScript ever failed to run — blocked, disabled, or one bug anywhere else in the script — that content would never appear, full stop. I tested this directly with JavaScript turned off: before the fix, most of the page was blank; now everything is visible by default and only gets the hidden-then-reveal treatment once JS actually confirms it's about to animate it in.

**5. TrackPro was still in the portfolio.** You told me directly not to include it. Swapped it back to Ember & Co, matching the project list we'd already settled on.

**6. Several small text labels failed accessibility contrast.** The chapter labels, project numbers, the service index, and the contact form's note link all used the bright blue at 12–13px, which measures 4.2:1 — just under the 4.5:1 minimum for text that size. A darker `--blue-dark` was already defined in your file at 8:1 contrast — it just wasn't being used anywhere. Wired it into the small-text spots; buttons and large type keep the original brighter blue.

## Worth knowing, not changed
- `--sage` and `--clay` are defined in the color tokens but never actually used anywhere in the file. Harmless, just dead weight — not touched since nothing depends on it.
- The contact form's `from` address (`onboarding@resend.dev`) is Resend's shared test domain, which can only deliver to *your own* Resend signup email until you verify a real sending domain. That's already noted in the code — worth knowing before you wonder why a test submission didn't arrive.

## Still open
- The dedicated multi-step "Start a Project" enquiry page from the original master brief (budget/timeline questions) doesn't exist yet — `index.html#contact` is still the same single form used everywhere. Worth a future phase if you want it.
- Social links (LinkedIn, Instagram, X) are still placeholders (`href="#"`) — swap in real URLs once those accounts exist. WhatsApp is already live everywhere.

## Deploying
1. Push this folder to a GitHub repo or import it into Vercel.
2. Add the `RESEND_API_KEY` environment variable (see the comment in `api/contact.js`).
3. Deploy — Vercel will serve the static page and correctly expose `POST /api/contact` now that it's in the right folder.
4. Attach `kachistudio.site` as the custom domain when it's purchased.

## Notes
- No build step required.
- Motion respects `prefers-reduced-motion` throughout.
- Still no real project screenshots — the interface-art panels are CSS-generated placeholders, same as your original. See `IMAGES.md` for exactly where and how to drop real ones in.
