const mongoose = require('mongoose');

const careGiverSchema = new mongoose.Schema({
    childName: { type: String, required: true, unique: true },
    parentName: { type: String, required: true, unique: true },
    schoolAddress: { type: String, required: true },
    homeAddress: { type: String, required: true },
    
});

const CareGiver = mongoose.model('caregivers', careGiverSchema);
module.exports = CareGiver;