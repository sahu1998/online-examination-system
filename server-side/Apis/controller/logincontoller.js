const loginSchema = require("../Model/loginmodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const postsignupController = async (req, res) => {
  console.log("req.body==>", req.body);
  try {
    const { name, userName, email, password, confirmPassword } = req.body;
    const isExist = await loginSchema.findOne({
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
      const data = await loginSchema.create(temp);
      return res.send({ data, message: "success", status: 200 });
    } else {
      return res.send({ message: "password not match", status: 400 });
    }
  } catch (err) {}
  return res.send({ message: "failed", status: 400 });
};

const postloginController = async (req, res) => {
  try {
    const { name, userName, email, password } = req.body;
    if (email && password) {
      const data = await loginSchema.findOne({
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
        const { email, password, _id } = data;
        const token = jwt.sign({ userId: _id }, process.env.SECRET_KEY, {
          expiresIn: "3h",
        });
        const temp = { email, password, _id };
        temp.token = token;
        console.log("TOKEN", token);
        return res.send({ temp, message: "success", status: 200 });
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

const getloginController = async (req, res) => {
  const data = await loginSchema.find();
  res.send(data);
};

module.exports = {
  postsignupController,
  postloginController,
  getloginController,
};
