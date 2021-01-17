const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const passport = require("passport");
const fileUpload = require('express-fileupload');
const cors = require('cors')

// If we are not running in production, load our local .env
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const artworkRouter = require('./routes/artworks_routes');
const authRouter = require('./routes/auth_routes')

const port = process.env.PORT || 3009;

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { expires: 600000 },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// Connecting to database
let dbConn = null

if (process.env.NODE_ENV === 'test') {
  dbConn = 'mongodb://localhost/mern_app'
} else {
  dbConn = process.env.MONGODB_URI || 'mongodb://localhost/mern_app'
}

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

app.use(express.json());
app.use(express.urlencoded({
    extended:true   
}));

// passport
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

// ejs (only for creating admin account)
app.set('view engine', 'ejs')

// file upload for uploading images to amazon s3
app.use(fileUpload());

// cors
app.use(cors())

// Routes

// just for testing
app.get('/', (req,res,next) => {

})

app.use('/artworks', artworkRouter);
app.use('/auth', authRouter)

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

module.exports = {
  app
}