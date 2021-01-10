const express = require('express');
const router = express.Router();
const {
  getArtworks,
  createArtwork,
  updateSingleArtwork,
  getSingleArtwork,
  deleteSingleArtwork
} = require('../controllers/artworks_controller')

const {
  uploadImage,
  deleteImage
} = require('../utils/image_utilities')

const { 
  checkIfNewImageToBeUploaded,
  adminAuthentication
} = require('../utils/common_utilities')

// GET on '/artworks'
// Returns all artworks
router.get('/', getArtworks)

// POST on '/artworks/new'
// Create new artwork
router.post('/new', adminAuthentication, uploadImage, createArtwork)

// GET on '/artworks/:id'
// Retrieve a single artwork
router.get('/:id', getSingleArtwork)

// PUT on '/artwork/edit/:id'
// Edit a single artwork
router.put('/edit/:id', adminAuthentication, checkIfNewImageToBeUploaded, deleteImage, uploadImage, updateSingleArtwork)

// DELETE on '/artwork/:id'
// Delete a single artwork
router.delete('/:id', adminAuthentication, deleteImage, deleteSingleArtwork)

module.exports = router;