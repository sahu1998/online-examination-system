const express = require("express");
const {
  getAboutController,
  PostLmsSubController,
  getLmsSubController,
  PostLmsCatController,
  getLmsCatController,
  getRandomLmsSubController,
  deleteLmsSubController,
  putLmsSubController,
  getByIdLmsSubController,
  getByIdLmsSubController1,
  PostLmsViewController,
  getLmsViewController,
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
const { auth, uploadUserImage, uploadFeedbackImage, uploadLmsViewPdf } = require("../middleware");
const {
  uploadSubjectImage,
  uploadLmsSubImage,
  uploadLmsCatImage,
} = require("../middleware");
const {
  postSitSettingController, getSiteSettingController, putSiteSettingController,
} = require("../controller/mastersettingcontroller");
const { uploadSiteSettingImage } = require("../middleware/mastersetting");
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
router.get("/getLmsSub/:id", getByIdLmsSubController1);
router.post(
  "/postLmsCat",
  uploadLmsCatImage.single("image"),
  PostLmsCatController
);
router.get("/getLmsCat", getLmsCatController);
router.get("/getRandomLmsSub", getRandomLmsSubController);
router.delete("/deleteLmsSub/:id", deleteLmsSubController);
router.put(
  "/putLmsSub/:id",
  uploadLmsSubImage.single("image"),
  putLmsSubController
);
router.post("/postLmsView",uploadLmsViewPdf.single('pdf'), PostLmsViewController);
router.get("/getLmsView", getLmsViewController);
router.get("/getRandomLmsSub", getRandomLmsSubController);
// uploadLmsViewFile.single("view"),

router.use("/lms-settingImage", express.static("storage/setting"));
router.use("/view", express.static("storage/viewpdf"));

router.post(
  "/site-setting",
   uploadSiteSettingImage.array('siteLogo'),
 
  postSitSettingController
);
router.get("/get-Site-setting",getSiteSettingController);
router.put('/put-site-setting/:id',uploadSiteSettingImage.array('siteLogo'),putSiteSettingController);
module.exports = router;
// uploadSiteSettingImage.single('siteLogo'),
