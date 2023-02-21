const fs = require("fs");
const { PostLmsCatData, getLmsCatData } = require("../model/lmscatmodal");
const {
  PostLmsSubData,
  getLmsSubByCategory,
  getLmsSubData,
  getRandomLmsSubData,
  deleteLmsSubData,
  putLmsSubData,
  getByIdLmsSubData,
} = require("../model/lmssubmodal");
const { postLmsViewData, getLmsViewData, getLmsByIdViewData } = require("../model/lmsviewmodal");

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
  const files = req?.file?.path;
  const temp = { ...req.body, image: files };
  console.log("temp======", temp);
  const data = await PostLmsSubData(temp);
  console.log("temp data====", data);
  res.send(data);
};
const PostLmsCatController = async (req, res) => {
  const files = req?.file?.path;
  const temp = { ...req.body, image: files };
  const data = await PostLmsCatData(temp);
  res.send(data);
};
const getLmsSubController = async (req, res) => {
  const id=req.query.id;
  const data = id? await getLmsSubByCategory(id):await getLmsSubData();
  console.log("get lms sub data",data);
  res.send(data);
};
 const getByIdLmsSubController1=async(req,res)=>{
  const id=req.params.id;
  const data= await getByIdLmsSubData(id);
  console.log("id",id);
  console.log("data by id=====",data);

  res.send(data);
 }
const getLmsCatController = async (req, res) => {
  const data = await getLmsCatData();
  res.send(data);
};
const getRandomLmsSubController = async (req, res) => {
  const data = await getRandomLmsSubData();
  res.send(data);
}
const deleteLmsSubController=async(req,res)=>{
  
  const data=await deleteLmsSubData(req.params.id);
  res.send(data);
}
const putLmsSubController = async (req, res) => {
  const files = req?.file?.path;
  const temp = { ...req.body, image: files };
  const data = await putLmsSubData(req.params.id,temp);
  res.send(data);
};
const PostLmsViewController=async(req,res)=>{
  const data=await postLmsViewData(req.body);
  res.send(data)
}
const getLmsViewController=async(req,res)=>{
  const id=req.query.id;
  const data = id? await getLmsByIdViewData(id):await getLmsViewData();
  console.log("get lms sub data",data);
  res.send(data);
}
module.exports = {
  getLmsViewController,
  putLmsSubController,
  PostLmsSubController,
  PostLmsCatController,
  getLmsSubController,
  getLmsCatController,
  getAboutController,
  getRandomLmsSubController,
  deleteLmsSubController,
  getByIdLmsSubController1,
  PostLmsViewController
};
