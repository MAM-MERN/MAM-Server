const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const passport = require("passport");

const artworkRouter = require('./routes/artworks_routes');
const authRouter = require('./routes/auth_routes')

const port = process.env.port || 3009;

const app = express();

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

// passport
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

// ejs (only for creating admin account)
app.set('view engine', 'ejs')


// Routes
app.get('/', (req,res) => {
    console.log(req.body.username);
    console.log(req.body.password)
    console.log(req.session);
    console.log(req.user);
  }
)

app.use('/artworks', artworkRouter);
app.use('/auth', authRouter)

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});