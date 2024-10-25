const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
    childName: { type: String, required: true, unique: true },
    parentName: { type: String, required: true, unique: true },
    schoolAddress: { type: String, required: true },
    homeAddress: { type: String, required: true },
    
});

const Tutor = mongoose.model('tutors', tutorSchema);
module.exports = Tutor;