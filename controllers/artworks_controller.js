const {
  getAllArtworks
} = require('../utils/artworks_utilities')

const getArtworks = function (req, res) {
    // execute the query from getAllPosts
    getAllArtworks(req).
    exec((err, artworks) => {
        if (err) {
            res.status(500);
            return res.json({
                error: err.message
            });
        }
        res.send(artworks);
    });
};

module.exports = {
  getArtworks
}