const express = require('express');
const router = express.Router();
const Caregiver = require('../models/caregiver'); // Import the Caregiver model

router.get('/', function (req, res) {
  res.render('caregiver-registration');
});

// Caregiver registration route
router.post('/registerCaregiver', async (req, res) => {
  try {
    // Extract caregiver information from the form (req.body)
    const {
      firstName,
      lastName,
      email,
      phone,
      qualification,
      experience,
      specialSkills,
      daycareName,
      daycareAddress,
      daycareId,
      username,
      password,
    } = req.body;

    // Create a new Caregiver instance
    const newCaregiver = new Caregiver({
      firstName,
      lastName,
      email,
      phone,
      qualification,
      experience,
      specialSkills,
      daycareName,
      daycareAddress,
      daycareId,
      username,
      password, // Password will be hashed automatically due to the pre-save hook
    });

    // Save the new caregiver to the database
    await newCaregiver.save();

    res.status(201).redirect('/login'); // Redirect to login page after successful registration
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering caregiver');
  }
});

module.exports = router;
