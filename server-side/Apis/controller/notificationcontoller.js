const notificationSchema = require("../model/notificationmodel");
const date = require("date-and-time");

const postnotification = async (req, res) => {
  try {
    const { title, url, validFrom, validTo, desc } = req.body;
    console.log("REQ.BODY", req.body);

    const now = new Date();
    const value = date.format(now, "YYYY/MM/DD HH:mm:ss");
    console.log("VALUE", value);
    const temp = {
      title,
      url,
      validFrom,
      validTo,
      desc,
      postedOn: value,
    };
    const data = await notificationSchema.create(temp);

    res.send({ data, message: "success", status: 200, auth: "true" });
  } catch (err) {
    res.send({ message: "failed", status: 400 });
  }
};
const getnotification = async (req, res) => {
  try {
    const data = await notificationSchema.find();
    res.send({ data, message: "success", status: 200, auth: "true" });
  } catch (err) {
    res.send({ message: "failed", status: 400 });
  }
};
const getnotificationById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await notificationSchema.findById(id);
    res.send({ data, message: "success", status: 200, auth: "true" });
  } catch (err) {
    res.send({ message: "failed", status: 400 });
  }
};

const deletenotification = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await notificationSchema.findByIdAndDelete(id);
    res.send({ data, message: "success", status: 200, auth: "true" });
  } catch (err) {
    res.send({ message: "failed", status: 400 });
  }
};

const updatenotification = async (req, res) => {
  try {
    const { id } = req.params;
    const temp = req.body;

    const data = await notificationSchema.findByIdAndUpdate(id, { $set: temp });

    res.send({ data, message: "success", status: 200, auth: "true" });
  } catch (err) {
    res.send({ message: "failed", status: 400 });
  }
};
module.exports = {
  postnotification,
  getnotification,
  deletenotification,
  updatenotification,
  getnotificationById,
};
