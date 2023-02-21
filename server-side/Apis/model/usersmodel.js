const mongoose = require("mongoose");

const users = mongoose.Schema({
  name: String,
  userName: String,
  email: String,
  password: String,
  image: String,
  role: String,
  status: Boolean,
});
const userSchema = mongoose.model("Users", users);
module.exports = userSchema;
