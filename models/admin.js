const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Admin = new Schema({
  email: {
    type: String,
    required: [true, "Email address is required"]
  },
  password: {
    type: String,
    bcrypt: true,
    required: true
  }
})

Admin.plugin(require('mongoose-bcrypt'));
module.exports = mongoose.model('Admin', Admin);