const mongoose=require('mongoose');
const examSchema = mongoose.Schema({
    examName: String,
    image:String,
    description:String,
  });
  const exam = mongoose.model("lmscategories", examSchema);
  const getLmsCatData = async () => {
    try {
      const data = await exam.find();
      return { data: data, message: "get data succesfully", status: 200 };
    } catch (error) {
      return { message: error.message, status: 400 };
    }
  };
  const PostLmsCatData = async (obj) => {
    try {
      const data = await exam.create(obj);
      return { data: data, message: "exam  data added succesfully", status: 200 };
    } catch (error) {
      return { message: error.message, status: 400 };
    }
  };
  module.exports = {
    PostLmsCatData,
    getLmsCatData,
  };