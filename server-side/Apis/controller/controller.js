const fs = require("fs");
const { PostLmsCatData, getLmsCatData, deleteLmsCatData } = require("../model/lmscatmodal");
const {
  PostLmsSubData,
  getLmsSubByCategory,
  getLmsSubData,
  getRandomLmsSubData,
} = require("../model/lmssubmodal");

//////////////////////////////////////////
const getAboutController = (req, res) => {
  // const data = fs.readFileSync("files/about.txt", "utf-8");
  const data = fs.readFileSync("files/about.txt", "utf-8");

  console.log("aboutdata", data);
  res.send("done");
};

///////////////////////////////////////////////////
///////////////////- LMS -/////////////////////////
///////////////////////////////////////////////////

const PostLmsSubController = async (req, res) => {
  // const temp=req.body;
  const files = req.file.path;
  const temp = { ...req.body, image: files };
  console.log("temp======", temp);
  const data = await PostLmsSubData(temp);
  console.log("temp data====", data);
  res.send(data);
};
const PostLmsCatController = async (req, res) => {
  const files = req.file.path;
  const temp = { ...req.body, image: files };
  const data = await PostLmsCatData(temp);
  res.send(data);
};
const getLmsSubController = async (req, res) => {
  const id = req.query.id;
  const data = id ? await getLmsSubByCategory(id) : await getLmsSubData();
  res.send(data);
};
const getLmsCatController = async (req, res) => {
  const data = await getLmsCatData();
  res.send(data);
};
const getRandomLmsSubController = async (req, res) => {
  const data = await getRandomLmsSubData();
  res.send(data);
}

const deleteLmsCatController = async (req, res) => {
  const data = await deleteLmsCatData(req.params.id);
  res.send(data);
}
module.exports = {
  PostLmsSubController,
  PostLmsCatController,
  getLmsSubController,
  getLmsCatController,
  getAboutController,
  getRandomLmsSubController,
  deleteLmsCatController
};
