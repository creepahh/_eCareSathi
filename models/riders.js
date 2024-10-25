const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    childId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Child' },
    riderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Rider' },
    pickupDropStatus: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    pickupLocation: { type: String, required: true },
    dropoffLocation: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});



// Update `updatedAt` on save
rideSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Ride = mongoose.model('Ride', rideSchema);
module.exports = Ride;
