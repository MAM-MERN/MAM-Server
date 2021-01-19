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
const fs = require("fs");
const artworksUtils = require('../utils/artworks_utilities')

chai.use(chaiHttp)

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

after((done) => {
    mongoose.disconnect(() => done())
})



// ---- UNIT TESTING -------------------------------------------------


// Testing retrieve all artworks query
describe('Retrieving all artworks in the database collection', () => {
  it('Should be an array', async function () {
    await artworksUtils.getAllArtworksFromDB().exec((err, artworks) => {
      expect(artworks).to.be.an('array')
    })
  }),
  it('Should retrieve two artworks', async function () {
    await artworksUtils.getAllArtworksFromDB().exec((err, artworks) => {
      expect(artworks).to.have.lengthOf(2);
    })
  }),
  it('Artist name of first artwork should be "Mr Test"', async function () {
    await artworksUtils.getAllArtworksFromDB().exec((err, artworks) => {
      expect(artworks[0].artist).to.equal('Mr Test');
    })
  })
})

// Testing create an artwork
describe('Create a new Artwork entry', () => {
  it('New entry Artist should equal Request Artist', async function () {
    let req = {
      body: {
        title: 'New Artwork',
        location: 'New Artwork City',
        artist: 'Mr Newton',
        date: '2021',
        details: 'Copper',
        latitude: '100',
        longitude: '100'
      },
      files: {
        image: {
          name: 'new.jpg'
        }
      }
    }
    await artworksUtils.addArtworkToDB(req).save((err, artwork) => {
      expect(artwork.artist).to.equal(req.body.artist)
    })
  })
})

// Testing edit a single artwork query
describe('Edit a single artwork from the database', () => {
  it("Change Artwork1's name to 'Edited Test Artwork 1'", async function () {
    let req = {
      body: {
        title: 'New Edited Test Artwork 1',
        location: '35 Test St, Melbourne',
        artist: 'Mr Test',
        date: '2020',
        details: 'Metal',
        latitude: '20',
        longitude: '20'
      },
      files: {
        image: {
          name: 'test.jpg'
        }
      },
      params: {
        id: artworkId1
      }
    }
    await artworksUtils.updateSingleArtworkFromDB(req).exec((err, updatedArtwork) => {
      expect(updatedArtwork.name).to.equal(req.body.title)
    })
  })
})

// Testing search functionality
describe('Search functionality', () => {
  it("should return Artwork with artist 'Mr Test'", async function () {
    let req = {
      params: {
        search: 'Test Artwork 1'
      }
    }

    await artworksUtils.searchArtworkFromDB(req).exec((err, searchedArtworks) => {
      expect(searchedArtworks[0].artist).to.equal('Mr Test')
    })
  })

  it("should return all artworks with 'test' in it's name", async function () {
    let req = {
      params: {
        search: 'test'
      }
    }

    await artworksUtils.searchArtworkFromDB(req).exec((err, searchedArtworks) => {
      expect(searchedArtworks).to.have.lengthOf(2);
    })
  })
})

// Testing delete single artwork query
describe('Delete a single artwork from the database', () => {
    it('should delete the specified artwork', async function () {
        let req = {
            params: {
                id: artworkId1
            }
        }

        await artworksUtils.deleteSingleArtworkFromDB(req).exec();
        await Artwork.findById(artworkId1).exec((err, artwork1) => {
            expect(artwork1).to.equal(null);
        });
    });
});



// ---- INTEGRATION TESTING ---------------------------------------


// GET '/artworks/' route
// Testing retrieving all artworks from the database
describe('GET /artworks/', () => {
  it('should return all artworks and status 200', () => {
    return chai.request(app)
      .get('/artworks/')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.lengthOf(2);
        expect(res.body[0].artist).to.equal('Mr Test');
      })
      .catch((err) => {
        console.log(err)
      })
  })
})

// POST '/artworks/new/' route
// Testing create a new artwork functionality
describe('POST /artworks/new/', () => {
  it("should return 201 and message 'Created'", () => {
    return chai.request(app)
      .post('/artworks/new/')
      .field('title', 'New Test')
      .field('location', 'New Test')
      .field('artist', 'New Test')
      .field('date', 'New Test')
      .field('details', 'New Test')
      .field('latitude', 'New Test')
      .field('longitude', 'New Test')
      .attach("image", fs.readFileSync('test/Soundgarden-DownOnTheUpside.jpg'), "Soundgarden-DownOnTheUpside.jpg")
      .then((res) => {
        expect(res).to.have.status(201)
        expect(res.text).to.equal('Created')
      })
      .catch((err) => {
        console.log(err)
      })
  })
})

// GET on '/artworks/:search'
// Testing searching functionality
describe('GET /artworks/:search/', () => {
  it("should return status 200 and Artwork name to equal 'Test Artwork 2'", () => {
    return chai.request(app)
      .get('/artworks/Test Artwork 2')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.lengthOf(1);
        expect(res.body[0].name).to.equal('Test Artwork 2');
      })
      .catch((err) => {
        console.log(err)
      })
  })
})

// PUT on '/artworks/edit/:id'
// Testing artwork update functionality
describe('PUT /artworks/edit/:id/', () => {
  it("should return status 200 and message 'update successful'", () => {
    return chai.request(app)
      .put(`/artworks/edit/${artworkId1}`)
      .field('title', 'Edited Test Artwork 1')
      .field('location', '35 Test St, Melbourne')
      .field('artist', 'Edited Mr Test')
      .field('date', '2020')
      .field('details', 'Edited Metal')
      .field('latitude', '20')
      .field('longitude', '20')
      .then((res) => {
        expect(res).to.have.status(200)
        expect(res.body.message).to.equal('update successful')
      })
      .catch((err) => {
        console.log(err)
      })
  })
})

// DELETE on '/artworks/:id'
// Testing delete artwork functionality
describe('DELETE /artworks/:id/', () => {
  it("should return status 202 and message 'Artwork deleted successfully'", () => {
    return chai.request(app)
      .delete(`/artworks/${artworkId2}`)
      .then((res) => {
        expect(res).to.have.status(202);
        expect(res.body.message).to.equal('Artwork deleted successfully');
      })
      .catch((err) => {
        console.log(err)
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