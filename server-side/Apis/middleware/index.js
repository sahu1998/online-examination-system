const multer = require("multer");

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

module.exports = { uploadSubjectImage };
