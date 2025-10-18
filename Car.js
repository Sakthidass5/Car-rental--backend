const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  imageUrl: String
});

module.exports = mongoose.model('Car', carSchema);
