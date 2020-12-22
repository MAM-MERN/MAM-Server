const express = require('express');
const router = express.Router();
const passport = require("passport");
const { logout, registerNew, registerCreate } = require('../controllers/auth_controller')

router.post("/login",
passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: "/auth/login"
}));

router.get('/logout', logout)

// just for creating the Admin user account with an encrypted password
// router.get('/register', registerNew);
// router.post('/register', registerCreate);

module.exports = router;