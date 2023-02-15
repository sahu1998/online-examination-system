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
const subjectLmsStorage = multer.diskStorage({
    
  destination: (req, file, cb) => {
    console.log("mahi ===============");
    cb(null, "./storage/subject");
  },
  filename: (req, file, cb) => {
    console.log("file.....", file);
    cb(null,file.originalname);
  },
});
const uploadLmsSubImage = multer({
  storage: subjectLmsStorage,
  limits:{fileSize:1000000}
});
module.exports = { uploadSubjectImage,uploadLmsSubImage };
