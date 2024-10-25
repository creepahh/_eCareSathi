const mongoose = require('mongoose');

const childrenSchema = new mongoose.Schema({
    childName: { type: String, required: true },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    age: { type: Number },
});

module.exports = mongoose.model('Children', childrenSchema);
