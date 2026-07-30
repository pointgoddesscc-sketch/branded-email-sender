# Branded Email Sender

Professional email service with beautiful branded HTML templates.

Works with **any SMTP server** — Gmail, SendGrid, Mailgun, Amazon SES, Postmark, or your own self-hosted Postfix / Mailcow / Docker Mailserver.

Built for **websites**, **marketing automation**, and **business contact forms**.

Powered by **Next.js 14** + **Nodemailer**.

---

## Features

- Full custom SMTP support (any host / port / credentials)
- Secure TLS / SSL
- Modern responsive HTML email template
- Ready-to-use API route (`POST /api/send`)
- Beautiful demo frontend form
- Fully documented JavaScript
- One-click deploy to Vercel

---

## Quick Start (Local)

1. Clone the repo
2. Copy environment file:
   ```bash
   cp .env.example .env.local
   ```
3. Fill in your SMTP details (see examples below)
4. Install & run:
   ```bash
   npm install
   npm run dev
   ```
5. Open http://localhost:3000 and send a test email.

---

## Custom SMTP Setup Examples

### 1. Popular transactional providers

**SendGrid**
```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
FROM_EMAIL=noreply@yourdomain.com
FROM_NAME=Your Brand
```

**Mailgun**
```
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=postmaster@mg.yourdomain.com
SMTP_PASS=your-mailgun-smtp-password
```

**Amazon SES**
```
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-ses-smtp-username
SMTP_PASS=your-ses-smtp-password
```

**Postmark**
```
SMTP_HOST=smtp.postmarkapp.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-postmark-server-token
SMTP_PASS=your-postmark-server-token
```

### 2. Gmail (legacy)
```
GMAIL_USER=alonejamesowns@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
FROM_NAME=Your Brand
```

### 3. Self-hosted SMTP server (Postfix, Mailcow, etc.)
```
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=465          # or 587 for STARTTLS
SMTP_SECURE=true       # false if using port 587
SMTP_USER=noreply@yourdomain.com
SMTP_PASS=strong-password
FROM_EMAIL=noreply@yourdomain.com
FROM_NAME=Your Brand

# If your server uses a self-signed certificate:
SMTP_REJECT_UNAUTHORIZED=false
```

> **Important for self-hosted**: Make sure you have proper SPF, DKIM and DMARC records, and a clean IP reputation. Otherwise emails will land in spam.

---

## Deploy to Vercel

1. Import the GitHub repository in Vercel (or use the existing project)
2. Add the SMTP environment variables in **Settings → Environment Variables**
3. Redeploy

Your live URL will pick up the new configuration immediately.

---

## API Usage

```js
// Example from any website or backend
const res = await fetch('https://your-project.vercel.app/api/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: 'customer@example.com',
    subject: 'Welcome!',
    title: 'Welcome to the team',
    message: '<p>Hi there,</p><p>We are excited to work with you.</p>',
    buttonText: 'Open Dashboard',
    buttonUrl: 'https://yourwebsite.com/dashboard'
  })
});
```

---

## Project Structure

```
├── app/
│   ├── api/send/route.js   ← Email API endpoint
│   ├── layout.js
│   └── page.js             ← Demo form
├── lib/
│   └── email.js            ← Core Nodemailer + template logic (v2 – custom SMTP)
├── .env.example
├── package.json
└── README.md
```

---

## License

MIT – free for business and marketing use.
