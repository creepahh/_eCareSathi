const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schedule = require('../models/schedule');

const riderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {type: String, required: true, unique: true},
  vehicleType: { type: String, required: true },
  licensePlate: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: true },
  experience: { type: Number, required: true },
  availability: {
      days: { type: [String], required: true },
      hours: { type: String, required: true },
  },
  profilePicture: { type: String } // URL to rider's photo
});


riderSchema.pre('save', async function (next) {
  try {
    // If you are storing passwords, hash them here
    // const salt = await bcrypt.genSalt(10);
    // this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const Rider = mongoose.model('Rider', riderSchema);
module.exports = Rider;
