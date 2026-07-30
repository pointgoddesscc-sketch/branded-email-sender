/**
 * API Route: POST /api/send
 * Sends a branded email using Gmail SMTP
 *
 * Body JSON:
 * {
 *   to: string,
 *   subject: string,
 *   title: string,
 *   message: string (HTML ok),
 *   buttonText?: string,
 *   buttonUrl?: string,
 *   footerNote?: string
 * }
 */

import { sendBrandedEmail } from '../../../lib/email';

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.to || !body.subject || !body.title || !body.message) {
      return Response.json(
        { error: 'Missing required fields: to, subject, title, message' },
        { status: 400 }
      );
    }

    const info = await sendBrandedEmail({
      to: body.to,
      subject: body.subject,
      title: body.title,
      message: body.message,
      buttonText: body.buttonText,
      buttonUrl: body.buttonUrl,
      footerNote: body.footerNote,
    });

    return Response.json({
      success: true,
      messageId: info.messageId,
    });
  } catch (error) {
    console.error('Send email error:', error);
    return Response.json(
      { error: error.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}
