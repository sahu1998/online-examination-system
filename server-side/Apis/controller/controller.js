const {
  // postModel,
  postExamData,
  getAllExamData,
} = require("../model/categoryModel");
const {
  postSubjectData,
  getAllSubjectData,
  getSubjectByCategory,
  getRandomSubjects,
} = require("../model/subjectModel");
const getController = async (req, res) => {
  res.send("GET CONTROLLER");
};
const postController = async (req, res) => {
  // const data = await postModel(req.body);
  // console.log("POST CONTROLLER Data===>", data);
  console.log("postController: ", req.body);
  const data = await postExamData(req.body);
  res.send(data);
};

const getAllExamController = async (req, res) => {
  const data = await getAllExamData();
  res.send(data);
};

const postSubjectController = async (req, res) => {
  // const data = await postModel(req.body);
  // console.log("POST CONTROLLER Data===>", data);
  const subject = { ...req.body, subjectImg: req.file?.path };
  console.log("postController: ", subject);
  const data = await postSubjectData(subject);
  res.send(data);
};

const getAllSubjectController = async (req, res) => {
  const id = req.query.id;
  const data = id ? await getSubjectByCategory(id) : await getAllSubjectData();
  res.send(data);
};

const getRandomSubjController = async (req, res) => {
  const limit = req.query.limit;
  const data = await getRandomSubjects(limit);
  res.send(data);
};

module.exports = {
  getController,
  postController,
  getAllExamController,
  postSubjectController,
  getAllSubjectController,
  getRandomSubjController,
};
