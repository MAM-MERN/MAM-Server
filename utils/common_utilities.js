const checkIfNewImageToBeUploaded = function (req, res, next) {
  if (req.files) {
    next()
  } else {
    res.locals.noNewImageToUpload = true
    next()
  }
}

module.exports = {
  checkIfNewImageToBeUploaded
}