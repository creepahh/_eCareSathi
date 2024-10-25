const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  childId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Child' }, // Assuming you have a Child model
  riderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Rider' },
  status: { 
    type: String, 
    enum: ['pending', 'en_route', 'completed'], 
    default: 'pending' 
  },
  pickupLocation: { type: String, required: true },
  dropoffLocation: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update `updatedAt` on save
rideSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;
