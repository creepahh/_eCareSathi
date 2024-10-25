
const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Import route handlers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const signupRouter = require('./routes/signup');
const pickupRouter = require('./routes/pickup');
const registerRouter = require('./routes/register');

const app = express();

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // Set the view engine to EJS

// User Data
let users = {
    parents: [{ id: 1, name: "John Doe", notifications: [] }],
    caregivers: [{ id: 1, name: "Jane Smith", notifications: [] }],
    riders: [{ id: 1, name: "Driver A", notifications: [] }]
};

let scheduledPickups = [];

// Function to send notifications
const sendNotification = (userId, message) => {
    for (let userType in users) {
        const user = users[userType].find(u => u.id === userId);
        if (user) {
            user.notifications.push(message);
            break;
        }
    }
};

// Routes setup
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', signupRouter);
app.use('/register', registerRouter);
app.use('/pickup', pickupRouter({ scheduledPickups, sendNotification })); // Custom pickup router

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

// Start the server
app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});

module.exports = app;
