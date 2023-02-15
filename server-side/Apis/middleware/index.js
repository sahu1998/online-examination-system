const multer = require("multer");

require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const { token } = req.params;
  console.log("token===========>", token);

  if (!token) {
    return res.send({
      status: 400,
      auth: false,
      message: "token not provided",
    });
  }

  jwt.verify(
    token || req.body.token || req.headers.token,
    process.env.SECRET_KEY,
    (err, valid) => {
      console.log("err", err);
      console.log("valid", valid);
      if (err) {
        return res.send({ status: 400, auth: false });
      }
      next();
    }
  );
};

const subjectStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./storage/subjects");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const uploadSubjectImage = multer({
  storage: subjectStorage,
  limits: { fileSize: 1000000 },
});

const userStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./storage/userImages");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadUsers = multer({
  storage: userStorage,
});
const uploadUserImage = uploadUsers.single("image");

const feedbackStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./storage/feedbackImages");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadFeedback = multer({
  storage: feedbackStorage,
});
const uploadFeedbackImage = uploadFeedback.single("image");

module.exports = {
  uploadSubjectImage,
  auth,
  uploadUserImage,
  uploadFeedbackImage,
};
