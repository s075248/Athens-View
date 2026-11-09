# Athens View Maldives – website

Static multi-page site (no build step, no backend). Works on GitHub Pages as-is.

## Publish on GitHub Pages
1. Create a repo (e.g. `athens-view`) and upload **everything in this folder** (index.html must be at the repo root).
2. Repo → Settings → Pages → Deploy from a branch → `main` / `(root)` → Save.
3. Your site appears at `https://<username>.github.io/<repo>/` after a minute or two.

## Edit your content (one file)
`assets/js/data.js` holds phone, WhatsApp, email, Instagram, prices, rooms, excursions and FAQ.
Changing it updates cards, booking totals and every contact link on all pages.

## How booking works (no server)
The booking form builds a live quote, then creates a pre-written WhatsApp / email message with a reference
number. Optional: paste a Formspree URL into `formEndpoint` in data.js to also receive requests by email.

## Features and how to set them up
All of these are controlled from `assets/js/data.js` (each block has comments).

| Feature | What to do |
|---|---|
| **Seasonal pricing** | Edit `seasons` (date ranges + multipliers). A room's `price` is its high-season rate; add `rates: { peak: 120, low: 70 }` to a room for exact prices. Room cards, the booking quote and the WhatsApp message all use it. |
| **Booked dates** | Fill `booked` with `[firstNight, checkOutDay]` ranges per room. The booking form then shows a calendar, warns about clashes and blocks the request. Hidden while every list is empty. For a live feed, set `config.bookedFeed` to a URL that returns the same JSON. |
| **Packages** | Edit `packages` (2, 3, 4 and 7 nights). Cards list what is included and have a "Contact us for this package" WhatsApp button plus an email link. **No prices or discounts are shown or calculated** (lecturer's guidance). A "How to get a package" step list sits under them. |
| **Sign-up pop-up** | Edit `signup` in `data.js` (percentage, code, expiry date, delay, terms). It appears once per visitor after `delaySeconds`, or when a desktop visitor moves to leave. It asks for an email or phone number plus a consent tick, then shows the code. Not shown on the booking, contact or privacy pages. The terms also appear on the Privacy page. The offer values are placeholders: confirm them. |
| **Where leads go** | Set `config.formEndpoint` to a Formspree URL (inbox) or a Google Apps Script URL (Google Sheet). See `docs/leads-setup.md`. Until it is set, nothing is stored. |
| **Email / SMS follow-up** | Message templates (welcome with code, reminder, pre-arrival, post-stay review request) are in `docs/follow-up-templates.md`. The site cannot send email or SMS itself: send them from your sheet or an email tool. |
| **Discount code at booking** | The booking form has an optional code field. The code is added to the request and reception applies it; the quote does not change. |
| **Google rating** | `config.googleRating` and `googleReviews` show a real score ("★ 3.8 on Google · 65 reviews") on the home page. Clear them to hide it. Never show a score you cannot prove. |
| **Reviews** | Add real ones to `reviews` (with `source` and `url` to link back) and your profile links under `config.reviewLinks`. Empty list = block hidden (it is empty now). |
| **Email copy of every booking** | Same `config.formEndpoint` as above. Bookings, enquiries and sign-ups are then also sent to you, and guests see a "copy emailed" note. |
| **Analytics** | Create a free site at goatcounter.com and put its code in `config.goatcounter`. Counts page views plus `booking-started`, `booking-submitted`, `signup-shown`, `signup-submitted`, `whatsapp-click`, `call-click`, `email-click`. No cookies. A note appears on the Privacy page automatically. |
| **Languages** | `assets/js/i18n.js` holds a table of English text to Russian / Italian / German / Chinese. Anything not in the table stays English. The translations are AI-written: please have native speakers check them. Visitors can also open any page with `?lang=de`. |
| **Photo viewer** | Click the main photo in a room or excursion pop-up. Swipe / arrow keys / Esc work. |
| **Best time to visit** | Edit `weather` (monthly averages). Shown on the Location page. |
| **Installable / offline app** | `manifest.webmanifest`, `sw.js` and the icons in `assets/img/`. Works on https (GitHub Pages) only. When you add or rename pages, add them to `PRECACHE` in `sw.js` and bump `VERSION`. |

## Placeholders to replace before real use
- Phone / WhatsApp (+960 799 8877), email, Instagram handle, prices, menu items, review quote.
- Photos are AI-generated Stitch images hosted online; download them into `assets/img/` and update the URLs in
  `data.js` and the HTML if you want them permanently hosted with your site.
- Speedboat time (35 min) and transfer price ($35) – confirm with your operator.
- The structured data block at the end of `<head>` in `index.html` repeats the phone, email, address and prices for
  Google. Update it whenever you change those in `data.js`.
- Site URL `https://s075248.github.io/athensview/` is used in canonical links, `robots.txt` and `sitemap.xml`.
  If you move the site or add a custom domain, search-and-replace it.
- Icons: the Material Symbols font loads only the icons listed in `icon_names=` in each page's `<head>`. If you
  use a new icon (e.g. in `data.js`), add its name to that list on every page, keeping it in alphabetical order.

## Files
index, rooms, excursions, dining, location, contact, booking, privacy, 404 (.html) · assets/css · assets/js (data, app, extras, booking, i18n) · assets/img · manifest.webmanifest · sw.js
