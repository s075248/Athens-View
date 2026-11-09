# Where the sign-ups go (leads storage)

The welcome-offer pop-up, the contact form, the newsletter box and booking requests all send their details to
**one address you choose** in `assets/js/data.js` → `config.formEndpoint`. Until you set it, nothing is stored:
the pop-up still shows the code, but the visitor's email app opens with a pre-written message instead.

Each sign-up arrives as these fields:

| Field | Example |
|---|---|
| `type` | `signup` (also `booking`, `inquiry`, `newsletter`) |
| `contact` | `guest@example.com` or `+44 7700 900123` |
| `kind` | `email` or `phone` |
| `consent` | `true` (the visitor ticked the consent box) |
| `code` / `offer` / `expires` | `ISLAND10` / `10% first direct stay` / `2027-06-30` |
| `page` / `lang` | `rooms.html` / `en` |
| `at` | `2026-11-12T09:30:00.000Z` (when they signed up) |

## Option A – your inbox (Formspree, simplest)
1. Create a free account at formspree.io and make a new form. Use the owner's email address.
2. Copy the form URL, e.g. `https://formspree.io/f/abcdwxyz`.
3. Paste it into `config.formEndpoint` in `assets/js/data.js`, commit and publish.
4. Submit the pop-up yourself once. The sign-up should reach the inbox (and Formspree's submissions list) within a minute. Check the spam folder the first time.

## Option B – a Google Sheet (best for showing sign-ups arriving, and for exporting to an email tool)
1. Create a Google Sheet. Rename the first tab to `Leads`. In row 1 type: `received`, `type`, `contact`, `kind`, `consent`, `code`, `page`, `lang`.
2. Extensions → Apps Script. Replace the code with:

```js
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads');
  var d = JSON.parse(e.postData.contents);
  sheet.appendRow([new Date(), d.type, d.contact || d.email || '', d.kind || '', d.consent || '', d.code || '', d.page || '', d.lang || '']);
  return ContentService.createTextOutput('ok');
}
```

3. Deploy → New deployment → type **Web app** → Execute as **Me** → Who has access **Anyone** → Deploy. Authorise when asked.
4. Copy the **Web app URL** (it contains `script.google.com`) into `config.formEndpoint`. The site detects this and sends the data the way Google Sheets accepts it.
5. Submit the pop-up once and check that a new row appears.

A sheet gives you something to screenshot for the presentation (rows arriving with dates) and a list you can import into an email tool.

## Keep the consent record
Only message people who ticked the consent box (`consent = true`). Keep their sign-up date. If someone asks to be removed, remove their row and stop messaging them. The wording they agreed to is in the pop-up and on the Privacy page.
