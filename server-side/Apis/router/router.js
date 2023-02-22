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
} = require("../controller/practiceExamController");
const {
  postFeedbackController,
  getFeedbackController,
  getByIdFeedbackController,
  deleteFeedbackController,
} = require("../controller/feedbackcontoller");
// const {
//   getloginController,
//   postsignupController,
//   postloginController,
// } = require("../controller/logincontoller");
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
  postloginController,
  postsignupController,
} = require("../controller/userscontroller");
const { auth, uploadUserImage, uploadFeedbackImage } = require("../middleware");
const {
  uploadSubjectImage,
  uploadLmsSubImage,
  uploadLmsCatImage,
} = require("../middleware");
const router = express.Router();

router.post("/post-exam-catg", postExamCatgController);
router.get("/get-exam-catg", getExamCatgController);
router.delete("/del-practice-catg/:id", deleteExamCatgController);
router.get("/about", getAboutController);

router.post(
  "/postsubject",
  uploadSubjectImage.single("image"),
  postSubjectController
);
router.post("/postques/:id", postQuesInSubjController);
router.put("/add-que-in-subj/:id", pushQuesInSubjController);
router.get("/get-practice-ques/:id", getPracticeQuesController);
router.get("/getsubject", getAllSubjectController);
router.get("/getsubjectbycatg/:id", getSubjectByCatgController);
router.get("/get-random-subjects", getRandomSubjController);

// router.get("/get-login/:token", auth, getloginController);

router.post("/post-signup", postsignupController);
router.post("/post-login", postloginController);
// router.post("/verify", auth);
router.post("/verificationEmail", verificationEmail);
router.post("/resetPassword/:id/:token", updatePassword);

router.use("/subject", express.static("storage/subjects"));
router.use("/feedback", express.static("storage/feedbackImages"));

router.post("/post-users/:token", uploadUserImage, postUsersController);
router.get("/get-users/:token", getUsersController);
router.delete("/delete-users/:token/:id", deleteUsersController);
router.put("/put-users/:token/:id", uploadUserImage, putUsersController);
router.post(
  "/post-feedback/:token",
  uploadFeedbackImage,
  postFeedbackController
);
router.get("/get-feedback/:token", getFeedbackController);
router.delete("/delete-feedback/:token/:id", deleteFeedbackController);

router.get("/getByUserId/:id", getByIdUserController);
router.get("/get-feedbackaggregate/:token", getByIdFeedbackController);

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

module.exports = router;
