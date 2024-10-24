
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    childName: { type: String, required: true },
    parentName: { type: String, required: true },
    schoolAddress: { type: String, required: true },
    homeAddress: { type: String, required: true },
    services: { type: [String], enum: ['pickup', 'drop', 'homework assistance', 'hobbies boost'], required: true },
    schedule: { type: String, required: true }, // Can be more detailed 

    password: { type: String, required: true } // Assuming we want authentication
});

// Password hashing
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Password comparison
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
