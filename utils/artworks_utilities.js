const Artwork = require('../models/artwork.js')

// get all artworks
// return a query
const getAllArtworks = function (req) {
    return Artwork.find();
};



module.exports = {
  getAllArtworks
}