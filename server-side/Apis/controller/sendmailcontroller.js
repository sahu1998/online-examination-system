const nodemailer = require("nodemailer");
const loginSchema = require("../Model/loginmodel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const sendEmail = async ({ link, email }) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",

    auth: {
      user: "aarupatidar4169@gmail.com",
      pass: "nkhgpvzhfdvrtbov",
    },
  });

  const mailOption = {
    from: "aarupatidar4169@gmail.com",
    to: email,
    subject: "sending email",
    text: link,
  };
  await transporter.sendMail(mailOption, function (error, res) {
    if (error) {
      console.log("ERROR", error);
      return res.send({ message: "error", status: 400 });
    } else {
      console.log("Email Sent", res);
      return res.send({ res, message: "email sent", status: 200 });
    }
  });
};

const verificationEmail = async (req, res) => {
  const { email } = req.body;
  console.log("Email", email);
  try {
    if (email) {
      const oldUser = await loginSchema.findOne({
        email,
      });
      console.log("OLDUSER", oldUser);

      if (!oldUser) {
        return res.send({ message: "email does not exits", status: 400 });
      } else {
        const secret = process.env.SECRET_KEY + oldUser?.password;
        console.log("OLDUSERR", oldUser.email);

        const token = jwt.sign(
          { email: oldUser.email, id: oldUser._id },
          secret,
          { expiresIn: "5m" }
        );
        const link = `http://localhost:3000/resetPassword/${oldUser._id}/${token}`;
        console.log("LINK", link);
        sendEmail({ link, email });
        return res.send({ message: "email sent successfully", status: 200 });
      }
    } else {
      return res.send({ message: "please enter your email", status: 400 });
    }
  } catch (err) {
    console.log("Error", err);
    return res.send({ message: "faild", status: 400 });
  }
};

const updatePassword = async (req, res) => {
  const { id, token } = req.params;
  console.log("ID===>", id, "TOKEN===>", token, "body===>", req.body);
  const { password, confirmPassword } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashpass = bcrypt.hashSync(password, salt);
  const oldUser = await loginSchema.findOne({ _id: id });
  if (!oldUser) {
    return res.send({ message: "email does not exits", status: 400 });
  }
  const secret = process.env.SECRET_KEY + oldUser.password;

  try {
    const verify = jwt.verify(token, secret);
    console.log("VERIFY", verify);
    if (verify.email === oldUser.email) {
      if (!!confirmPassword) {
        if (password === confirmPassword) {
          await loginSchema.updateOne(
            { _id: id },
            { $set: { password: hashpass } }
          );

          return res.send({
            message: "password update successfully",
            status: 200,
          });
        } else {
          return res.send({ message: "password does not match", status: 400 });
        }
      } else {
        return res.send({ message: "please enter password", status: 400 });
      }
    } else {
      return res.send({ message: "invalid token", status: 400 });
    }
  } catch (err) {
    return res.send({ message: err.message, status: 400 });
  }
};

module.exports = { verificationEmail, updatePassword };
