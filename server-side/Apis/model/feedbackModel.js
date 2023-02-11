const mongoose = require("mongoose");
require("../../dbConnection");

const feedbackSchema = mongoose.Schema({
  feedbackTitle: String,
  feedbackDesc: String,
  feedbackSubj: String,
  postedOn: mongoose.Schema.Types.Date,
  studentName: String,
  studentImg: String,
});

const feedbackModel = mongoose.model("feedbacks", feedbackSchema);

const postFeedbackData = async (values) => {
  try {
    const result = await feedbackModel.create(values);
    return { response: result, status: 200, message: "success" };
  } catch (error) {
    return { error, status: 400, message: "error" };
  }
};

const getAllFeedbackData = async () => {
  try {
    const result = await feedbackModel.find();
    return { response: result, status: 200, message: "success" };
  } catch (error) {
    return { error, status: 400, message: "error" };
  }
};

const deleteFeedbackData = async (id) => {
  try {
    const result = await feedbackModel.findByIdAndDelete(id);
    return { response: result, status: 200, message: "success" };
  } catch (error) {
    return { error, status: 400, message: "error" };
  }
};

module.exports = {
  // postModel,
  postFeedbackData,
  getAllFeedbackData,
  deleteFeedbackData,
};
