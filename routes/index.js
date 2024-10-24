var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', async function(req, res) {
    res.render('user', {title: 'User' } );
});

router.get('/register', async function(req, res) {
  res.render('signUp', {title: 'Signup' } );
});

module.exports = router;
