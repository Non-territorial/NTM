import WebApp from '@twa-dev/sdk'

// Initialize the Web App
WebApp.ready();

console.log("NT Museum Telegram Mini App is running!");

// Main render function
function renderHome() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="container">
            <h1>NONTERRITORIAL MUSEUM</h1>
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
    console.log("Showing exhibit view");
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="container">
            <h1>Exhibits</h1>
            <p>Explore our latest digital exhibits.</p>
            <button onclick="showHome()">Back to Home</button>
        </div>
    `;
}

function showCollect() {
    console.log("Showing collect view");
    // Implement collect view
}

function showHost() {
    console.log("Showing host view");
    // Implement host view
}

function showJoin() {
    console.log("Showing join view");
    // Implement join view
}

function showMembership() {
    console.log("Showing membership view");
    // Implement membership view
}

function showAbout() {
    console.log("Showing about view");
    // Implement about view
}

function showRoadmap() {
    console.log("Showing roadmap view");
    // Implement roadmap view
}

function showQA() {
    console.log("Showing Q&A view");
    // Implement Q&A view
}

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
window.showCollect = showCollect;
window.showHost = showHost;
window.showJoin = showJoin;
window.showMembership = showMembership;
window.showAbout = showAbout;
window.showRoadmap = showRoadmap;
window.showQA = showQA;


