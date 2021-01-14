const express = require('express');
const router = express.Router();
const {
  getArtworks,
  createArtwork,
  updateSingleArtwork,
  searchArtwork,
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

// GET on '/artworks/:search'
// Retrieve all artworks given a search term
router.get('/:search', searchArtwork)

// PUT on '/artwork/edit/:id'
// Edit a single artwork
router.put('/edit/:id', adminAuthentication, checkIfNewImageToBeUploaded, deleteImage, uploadImage, updateSingleArtwork)

// DELETE on '/artwork/:id'
// Delete a single artwork
router.delete('/:id', adminAuthentication, deleteImage, deleteSingleArtwork)

module.exports = router;