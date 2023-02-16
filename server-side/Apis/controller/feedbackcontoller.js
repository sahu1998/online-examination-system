const multer = require("multer");
const feedbackModel = require("../model/feedbackModel");
const date = require("date-and-time");

const postFeedbackController = async (req, res) => {
  try {
    const { title, desc, subject, name } = req.body;
    console.log("REQ.BODY", req.body);
    const image = req.file.path;
    console.log("FILE", image);

    const now = new Date();
    const value = date.format(now, "YYYY/MM/DD HH:mm:ss");
    console.log("VALUE", value);
    const temp = {
      title,
      desc,
      subject,
      postedOn: value,
      name,
      image,
    };
    const data = await feedbackModel.create(temp);

    res.send({ data, message: "success", status: 200 });
  } catch (err) {
    res.send({ message: "failed", status: 400 });
  }
};

const getFeedbackController = async (req, res) => {
  try {
    const data = await feedbackModel.find();
    res.send({ data, message: "success", status: 200 });
  } catch (err) {
    res.send({ message: "failed", status: 400 });
  }
};

module.exports = {
  postFeedbackController,
  getFeedbackController,
};
