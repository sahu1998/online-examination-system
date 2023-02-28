const multer = require("multer");
const path = require("path");
const xlsxtojson = require("xlsx-to-json-lc");
const xlstojson = require("xls-to-json-lc");
const ExcelJS = require("exceljs");
const XLSX = require("xlsx");

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
const quizStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./storage/quizes");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const uploadQuiz = multer({
  storage: quizStorage,
  // limits: { fileSize: 1000000 },
  fileFilter: (req, file, callback) => {
    var ext = path.extname(file.originalname);
    if (ext !== ".xlsx" && ext !== ".xls") {
      callback(new Error("Only excel file are allowed"));
    } else {
      callback(null, true);
    }
  },
});

const convertExcelToJson2 = (req, res, next) => {
  let exceltojson;
  console.log("file details: ", req.file);
  if (
    req.file.originalname.split(".")[
      req.file.originalname.split(".").length - 1
    ] === "xlsx"
  ) {
    exceltojson = xlsxtojson;
  } else {
    exceltojson = xlstojson;
  }

  try {
    exceltojson(
      {
        input: req.file.path, //the same path where we uploaded our file
        output: null, //since we don't need output.json
        lowerCaseHeaders: true,
      },
      function (err, result) {
        if (err) {
          res.send({ error_code: 1, err_desc: err, data: null });
        }
        req.quiz = result;
        next();
        // res.send({ error_code: 0, err_desc: null, data: result });
      }
    );
  } catch (e) {
    res.send({ error_code: 1, err_desc: "Corupted excel file" });
  }

  // res.send(req.file);
};

const convertExcelToJson = (req, res, next) => {
  const workbook = XLSX.readFile(req.file.path);
  // console.log("workbook: ", workbook);
  const sheetName = workbook.SheetNames[0];
  const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  const jsonData = JSON.stringify(sheetData);
  const jsonObj = JSON.parse(jsonData);
  req.quiz = jsonObj;
  next();
};
module.exports = {
  uploadSubjectImage,
  uploadLmsSubImage,
  uploadLmsCatImage,
  auth,
  uploadUserImage,
  uploadFeedbackImage,
  uploadLmsViewPdf, 
  uploadQuiz,
  convertExcelToJson,
  convertExcelToJson2,
};
