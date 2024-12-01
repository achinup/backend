// models/Farmer.js
const mongoose = require('mongoose');

const FarmerSchema = new mongoose.Schema({
  contactNumber: String,
  name: String,
  location: String,
  produce: [
    {
      item: String,
      price: Number,
    },
  ],
});

module.exports = mongoose.model('Farmer', FarmerSchema);
    