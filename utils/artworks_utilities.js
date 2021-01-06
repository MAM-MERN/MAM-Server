const Artwork = require('../models/artwork.js')
require('dotenv').config()

// get all artworks
// return a query
const getAllArtworksFromDB = function (req) {
    return Artwork.find();
};

// return a new artwork template
const addArtworkToDB = function (req) {
  console.log('hit addArtworkToDB function');
  console.log(req.body);

  let newArtwork = {}
  newArtwork.name = req.body.title
  newArtwork.addresspt = req.body.location
  newArtwork.artist = req.body.artist
  newArtwork.artdate = req.body.date
  newArtwork.structure_ = req.body.details
  newArtwork.geom = {}
  newArtwork.geom.latitude = req.body.latitude
  newArtwork.geom.longitude = req.body.longitude
  newArtwork.easting = req.body.easting
  newArtwork.northing = req.body.northing
  newArtwork.image = `https://${process.env.AWS_S3_BUCKET}.s3-ap-southeast-2.amazonaws.com/${req.files.image.name}`
  newArtwork.imageFileName = req.files.image.name

  return new Artwork(newArtwork)
}

// retrieving a single artwork by ID
const getSingleArtworkFromDB = function (req) {
  return Artwork.findById(req.params.id)
}

// delete a single artwork by ID
const deleteSingleArtworkFromDB = function (req) {
  return Artwork.findByIdAndDelete(req.params.id)
}

// update a single artwork by ID


module.exports = {
  getAllArtworksFromDB,
  addArtworkToDB,
  getSingleArtworkFromDB,
  deleteSingleArtworkFromDB
}