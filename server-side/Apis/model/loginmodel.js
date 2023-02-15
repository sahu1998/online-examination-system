const mongoose = require("mongoose");

const login = mongoose.Schema({
  name: String,
  userName: String,
  email: String,
  password: String,
});
const loginSchema = mongoose.model("userDetails", login);
module.exports = loginSchema;