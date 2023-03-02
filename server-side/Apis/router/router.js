const express = require("express");
//
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
  getByIdFeedbackController,
  deleteFeedbackController,
} = require("../controller/feedbackcontoller");

const {
  verificationEmail,
  updatePassword,
} = require("../controller/sendmailcontroller");
const {
  getUsersController,
  deleteUsersController,
  putUsersController,

  getByIdUserController,
  postloginController,
  postsignupController,
} = require("../controller/userscontroller");

const {
  postSitSettingController,
  getSiteSettingController,
  putSiteSettingController,
} = require("../controller/mastersettingcontroller");
// const { uploadSiteSettingImage } = require("../middleware/mastersetting");
const {
  postnotification,
  getnotification,
  deletenotification,
  updatenotification,
  getnotificationById,
} = require("../controller/notificationcontoller");
const {
  changePasswordController,
} = require("../controller/changePasswordcontroller");
const {
  PostLmsSubController,
  getAboutController,
  getLmsSubController,
  getByIdLmsSubController1,
  deleteLmsSubController,
  putLmsSubController,
  PostLmsViewController,
  getLmsViewController,
  PostLmsCatController,
  getLmsCatController,
  getRandomLmsSubController,
  getByIdLmsCatController,
  deleteLmsCatController,
  updateLmsCatController,
} = require("../controller/controller");
const {
  uploadLmsSubImage,
  uploadSubjectImage,
  uploadQuiz,
  convertExcelToJson,
  auth,
  uploadUserImage,
  uploadFeedbackImage,
  uploadLmsSubImage2,
  uploadLmsViewPdf,
  uploadLmsCatImage,
} = require("../middleware");
const { uploadSiteSettingImage } = require("../middleware/mastersetting");
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


router.post("/post-signup", postsignupController);
router.post("/post-login", postloginController);
// router.post("/verify", auth);
router.post("/verificationEmail", verificationEmail);
router.post("/resetPassword/:id/:token", updatePassword);

router.use("/subject", express.static("storage/subjects"));
router.use("/feedback", express.static("storage/feedbackImages"));

router.get("/get-users/:token", auth, getUsersController);
router.delete("/delete-users/:token/:id", auth, deleteUsersController);
router.put("/put-users/:token/:id", auth, uploadUserImage, putUsersController);
router.put("/put-changePassword/:id/:token", auth, changePasswordController);

router.post(
  "/post-feedback/:token",
  auth,
  uploadFeedbackImage,
  postFeedbackController
);
router.get("/get-feedback/:token", auth, getFeedbackController);
router.delete("/delete-feedback/:token/:id", auth, deleteFeedbackController);
router.post("/post-notification/:token", postnotification);
router.get("/get-notification/:token", auth, getnotification);
router.delete("/delete-notification/:token/:id", auth, deletenotification);
router.put("/put-notification/:token/:id", auth, updatenotification);
router.get("/get-notificationById/:token/:id", auth, getnotificationById);

router.get("/getByUserId/:token/:id", auth, getByIdUserController);
router.get("/get-feedbackaggregate/:token", auth, getByIdFeedbackController);

router.use("/lms-sub", express.static("storage/lmssubject"));
router.use("/lms-cat", express.static("storage/lmscategory"));
router.use("/storage/userImages", express.static("storage/userImages"));
// <===============================>
router.post(
  "/postLmsSub",
  uploadLmsSubImage2.single("image"),
  PostLmsSubController
);
router.get("/getLmsSub", getLmsSubController);
router.get("/getLmsSub/:id", getByIdLmsSubController1);

router.delete("/deleteLmsSub/:id", deleteLmsSubController);
router.put(
  "/putLmsSub/:id",
  uploadLmsSubImage.single("image"),
  putLmsSubController
);
router.post(
  "/postLmsView",
  uploadLmsViewPdf.single("pdf"),
  PostLmsViewController
);

router.get("/getLmsView", getLmsViewController);
router.post(
  "/postLmsCat",
  uploadLmsCatImage.single("image"),
  PostLmsCatController
);
router.get("/getLmsCat", getLmsCatController);
router.get("/getLmsCat/:id", getByIdLmsCatController);

router.get("/getRandomLmsSub", getRandomLmsSubController);
router.delete("/deleteLmsCat/:id", deleteLmsCatController);
router.put(
  "/updateLmsCat/:id",
  uploadLmsCatImage.single("image"),
  updateLmsCatController
);
// <======================================================>
router.use("/lms-settingImage", express.static("storage/setting"));
router.use("/view", express.static("storage/viewpdf"));

router.post(
  "/site-setting",
  uploadSiteSettingImage.array("siteLogo"),

  postSitSettingController
);
router.get("/get-Site-setting", getSiteSettingController);
router.put(
  "/put-site-setting/:id",
  uploadSiteSettingImage.array("siteLogo"),
  putSiteSettingController
);

module.exports = router;
