const express = require('express');
const mongoose = require('mongoose');

const artworkRouter = require('./routes/artworks_routes');

const port = process.env.port || 3009;

const app = express();

// Connecting to database
const dbConn = 'mongodb://localhost/mern_app'
// Set three properties to avoid deprecation warnings:
// useNewUrlParser: true
// useUnifiedTopology: true
// useFileAndModify: false
mongoose.connect(dbConn, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
},
(err) => {
  if (err) {
    console.log('Error connecting to database', err);
  } else {
    console.log('Connected to database!');
  }
});

// Routes
app.use('/artworks', artworkRouter);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});