const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the views directory explicitly
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Define routes
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

// Error handling middleware
app.use((req, res, next) => {
    res.status(404).send("Sorry, that page doesn't exist!");
});

app.listen(port, () => {
    console.log(`NT Museum app listening at http://localhost:${port}`);
});

