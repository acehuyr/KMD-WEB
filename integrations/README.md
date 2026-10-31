# Receiving website enquiries

The Contact page form (`app/contact/actions.ts`) sends each enquiry to
two places. Set up either or both:

- **Email** — to your inbox, with Reply going straight to the client.
- **Google Sheet** — one row per enquiry. Download it as Excel any time
  (File → Download → Microsoft Excel).

If neither is set up, or both fail, the visitor is told to call or email
instead. Nothing is silently lost.

Settings live in environment variables (listed in `.env.example`):
`.env.local` on your computer, and Vercel's Environment Variables for
the live site.

## 1. Email (info@kmdinterior.com)

Enquiries arrive at **info@kmdinterior.com**, sent from that same
Google Workspace mailbox.

1. Sign in to Google as info@kmdinterior.com.
2. Turn on 2-Step Verification: myaccount.google.com → Security. If
   Google won't let you, a Workspace admin has to allow it first:
   admin.google.com → Security → Authentication → 2-Step Verification →
   "Allow users to turn on 2-Step Verification".
3. Create an App Password: myaccount.google.com/apppasswords → name it
   "KMD website" → copy the 16-character password.
4. In `.env.local`, paste it after `SMTP_PASS=` (spaces optional). The
   other settings are already filled in:
   - `ENQUIRY_TO_EMAIL=info@kmdinterior.com` — where enquiries arrive
     (add more addresses separated by commas)
   - `SMTP_USER=info@kmdinterior.com`

Each email comes from "KMD Interior Website", and pressing Reply
answers the client directly.

kmdinterior.com's MX records must point to Google (in Workspace's setup
steps, or Hostinger → Domains → DNS), or email from outside — including
clients' replies — still goes to the old Hostinger mailbox.

## 2. Google Sheet (Excel)

1. Create a new Google Sheet, e.g. "KMD Website Enquiries".
2. Extensions → Apps Script. Delete what's there and paste in
   `integrations/google-sheet-enquiries.gs`.
3. Change `SECRET` at the top to the value of `ENQUIRY_SHEET_SECRET` in
   `.env.local`. Save.
4. Deploy → New deployment → gear icon → **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
   Click Deploy and allow access when Google asks.
5. Copy the Web app URL (ends in `/exec`) into
   `ENQUIRY_SHEET_WEBHOOK_URL` in `.env.local`.

"Anyone" only means the URL can be called. It still rejects anything
without the secret, and the sheet itself stays private to you.

If you later edit the script, use Deploy → Manage deployments → Edit →
New version. Otherwise the old code keeps running.

## 3. Test locally

Restart `npm run dev`, submit the form on http://localhost:3000/contact,
and check your inbox and the sheet. If something fails, the terminal
running the dev server prints an `[enquiry] …` line explaining why.

## 4. Turn it on for the live site

In Vercel → your project → Settings → Environment Variables, add the
same variables with the same values. Then redeploy (Deployments → ⋯ →
Redeploy). `.env.local` is never uploaded, so the live site only sees
what you put in Vercel.
