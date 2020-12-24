const {
  getAllArtworks,
  addArtworkToDB
} = require('../utils/artworks_utilities')

const getArtworks = function (req, res) {
    // execute the query from getAllPosts
    // returns artwork in alphabetical order
  getAllArtworks(req)
    .sort({ name: 1 })
    .exec((err, artworks) => {
      if (err) {
        res.status(500);
        return res.json({
        error: err.message
        });
      }
      res.send(artworks);
    });
};

// create a single artwork
const createArtwork = function (req, res) {
  console.log('create artwork');
  addArtworkToDB(req).save((err, artwork) => {
    console.log(artwork);
    if (err) {
      res.status(500);
      return res.json({
        error: err.message
      });
    }
    res.sendStatus(201);
  })
}

module.exports = {
  getArtworks,
  createArtwork
}