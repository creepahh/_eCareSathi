var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const Rider = require('../models/riders');
const { generateToken, verifyToken } = require('../jwt');

router.get('/', function(req, res, next) {
    res.render('rider-registration');
});

router.get('/profile', function (req, res) {
    res.render('rider-profile');
});
  
router.get('/get-profile-data', async function (req, res) {
    try {
      const request = req.query.token;
      // console.log(req.query, typeof(request));
      const { id, email } = verifyToken(request);
      const rider = await rider.findOne({ email: email });
      // console.log("hi");
      res.json(rider);
    }
    catch (err) {
      res.end(err);
    }
});
  
router.post('/register', async (req, res) => {
    const { fullName, email, phone, vehicleType, licensePlate, affiliation, fourWheeler, availableDays, availableHours, primaryDaycare, dropOffLocation, returnHomeLocation } = req.body;

    try {
        const newRider = new Rider({
            name: fullName, 
            vehicleType,
            licensePlate,
            contactNumber: phone, // Map to your schema's field
            experience: 0, // You might want to adjust this logic
            availability: {
                days: availableDays.split(",").map(day => day.trim()), // Assuming input is comma-separated
                hours: availableHours
            },
            profilePicture: '', // You might want to allow uploads or set a default
            // Other fields can be added here as necessary
        });

        await newRider.save();
        res.redirect('/rider/profile'); // Adjust to your desired redirect
    } catch (error) {
        console.error(error);
        res.status(400).send('Error registering rider');
    }
});

router.get('/get-profile-data', async function (req, res) {
    try {
      const request = req.query.token;
      // console.log(req.query, typeof(request));
      const { id, email } = verifyToken(request);
      const rider = await Rider.findOne({ email: email });
      // console.log("hi");
      res.json(rider);
    }
    catch (err) {
      res.end(err);
    }
});


  

// // Route to update rider status
// router.post('/updateStatus', async (req, res) => {
//     const { action, childName } = req.body;

//     // Fetch parent's email based on childName from your database
//     const parentEmail = await getParentEmailByChildName(childName);

//     // Send email notification to parent
//     if (parentEmail) {
//         const transporter = nodemailer.createTransport({
//             // Configure your email service here
//         });

//         const mailOptions = {
//             from: 'your-email@example.com',
//             to: parentEmail,
//             subject: 'Child Status Update',
//             text: `The rider has ${action === 'pickup' ? 'picked up' : 'dropped off'} ${childName}.`,
//         };

//         await transporter.sendMail(mailOptions);
//     }

//     // Optionally, you can send a web alert back to the rider
//     res.send('Status updated and parent notified!');
// });

// // Route to update rider status via PATCH
// router.patch('/:id/status', async (req, res) => {
//     try {
//         const rider = await Rider.findByIdAndUpdate(req.params.id, { pickupDropStatus: req.body.status }, { new: true });
//         if (!rider) return res.status(404).send();
//         res.send(rider);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

module.exports = router;
