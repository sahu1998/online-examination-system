const express = require("express");
const {
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
  postQuesInSubjController,
  pushQuesInSubjController,
} = require("../controller/controller");
const { postQueBankController } = require("../controller/queBankController");
const { uploadSubjectImage, uploadLmsSubImage } = require("../middleware");
const router = express.Router();

router.post("/postexam", postController);
router.get("/getexam", getAllExamController);
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

router.use("/subject", express.static("storage/subjects"));

router.use("/lms-image", express.static("storage/subject"));
router.post(
  "/postLmsSub",
  uploadLmsSubImage.single("image"),
  PostLmsSubController
);
router.get("/getLmsSub", getLmsSubController);
router.post("/postLmsCat", PostLmsCatController);
router.get("/getLmsCat", getLmsCatController);

router.post("/addsubjectque", postQueBankController);
module.exports = router;
