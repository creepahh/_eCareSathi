var express = require('express');
var router = express.Router();
const User = require('../models/users');
const passport = require('passport');
const { render } = require('../app');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('rider-registration');
});

module.exports = router;