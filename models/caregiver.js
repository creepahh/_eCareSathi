const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const caregiverSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  qualification: { type: String, required: true },
  experience: { type: Number, required: true },
  specialSkills: { type: String },
  daycareName: { type: String, required: true },
  daycareAddress: { type: String, required: true },
  daycareId: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});


caregiverSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10); // Generate salt -random value 
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (error) {
    next(error);
  }
});

const Caregiver = mongoose.model('caregiver', caregiverSchema);

module.exports = Caregiver;
