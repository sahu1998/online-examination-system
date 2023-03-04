const {
  // postModel,
  postExamData,
  getAllExamData,
  deleteExamCatgData,
  putExamData,
} = require("../model/practiceCatgModel");
const {
  postSubjectData,
  getAllSubjectData,
  getSubjectByCategory,
  getRandomSubjects,
  postQuesInSubject,
  pushQuesInSubj,
  getPracticeQues,
  deletePracticeExamData,
  putPracticeSubjData,
  getSubjectDataById,
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

const putExamCatgController = async (req, res) => {
  const data = await putExamData(req.params.id, req.body);
  res.send(data);
};

const deleteExamCatgController = async (req, res) => {
  const id = req.params.id;
  const data = await deleteExamCatgData(id);
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
  const subject = {
    ...req.body,
    subjectImg: req.files.image[0].path,
    subjectQues: req.quiz,
  };
  console.log("postExamCatgController: ", subject);
  const data = await postSubjectData(subject);
  res.send(data);
};

const putPracticeSubjController = async (req, res) => {
  const subject = {
    ...req.body,
    subjectImg: req.files.image[0].path,
    subjectQues: req.quiz,
  };
  const data = await putPracticeSubjData(req.params.id, subject);
  res.send(data);
};

const deletePracticeSubjController = async (req, res) => {
  const id = req.params.id;
  console.log("sfdkdsjfksjfdskf: ", id);
  const data = await deletePracticeExamData(id);
  res.send(data);
};

const getAllSubjectController = async (req, res) => {
  const data = await getAllSubjectData();
  res.send(data);
};

const getSubjectById = async (req, res) => {
  const id = req.params.id;
  const data = await getSubjectDataById(id);
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

///////////////////////////////////////////////////////////////////////
///////////////////- Practice Exam Questions -/////////////////////////
///////////////////////////////////////////////////////////////////////

const postQuesInSubjController = async (req, res) => {
  console.log("subject id: ", req.params.id);
  const practiceQues = req.quiz.map((obj) => {
    return {
      question: obj.question,
      options: obj.options.split(";"),
      answer: parseInt(obj.answer),
    };
  });
  const data = await postQuesInSubject(req.params.id, practiceQues);
  res.send(data);
};

const pushQuesInSubjController = async (req, res) => {
  console.log("question: ", req.params.id);
  const result = await pushQuesInSubj(req.params.id, req.body);
  res.send(result);
};

const getPracticeQuesController = async (req, res) => {
  console.log("subj id: ", req.params.id);
  const result = await getPracticeQues(req.params.id);

  res.send(result);
};

module.exports = {
  postExamCatgController,
  deleteExamCatgController,
  postSubjectController,
  postQuesInSubjController,
  pushQuesInSubjController,
  getExamCatgController,
  getAllSubjectController,
  getSubjectByCatgController,
  getRandomSubjController,
  getPracticeQuesController,
  putExamCatgController,
  deletePracticeSubjController,
  putPracticeSubjController,
  getSubjectById,
};
