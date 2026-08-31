// js/config.js
// Set your master registration URL here
const REGISTRATION_URL = "https://www.google.com/"; // Replace with your actual live registration URL

document.addEventListener("DOMContentLoaded", () => {
    // Find all elements with the registration-btn class
    const regButtons = document.querySelectorAll('.registration-btn');
    
    // Update the href attribute for each button
    regButtons.forEach(btn => {
        btn.href = REGISTRATION_URL;
        // Optionally, make it open in a new tab
        btn.target = "_blank";
    });
});
