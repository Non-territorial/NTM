import WebApp from '@twa-dev/sdk'

// Initialize the Web App
WebApp.ready();

console.log("NT Museum Telegram Mini App is running!");

// Main render function
function renderHome() {
    const app = document.getElementById('twa-app');
    app.innerHTML = `
        <h1>Welcome to NT Museum</h1>
        <div class="container">
            <div class="button-container">
                <button onclick="showExhibit()">EXHIBIT</button>
                <button onclick="showCollect()">COLLECT</button>
                <button onclick="showHost()">HOST</button>
                <button onclick="showJoin()">JOIN</button>
                <button onclick="showMembership()">MEMBERSHIP</button>
            </div>
            <div class="navigation">
                <a href="#" onclick="showHome()">Home</a>
                <a href="#" onclick="showAbout()">About</a>
                <a href="#" onclick="showRoadmap()">Roadmap</a>
                <a href="#" onclick="showQA()">Q&A</a>
            </div>
        </div>
    `;
}

// Functions to handle different views
function showHome() {
    console.log("Showing home view");
    renderHome();
}

function showExhibit() {
    const app = document.getElementById('twa-app');
    app.innerHTML = `
        <h1>NT Museum Exhibits</h1>
        <div class="container">
            <p>Explore our latest digital exhibits.</p>
            <div class="button-container">
                <button onclick="showHome()">Back to Home</button>
            </div>
        </div>
    `;
}

// ... (other view functions)

// Initialize the main button
WebApp.MainButton
    .setText('Explore Museum')
    .show()
    .onClick(() => {
        showExhibit();
    });

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    renderHome();
});

// Make functions available globally
window.showHome = showHome;
window.showExhibit = showExhibit;
// ... (other global function assignments)

