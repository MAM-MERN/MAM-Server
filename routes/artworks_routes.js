const express = require('express');
const router = express.Router();
const {
  getArtworks,
  createArtwork,
  editArtwork,
  getSingleArtwork,
  deleteSingleArtwork
} = require('../controllers/artworks_controller')

const {
  uploadImage,
  deleteImage
} = require('../utils/image_utilities')

// GET on '/artworks'
// Returns all artworks
router.get('/', getArtworks)

// POST on '/artworks/new'
// Create new artwork
router.post('/new', uploadImage, createArtwork)

// GET on '/artworks/:id'
// Retrieve a single artwork
router.get('/:id', getSingleArtwork)

// PUT on '/artwork/edit/:id'
// Edit a single artwork
// router.put('/:id', editArtwork)

// DELETE on '/artwork/:id'
// Delete a single artwork
router.delete('/:id', deleteImage, deleteSingleArtwork)

module.exports = router;