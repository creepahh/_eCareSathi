const passport = require('passport');
const session = require('express-session');
require('dotenv').config()


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var caregiverRouter = require('./routes/caregiver');


var riderRouter = require('./routes/rider');
// var tutorRouter = require('./routes/tutor');

var app = express();
const dbUrl = process.env.MONGO_URL;

// mongoose
//   .connect(dbUrl)
//   .then(() => console.log('Connected!'));

// var mongoose = require("mongoose");

// //db connection
// mongoose.connect('mongodb+srv://<usrname>:<pw>@cluster0.ir5kr.mongodb.net/test')   
//   .then(() => console.log('Connected!'))
//   .catch((e) => console.log(e));
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

app.get('/users', (req, res) => {
  db.all(`SELECT * FROM users`, [], (err, rows) => {
      if (err) {
          res.status(500).send(err.message);
          return;
      }
      res.json(rows); // Send the user data 
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/caregiver', caregiverRouter);
app.use('/rider', riderRouter);
// app.use('/api/tutors', tutorRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//services
app.get('/services', (req, res) => {
  const services = ['pickup', 'drop', 'homework assistance', 'hobbies boost'];
  res.json(services);
});


const createRide = async (riderId, childId, pickupLocation, dropoffLocation) => {
  const ride = new Ride({
    riderId,
    childId,
    pickupLocation,
    dropoffLocation,
  });
  await ride.save();

  // Add the ride to the rider's rides array
  const rider = await Rider.findById(riderId);
  rider.rides.push(ride._id);
  await rider.save();

  return ride;
};

// app.post('/signup', (req, res) => {
//     const { childName, parentName, schoolAddress, homeAddress, age, schoolName, hobbies } = req.body;
//     const stmt = db.prepare(`INSERT INTO users (child_name, parent_name, school_address, home_address, age, school_name, hobbies)
//                              VALUES (?, ?, ?, ?, ?, ?, ?)`);
//     stmt.run(childName, parentName, schoolAddress, homeAddress, age, schoolName, hobbies, (err) => {
//         if (err) {
//             return res.status(500).send(err.message);
//         }
//         stmt.finalize();
//         res.redirect('/users'); // Redirect to the users page to see the data
//     });
// });

module.exports = app;
