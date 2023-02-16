const multer = require("multer");
const userSchema = require("../model/usersmodel");

const postUsersController = async (req, res) => {
  try {
    const { name, email, role, status } = req.body;
    const image = req.file.path;
    console.log("FILE", image);
    const temp = { name, email, image, role, status };
    const data = await userSchema.create(temp);
    res.send({ data, message: "success", status: 200 });
  } catch (err) {
    res.send({ message: "failed", status: 400 });
  }
};

const getUsersController = async (req, res) => {
  try {
    const data = await userSchema.find();
    res.send({ data, message: "success", status: 200 });
  } catch (err) {
    res.send({ message: "failed", status: 400 });
  }
};

const deleteUsersController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await userSchema.findByIdAndDelete(id);
    res.send({ data, message: "success", status: 200 });
  } catch (err) {
    res.send({ message: "failed", status: 400 });
  }
};
const putUsersController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, status } = req.body;
    const file = req.files;
    console.log("FILE", file);
    const array = file?.map((value) => value.path);

    const temp = { name, email, image: array, role, status };
    const data = await userSchema.findByIdAndUpdate(id, { $set: temp });
    res.send({ data, message: "success", status: 200 });
  } catch (err) {
    res.send({ message: "failed", status: 400 });
  }
};
module.exports = {
  postUsersController,
  getUsersController,
  deleteUsersController,
  putUsersController,
};
