const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    parentEmail: { type: String, required: true },
    careGiverEmail: { type: String },
    riderEmail: {type: String },
    status: { type: String, required: true },
    deadline: { type: String, required: true },
    label: { type: String, required: true },
});


module.exports = mongoose.model('schedules', scheduleSchema);