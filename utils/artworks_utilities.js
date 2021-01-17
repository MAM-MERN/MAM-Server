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

  // only change these fields if a new image has been uploaded
  // req.files is where express-fileupload stores file information
  if (req.files) {
    updateArtwork.image = `https://${process.env.AWS_S3_BUCKET}.s3-ap-southeast-2.amazonaws.com/${req.files.image.name}`
    updateArtwork.imageFileName = req.files.image.name
  }

  return Artwork.findByIdAndUpdate(req.params.id, updateArtwork, { new: true })
}

const getSingleArtworkFromDB = function (req) {
  return Artwork.findById(req.params.id)
}

module.exports = {
  getAllArtworksFromDB,
  addArtworkToDB,
  searchArtworkFromDB,
  deleteSingleArtworkFromDB,
  updateSingleArtworkFromDB,
  getSingleArtworkFromDB
}