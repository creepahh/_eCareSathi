const mongoose = require('mongoose');

const childrenSchema = new mongoose.Schema({
    name: { type: String, required: true },
    parentEmail: { type: String, required: true },
    careGiverEmail: { type: String },
    riderEmail: {type: String},
    age: { type: Number },
});

module.exports = mongoose.model('childrens', childrenSchema);