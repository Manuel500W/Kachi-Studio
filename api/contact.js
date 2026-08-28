// Vercel serverless function — handles POST /api/contact
// Emails form submissions to kachistudio@outlook.com using Resend.
//
// Setup:
//   1. npm install resend
//   2. Create a Resend account (resend.com), verify a sending domain
//      (or use their shared onboarding domain while testing).
//   3. In the Vercel project settings, add an environment variable:
//        RESEND_API_KEY = <your Resend API key>
//   4. Deploy — Vercel automatically turns this file into POST /api/contact.

const { Resend } = require('resend');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, contact, project, message } = req.body || {};

  if (!name || !contact || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'Kachi Studio Website <onboarding@resend.dev>', // swap for a verified sending domain once set up
      to: 'kachistudio@outlook.com',
      reply_to: contact,
      subject: `New project inquiry from ${name}`,
      text: `Name: ${name}\nContact: ${contact}\nProject type: ${project || 'Not specified'}\n\nMessage:\n${message}`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
};
