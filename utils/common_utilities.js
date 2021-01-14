// used for edit/update route. checks if a new image is being uploaded for an edited artwork. if not, it skips the image delete/upload functions
const checkIfNewImageToBeUploaded = function (req, res, next) {
  if (req.files) {
    next()
  } else {
    res.locals.noNewImageToUpload = true
    next()
  }
}

// admin authentication for add/edit/delete functions
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