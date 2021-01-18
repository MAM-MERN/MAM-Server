const AWS = require('aws-sdk');
const { getSingleArtworkFromDB } = require('./artworks_utilities')

const uploadImage = function (req, res, next) {

  // checks if there is a new image to upload. If there isn't, skip to next middleware
  if (res.locals.noNewImageToUpload) {
    return next()
  }

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
    ACL: 'public-read',
    ContentType: req.files.image.mimetype
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
  }
  // res.json({
  //   message: 'image uploaded correctly'
  // })
  

  next()
}

const deleteImage = function (req, res, next) {

  // checks if there is a new image to upload. If there isn't, skip to next middleware
  if (res.locals.noNewImageToUpload) {
    return next()
  }

  // get imageFileName for artwork by ID
  getSingleArtworkFromDB(req)
    .exec((err, singleArtwork) => {
      if (err) {
        res.status(500);
        return res.json({
          error: err.message,
          message: 'error finding image to delete'
        });
      }
      const fileName = singleArtwork.imageFileName

      // creating S3 object
      const s3 = new AWS.S3();

      // Setting up S3 delete parameters
      const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: fileName
      };

      // Deleting file from S3 bucket
      try {
        s3.deleteObject(params).promise()
      }
      catch(err) {
        console.log(err);
        res.json({
          message: 'error deleting image from S3',
          error: err
        })
        res.sendStatus(501)
      }
      // res.json({
      //   message: 'image deleted correctly'
      // })

      next()
    });
}

module.exports = {
  uploadImage,
  deleteImage
}