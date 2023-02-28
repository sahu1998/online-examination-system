const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
  title: String,
  subject: String,
  desc: String,
  postedOn: String,
  userId: mongoose.Schema.Types.ObjectId,
});

const feedbackModel = mongoose.model("feedbacks", feedbackSchema);
module.exports = feedbackModel;
