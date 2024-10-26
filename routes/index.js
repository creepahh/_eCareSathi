var express = require('express');
var router = express.Router();
const User = require('../models/users');
const Caregiver = require('../models/caregiver');
const Rider = require('../models/riders');
const passport = require('passport');
const { render } = require('../app');
const { generateToken, verifyToken } = require('../jwt');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landing');
});

router.get('/signUp', function(req, res, next) {
  res.render('index');
});

router.post('/signUp', function(req, res, next) {
  res.render('profile');
});

router.get('/api/login', async function(req, res) {
  try {
    var currentModel;
    switch (req.query.type) {
      case 'caregiver':
        currentModel = Caregiver;
        break;
      case 'parent':
        currentModel = User;
        break;
      case 'rider':
        currentModel = Rider;
        break;
    }

    const currentUser = await currentModel.findOne({email: req.query.email});
    if (currentUser) {
      return res.json({token: generateToken(currentUser)});
    }
    res.json({});
  }
  catch (err) {
    res.json({});
  }
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
  const userInfo = await newUser.save();
  const token = generateToken(userInfo);
  res.redirect("/profile?token="+ token);

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
  // if (!req.isAuthenticated()) {
  //     return res.redirect('/login');
  // }
  res.render('profile', { user: req.user }); // Pass user data to EJS template
});

// getting user data
router.get('/get-profile-data', async function (req, res) {
  try {
    const request = req.query.token;
    // console.log(req.query, typeof(request));
    const { id, email } = verifyToken(request);
    const user = await User.findOne({ email: email });
    res.json(user);
  }
  catch (err) {
    res.end(err);
  }
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
