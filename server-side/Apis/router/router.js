const express = require("express");
const {
  getAboutController,
  PostLmsSubController,
  getLmsSubController,
  PostLmsCatController,
  getLmsCatController,
  getRandomLmsSubController,
  deleteLmsCatController,
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
router.get("/about", getAboutController);

router.post(
  "/postsubject",
  uploadSubjectImage.single("image"),
  postSubjectController
);
router.post("/postques/:id", postQuesInSubjController);
router.put("/add-que-in-subj/:id", pushQuesInSubjController);

router.get("/getsubject", getAllSubjectController);
router.get("/getsubjectbycatg/:id", getSubjectByCatgController);
router.get("/get-random-subjects", getRandomSubjController);

router.get("/get-login/:token", auth, getloginController);

router.post("/post-signup", postsignupController);
router.post("/post-login", postloginController);
router.post("/verify", auth);
router.post("/verificationEmail", verificationEmail);
router.post("/resetPassword/:id/:token", updatePassword);

router.use("/subject", express.static("storage/subjects"));
router.use("/users", express.static("storage/userImages"));
router.use("/feedback", express.static("storage/feedbackImages"));

router.post("/post-users", uploadUserImage, postUsersController);
router.get("/get-users", getUsersController);
router.delete("/delete-users/:id", deleteUsersController);
router.put("/put-users/:id", uploadUserImage, putUsersController);
router.post("/post-feedback", uploadFeedbackImage, postFeedbackController);
router.get("/get-feedback", getFeedbackController);

router.use("/lms-sub", express.static("storage/lmssubject"));
router.use("/lms-cat", express.static("storage/lmscategory"));
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
router.get("/getRandomLmsSub", getRandomLmsSubController)
router.delete("/deleteLmsCat/:id", deleteLmsCatController)

module.exports = router;
