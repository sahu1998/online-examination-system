const express = require("express");
const {
  getController,
  postController,
  getAllExamController,
  postSubjectController,
  getAllSubjectController,
  getRandomSubjController,
  getAboutController,
  PostLmsSubController,
  getLmsSubController,
  PostLmsCatController,
  getLmsCatController,
  getSubjectByCatgController,
} = require("../controller/controller");
const { uploadSubjectImage, uploadLmsSubImage, uploadLmsCatImage } = require("../middleware");
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
router.get("/getsubjectbycatg/:id", getSubjectByCatgController);
router.get("/get-random-subjects", getRandomSubjController);

router.use("/subject", express.static("storage/subjects"));

router.use("/lms-sub", express.static("storage/lmssubject"));
router.use("/lms-cat", express.static("storage/lmscategory"));
router.post(
  "/postLmsSub",
  uploadLmsSubImage.single("image"),
  PostLmsSubController
);
router.get("/getLmsSub", getLmsSubController);
router.post("/postLmsCat", uploadLmsCatImage.single("image"), PostLmsCatController);
router.get("/getLmsCat", getLmsCatController);
module.exports = router;
