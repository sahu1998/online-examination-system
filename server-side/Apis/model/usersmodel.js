const mongoose = require("mongoose");

const users = mongoose.Schema({
  name: String,
  email: String,
  image: String,
  role: String,
  status: Boolean,
});
const userSchema = mongoose.model("Users", users);
module.exports = userSchema;
