# DIVINEDS — Interiors That Inspire

Premium white-and-gold luxury interior website for DIVINEDS (Delhi NCR).

## Structure

- `index.html` — homepage (cinematic video hero + editorial sections + "Spaces in Motion" 3-film showcase + 6 service families)
- `about.html` (full-bleed Unsplash banner hero), `services.html` (full-bleed Unsplash banner hero + 2 click-to-play films + 17 services in 6 families incl. WPC Fluted Panels & European Moulding Design), `projects.html` (full-bleed hero + curated gallery incl. 6 new foyer/bedroom/ceiling/TV-wall photos), `process.html` (execution hero), `contact.html` (compact Unsplash banner hero + EmailJS enquiry form + "Areas We Serve": Noida Sectors 75–79, Greater Noida, Delhi NCR), `consultation.html` (compact kitchen banner + full EmailJS form incl. new service checkboxes)
- `css/styles.css` — full design system (ivory `#F7F4EE`, white, champagne `#D8C7A5`, gold `#B69A61`, charcoal `#292925`)
- `js/main.js` — `SITE_CONFIG` (email `divineds006@gmail.com`, phone `8755252677` / `918755252677`, EmailJS `service_g3s3is3` / `template_4n4qugo` / public key, YouTube channel, preferred/additional areas), mobile nav, reveal, gallery filter + lightbox, service WhatsApp links (17 services incl. WPC + Moulding), contact + consultation forms → EmailJS (WhatsApp fallback links preserved), click-to-play film cards
- `logo.jpg` — supplied brand logo (black/gold, used in header/footer/favicon)
- `herovideobanner.mp4` — homepage hero video (autoplay muted loop playsinline, poster fallback)
- `assets/` — 57 supplied photographs + 10 supporting videos (originals preserved, never renamed)
- `assets/banners/` — 3 Unsplash-sourced premium hero banners (`services-hero.jpg`, `about-hero.jpg`, `contact-hero.jpg`); see `assets/banners/README-banners.md` for source URLs + Unsplash License. Inspiration banners only — never labelled as DIVINEDS projects.
- `assets/posters/` — derived click-to-play posters cropped from client video frames (`film-kitchen.jpg`, `film-kitchen-walkthrough.jpg`, `film-living-ceiling.jpg`)
- `robots.txt`, `sitemap.xml`

## Video inventory (all 11 files inspected frame-by-frame in-browser)

- `herovideobanner.mp4` (root, 1280×720, 10s, H.264) — premium backlit TV-wall living room (same room as photo `1.36.36 AM (1).jpeg`, which is also the video poster/fallback). Homepage hero (autoplay muted loop playsinline, poster + reduced-motion support). Verified `readyState 4`, no errors.
- `assets/...1.36.42 AM (1).mp4` (478×850, 31s) — premium kitchen walkthrough (glass shutters, display lighting). Homepage "Spaces in Motion" showcase, featured film, click-to-play with derived poster.
- `assets/...1.36.35 AM.mp4` (368×496, 23s) — modular kitchen walkthrough. Homepage showcase + Services → Kitchens, click-to-play. (File `1.36.41 AM (2).mp4` is a byte-identical duplicate — not referenced.)
- `assets/...1.36.42 AM.mp4` (368×496, 84s) — living room with chandelier/cove ceiling. Homepage showcase + Services → False Ceilings, click-to-play.
- `assets/...1.36.34 AM.mp4` (478×850, 22s) — entrance corridor with storage. Viewed; subject already covered by stronger photos — left unused.
- `assets/...1.36.41 AM (1).mp4` = `1.36.41 AM.mp4` (duplicates, 368×496, 9s) — bathroom with prominent toilet. Excluded (unsuitable subject for luxury presentation).
- `assets/...1.36.41 AM (3).mp4` (368×496, 17s) — second bathroom, toilet visible. Excluded (same reason).
- `assets/...1.36.43 AM (1).mp4` (478×850, 18s) — renders black frames throughout. Excluded as defective; original kept.
- `assets/...1.36.43 AM.mp4` (480×848, 28s) — unfinished construction site (buckets, raw walls). Excluded (does not meet luxury bar; execution honesty is carried by the kitchen-installation photo on Process).

No video autoplays except the homepage hero. All secondary films are click-to-play with `preload="none"`, controls, and posters.

## Run locally

No build step. Serve the folder over HTTP (required for video + correct paths):

```powershell
cd C:\Users\admin\OneDrive\Desktop\divineds
python3 -m http.server 8000
# open http://localhost:8000/index.html
```

Or use VS Code Live Server / `npx serve`.

## Configuration

All contact details live in `js/main.js` → `SITE_CONFIG`:

- Phone display: `8755252677` → `tel:+918755252677`
- WhatsApp: `https://wa.me/918755252677` + `encodeURIComponent()` per-service messages (17 services)
- Email: `divineds006@gmail.com` → `mailto:`
- YouTube: `https://youtube.com/@divinedsinterior?si=07XDv7aZhD7g5hRN` (footer icon on all pages + homepage social row)
- EmailJS: Service ID `service_g3s3is3`, Template ID `template_4n4qugo`, Public Key `1Fx-2GaeWHg3GEjwx` — contact + consultation forms send via the browser SDK; WhatsApp fallback links retained. IMPORTANT: the template's actual "To Email" recipient must be set to `divineds006@gmail.com` inside the EmailJS dashboard — it cannot be changed from this repo.
- Preferred service areas (Contact page, not offices): Noida Sectors 75–79; additional: Greater Noida, Delhi NCR.
- Two business addresses preserved separately (see Contact page). Map links are Google search URLs built from the exact supplied text.

To change the number/email, edit `SITE_CONFIG` once — every button updates.

