const AWS = require('aws-sdk');
require('dotenv').config()

const {
  getAllArtworks,
  addArtworkToDB,
  getSingleArtworkFromDB
} = require('../utils/artworks_utilities')

const getArtworks = function (req, res) {
    // execute the query from getAllPosts
    // returns artwork in alphabetical order
  getAllArtworks(req)
    .sort({ name: 1 })
    .exec((err, artworks) => {
      if (err) {
        res.status(500);
        return res.json({
          error: err.message
        });
      }
      res.send(artworks);
    });
};

const uploadImage = function (req, res, next) {

    // creating global config object
  myConfig = new AWS.Config();

  // setting region in config
  myConfig.update({
      region: 'ap-southeast-2'
  })

  // creating S3 object
  const s3 = new AWS.S3();

  // Binary data base64
  const fileContent = Buffer.from(req.files.image.data, 'binary');

  // Setting up S3 upload parameters
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: req.files.image.name,
    Body: fileContent,
    ACL: 'public-read'
  };

  // Uploading files to the S3 bucket
  try {
    s3.upload(params).promise()
  }
  catch(err) {
    console.log(err);
    res.json({
      message: 'error uploading image',
      error: err
    })
    res.sendStatus(501)
  }

  next()
}

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
      res.send(singleArtwork);
    });
}

module.exports = {
  getArtworks,
  createArtwork,
  uploadImage,
  getSingleArtwork
}