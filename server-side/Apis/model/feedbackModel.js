const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
  title: String,
  desc: String,
  subject: String,
  postedOn: String,
  name: String,
  image: String,
});

const feedbackModel = mongoose.model("feedbacks", feedbackSchema);
module.exports = feedbackModel;
