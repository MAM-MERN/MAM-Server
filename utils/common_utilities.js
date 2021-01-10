const checkIfNewImageToBeUploaded = function (req, res, next) {
  if (req.files) {
    next()
  } else {
    res.locals.noNewImageToUpload = true
    next()
  }
}

function adminAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.json({
    message: 'Not Authorised: Admin Only'
  })
}

module.exports = {
  checkIfNewImageToBeUploaded,
  adminAuthentication
}