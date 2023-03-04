const multer = require("multer");
const userSchema = require("../model/usersmodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const axios = require("axios");
const secret_key = "6LeHNZokAAAAADpDro3y7rWF0E0cxtDUc90-zLLt";

const postsignupController = async (req, res) => {
  console.log("req.body==>", req.body);
  try {
    const { name, userName, email, password, confirmPassword, reCaptcha } =
      req.body;
    const recaptchaData = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${reCaptcha}`
    );

    const isExist = await userSchema.findOne({
      email,
    });
    if (isExist) {
      return res.send({ message: "email already exits" });
    }

    if (password === confirmPassword) {
      const salt = bcrypt.genSaltSync(10);
      const hashpass = bcrypt.hashSync(password, salt);
      const temp = {
        name,
        userName,
        email,
        password: hashpass,
      };
      console.log("==========>", temp);

      console.log("hhhhh: ", recaptchaData.data);
      if (recaptchaData.data.success) {
        const data = await userSchema.create({ ...temp, role: "student" });
        return res.send({ data, message: " recaptcha is valid", status: 200 });
      } else {
        return res.send({ message: "recaptcha is not valid", status: 400 });
      }
    } else {
      return res.send({ message: "password not match", status: 400 });
    }
  } catch (err) {
    return res.send({ message: "failed", status: 400 });
  }
};
const postloginController = async (req, res) => {
  console.log("body", req.body);
  try {
    const { email, password } = req.body;
    if (email && password) {
      const data = await userSchema.findOne({
        email,
      });

      console.log("data", data);
      if (!data) {
        return res.send({ message: "email not found", status: 400 });
      }

      const checkPass = bcrypt.compareSync(password, data.password);
      console.log("check=====>", checkPass);
      if (!checkPass) {
        return res.send({ message: "password not match", status: 400 });
      }

      if (data) {
        const { email, password, _id, role } = data;
        const token = jwt.sign({ userId: _id }, process.env.SECRET_KEY, {
          expiresIn: "7h",
        });
        const temp = { email, password, _id, role };
        temp.token = token;
        console.log("TOKEN", token);
        if (temp.role === req.body.role) {
          return res.send({ temp, message: "success", status: 200 });
        } else {
          return res.send({ message: "invalid user", status: 400 });
        }
      } else {
        return res.send({ message: "invalid email and password", status: 400 });
      }
    } else {
      return res.send({ message: "all feilds required", status: 400 });
    }
  } catch (err) {
    return res.send({ message: "faildd", status: 400 });
  }
};

const getUsersController = async (req, res) => {
  try {
    const data = await userSchema.find(
      {},
      {
        userName: 0,
      }
    );
    res.send({ data, message: "success", status: 200, auth: "true" });
  } catch (err) {
    res.send({ message: "failed", status: 400 });
  }
};

const deleteUsersController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await userSchema.findByIdAndDelete(id);
    res.send({ data, message: "success", status: 200, auth: "true" });
  } catch (err) {
    res.send({ message: "failed", status: 400 });
  }
};
const putUsersController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, userName, email, role, status, phone } = req.body;
    const image = req?.file?.path;
    console.log("FILE", image);

    const temp = {
      name,
      userName,
      email,

      image,
      role,
      status,
      phone,
    };
    const data = await userSchema.findByIdAndUpdate(id, { $set: temp });
    res.send({ data, message: "success", status: 200, auth: "true" });
  } catch (err) {
    res.send({ message: "failed", status: 400 });
  }
};
const getByIdUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await userSchema.findById(id);
    res.send({ data, message: "success", status: 200, auth: "true" });
  } catch (err) {
    res.send({ message: "failed", status: 400 });
  }
};
module.exports = {
  getUsersController,
  deleteUsersController,
  putUsersController,
  getByIdUserController,
  postsignupController,
  postloginController,
};
