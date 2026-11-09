# Email and SMS / WhatsApp follow-up templates

The website collects the sign-up and shows the code. The follow-up messages below are sent **by you (or an email tool)**
because a static GitHub Pages site cannot send email or SMS by itself. Fill the `{{…}}` parts from your leads list
(see `leads-setup.md`). Send only to people who agreed to be contacted.

**Merge fields:** `{{first_name}}` (use "there" if unknown) · `{{code}}` (from `data.js`, now ISLAND10) · `{{expiry}}` (the code's expiry date) · `{{checkin}}` · `{{phone}}` · `{{website}}` · `{{review_link}}` (your Google review link)

**Suggested tools:** a free email tool plan (e.g. Brevo or Mailchimp, check the current free limits) for emails; WhatsApp Business broadcast lists for WhatsApp; an SMS provider only if the budget allows. Start manually from the sheet, then automate.

| # | Message | When | Channel |
|---|---|---|---|
| 1 | Welcome + discount code | Within an hour of sign-up | Email and/or SMS/WhatsApp |
| 2 | Reminder if they haven't booked | 5–7 days after sign-up, again about 2 weeks before the code expires | Email, then SMS/WhatsApp |
| 3 | Pre-arrival | 7 days before check-in, short note 1–2 days before | Email, then WhatsApp |
| 4 | Post-stay review request | 2–3 days after check-out | WhatsApp or email |

---

## 1. Welcome email – with the discount code
**Subject:** Welcome to Athens View, {{first_name}} – your code inside

Hi {{first_name}},

Thank you for joining us. Here is your welcome code:

**{{code}}** – 10% off your first direct stay, valid until {{expiry}}.

To use it, book through our website, WhatsApp or email and quote the code. We apply it when we confirm your booking.
Not sure where to start? Our packages (2, 3, 4 and 7 nights) show exactly what is included – message us and we'll shape one around your dates.

Warm regards,
Athens View, K. Guraidhoo
WhatsApp: {{phone}} · {{website}}

*Terms: direct bookings only, one code per guest, not combined with other offers, subject to availability. You can unsubscribe at any time by replying "stop".*

**SMS / WhatsApp version:**
Hi {{first_name}}! Welcome to Athens View. Your code {{code}} gives 10% off your first direct stay until {{expiry}}. Quote it when you book: {{website}}. Reply STOP to opt out.

## 2. Reminder – if they haven't booked
**Subject:** Your Athens View code {{code}} is waiting

Hi {{first_name}},

Your 10% welcome code {{code}} is still valid until {{expiry}}. Planning a trip to the Maldives? Tell us your dates and how many are travelling and we'll suggest a room or package and check availability for you.

Message us on WhatsApp: {{phone}}

**SMS / WhatsApp version:**
Hi {{first_name}}, your Athens View code {{code}} is valid until {{expiry}}. Send us your dates and we'll check availability. Reply STOP to opt out.

## 3. Pre-arrival message (sent after they book)
**Subject:** Getting ready for Guraidhoo, {{first_name}}

Hi {{first_name}},

We're looking forward to welcoming you on {{checkin}}. A few things to help:
- **Getting here:** land at Velana (MLE), take the speedboat to Guraidhoo harbour, and our team will meet you. Please send us your flight number and arrival time.
- **Pack:** light clothes, reef-safe sunscreen, a hat, swimwear and a cover-up for walking through the village.
- **Local island:** it's a local community, so alcohol isn't served; we offer fresh mocktails and coffee on the rooftop.
- **Questions?** WhatsApp us any time: {{phone}}

See you soon,
Athens View

**WhatsApp version (1–2 days before):**
Hi {{first_name}}! See you {{checkin}}. Please send your arrival time so our team can meet you at the harbour. Anything you need before you travel? – Athens View

## 4. Post-stay review request
**Subject:** How was your stay, {{first_name}}?

Hi {{first_name}},

Thank you for staying with us. If you enjoyed your time, a short review helps other travellers find us and helps our small team:

{{review_link}}

If anything wasn't right, please reply and tell us directly – we read every message and want to put it right.

Thank you,
Athens View

**WhatsApp version:**
Hi {{first_name}}, thank you for staying at Athens View! Would you share a short review? {{review_link}} If anything wasn't right, tell us here and we'll fix it. 🌴

---

### Rules to keep to
- Only message people who ticked consent; always include a way to opt out.
- Keep messages short and one action each (book, reply, review).
- Answer every review, good or bad (the audit found no owner replies on any platform).
- Do not promise prices in these messages for packages – confirm them in the conversation.
