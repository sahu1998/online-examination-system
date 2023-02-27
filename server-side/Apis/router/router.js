const express = require("express");
const {
  getAboutController,
  PostLmsSubController,
  getLmsSubController,
  PostLmsCatController,
  getLmsCatController,
  getRandomLmsSubController,
} = require("../controller/controller");
const {
  postExamCatgController,
  getExamCatgController,
  postSubjectController,
  postQuesInSubjController,
  pushQuesInSubjController,
  getAllSubjectController,
  getSubjectByCatgController,
  getRandomSubjController,
  getPracticeQuesController,
  deleteExamCatgController,
  putExamCatgController,
  deletePracticeSubjController,
  putPracticeSubjController,
  temp,
} = require("../controller/practiceExamController");
const {
  postFeedbackController,
  getFeedbackController,
} = require("../controller/feedbackcontoller");
const {
  getloginController,
  postsignupController,
  postloginController,
} = require("../controller/logincontoller");
const {
  verificationEmail,
  updatePassword,
} = require("../controller/sendmailcontroller");
const {
  postUsersController,

  getUsersController,
  deleteUsersController,
  putUsersController,

  getByIdUserController,
} = require("../controller/userscontroller");
const {
  auth,
  uploadUserImage,
  uploadFeedbackImage,
  uploadQuiz,
  convertExcelToJson,
  convertExcelToJson2,
} = require("../middleware");
const {
  uploadSubjectImage,
  uploadLmsSubImage,
  uploadLmsCatImage,
} = require("../middleware");
const router = express.Router();

router.post("/post-exam-catg", postExamCatgController);
router.get("/get-exam-catg", getExamCatgController);
router.delete("/del-practice-catg/:id", deleteExamCatgController);
router.put("/update-practice-catg/:id", putExamCatgController);
router.get("/about", getAboutController);

router.post(
  "/postsubject",
  uploadSubjectImage.single("image"),
  postSubjectController
);
router.delete("/delete-practice-subj/:id", deletePracticeSubjController);
router.put("/update-practice-subj/:id", putPracticeSubjController);
router.post(
  "/postques/:id",
  uploadQuiz.single("quiz"),
  convertExcelToJson,
  postQuesInSubjController
);
router.put("/add-que-in-subj/:id", pushQuesInSubjController);
router.get("/get-practice-ques/:id", getPracticeQuesController);
router.get("/getsubject", getAllSubjectController);
router.get("/getsubjectbycatg/:id", getSubjectByCatgController);
router.get("/get-random-subjects", getRandomSubjController);

router.get("/get-login/:token", auth, getloginController);

router.post("/post-signup", postsignupController);
router.post("/post-login", postloginController);
// router.post("/verify", auth);
router.post("/verificationEmail", verificationEmail);
router.post("/resetPassword/:id/:token", updatePassword);

router.use("/subject", express.static("storage/subjects"));
router.use("/feedback", express.static("storage/feedbackImages"));

router.post("/post-users", uploadUserImage, postUsersController);
router.get("/get-users", getUsersController);
router.delete("/delete-users/:id", deleteUsersController);
router.put("/put-users/:id", uploadUserImage, putUsersController);
router.post("/post-feedback", uploadFeedbackImage, postFeedbackController);
router.get("/get-feedback", getFeedbackController);
router.get("/getByUserId/:id", getByIdUserController);

router.use("/lms-sub", express.static("storage/lmssubject"));
router.use("/lms-cat", express.static("storage/lmscategory"));
router.use("/storage/userImages", express.static("storage/userImages"));

router.post(
  "/postLmsSub",
  uploadLmsSubImage.single("image"),
  PostLmsSubController
);
router.get("/getLmsSub", getLmsSubController);
router.post(
  "/postLmsCat",
  uploadLmsCatImage.single("image"),
  PostLmsCatController
);
router.get("/getLmsCat", getLmsCatController);
router.get("/getRandomLmsSub", getRandomLmsSubController);

router.post(
  "/exceltojson",
  uploadQuiz.single("quiz"),
  convertExcelToJson,
  (req, res) => {
    const data = req.quiz.map((obj) => {
      return {
        question: obj.question,
        options: obj.options.split(";"),
        answer: parseInt(obj.answer),
      };
    });
    res.send(data);
  }
);

module.exports = router;
