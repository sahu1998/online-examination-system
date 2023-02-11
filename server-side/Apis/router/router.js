const express = require("express");
const {
  getController,
  postController,
  getAllExamController,
  postSubjectController,
  getAllSubjectController,
  getRandomSubjController,
} = require("../controller/controller");
const { uploadSubjectImage } = require("../middleware");
const router = express.Router();

router.get("/get", getController);
router.post("/post", postController);

router.post("/postexam", postController);
router.get("/getexam", getAllExamController);

router.post(
  "/postsubject",
  uploadSubjectImage.single("image"),
  postSubjectController
);
router.get("/getsubject", getAllSubjectController);
router.get("/get-random-subjects", getRandomSubjController);

router.use("/subject", express.static("storage/subjects"));

module.exports = router;
