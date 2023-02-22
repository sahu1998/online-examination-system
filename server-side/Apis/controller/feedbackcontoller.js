const multer = require("multer");
const feedbackModel = require("../model/feedbackModel");
const date = require("date-and-time");

const postFeedbackController = async (req, res) => {
  try {
    const { title, desc, subject, id } = req.body;
    console.log("REQ.BODY", req.body);

    const now = new Date();
    const value = date.format(now, "YYYY/MM/DD HH:mm:ss");
    console.log("VALUE", value);
    const temp = {
      title,
      desc,
      subject,
      postedOn: value,
      userId: id,
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
const deleteFeedbackController = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await feedbackModel.findByIdAndDelete(id);
    res.send({ data, message: "success", status: 200 });
  } catch (err) {
    res.send({ message: "failed", status: 400 });
  }
};

const getByIdFeedbackController = async (req, res) => {
  try {
    const data = await feedbackModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "comments",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$comments", 0] }, "$$ROOT"],
          },
        },
      },
      {
        $project: {
          title: 1,
          image: 1,
          name: 1,
          subject: 1,
          desc: 1,
          postedOn: 1,
          status: 1,
        },
      },
    ]);
    res.send({ data, message: "success", status: 200 });
  } catch (err) {
    res.send({ message: "faild", status: 400 });
  }
};

module.exports = {
  postFeedbackController,
  getFeedbackController,
  deleteFeedbackController,

  getByIdFeedbackController,
};
