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
    required: true
  },
  geom: {
    latitude: {
      type: String,
      required: true
    },
    longitude: {
      type: String,
      required: true      
    }
  },
  easting: {
    type: String,
    required: true     
  },
  northing: {
    type: String,
    required: true 
  },
  image: {
    type: String,
    required: [true, "Image is required"]
  },
  imageFileName: {
    type: String,
    // required: true 
  }
})

module.exports = mongoose.model('Artwork', Artwork);