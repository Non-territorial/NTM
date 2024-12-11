import WebApp from '@twa-dev/sdk'

// Initialize the Web App
WebApp.ready();

// Render the entry page
function renderEntry() {
  const app = document.getElementById('twa-app');
  app.innerHTML = `
    <div class="entry-container">
      <img src="/glasses-logo.svg" alt="NT Museum Logo" class="logo">
      <h1 class="title">NONTERRITORIAL MUSEUM</h1>
      <button class="button entry-button" onclick="enterMainInterface()">ENTER</button>
    </div>
  `;
}

// Render the main interface (home page)
function renderMainInterface() {
  const app = document.getElementById('twa-app');
  app.innerHTML = `
    <div class="main-container">
      <img src="/glasses-logo.svg" alt="NT Museum Logo" class="logo">
      <h1 class="title">NONTERRITORIAL MUSEUM</h1>
      <div class="button-layout">
        <button class="button" onclick="handleRegister()">REGISTER</button>
        <button class="button" onclick="handleCollect()">COLLECT</button>
        <div class="row">
          <button class="button" onclick="handleExhibit()">EXHIBIT</button>
          <button class="button host" onclick="handleHost()">HOST</button>
          <button class="button" onclick="handleJoin()">JOIN</button>
        </div>
        <button class="button" onclick="handleMembership()">MEMBERSHIP</button>
      </div>
      <nav class="navigation">
        <a href="#" class="nav-link" onclick="handleHome()">HOME</a>
        <a href="#" class="nav-link" onclick="handleAbout()">ABOUT</a>
        <a href="#" class="nav-link" onclick="handleRoadmap()">ROADMAP</a>
        <a href="#" class="nav-link" onclick="handleQA()">Q&A</a>
      </nav>
    </div>
  `;
}

// Function to enter the main interface
function enterMainInterface() {
  renderMainInterface();
}

// Button handlers
function handleRegister() {
  console.log("Register clicked");
  // Implement register functionality
}

function handleCollect() {
  console.log("Collect clicked");
  // Implement collect functionality
}

function handleExhibit() {
  console.log("Exhibit clicked");
  // Implement exhibit functionality
}

function handleHost() {
  console.log("Host clicked");
  // Implement host functionality
}

function handleJoin() {
  console.log("Join clicked");
  // Implement join functionality
}

function handleMembership() {
  console.log("Membership clicked");
  // Implement membership functionality
}

function handleHome() {
  console.log("Home clicked");
  renderMainInterface();
}

function handleAbout() {
  console.log("About clicked");
  // Implement about functionality
}

function handleRoadmap() {
  console.log("Roadmap clicked");
  // Implement roadmap functionality
}

function handleQA() {
  console.log("Q&A clicked");
  // Implement Q&A functionality
}

// Make functions available globally
window.enterMainInterface = enterMainInterface;
window.handleRegister = handleRegister;
window.handleCollect = handleCollect;
window.handleExhibit = handleExhibit;
window.handleHost = handleHost;
window.handleJoin = handleJoin;
window.handleMembership = handleMembership;
window.handleHome = handleHome;
window.handleAbout = handleAbout;
window.handleRoadmap = handleRoadmap;
window.handleQA = handleQA;

// Initial render
document.addEventListener('DOMContentLoaded', () => {
  renderEntry();
});

