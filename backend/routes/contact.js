const express    = require('express');
const router     = express.Router();
const transporter = require('../config/mailer');
const Contact    = require('../models/Contact');
const { contactLimiter } = require('../middleware/rateLimiter');

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// POST /api/contact
router.post('/', contactLimiter, async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim())
    return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    return res.status(400).json({ success: false, message: 'Invalid email address.' });

  try {
    // 1. Save to MongoDB
    await Contact.create({
      name:    name.trim(),
      email:   email.trim(),
      subject: subject?.trim() || 'Portfolio Inquiry',
      message: message.trim(),
      ip:      req.ip,
    });

    const safeName    = escapeHtml(name.trim());
    const safeEmail   = escapeHtml(email.trim());
    const safeSubject = escapeHtml(subject?.trim() || '—');
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, '<br>');
    const firstName   = escapeHtml(name.trim().split(' ')[0]);

    // 2. Notify Venkat
    await transporter.sendMail({
      from:    `"AlphaDevs Portfolio" <${process.env.SMTP_USER}>`,
      to:      process.env.CONTACT_RECEIVER,
      subject: `New Contact: ${subject?.trim() || 'Portfolio Inquiry'} — from ${name.trim()}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#00d4ff,#7c3aed);padding:24px 32px;">
            <h2 style="margin:0;color:#0a0a0a;">New Portfolio Message</h2>
          </div>
          <div style="padding:32px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#a0a0a0;width:100px;">Name</td><td style="padding:8px 0;color:#fff;font-weight:600;">${safeName}</td></tr>
              <tr><td style="padding:8px 0;color:#a0a0a0;">Email</td><td style="padding:8px 0;"><a href="mailto:${safeEmail}" style="color:#00d4ff;">${safeEmail}</a></td></tr>
              <tr><td style="padding:8px 0;color:#a0a0a0;">Subject</td><td style="padding:8px 0;color:#fff;">${safeSubject}</td></tr>
            </table>
            <div style="margin-top:24px;padding:20px;background:#1a1a1a;border-radius:8px;border-left:3px solid #00d4ff;">
              <p style="margin:0;color:#e0e0e0;line-height:1.7;">${safeMessage}</p>
            </div>
            <a href="mailto:${safeEmail}" style="display:inline-block;margin-top:24px;padding:12px 28px;background:linear-gradient(135deg,#00d4ff,#7c3aed);color:#0a0a0a;border-radius:8px;text-decoration:none;font-weight:700;">Reply to ${safeName}</a>
          </div>
        </div>`,
    });

    // 3. Auto-reply to sender
    await transporter.sendMail({
      from:    `"Venkat @ AlphaDevs" <${process.env.SMTP_USER}>`,
      to:      email.trim(),
      subject: `Got your message, ${name.trim().split(' ')[0]}! — AlphaDevs`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#00d4ff,#7c3aed);padding:24px 32px;">
            <h2 style="margin:0;color:#0a0a0a;">Thanks for reaching out!</h2>
          </div>
          <div style="padding:32px;">
            <p style="color:#e0e0e0;line-height:1.8;">Hey ${firstName},</p>
            <p style="color:#e0e0e0;line-height:1.8;">I've received your message and will get back to you within <strong style="color:#00d4ff;">2 hours</strong>.</p>
            <p style="color:#e0e0e0;line-height:1.8;">Check out my work at <a href="https://alphadevs.in" style="color:#00d4ff;">alphadevs.in</a> or ping me on <a href="https://wa.me/916300003773" style="color:#25d366;">WhatsApp</a>.</p>
            <p style="color:#a0a0a0;margin-top:32px;font-size:13px;">— Venkat Makkalwar<br>Founder, AlphaDevs</p>
          </div>
        </div>`,
    });

    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
  }
});

module.exports = router;
