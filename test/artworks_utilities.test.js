const expect = require('chai').expect
const artworksUtils = require('../utils/artworks_utilities')
const mongoose = require('mongoose');
const Artwork = require('../models/artwork')


// set up connection for test database
const dbConn = 'mongodb://localhost/mern_app_test'

// Use done to deal with asynchronous code - done is called when the hooks completes
before((done) => connectToDb(done));

// Disconnect from the test database after all tests run. Call done to indicate complete.
after((done) => {
    mongoose.disconnect(() => done())
})

let artworkId1 = null;
let artworkId2 = null;

// Set up test data before each test
beforeEach(async function () {
    // Load two test records in setupData
    // Use await so we can access the postId, which is used by some tests
    let artwork1 = await setupData1();
    artworkId1 = artwork1._id;
    let artwork2 = await setupData2();
    artworkId2 = artwork2._id;
});

// Delete test data after each test
afterEach((done) => {
    // Execute the deleteMany query
    tearDownData().exec(() => done());
});

describe('Retrieving all artworks in the database collection', () => {
  it('Should be an array', async function () {
    await artworksUtils.getAllArtworks().exec((err, artworks) => {
      expect(artworks).to.be.an('array')
    })
  }),
  it('Should retrieve two artworks', async function () {
    await artworksUtils.getAllArtworks().exec((err, artworks) => {
      expect(artworks).to.have.lengthOf(2);
    })
  }),
  it('Artist name of first artwork should be "Mr Test"', async function () {
    await artworksUtils.getAllArtworks().exec((err, artworks) => {
      expect(artworks[0].artist).to.equal('Mr Test');
    })
  })
})

// Setup and tear down functions

// Connect to the test database
function connectToDb(done) {
    // Connect to the database (same as we do in app.js)
    mongoose.connect(dbConn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        },
        (err) => {
            if (err) {
                console.log('Error connecting to database', err);
                done();
            } else {
                console.log('Connected to database!');
                done();
            }
        });
}

function setupData1() {
    let testArtwork1 = {};
    testArtwork1.name = 'Test Artwork 1';
    testArtwork1.addresspt = '35 Test St, Melbourne';
    testArtwork1.artist = 'Mr Test'
    testArtwork1.artdate = '2020'
    testArtwork1.structure_ = 'Metal'
    testArtwork1.geom = {}
    testArtwork1.geom.latitude = '20'
    testArtwork1.geom.longitude = '20'
    testArtwork1.easting = '30'
    testArtwork1.northing = '30'
    testArtwork1.image = 'http://www.test.com/test.jpg'

    return Artwork.create(testArtwork1);
}

function setupData2() {
    let testArtwork2 = {};
    testArtwork2.name = 'Test Artwork 2';
    testArtwork2.addresspt = '707 Mock St, Southbank';
    testArtwork2.artist = 'Lord Testington'
    testArtwork2.artdate = '2015'
    testArtwork2.structure_ = 'Some kind of alloy'
    testArtwork2.geom = {}
    testArtwork2.geom.latitude = '50'
    testArtwork2.geom.longitude = '50'
    testArtwork2.easting = '100'
    testArtwork2.northing = '100'
    testArtwork2.image = 'http://www.artworks.com/mock.jpg'

    return Artwork.create(testArtwork2);
}

function tearDownData() {
    return Artwork.deleteMany();
}