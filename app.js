require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const path = require('path');
const mongoose = require('mongoose'); // Import Mongoose
const app = express();

// Load Environment Variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => console.log('✅ MongoDB connected successfully!'));
mongoose.connection.on('error', (err) => console.error('❌ MongoDB connection error:', err.message));
mongoose.connection.on('disconnected', () => console.log('⚠️ MongoDB disconnected.'));

// Define Mongoose Schema and Model
const waitingListSchema = new mongoose.Schema({
    email: { type: String, required: true },
    source: { type: String, default: 'general' },
    timestamp: { type: Date, default: Date.now },
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

// Middleware to check if the request is from Telegram Mini App
const isTelegramWebApp = (req) => {
    return req.get('User-Agent')?.includes('TelegramWebApp') || req.query.twa === 'true';
};

// Route to render the waiting list page
app.get('/waiting-list', (req, res) => {
    const source = req.query.source || 'general'; // Default to 'general' if no source
    res.render('waiting-list', { source });
});

// API Route to Handle Form Submission and Save to MongoDB
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

        console.log(`✅ New signup saved: ${email}, Source: ${source}`);
        res.status(200).json({ message: 'Successfully added to the waiting list' });
    } catch (err) {
        console.error('❌ Error saving to waiting list:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// General Routes
app.get('/', (req, res) => res.render('home'));
app.get('/register', (req, res) => res.render('register'));
app.get('/about', (req, res) => res.render('about'));
app.get('/roadmap', (req, res) => res.render('roadmap'));
app.get('/qa', (req, res) => res.render('qa'));
app.get('/collect', (req, res) => res.render('collect'));
app.get('/exhibit', (req, res) => res.render('exhibit'));
app.get('/host', (req, res) => res.render('host'));
app.get('/join', (req, res) => res.render('join'));
app.get('/membership', (req, res) => res.render('membership'));
app.get('/curators-glasses', (req, res) => res.render('curators-glasses'));

// Error handling for 404 (Not Found)
app.use((req, res) => {
    res.status(404).render('404');
});

// Error handling for 500 (Internal Server Error)
app.use((err, req, res, next) => {
    console.error('❌ Internal Server Error:', err.stack);
    res.status(500).render('500');
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app;
