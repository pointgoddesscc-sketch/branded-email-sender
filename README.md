# Branded Email Sender

Professional **Gmail SMTP** email service with beautiful branded HTML templates.

Built for **websites**, **marketing automation**, and **business contact forms**.

Powered by **Next.js 14** + **Nodemailer**.

---

## Features

- Secure Gmail SMTP (port 465 SSL)
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
3. Add your Gmail credentials:
   ```
   GMAIL_USER=alonejamesowns@gmail.com
   GMAIL_APP_PASSWORD=your-16-char-app-password
   FROM_NAME=Your Brand Name
   ```
4. Install & run:
   ```bash
   npm install
   npm run dev
   ```
5. Open http://localhost:3000 and send a test email.

> **Important**: You must create a Google App Password (not your normal password).
> Go to Google Account → Security → 2-Step Verification → App passwords.

---

## Deploy to Vercel

1. Import this GitHub repository in Vercel
2. Add the same environment variables in the Vercel project settings:
   - `GMAIL_USER`
   - `GMAIL_APP_PASSWORD`
   - `FROM_NAME` (optional)
3. Deploy

Your live URL will be ready in under a minute.

---

## API Usage

```js
// Example fetch from any website or backend
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
│   └── email.js            ← Core Nodemailer + template logic
├── .env.example
├── package.json
└── README.md
```

---

## License

MIT – free for business and marketing use.
