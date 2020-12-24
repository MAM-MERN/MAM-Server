const Artwork = require('../models/artwork.js')

// get all artworks
// return a query
const getAllArtworks = function (req) {
    return Artwork.find();
};

// return a new artwork template
const addArtworkToDB = function(req) {
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
  newArtwork.image = 'http://www.artworks.com/mock.jpg'

  return new Artwork(newArtwork)
}
module.exports = {
  getAllArtworks,
  addArtworkToDB
}