## New photos (Nov 2026 client batch — all 9 inspected at pixel level)

- `assets/new 1.jpeg` (960×1280) — living ceiling with moulded border, chandeliers + wainscot walls → Projects gallery (Dining & Ceilings as "Living ceiling · moulded detail"). Minor clutter at frame bottom; ceiling subject is strong.
- `assets/new 2.jpeg` (1080×1045, byte-identical to `assets/service.jpeg`) — foyer with European wall-moulding panels, gold mirror, marble floor, chandelier → Services → European Moulding Design hero + Projects gallery (Entrances as "Foyer · moulded wall panels"). Best moulding evidence on site.
- `assets/new 3.jpeg` = `new 4.jpeg` (duplicates, 780×1040) — TV wall with white + wood fluted panels, floating console → Services → WPC Fluted Panels hero + Projects gallery once as `new 3.jpeg` (Living, "TV wall · fluted panels"). Person reflection + OPPO watermark visible; honest on-site photo, consistent with gallery style. `new 4.jpeg` not referenced (duplicate).
- `assets/new 5.jpeg` (918×1204) — corridor with wall moulding, pendant, marble floor → Projects gallery (Entrances, "Corridor · moulded panels"). Slightly soft but suitable.
- `assets/new 6.jpeg` (1080×589) — luxury bedroom, arched backlit headboard, gold insets → Projects gallery (Living, "Bedroom · backlit feature wall"). Highest finish; appears staged/render-like — captioned descriptively, no project claims.
- `assets/new 7.jpeg` (715×731) — backlit jali scroll ceiling panel → Projects gallery (Dining & Ceilings, "Ceiling · backlit panel").
- `assets/new 8.jpeg` (500×375) — EXCLUDED from gallery: genuine fluted wall samples but very low resolution; would degrade the luxury grid. Original preserved.
- `assets/new 9.jpeg` (1200×1600) — EXCLUDED: shows fluted TV side panels but unfinished (tools, dust, wiring, hand with remote, TV streaming UI) — fails the luxury bar per existing exclusion policy (cf. cricket-TV removal). Original preserved.
- No dedicated `WPC*` / `*moulding*` filenames were supplied, so the above genuine-content matches are used and documented here instead of inventing files.

## Asset map (verified visually)

- Living / TV walls: `1.36.36 AM (1)`, `1.36.36 AM`, `1.36.53 AM (1)`, `1.36.53 AM`, `1.36.53 AM (2)` (promoted, premium beige TV), `1.36.54 AM (1)` (promoted, bedroom marble TV), `1.36.57 AM`, `1.36.58 AM (1)`
- Kitchens: `1.36.36 AM (2)`, `1.36.37 AM (1)` (arch island — filename verified against pixels), `1.36.45 AM (1)`, `1.36.47 AM (1)` (promoted, breakfast counter), `1.36.48 AM (1)`, `1.36.48 AM`, `1.36.49 AM` (promoted, compact beige), `1.36.50/51 AM*`
- Wardrobes / joinery: `1.37.02–1.37.08 AM*` (sliding, hinged, lit niches)
- Dining + ceilings: `1.36.38 AM`, `1.36.39 AM (2)`, `1.36.40 AM` (jali panel), `1.37.00 AM (1)` (cove ceiling)
- Entrances / mandir: `1.36.37 AM.jpeg` (large mandir — filename verified: NOT a kitchen despite ambiguous name), `1.36.38 AM (1)/(2)`, `1.36.39 AM (1)`
- Business-card images (`1.36.44 AM (1)` / `1.36.44 AM`) intentionally NOT in gallery (contact stationery, low resolution)
- No verified office / showroom / electrical / networking / aluminium / wallpaper close-up photos found — those services use honest wording + representative joinery with disclaimers, per brief.

## Excluded from presentation (originals intact in `assets/`)

- Projects gallery: `1.36.52 AM.jpeg` (worker + clutter; kept only on Process where execution is the theme), `1.36.54 AM.jpeg` (tools/dust on floor).
- Never displayed: bathroom videos (toilet prominent), black-frame video (defective), construction-site video, `1.36.59 AM.jpeg` (worker + blue party lights), `1.37.01 AM.jpeg` (red protective film, dusty floor), `1.36.46 AM*` (cluttered unfinished storage), `1.36.56 AM.jpeg` (TV showing cricket — removed from Projects gallery Oct 2026; screen content distracts), near-duplicate spares (`1.36.39 AM.jpeg`, `1.36.39 AM (3).jpeg`, `1.36.45 AM.jpeg`, `1.36.49 AM (1).jpeg`, `1.36.50 AM (1).jpeg`, surplus wardrobes).
- Name/content traps found by pixel inspection: `1.36.37 AM.jpeg` is a mandir (not a kitchen); `1.36.37 AM (1).jpeg` is the kitchen arch.

## Domain-dependent SEO (pending real domain)

- No canonical URLs are hardcoded (no domain invented).
- `sitemap.xml` uses `https://REPLACE-WITH-PRODUCTION-DOMAIN/…` — replace before launch.
- Business-card photo shows `www.devineds.com` (spelling differs from DIVINEDS) — NOT used as canonical; flagged for client confirmation.
- JSON-LD (`HomeAndConstructionBusiness`) on homepage uses only supplied name/phone/email/addresses. No geo, hours, ratings, or priceRange invented.

## Honesty notes

- Gallery labelled "Interior Gallery / Design Inspiration" — no client names, budgets, dates, or results invented.
- About/Process contain no founder names, awards, years, counts, or guarantees.
- Consultation form clearly states: no backend storage; WhatsApp send completes the enquiry.
- Both supplied addresses kept verbatim and separate; neither merged nor corrected.
