const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message, subject } = req.body;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `Giggles Contact: ${subject || 'New Enquiry'} from ${name}`,
      html: `<h2>New Contact Form Submission</h2><p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Phone:</b> ${phone}</p><p><b>Message:</b> ${message}</p>`,
    });
    res.json({ message: 'Message sent successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send message' });
  }
});

module.exports = router;
