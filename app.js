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

// use cors if we want to play with a client
app.use(cors())

app.use(session({
  secret: 'mam server',
  resave: false,
  saveUninitialized: true,
  cookie: { expires: 600000 },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.use(express.json());
app.use(express.urlencoded({
    extended:true   
}));

// Connecting to database
const dbConn = process.env.MONGODB_URI || 'mongodb://localhost/mern_app'

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

// passport
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

// ejs (only for creating admin account)
app.set('view engine', 'ejs')

// file upload for uploading images to amazon s3
app.use(fileUpload());


// Routes

// just for testing
app.get('/', (req,res,next) => {

})

app.use('/artworks', artworkRouter);
app.use('/auth', authRouter)

module.exports = app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});