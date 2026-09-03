const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, phone, email, budget, location, formType } = req.body;

    // Validate required fields
    if (!name || !phone) {
        return res.status(400).json({ error: 'Please fill in all required fields.' });
    }

    // Validate email format if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email address.' });
    }

    // Configure SMTP transporter using Gmail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD
        }
    });

    const mailOptions = {
        from: {
            name: 'BHU Infra Developers Website',
            email: process.env.GMAIL_USER
        },
        to: process.env.RECIPIENT_EMAIL || 'rahulsanskar07@gmail.com',
        subject: 'New Free Consultation Enquiry',
        text: `New Website Enquiry\n\n` +
               `Form: ${formType || 'Free Consultation'}\n` +
               `Name: ${name}\n` +
               `Phone: ${phone}\n` +
               `Email: ${email || 'Not provided'}\n` +
               `Budget: ${budget || 'Not specified'}\n` +
               `Location: ${location || 'Not specified'}`,
        replyTo: email ? { name, email } : undefined
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'success' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ error: 'Mailer Error: Failed to send email.' });
    }
};