const mongoose = require("mongoose");
require("../../dbConnection");

// const groupSchema = mongoose.Schema({
//   mppsc: [],
//   physics: [],
// });
// const Group = mongoose.model("Group", groupSchema);

// const postModel = async (obj) => {
//   const m = new Group();
//   m.mppsc.push({ name: obj.skills, title: obj.skills });
//   m.mppsc.push({ name: obj.skills, title: obj.skills });
//   m.mppsc.push({ name: obj.skills, title: obj.skills });
//   m.mppsc.push({ name: obj.skills, title: obj.skills });

//   m.physics.push({ name: obj.skills, title: obj.skills });

//   //   m.skills.push({2});
//   //   m.skills.push({3});
//   //   m.skills.push({4});
//   //   m.skills.push({5});
//   const data = await m.save();
//   return { data };
// };

const examSchema = mongoose.Schema({
  examName: String,
  examDesc: String,
});

const examModel = mongoose.model("exams", examSchema);

const postExamData = async (values) => {
  try {
    const result = await examModel.create(values);
    return { response: result, status: 200, message: "success" };
  } catch (error) {
    return { error, status: 400, message: "error" };
  }
};

const getAllExamData = async () => {
  try {
    const result = await examModel.find();
    return { response: result, status: 200, message: "success" };
  } catch (error) {
    return { error, status: 400, message: "error" };
  }
};

module.exports = {
  // postModel,
  postExamData,
  getAllExamData,
};
