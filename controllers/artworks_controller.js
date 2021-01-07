const AWS = require('aws-sdk');
require('dotenv').config()

const {
  getAllArtworksFromDB,
  addArtworkToDB,
  getSingleArtworkFromDB,
  deleteSingleArtworkFromDB,
  updateSingleArtworkFromDB
} = require('../utils/artworks_utilities')

const {
  uploadImage,
  deleteImage
} = require('../utils/image_utilities')

// retrieve all artwork from the db and send to the front-end
const getArtworks = function (req, res) {
    // execute the query from getAllPosts
    // returns artwork in alphabetical order
  getAllArtworksFromDB(req)
    .sort({ name: 1 })
    .exec((err, artworks) => {
      if (err) {
        res.status(500);
        return res.json({
        error: err.message
        });
      }
      res.status(200).send(artworks);
    });
};

// create a single artwork
const createArtwork = async function (req, res) {

  // creating a new artwork entry in the database
  addArtworkToDB(req)
    .save((err, artwork) => {
      // console.log(artwork);
      if (err) {
        res.status(500);
        return res.json({
          error: err.message
        });
      }
      res.sendStatus(201);
    })
}

// retrieve a single artwork
const getSingleArtwork = function (req, res) {

  // executes query to retrieve a single artwork by ID
  getSingleArtworkFromDB(req)
    .exec((err, singleArtwork) => {
      if (err) {
        res.status(500);
        return res.json({
          error: err.message
        });
      }
      res.status(200).send(singleArtwork);
    });
}

// delete a single artwork from the database
const deleteSingleArtwork = function (req, res) {
  // executes delete query on a single artwork by ID
  deleteSingleArtworkFromDB(req)
    .exec((err) => {
      if (err) {
        res.status(500);
        return res.json({
          error: err.message
        });
      }
      res.status(202)
      res.json({
        message: 'Artwork deleted successfully'
      })
    })
}

// update a single artwork by ID
const updateSingleArtwork = function (req, res) {

  // execute query
  updateSingleArtworkFromDB(req)
    .exec((err) => {
      if (err) {
        res.status(500);
        return res.json({
          error: err.message
        });
      }
      res.status(200)
      res.json({ message: 'update successful' })
    })
}

module.exports = {
  getArtworks,
  createArtwork,
  getSingleArtwork,
  deleteSingleArtwork,
  updateSingleArtwork
}