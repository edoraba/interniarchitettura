import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { Resend } from 'resend';

import { contactSchema } from '@/lib/schemas/contact';

// Rate limiting: max 3 requests per IP every 10 minutes
const RATE_LIMIT_WINDOW = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 3;

const rateMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

function buildEmailHtml(name: string, email: string, message: string) {
  const escapedMessage = message
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br />');

  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#fafaf8;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fafaf8;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="padding:0 0 32px 0;border-bottom:1px solid #e0e0de;">
              <p style="margin:0;font-size:14px;letter-spacing:0.2em;color:#972a90;text-transform:uppercase;font-weight:300;">
                Ferro &amp; Salamano Architetti
              </p>
            </td>
          </tr>
          <!-- Title -->
          <tr>
            <td style="padding:32px 0 24px 0;">
              <h1 style="margin:0;font-size:22px;font-weight:300;color:#1a1a1a;letter-spacing:0.02em;">
                Nuovo messaggio dal sito
              </h1>
            </td>
          </tr>
          <!-- Info -->
          <tr>
            <td style="padding:0 0 24px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #efefed;">
                    <p style="margin:0 0 4px 0;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:#a8a8a6;font-family:Arial,Helvetica,sans-serif;">
                      Nome
                    </p>
                    <p style="margin:0;font-size:15px;color:#1a1a1a;font-weight:400;">
                      ${name}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #efefed;">
                    <p style="margin:0 0 4px 0;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:#a8a8a6;font-family:Arial,Helvetica,sans-serif;">
                      Email
                    </p>
                    <p style="margin:0;font-size:15px;color:#1a1a1a;">
                      <a href="mailto:${email}" style="color:#972a90;text-decoration:none;">${email}</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Message -->
          <tr>
            <td style="padding:0 0 32px 0;">
              <p style="margin:0 0 8px 0;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:#a8a8a6;font-family:Arial,Helvetica,sans-serif;">
                Messaggio
              </p>
              <div style="padding:20px;background-color:#f7f7f5;border-left:3px solid #972a90;font-size:14px;line-height:1.7;color:#3d3d3b;">
                ${escapedMessage}
              </div>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td style="padding:0 0 32px 0;" align="center">
              <a href="mailto:${email}" style="display:inline-block;padding:12px 32px;border:1px solid #1a1a1a;color:#1a1a1a;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-weight:400;">
                Rispondi
              </a>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 0 0 0;border-top:1px solid #e0e0de;">
              <p style="margin:0;font-size:11px;color:#a8a8a6;font-family:Arial,Helvetica,sans-serif;text-align:center;">
                Inviato dal modulo di contatto di interniarchitettura.it
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 503 }
      );
    }

    // Rate limiting by IP
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot: if the hidden field is filled, silently succeed
    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
    }

    const { name, email, message } = result.data;
    const resend = new Resend(process.env.RESEND_API_KEY);

    const [firstName, ...rest] = name.split(' ');
    const lastName = rest.join(' ') || undefined;

    await Promise.all([
      resend.emails.send({
        from: 'Interni Architettura <onboarding@resend.dev>',
        to: 'interni2architettura@gmail.com',
        replyTo: email,
        subject: `Nuovo messaggio da ${name} - interniarchitettura.it`,
        html: buildEmailHtml(name, email, message),
        text: `Nome: ${name}\nEmail: ${email}\n\nMessaggio:\n${message}`,
      }),
      process.env.RESEND_AUDIENCE_ID
        ? resend.contacts.create({
            audienceId: process.env.RESEND_AUDIENCE_ID,
            email,
            firstName,
            lastName,
            unsubscribed: false,
          })
        : Promise.resolve(),
    ]);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
