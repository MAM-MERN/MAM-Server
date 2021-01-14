const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Artwork = new Schema({
  name: {
    type: String,
    required: [true, "Name of Artwork is required"]
  },
  addresspt: {
    type: String,
    required: [true, "Address is required"]
  },
  artist: {
    type: String,
    required: [true, "Artist is required"]
  },
  artdate: {
    type: String,
    required: [true, "Date is required"]
  },
  structure_: {
    type: String,
    required: [true, "Description is required"]
  },
  geom: {
    latitude: {
      type: String,
      required: [true, "Latitude is required"]
    },
    longitude: {
      type: String,
      required: [true, "Longitude is required"]      
    }
  },
  image: {
    type: String,
    required: [true, "Image is required"]
  },
  imageFileName: {
    type: String,
    required: true 
  }
})

module.exports = mongoose.model('Artwork', Artwork);