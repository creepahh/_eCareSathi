const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // If you're planning to hash passwords

const riderSchema = new mongoose.Schema({
  name: { type: String, required: true },
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

// If you want to hash a password, you can add a password field
// riderSchema.add({ password: { type: String, required: true } });

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
