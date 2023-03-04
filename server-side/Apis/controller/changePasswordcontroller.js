const userSchema = require("../model/usersmodel");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const changePasswordController = async (req, res) => {
  console.log("body", req.body);
  const { id } = req.params;

  const { oldPassword, newPassword, retypePassword } = req.body;
  const oldUser = await userSchema.findOne({ _id: id });
  console.log("OLDUSER", oldUser.password);
  console.log("OLDPassword", oldPassword);

  const checkPassword = bcrypt.compareSync(oldPassword, oldUser.password);
  console.log("checkkk=====>", checkPassword);
  if (!checkPassword) {
    return res.send({ message: "password not match", status: 400 });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashpass = bcrypt.hashSync(newPassword, salt);
  try {
    if (!!retypePassword) {
      if (newPassword === retypePassword) {
        await userSchema.updateOne(
          { _id: id },
          { $set: { password: hashpass } }
        );

        return res.send({
          message: "password update successfully",
          status: 200,
          auth: "true",
        });
      } else {
        return res.send({ message: "password does not match", status: 400 });
      }
    } else {
      return res.send({ message: "please enter password", status: 400 });
    }
  } catch (err) {
    return res.send({ message: err.message, status: 400 });
  }
};
module.exports = { changePasswordController };
