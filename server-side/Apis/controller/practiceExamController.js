const {
  // postModel,
  postExamData,
  getAllExamData,
} = require("../model/practiceCatgModel");
const {
  postSubjectData,
  getAllSubjectData,
  getSubjectByCategory,
  getRandomSubjects,
  postQuesInSubject,
  pushQuesInSubj,
} = require("../model/practiceSubjModel");

//////////////////////////////////////////////////////////////////////
///////////////////- Practice Exam Category -/////////////////////////
//////////////////////////////////////////////////////////////////////

const postExamCatgController = async (req, res) => {
  // const data = await postModel(req.body);
  // console.log("POST CONTROLLER Data===>", data);
  console.log("postExamCatgController: ", req.body);
  const data = await postExamData(req.body);
  res.send(data);
};

const getExamCatgController = async (req, res) => {
  const data = await getAllExamData();
  res.send(data);
};

//////////////////////////////////////////////////////////////////////
///////////////////- Practice Exam Subjects -/////////////////////////
//////////////////////////////////////////////////////////////////////

const postSubjectController = async (req, res) => {
  // const data = await postModel(req.body);
  // console.log("POST CONTROLLER Data===>", data);
  const subject = { ...req.body, subjectImg: req.file?.path };
  console.log("postExamCatgController: ", subject);
  const data = await postSubjectData(subject);
  res.send(data);
};

const postQuesInSubjController = async (req, res) => {
  console.log("subject id: ", req.params.id);
  const data = await postQuesInSubject(req.params.id, req.body);
  res.send(data);
};

const pushQuesInSubjController = async (req, res) => {
  console.log("question: ", req.params.id);
  const result = await pushQuesInSubj(req.params.id, req.body);
  res.send(result);
};

const getAllSubjectController = async (req, res) => {
  const data = await getAllSubjectData();
  res.send(data);
};

const getSubjectByCatgController = async (req, res) => {
  const id = req.params.id;
  const data = await getSubjectByCategory(id);
  res.send(data);
};

const getRandomSubjController = async (req, res) => {
  const limit = req.query.limit;
  const data = await getRandomSubjects(limit);
  res.send(data);
};

module.exports = {
  postExamCatgController,
  postSubjectController,
  postQuesInSubjController,
  pushQuesInSubjController,
  getExamCatgController,
  getAllSubjectController,
  getSubjectByCatgController,
  getRandomSubjController,
};