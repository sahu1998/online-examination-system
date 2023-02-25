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

const subjectLmsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("mahi ===============");
    cb(null, "./storage/lmssubject");
  },
  filename: (req, file, cb) => {
    console.log("file.....", file);
    cb(null, file.originalname);
  },
});
const uploadLmsSubImage = multer({
  storage: subjectLmsStorage,
  limits: { fileSize: 1000000 },
});
const categoryLmsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("mahi ===============");
    cb(null, "./storage/lmscategory");
  },
  filename: (req, file, cb) => {
    console.log("file.....", file);
    cb(null, file.originalname);
  },
});
const uploadLmsCatImage = multer({
  storage: categoryLmsStorage,
  limits: { fileSize: 1000000 },
});

const viewLmsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("mahi ===============");
    cb(null, "./storage/viewpdf");
  },
  filename: (req, file, cb) => {
    console.log("file.....", file);
    cb(null, file.originalname);
    console.log("null",file.originalname);
  },
});
const uploadLmsViewPdf = multer({
  storage:viewLmsStorage,
  // limits: { fileSize: 1000000 },
});
module.exports = {
  uploadSubjectImage,
  uploadLmsSubImage,
  uploadLmsCatImage,
  auth,
  uploadUserImage,
  uploadFeedbackImage,
  uploadLmsViewPdf, 
};
