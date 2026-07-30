/**
 * @fileoverview Professional Gmail SMTP + branded HTML email utilities
 * @description Core email sending logic for business, marketing and website use.
 *              Uses Nodemailer with Gmail SMTP (port 465 SSL).
 * @requires nodemailer
 * @version 1.0.0
 */

const nodemailer = require('nodemailer');

/**
 * Creates a reusable Gmail SMTP transporter
 * @returns {import('nodemailer').Transporter}
 */
function createGmailTransporter() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error('Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variables');
  }

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
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
 * Sends a branded email via Gmail SMTP
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
  const transporter = createGmailTransporter();
  const html = createBrandedEmail(options);

  const mailOptions = {
    from: `"${process.env.FROM_NAME || 'Your Brand'}" <${process.env.GMAIL_USER}>`,
    to: options.to,
    subject: options.subject,
    text: options.message.replace(/<[^>]*>/g, ''), // plain text fallback
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}

module.exports = {
  createGmailTransporter,
  createBrandedEmail,
  sendBrandedEmail,
};
