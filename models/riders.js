const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  childId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Child' }, // Assuming you have a Child model
  riderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Rider' },

  pickupDropStatus: { type: String, enum: ['pending', 'completed'], default: 'pending' },

  // status: { 
  //   type: String, 
  //   enum: ['pending', 'en_route', 'completed'], 
  //   default: 'pending' 
  // },
  
  pickupLocation: { type: String, required: true },
  dropoffLocation: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ride', rideSchema);


// Update `updatedAt` on save
rideSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});
//creating new rider 

router.post('/', async (req, res) => {
  try {
      const rider = new Rider(req.body);
      await rider.save();
      res.status(201).send(rider);
  } catch (error) {
      res.status(400).send(error);
  }
});

// Get all riders
router.get('/', async (req, res) => {
  try {
      const riders = await Rider.find();
      res.send(riders);
  } catch (error) {
      res.status(500).send(error);
  }
});



const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;
