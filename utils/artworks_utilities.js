const Artwork = require('../models/artwork.js')
require('dotenv').config()

// get all artworks
// return a query
const getAllArtworksFromDB = function (req) {
    return Artwork.find();
};

// return a new artwork template
const addArtworkToDB = function (req) {

  // build new artwork
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

// retrieving all artworks by Artist field, using regex and the search term
const searchArtworkFromDB = function (req) {
  return Artwork.find({ name: { $regex: req.params.search, $options: 'i' } })
}

// delete a single artwork by ID
const deleteSingleArtworkFromDB = function (req) {
  return Artwork.findByIdAndDelete(req.params.id)
}

// update a single artwork by ID
const updateSingleArtworkFromDB = function (req) {

  let updateArtwork = {}
  updateArtwork.name = req.body.title
  updateArtwork.addresspt = req.body.location
  updateArtwork.artist = req.body.artist
  updateArtwork.artdate = req.body.date
  updateArtwork.structure_ = req.body.details
  updateArtwork.geom = {}
  updateArtwork.geom.latitude = req.body.latitude
  updateArtwork.geom.longitude = req.body.longitude
  updateArtwork.easting = req.body.easting
  updateArtwork.northing = req.body.northing

  // only change these fields if a new image has been uploaded
  // req.files is where express-fileupload stores file information
  if (req.files) {
    updateArtwork.image = `https://${process.env.AWS_S3_BUCKET}.s3-ap-southeast-2.amazonaws.com/${req.files.image.name}`
    updateArtwork.imageFileName = req.files.image.name
  }

  return Artwork.findByIdAndUpdate(req.params.id, updateArtwork, { new: true })
}

module.exports = {
  getAllArtworksFromDB,
  addArtworkToDB,
  searchArtworkFromDB,
  deleteSingleArtworkFromDB,
  updateSingleArtworkFromDB
}

    // name: req.body.title,
    // addresspt: req.body.location,
    // artist: req.body.artist,
    // artdate: req.body.date,
    // structure_: req.body.details,
    // geom: {
    //   latitude: req.body.latitude,
    //   longitude: req.body.longitude
    // },
    // easting: req.body.easting,
    // northing: req.body.northing