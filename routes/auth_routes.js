const express = require('express');
const router = express.Router();
const { loginAdmin, sendAdmin, logout, registerNew, registerCreate } = require('../controllers/auth_controller')

router.post("/login", loginAdmin, sendAdmin);

router.get('/logout', logout)

// just for creating the Admin user account with an encrypted password
// router.get('/register', registerNew);
// router.post('/register', registerCreate);

module.exports = router;