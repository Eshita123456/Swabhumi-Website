const fetch = require('node-fetch');

module.exports = async (req, res) => {
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

    const formspreeUrl = process.env.FORMSPREE_URL || 'https://formspree.io/f/YOUR_FORM_ID_HERE';

    const formData = new URLSearchParams();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('email', email || 'Not provided');
    formData.append('budget', budget || 'Not specified');
    formData.append('location', location || 'Not specified');
    formData.append('formType', formType || 'Free Consultation');
    formData.append('_subject', 'New Free Consultation Enquiry');

    try {
        const response = await fetch(formspreeUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData
        });

        if (response.ok) {
            res.status(200).json({ success: true, message: 'success' });
        } else {
            const errorData = await response.text();
            console.error('Formspree error:', errorData);
            res.status(500).json({ error: 'Failed to send email. Please try again.' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Network error. Please try again.' });
    }
};