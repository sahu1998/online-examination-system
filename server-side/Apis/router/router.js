const express = require("express");
const {
  getController,
  postController,
  getAllExamController,
  postSubjectController,
  getAllSubjectController,
  getRandomSubjController,
  getAboutController,
  getSubjectByCatgController,
} = require("../controller/controller");
const { uploadSubjectImage } = require("../middleware");
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

module.exports = router;
