var express = require('express');
var router = express.Router();
const User = require('../models/users');
const Caregiver = require('../models/caregiver');
const Rider = require('../models/riders');
const Child = require('../models/children');
const Schedule = require('../models/schedule');
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

router.get('/signup-child', function(req, res, next) {
  res.render('add-child', {email: "sth@gmail.com"});
});

// toggle handling in sign in
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

// parent gets schedule??
router.get('/parent/schedules', async (req, res) => {
  try {
    const { token, childName } = req.query;
    const { email } = verifyToken(token);
    if (!email) throw new Error("Error");
    const response = await Schedule.find({ parentEmail: email, childName: childName  })
    res.json(response);
  }
  catch (err) {
    res.json({});
  }
});

// addChild
router.get('/child/add', async (req, res) => {
  try {
    const { token, childName } = req.query;
    const {email} = verifyToken(token);
    if (!childName || !email) throw new Error("Error");
    const response = new Child({
      name: childName,
      parentEmail: email,
      age: 10,
      riderEmail: "",
      careGiverEmail: ""
    });
    response.save();
    res.json(response);
  }
  catch (err) {
    console.error(err);
  }
})

// schedule updated handling
router.get('/schedule/update', async (req, res) => {
  try {
    const { id, label, deadline, status } = req.query;
    const response = await Schedule.updateOne({_id: id}, {label: label, deadline: deadline, status: status});
    console.log(response);
    res.json(response);
  }
  catch (err) {
    res.json({});
    console.log(err);
  }
})

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

router.get('/select', (req, res) => {
  res.render('select-caregiver-rider');
})

router.get('/getCaregiverRider', async (req, res) => {
  try {
    const { token, childName } = req.query;
    const { email } = verifyToken(token);
    const user = await User.findOne({ email: email });
    const careGivers = await Caregiver.find({});
    const riders = await Rider.find({});
    const child = await Child.findOne({
      parentEmail: user.email,
      name: childName
    });
    // const newChild = new Child ({
    //   parentEmail: user.email,
    //   name: childName
    // });
    // newChild.save();
    // console.log(user, child, childName);
    res.json({
      careGiver: careGivers,
      riders: riders,
      selectedCareGiver: child?.careGiverEmail || NaN,
      selectedRider: child?.riderEmail || NaN
    })
  }
  catch (err) {
    res.json({});
  }
});

// select caregiver and rider
router.get('/setCaregiverRider', async (req, res) => {
  try {
    const { token, childName, careGiverEmail, riderEmail } = req.query;
    const { email } = verifyToken(token);
    const updatedChild = await Child.updateOne({ name: childName, parentEmail: email }, { careGiverEmail: careGiverEmail, riderEmail: riderEmail })
    res.json({changes: true});
  }
  catch (err) {
    res.json({changes: false});
  }
});

// get child function from given parent id
async function getChild(parentEmail) {
  return await Child.find({ parentEmail: parentEmail });
}

// api to get child
router.get('/getChildList', async (req, res) => {
  try {
    const { token } = req.query
    const { email } = verifyToken(token);
    const response = await getChild(email);
    res.json(response);
  }
  catch (err) {
    res.json({});
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
