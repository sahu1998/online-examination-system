const mongoose = require("mongoose");

const users = mongoose.Schema({
  name: String,
  userName: String,
  email: String,
  password: String,
  image: String,
  role: String,
  status: Boolean,
  phone: String,
  role: {
    type: String,
    enum: ["owner", "admin", "student"],
  },
});
const userSchema = mongoose.model("users", users);
module.exports = userSchema;
