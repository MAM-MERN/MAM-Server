const express = require('express');
const router = express.Router();
const {
  getArtworks,
  createArtwork,
  uploadImage
} = require('../controllers/artworks_controller')

// GET on '/artworks'
// Returns all artworks
router.get('/', getArtworks)

// POST on '/artworks/new'
// Create new artwork
router.post('/new', uploadImage, createArtwork)

module.exports = router;