const {
  postQuestionsModel,
  pushQuesInSubj,
} = require("../model/questionBankModel");

const postQueBankController = async (req, res) => {
  console.log("question: ", req.body);
  const result = await postQuestionsModel(req.body);
  res.send(result);
};

const pushQuesInSubjController = async (req, res) => {
  console.log("question: ", req.body);
  const result = await pushQuesInSubj(req.body);
  res.send(result);
};
module.exports = { postQueBankController, pushQuesInSubjController };
