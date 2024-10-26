var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const Schedule = require('../models/schedule')
const mongoose = require('mongoose');
const Rider = require('../models/riders');
const { generateToken, verifyToken } = require('../jwt');

// Route to render rider registration page
router.get('/', function(req, res, next) {
    res.render('rider-registration');
});

// Route to render rider profile page
router.get('/profile', function (req, res) {
    res.render('rider-profile');
});

// Route to get rider profile data
router.get('/get-profile-data', async function (req, res) {
    try {
        const request = req.query.token;
        const { email } = verifyToken(request);
        const rider = await Rider.findOne({ email: email });
        
        if (!rider) {
            return res.status(404).json({ message: 'Rider not found' });
        }

        res.json(rider);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Route for rider registration
router.post('/register', async (req, res) => {
    const { fullName, email, phone, vehicleType, licensePlate, availableDays, availableHours, primaryDaycare, dropOffLocation, returnHomeLocation } = req.body;

    try {
        const newRider = new Rider({
            name: fullName,
            email,
            vehicleType,
            licensePlate,
            contactNumber: phone,
            experience: 0, // Adjust logic as necessary
            availability: {
                days: availableDays.split(",").map(day => day.trim()), // Assuming input is comma-separated
                hours: availableHours
            },
            profilePicture: '', // Set a default or allow uploads
        });

        await newRider.save();
        res.redirect('/rider/profile');
    } catch (error) {
        console.error(error);
        res.status(400).send('Error registering rider');
    }
});

// routing schedule part
router.get('/schedules', async (req, res) => {
    try {
      const email = req.query.email;
      console.log(email);
      if (!email) throw new Error("Error");
      res.json(await Schedule.find({ riderEmail: email }));
    }
    catch (err) {
      res.json({});
    }
});

// Route to update rider status and notify parent
router.post('/update-status', async (req, res) => {
    const { action, childName, parentEmail } = req.body;

    try {
        // Send email notification to parent
        const transporter = nodemailer.createTransport({
            // Configure your email service here
            service: 'Gmail', // Example: 'Gmail'
            auth: {
                user: 'your-email@example.com',
                pass: 'your-email-password' // Make sure to use environment variables for sensitive info
            }
        });

        const mailOptions = {
            from: 'your-email@example.com',
            to: parentEmail,
            subject: 'Child Status Update',
            text: `The rider has ${action === 'pickup' ? 'picked up' : 'dropped off'} ${childName}.`,
        };

        await transporter.sendMail(mailOptions);
        res.send('Status updated and parent notified!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to send notification');
    }
});

module.exports = router;
