// routes/register.js
const express = require('express');
const router = express.Router();

// Serve the registration page
router.get('/', (req, res) => {
    res.render('register'); // Render the EJS template
});

// Handle registration form submission
router.post('/', (req, res) => {
    const { username, email, password } = req.body;

    // Here you can handle the registration logic, like saving to a database
    console.log(`Username: ${username}, Email: ${email}, Password: ${password}`);

    // Send a response back to the user
    res.send('Registration successful! You can now log in.');
});

module.exports = router;
