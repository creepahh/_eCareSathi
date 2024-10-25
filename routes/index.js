var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', async function(req, res) {
  res.render('register', {title: 'Signup' } );
});

router.post('/register', async (req, res) => {            //handles form submissions to create a new user
  const { username, email, password } = req.body;
  const newUser = new User({ username, email, password });
  await newUser.save();
  res.redirect('/login');
});

router.get('/login', async function(req, res) {
res.render('user', {title: 'user' } );
});

router.post('/login', passport.authenticate('local', {         //uses Passport to authenticate users
  successRedirect: '/profile',
  failureRedirect: '/login',
}));


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
