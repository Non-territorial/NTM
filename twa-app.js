import WebApp from '@twa-dev/sdk'

// Initialize the Web App
WebApp.ready();

console.log("NT Museum Telegram Mini App is running!");

// Example of using Telegram Web App features
document.addEventListener('DOMContentLoaded', () => {
    const mainButton = WebApp.MainButton;
    mainButton.setText("Explore Museum");
    mainButton.show();
    mainButton.onClick(() => {
        alert("Welcome to NT Museum!");
    });
});

// Add functions to handle different views
function showHome() {
    // Logic for home view
    console.log("Showing home view");
}

function showExhibit() {
    // Logic for exhibit view
    console.log("Showing exhibit view");
}

function showMembership() {
    // Logic for membership view
    console.log("Showing membership view");
}

// Export functions to be used in other parts of your app
export { showHome, showExhibit, showMembership };

