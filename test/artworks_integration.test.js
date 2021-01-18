if(process.env.NODE_ENV !== 'production') {
  process.env.NODE_ENV = 'test'
  require('dotenv').config({path: '../'});
}

const expect = require('chai').expect
const chai = require('chai')
const { app } = require('../app')
const chaiHttp = require('chai-http');
const Artwork = require('../models/artwork')
const mongoose = require('mongoose');

chai.use(chaiHttp)

let artworkId1 = null;
let artworkId2 = null;

// Set up test data before each test
before(async function () {
    // Load two test records in setupData
    // Use await so we can access the postId, which is used by some tests
    let artwork1 = await setupData1();
    artworkId1 = artwork1._id;
    let artwork2 = await setupData2();
    artworkId2 = artwork2._id;
});

// Delete test data after each test
after((done) => {
    // Execute the deleteMany query
    tearDownData().exec(() => done());
});

describe('GET /artworks/', () => {
  it('Retrieve all artworks', (done) => {
    chai.request(app)
      .get('/artworks/')
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(200);
        expect(res.body).to.have.lengthOf(2);
        expect(res.body[0].artist).to.equal('Mr Test');
        done()
      })
  })
})

// Setup and tear down functions

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
    testArtwork1.image = `https://${process.env.AWS_S3_BUCKET}.s3-ap-southeast-2.amazonaws.com/test.jpg`
    testArtwork1.imageFileName = 'test.jpg'

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
    testArtwork2.image = `https://${process.env.AWS_S3_BUCKET}.s3-ap-southeast-2.amazonaws.com/mock.jpg`
    testArtwork2.imageFileName = 'mock.jpg'

    return Artwork.create(testArtwork2);
}

function tearDownData() {
    return Artwork.deleteMany();
}