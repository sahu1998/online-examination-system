const multer = require("multer");
const userSchema = require("../model/usersmodel");
const bcrypt = require("bcryptjs");

const postUsersController = async (req, res) => {
  try {
    const { name, userName, email, password, role, status } = req.body;
    const image = req?.file?.path;
    console.log("FILE", image);
    const salt = bcrypt.genSaltSync(10);
    const hashpass = bcrypt.hashSync(password, salt);
    const temp = {
      name,
      userName,
      email,
      password: hashpass,
      image,
      role,
      status,
    };
    const data = await userSchema.create(temp);
    res.send({ data, message: "success", status: 200 });
  } catch (err) {
    res.send({ message: "failed", status: 400 });
  }
};

const getUsersController = async (req, res) => {
  try {
    const data = await userSchema.find(
      {},
      {
        password: 0,
      }
    );
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
    const { name, userName, email, password, role, status } = req.body;
    const image = req?.file?.path;
    console.log("FILE", image);
    const salt = bcrypt.genSaltSync(10);
    const hashpass = bcrypt.hashSync(password, salt);
    const temp = {
      name,
      userName,
      email,
      password: hashpass,
      image,
      role,
      status,
    };
    const data = await userSchema.findByIdAndUpdate(id, { $set: temp });
    res.send({ data, message: "success", status: 200 });
  } catch (err) {
    res.send({ message: "failed", status: 400 });
  }
};
const getByIdUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await userSchema.findById(id);
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
  getByIdUserController,
};
