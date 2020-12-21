const express = require('express');
const router = express.Router();
const {
  getArtworks
} = require('../controllers/artworks_controller')

// Get on '/artworks'
// Returns all artworks
router.get('/', getArtworks)

module.exports = router;