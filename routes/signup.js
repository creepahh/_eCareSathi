const express = require('express');
const router = express.Router();

// Render sign-up form (GET)
router.get('/', (req, res) => {
    res.render('signup');  // This will render signup.ejs
});

// Handle sign-up form submission (POST)
router.post('/', (req, res) => {
    const { userType, name, centerName, phoneNumber, email, state, enrollment, message, referredBy } = req.body;
    
    // Log the form data (you can save it to a database here)
    console.log(`User Type: ${userType}`);
    console.log(`Name: ${name}`);
    console.log(`Center Name: ${centerName}`);
    console.log(`Phone Number: ${phoneNumber}`);
    console.log(`Email: ${email}`);
    console.log(`State: ${state}`);
    console.log(`Enrollment: ${enrollment}`);
    console.log(`Message: ${message}`);
    console.log(`Referred By: ${referredBy}`);
    
    // Redirect or send a success message
    res.send('Sign-up form submitted successfully!');
});

module.exports = router;
