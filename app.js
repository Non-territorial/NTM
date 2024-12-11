const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to check if the request is from Telegram Mini App
const isTelegramWebApp = (req) => {
    return req.get('User-Agent').includes('TelegramWebApp') || req.query.twa === 'true';
};

// Root route handler
app.get('/', (req, res) => {
    if (isTelegramWebApp(req)) {
        res.sendFile(path.join(__dirname, 'public', 'twa-index.html'));
    } else {
        res.render('home');
    }
});

// Your existing routes
app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/roadmap', (req, res) => {
    res.render('roadmap');
});

app.get('/qa', (req, res) => {
    res.render('qa');
});

app.get('/collect', (req, res) => {
    res.render('collect');
});

app.get('/exhibit', (req, res) => {
    res.render('exhibit');
});

app.get('/host', (req, res) => {
    res.render('host');
});

app.get('/join', (req, res) => {
    res.render('join');
});

app.get('/membership', (req, res) => {
    res.render('membership');
});

app.get('/curators-glasses', (req, res) => {
    res.render('curators-glasses');
});

// Catch-all route for Telegram Mini App
app.get('*', (req, res, next) => {
    if (isTelegramWebApp(req)) {
        res.sendFile(path.join(__dirname, 'public', 'twa-index.html'));
    } else {
        next();
    }
});

// Error handling for 404
app.use((req, res) => {
    res.status(404).render('404');
});

// Handle server errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500');
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

module.exports = app;

