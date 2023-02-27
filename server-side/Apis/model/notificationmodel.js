const mongoose = require("mongoose");

const student = mongoose.Schema({
  title: String,
  url: String,
  validFrom: String,
  validTo: String,
  desc: String,
  postedOn: String,
});
const notificationSchema = mongoose.model("notification", student);
module.exports = notificationSchema;
