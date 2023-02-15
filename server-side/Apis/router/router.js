const express = require("express");
const {
  getController,
  postController,
  getAllExamController,
  postSubjectController,
  getAllSubjectController,
  getRandomSubjController,
  getAboutController,
} = require("../controller/controller");
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
const {
  uploadSubjectImage,
  auth,
  uploadUserImage,
  uploadFeedbackImage,
} = require("../middleware");
const router = express.Router();

router.get("/get", getController);
router.post("/post", postController);

router.post("/postexam", postController);
router.get("/getexam", getAllExamController);
router.get("/about", getAboutController);

router.post(
  "/postsubject",
  uploadSubjectImage.single("image"),
  postSubjectController
);
router.get("/getsubject", getAllSubjectController);
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

module.exports = router;
