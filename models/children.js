const mongoose = require('mongoose');

const childrenSchema = new mongoose.Schema({
    childName: { type: String, required: true, unique: true },
    parentName: { type: String, required: true, unique: true },
    schoolAddress: { type: String, required: true },
    homeAddress: { type: String, required: true },
    
});

const Children = mongoose.model('childrens', childrenSchema);
module.exports = Children;