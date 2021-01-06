const AWS = require('aws-sdk');
require('dotenv').config()

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

module.exports = {
  uploadImage
}