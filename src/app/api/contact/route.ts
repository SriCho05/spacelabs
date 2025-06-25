import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configure these in your .env.local file
const SMTP_EMAIL = process.env.SMTP_EMAIL; // Your email
const SMTP_PASSWORD = process.env.SMTP_PASSWORD; // Your app-specific password
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || SMTP_EMAIL; // Where to send the contact form submissions

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // Or configure your own SMTP server
  auth: {
    user: SMTP_EMAIL,
    pass: SMTP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { email, phone, message } = await req.json();
    if (!email || !phone || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Send email
    await transporter.sendMail({
      from: SMTP_EMAIL,
      to: RECIPIENT_EMAIL,
      subject: 'New Contact Form Submission',
      text: `
New contact form submission:

Email: ${email}
Phone: ${phone}
Message: ${message}

Submitted on: ${new Date().toLocaleString()}
      `,
      html: `
<h2>New contact form submission</h2>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Phone:</strong> ${phone}</p>
<p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
<p><em>Submitted on: ${new Date().toLocaleString()}</em></p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
