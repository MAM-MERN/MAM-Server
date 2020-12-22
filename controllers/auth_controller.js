const AdminModel = require('../models/admin')

function logout(req, res) {
    req.logout();
    res.send('logged out')
    // res.redirect("/");
}

// registerNew and registerCreate are only for creating the Admin account
function registerNew(req, res) {
    res.render("authentication/register", { loggedIn: req.user });
}

async function registerCreate(req, res, next) {
    const { username, password } = req.body;
    const user = await AdminModel.create({ username, password });
}

module.exports = {
  logout,
  registerCreate,
  registerNew
}