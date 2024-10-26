const express = require('express');
const router = express.Router();
const Caregiver = require('../models/caregiver'); // Import the Caregiver model
const Schedule = require('../models/schedule');
const { generateToken, verifyToken } = require('../jwt');

router.get('/', function (req, res) {
  res.render('caregiver-registration');
});

router.get('/profile', function (req, res) {
  res.render('caregiver-profile');
});

router.get('/get-profile-data', async function (req, res) {
  try {
    const request = req.query.token;
    // console.log(req.query, typeof(request));
    const { id, email } = verifyToken(request);
    const caregiver = await Caregiver.findOne({ email: email });
    // console.log("hi");
    res.json(caregiver);
  }
  catch (err) {
    res.end(err);
  }
});

// for scheduling
router.get('/schedules', async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) throw new Error("Error");
    res.json(await Schedule.find({ careGiverEmail: email }));
  }
  catch (err) {
    res.json({});
  }
});

// Caregiver registration route
router.post('/register', async (req, res) => {
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
    const newCareGiver = await newCaregiver.save();
    console.log(newCareGiver);
    const token = generateToken(newCareGiver);
    console.log(token);
    res.status(201).redirect('/caregiver/profile?token='+token); // Redirect to login page after successful registration
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering caregiver');
  }
});

module.exports = router;
