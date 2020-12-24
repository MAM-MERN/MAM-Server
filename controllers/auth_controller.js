const AdminModel = require('../models/admin')
const passport = require("passport");

async function loginAdmin(req, res, next) {
  console.log('logging in Admin');
  const passportLogin = passport.authenticate("local");
  await passportLogin(req, res, next)
}

function sendAdmin(req, res) {
  console.log('sending admin session info');
  res.json({
    admin: req.user,
    sessionID: req.sessionID
  })
}

function logout(req, res) {
  if (req.isAuthenticated()) {
    req.logout()
    return res.sendStatus(200)
  }

  return res.sendStatus(401)
}

// registerNew and registerCreate are only for creating the Admin account
function registerNew(req, res) {
    res.render("authentication/register");
}

async function registerCreate(req, res, next) {
    const { username, password } = req.body;
    const user = await AdminModel.create({ username, password });
    res.redirect('/')
}

module.exports = {
  loginAdmin,
  sendAdmin,
  logout,
  registerCreate,
  registerNew
}