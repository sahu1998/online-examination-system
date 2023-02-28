const mongoose = require('mongoose');
const examSchema = mongoose.Schema({
  examName: String,
  image: String,
  description: String,
});
const exam = mongoose.model("lmscategories", examSchema);
const getLmsCatData = async () => {
  try {
    const data = await exam.find({}, {}, {
      sort:
      {
        _id: -1
      }
    });
    return { data: data, message: "get data succesfully", status: 200 };
  } catch (error) {
    return { message: error.message, status: 400 };
  }
};
const PostLmsCatData = async (obj) => {
  try {
    const data = await exam.create(obj);
    return { data: data, message: "exam  data added successfully", status: 200 };
  } catch (error) {
    return { message: error.message, status: 400 };
  }
};
const getByIdLmsCatData = async (id) => {
  try {
    const data = await exam.findById(id);
    return { data: data, message: "get data successfully", status: 200 };
  }
  catch (error) {
    return { message: error.message, status: 400 };
  }
}

const deleteLmsCatData = async (id) => {
  try {
    const data = await exam.findByIdAndDelete(id);
    return { data: data, message: "exam data deleted category", status: 200 };
  } catch (error) {
    return { message: error.message, status: 400 };

  }
}
const updateLmsCatData = async (id, body) => {
  console.log("updatr", body)
  try {
    const data = await exam.findByIdAndUpdate(id, { $set: body });
    return { data: data, message: "exam data updated successfully", status: 200 };
  } catch (error) {
    return { message: error.message, status: 400 };
  }
}

module.exports = {
  PostLmsCatData,
  getLmsCatData,
  deleteLmsCatData,
  getByIdLmsCatData,
  updateLmsCatData
};
