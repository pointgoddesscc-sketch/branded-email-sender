/**
 * @fileoverview Professional branded email utilities with custom SMTP support
 * @description Core email sending logic for business, marketing and website use.
 *              Works with any SMTP server (Gmail, SendGrid, Mailgun, Amazon SES,
 *              Postmark, or your own self-hosted Postfix / Mailcow / etc.).
 * @requires nodemailer
 * @version 2.0.0
 */

const nodemailer = require('nodemailer');

/**
 * Creates a reusable SMTP transporter from environment variables.
 * Supports both Gmail and any custom SMTP server.
 *
 * Required env vars (recommended):
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
 *
 * Optional:
 *   SMTP_SECURE  (true/false) – defaults to true when port is 465
 *   FROM_EMAIL   – sender address (falls back to SMTP_USER)
 *   FROM_NAME    – display name
 *
 * Legacy Gmail support (still works):
 *   GMAIL_USER + GMAIL_APP_PASSWORD
 *
 * @returns {import('nodemailer').Transporter}
 */
function createTransporter() {
  // Prefer modern custom SMTP variables
  const host = process.env.SMTP_HOST || (process.env.GMAIL_USER ? 'smtp.gmail.com' : null);
  const port = parseInt(process.env.SMTP_PORT || (process.env.GMAIL_USER ? '465' : '0'), 10);
  const user = process.env.SMTP_USER || process.env.GMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

  if (!host || !user || !pass) {
    throw new Error(
      'Missing SMTP configuration. Set SMTP_HOST, SMTP_USER, SMTP_PASS ' +
      '(or legacy GMAIL_USER + GMAIL_APP_PASSWORD)'
    );
  }

  // Auto-detect secure based on port if not explicitly set
  const secure =
    process.env.SMTP_SECURE !== undefined
      ? process.env.SMTP_SECURE === 'true'
      : port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    // Helpful for some self-hosted servers
    tls: {
      // Do not fail on invalid certs (useful for internal / self-signed SMTP)
      rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED !== 'false',
    },
  });
}

/**
 * Generates a modern, responsive branded HTML email template
 * @param {Object} data
 * @param {string} data.title - Main heading
 * @param {string} data.message - Body (can contain HTML)
 * @param {string} [data.buttonText] - CTA button text
 * @param {string} [data.buttonUrl] - CTA button URL
 * @param {string} [data.footerNote] - Footer text
 * @returns {string} Full HTML string
 */
function createBrandedEmail({ title, message, buttonText, buttonUrl, footerNote }) {
  const year = new Date().getFullYear();
  const brand = process.env.FROM_NAME || 'Your Brand';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5; padding: 40px 0;">
    <tr>
      <td align="center">

        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 32px 40px; text-align:center;">
              <h1 style="margin:0; color:#ffffff; font-size:24px; font-weight:700; letter-spacing:-0.5px;">
                ${brand}
              </h1>
              <p style="margin:8px 0 0; color:#bfdbfe; font-size:14px;">
                Business • Marketing • Growth
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px 40px 32px;">
              <h2 style="margin:0 0 16px; color:#111827; font-size:22px; font-weight:600;">
                ${title}
              </h2>

              <div style="color:#374151; font-size:16px; line-height:1.6;">
                ${message}
              </div>

              ${buttonText && buttonUrl ? `
              <table cellpadding="0" cellspacing="0" style="margin:32px 0 0;">
                <tr>
                  <td style="background-color:#2563eb; border-radius:8px;">
                    <a href="${buttonUrl}" 
                       style="display:inline-block; padding:14px 28px; color:#ffffff; text-decoration:none; font-size:16px; font-weight:600;">
                      ${buttonText}
                    </a>
                  </td>
                </tr>
              </table>
              ` : ''}
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <hr style="border:none; border-top:1px solid #e5e7eb; margin:0;">
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px 32px; text-align:center;">
              <p style="margin:0 0 8px; color:#6b7280; font-size:13px;">
                ${footerNote || 'Thank you for choosing us.'}
              </p>
              <p style="margin:0; color:#9ca3af; font-size:12px;">
                © ${year} ${brand}
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `;
}

/**
 * Sends a branded email via the configured SMTP server
 * @param {Object} options
 * @param {string} options.to - Recipient
 * @param {string} options.subject - Subject line
 * @param {string} options.title - Template title
 * @param {string} options.message - Template body (HTML allowed)
 * @param {string} [options.buttonText]
 * @param {string} [options.buttonUrl]
 * @param {string} [options.footerNote]
 * @returns {Promise<object>}
 */
async function sendBrandedEmail(options) {
  const transporter = createTransporter();
  const html = createBrandedEmail(options);

  const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER || process.env.GMAIL_USER;
  const fromName = process.env.FROM_NAME || 'Your Brand';

  const mailOptions = {
    from: `"${fromName}" <${fromEmail}>`,
    to: options.to,
    subject: options.subject,
    text: options.message.replace(/<[^>]*>/g, ''), // plain text fallback
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}

module.exports = {
  createTransporter,
  createBrandedEmail,
  sendBrandedEmail,
};
