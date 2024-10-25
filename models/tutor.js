const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
    tutorName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    homeAddress: { type: String },
    expertise: { type: [String] },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
});

module.exports = mongoose.model('Tutor', tutorSchema);
