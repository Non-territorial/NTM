const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('your-mongo-db-uri', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define Schemas
const registrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    tonWallet: String,
    location: String,
    role: [String],
    termsAccepted: Boolean,
    type: String,
});

const exhibitorSchema = new mongoose.Schema({
    name: String,
    email: String,
    tonWallet: String,
    workLinks: [String],
    status: { type: String, default: 'pending' }, // Pending approval
    termsAccepted: Boolean,
});

// Define Models
const Registration = mongoose.model('Registration', registrationSchema);
const Exhibitor = mongoose.model('Exhibitor', exhibitorSchema);

// Set up transporter (use your email credentials)
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use the email service of your choice
    auth: {
        user: process.env.EMAIL_USER, // Replace with your email
        pass: process.env.EMAIL_PASS, // Replace with your email password or app password
    },
});

// Function to send approval email
const sendApprovalEmail = (recipientEmail, exhibitorName) => {
    const mailOptions = {
        from: 'info@nonterritorial.foundation',
        to: recipientEmail,
        subject: 'Exhibit Application Approved',
        text: `Dear ${exhibitorName},\n\nYour submission has been approved. Your work will become an NTM Exhibition! To finalize your participation, please submit the work you’d like to exhibit using the link below:\n\n🔗 https://ntm-gallery.xyz/exhibitor-submission\n\nPlease ensure that your submission is completed before 7 days.\n\nIf you have any questions, feel free to contact us at info@nonterritorial.foundation.\n\nBest regards,\nNonterritorial.`,
        html: `<p>Dear <strong>${exhibitorName}</strong>,</p>
               <p>Your submission has been approved. Your work will become an <strong>NTM Exhibition</strong>!</p>
               <p>To finalize your participation, please submit the work you’d like to exhibit using the link below:</p>
               <p><a href="https://ntm-gallery.xyz/exhibitor-submission" target="_blank">🔗 https://ntm-gallery.xyz/exhibitor-submission</a></p>
               <p>Please ensure that your submission is completed before <strong>7 days</strong>.</p>
               <p>If you have any questions, feel free to contact us at <a href="mailto:info@nonterritorial.foundation">info@nonterritorial.foundation</a>.</p>
               <p>Best regards,<br>Nonterritorial</p>`,
    };

    return transporter.sendMail(mailOptions);
};

// Route for general registration
app.post('/api/register', async (req, res) => {
    const newRegistration = new Registration(req.body);
    try {
        await newRegistration.save();
        res.status(201).send('Registration submitted.');
    } catch (error) {
        console.error('Error saving registration:', error);
        res.status(500).send('Error saving registration.');
    }
});

// Route for exhibitor registration
app.post('/api/exhibit', async (req, res) => {
    const newExhibitor = new Exhibitor(req.body);
    try {
        await newExhibitor.save();
        res.status(201).send('Exhibit application submitted. Pending approval.');
    } catch (error) {
        console.error('Error saving exhibitor application:', error);
        res.status(500).send('Error saving exhibitor application.');
    }
});

// Route to approve an exhibitor
app.put('/api/exhibit/approve/:id', async (req, res) => {
    try {
        const exhibitor = await Exhibitor.findById(req.params.id);
        if (!exhibitor) {
            return res.status(404).send('Exhibitor not found.');
        }
        exhibitor.status = 'approved';
        await exhibitor.save();

        // Send approval email
        await sendApprovalEmail(exhibitor.email, exhibitor.name);

        res.status(200).send('Exhibitor approved and email sent.');
    } catch (error) {
        console.error('Error approving exhibitor:', error);
        res.status(500).send('Error approving exhibitor.');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
