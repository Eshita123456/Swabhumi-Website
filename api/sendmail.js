const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    // Allow CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, phone, email, budget, location, formType } = req.body;

    if (!name || !phone) {
        return res.status(400).json({ error: 'Please fill in all required fields.' });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email address.' });
    }

    // These must be set in Vercel Environment Variables
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_PASS;
    const receiverEmail = process.env.RECEIVER_EMAIL || gmailUser;

    if (!gmailUser || !gmailPass) {
        console.error('Missing GMAIL_USER or GMAIL_PASS environment variables');
        return res.status(500).json({ error: 'Server configuration error. Please contact support.' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: gmailUser,
            pass: gmailPass
        }
    });

    const mailOptions = {
        from: `"Swabhumi Website" <${gmailUser}>`,
        to: receiverEmail,
        subject: `New Enquiry - ${formType || 'Free Consultation'} from ${name}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0c97f; border-radius: 8px;">
                <h2 style="color: #8B6914; border-bottom: 2px solid #e0c97f; padding-bottom: 10px;">
                    New Enquiry Received
                </h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr style="background: #fdf8ee;">
                        <td style="padding: 10px; font-weight: bold; width: 35%;">Form Type</td>
                        <td style="padding: 10px;">${formType || 'Free Consultation'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; font-weight: bold;">Name</td>
                        <td style="padding: 10px;">${name}</td>
                    </tr>
                    <tr style="background: #fdf8ee;">
                        <td style="padding: 10px; font-weight: bold;">Phone</td>
                        <td style="padding: 10px;">${phone}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; font-weight: bold;">Email</td>
                        <td style="padding: 10px;">${email || 'Not provided'}</td>
                    </tr>
                    <tr style="background: #fdf8ee;">
                        <td style="padding: 10px; font-weight: bold;">Budget</td>
                        <td style="padding: 10px;">${budget || 'Not specified'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; font-weight: bold;">Location</td>
                        <td style="padding: 10px;">${location || 'Not specified'}</td>
                    </tr>
                </table>
                <p style="color: #888; font-size: 12px; margin-top: 20px;">
                    This email was sent from the Swabhumi website contact form.
                </p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'success' });
    } catch (error) {
        console.error('Email send error:', error.message);
        res.status(500).json({ error: 'Failed to send email. Please try again.' });
    }
};
