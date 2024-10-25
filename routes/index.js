var express = require('express');
var router = express.Router();
const User = require('../models/users');
const passport = require('passport');
const { render } = require('../app');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// router.post('/register', async function(req, res) {
//   res.render('signUp', {title: 'Signup', ...req.body } );
// });

router.post('/register', async (req, res) => {            //handles form submissions to create a new user
  const { name, email, password, address, phoneNumber } = req.body;
  const newUser = new User({ 
    childName: [],
    parentName: name,
    email: email,
    password: password,
    homeAddress: address,
    phoneNumber: phoneNumber 
  });
  await newUser.save();
  res.redirect('/');
});

router.get('/login', async function(req, res) {
  res.render('user', {title: 'user' } );
});

router.post('/signup', async function(req, res) {
  res.end(JSON.stringify(req.body));
});

router.post('/login', passport.authenticate('local', {         //uses Passport to authenticate users
  successRedirect: '/profile',
  failureRedirect: '/login',
}));
// // for landing
// router.get('/caregiver', async function(req, res) {
//   res.render('caregiver-registration', {title: 'caregiver' } );
// });
// router.get('/rider', async function(req, res) {
//   res.render('driver-profile', {title: 'driver' } );
// });
// router.get('/parent', async function(req, res) {
//   res.render('signUp', {title: 'user' } );
// });

router.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
      return res.redirect('/login');
  }
  res.render('profile', { user: req.user }); // Pass user data to EJS template
});

router.post('/submitCaregiver', (req, res) => {
  
  const caregiverData = req.body;
  console.log(caregiverData);
  
  res.redirect('/');
});

router.post('/submitChildUpdate', (req, res) => {
  const updateData = req.body;
  console.log(updateData);
  
  res.redirect('/');
});

router.post('/submitRider', (req, res) => {
  // handle rider form data
  const riderData = req.body;
  console.log(riderData);
  // Save to database or perform further actions
  res.redirect('/');
});





module.exports = router;
