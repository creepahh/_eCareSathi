
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    childName: { type: [String], required: false },
    parentName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true }, // Assuming we want authentication
    // schoolAddress: { type: String, required: true },
    homeAddress: { type: String, required: true },
    services: { type: [String], enum: ['pickup', 'drop', 'homework assistance', 'hobbies boost'], required: false },
    schedule: { type: String, required: false } // Can be more detailed 
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
