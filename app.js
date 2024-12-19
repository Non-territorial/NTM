const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const crypto = require('crypto'); // For validating Telegram initData
const app = express();
require('dotenv').config();

// Port configuration
const PORT = process.env.PORT || 3000;

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://info:J8YwydCuC72vZJEm@ntm.t3mz0.mongodb.net/ntm?retryWrites=true&w=majority';
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully!'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Define Mongoose Schema and Model
const waitingListSchema = new mongoose.Schema({
    email: { type: String, required: true },
    source: { type: String, default: 'general' },
    timestamp: { type: Date, default: Date.now }
});

const WaitingList = mongoose.model('WaitingList', waitingListSchema);

// Middleware to parse incoming JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Telegram-specific configuration
const BOT_TOKEN = process.env.BOT_TOKEN; // Telegram bot token from .env file

// Function to validate Telegram initData
function validateTelegramData(initData) {
    const parsedData = new URLSearchParams(initData);
    const authData = {};
    for (const [key, value] of parsedData.entries()) {
        authData[key] = value;
    }

    const hash = authData['hash'];
    delete authData['hash'];

    const secret = crypto.createHash('sha256').update(BOT_TOKEN).digest();
    const checkString = Object.keys(authData)
        .sort()
        .map((key) => `${key}=${authData[key]}`)
        .join('\n');
    const hmac = crypto
        .createHmac('sha256', secret)
        .update(checkString)
        .digest('hex');

    return hmac === hash;
}

// Middleware to validate Telegram requests
const validateTelegramRequest = (req, res, next) => {
    const initData = req.query.initData;
    if (!initData || !validateTelegramData(initData)) {
        console.error('Invalid or missing initData');
        return res.status(403).send('Invalid Telegram authentication');
    }
    req.telegramUser = JSON.parse(new URLSearchParams(initData).get('user'));
    next();
};

// Middleware for local testing (bypass initData validation)
const allowLocalTesting = (req, res, next) => {
    const initData = req.query.initData;
    if (!initData) {
        console.log("Local testing: No initData provided.");
        req.telegramUser = { first_name: 'Guest' }; // Fallback user for local testing
    } else {
        if (!validateTelegramData(initData)) {
            return res.status(403).send('Invalid Telegram authentication');
        }
        req.telegramUser = JSON.parse(new URLSearchParams(initData).get('user'));
    }
    next();
};

// Root route with Telegram validation (supports local testing)
app.get('/', allowLocalTesting, (req, res) => {
    const user = req.telegramUser;
    res.render('home', { user: { firstName: user.first_name } });
});

// Route to render the waiting list page
app.get('/waiting-list', (req, res) => {
    const source = req.query.source || 'general'; // Default to 'general' if no source
    res.render('waiting-list', { source });
});

// API Route to handle form submissions and save to MongoDB
app.post('/api/waiting-list', async (req, res) => {
    try {
        const { email, source } = req.body;

        // Input validation
        if (!email || !email.includes('@')) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        // Save the entry to MongoDB
        const newEntry = new WaitingList({ email, source });
        await newEntry.save();

        console.log(`New signup saved: ${email}, Source: ${source}`);
        res.status(200).json({ message: 'Successfully added to the waiting list' });
    } catch (err) {
        console.error('Error saving to waiting list:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Additional page routes
const pages = [
    'register',
    'about',
    'roadmap',
    'qa',
    'collect',
    'exhibit',
    'host',
    'join',
    'membership',
    'curators-glasses'
];
pages.forEach((page) => {
    app.get(`/${page}`, (req, res) => res.render(page));
});

// Error handling for 404 (Not Found)
app.use((req, res) => {
    res.status(404).render('404');
});

// Error handling for 500 (Internal Server Error)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
