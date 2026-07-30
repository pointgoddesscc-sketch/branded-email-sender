# Email Deliverability Suite

Complete professional toolkit for branded email sending, DMARC, Google Postmaster Tools, and weekly deliverability monitoring.

**Live URL:** https://branded-email-sender-pink.vercel.app

## Features

- Branded HTML email sending via any SMTP (Gmail, SendGrid, SES, Mailgun, self-hosted)
- Full DMARC Aggregate Report analysis (Python tools)
- Suspicious IP detection
- Slack notifications
- Weekly checklist combining Postmaster Tools + DMARC reports
- Setup guides for SPF, DKIM, DMARC, and Google Postmaster Tools
- One-click Vercel deployment

## Quick Links (Live Site)

- [Send Branded Email](/)
- [Weekly Deliverability Checklist](/checklist)
- [Setup Guides (Postmaster + DMARC)](/guide)

## Python Analysis Tools

The repository and conversation history contain ready-to-use scripts:

- `analyze_dmarc.py` – parse XML or CSV, detect suspicious IPs, Slack + email reports
- `dmarc_weekly_report.py` – full HTML report + Vercel API / SMTP sending

## Environment Variables (Vercel)

```
SMTP_HOST=
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=
SMTP_PASS=
FROM_EMAIL=
FROM_NAME=
```

Legacy Gmail still supported via `GMAIL_USER` + `GMAIL_APP_PASSWORD`.

## License

MIT – free for business and marketing use.
