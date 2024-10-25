const riderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  vehicleType: { type: String, required: true },
  licensePlate: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: true },
  experience: { type: Number, required: true },
  availability: {
      days: { type: [String], required: true },
      hours: { type: String, required: true },
  },
  profilePicture: { type: String } // URL to rider's photo
});

const Rider = mongoose.model('Rider', riderSchema);
module.exports = Rider;
