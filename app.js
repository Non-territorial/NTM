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

// Telegram Mini App route - must come before other routes
app.get('/twa', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'twa-index.html'));
});

// Serve the bundled JavaScript
app.get('/js/twa-bundle.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'js', 'twa-bundle.js'));
});

// Your existing routes
app.get('/', (req, res) => {
    res.render('home');
});

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

// Error handling for 404
app.use((req, res, next) => {
    if (req.path.startsWith('/twa')) {
        res.sendFile(path.join(__dirname, 'public', 'twa-index.html'));
    } else {
        res.status(404).send("Sorry, that page doesn't exist!");
    }
});

// Handle server errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500');
});

module.exports = app;

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

