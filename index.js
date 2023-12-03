const admin = require('firebase-admin');
require('dotenv').config();

document.addEventListener('DOMContentLoaded', () => {
    // initialize event listeners modularity 
    setupEventListeners();
});

function setupEventListeners() {
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
      registrationForm.addEventListener('submit', handleRegistration);
    }
  
    // Example: Event listener for user login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', handleLogin);
    }
  
    // Add more event listeners as needed.
}

function handleRegistration(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Retrieve form data
    const username = document.getElementById('username').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm_password').value;
    const accountType = document.querySelector('input[name="account_type"]:checked').value;

    // Here you should add validation logic to ensure the data is correct
    // For example, check if password and confirm_password match
    // and if the email format is correct.

    // If validation passes, call the register method from App.js
    app.register(username, firstname, lastname, email, password, confirm_password, accountType);
}

function handleLogin(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Call the login method from App.js
    app.login(username, password);
}

module.exports = {
    setupEventListeners,
    handleRegistration,
    handleLogin
};