const mongoose=require('mongoose');
const examSchema = mongoose.Schema({
    examName: String,
  });
  const exam = mongoose.model("exam", examSchema);
  const getLmsCatData = async () => {
    try {
      const data = await exam.find();
      return { data: data, message: "data added succesfully", status: 200 };
    } catch (error) {
      return { message: error.message, status: 400 };
    }
  };
  const PostLmsCatData = async () => {
    try {
      const data = await exam.create();
      return { data: data, message: "exam  data added succesfully", status: 200 };
    } catch (error) {
      return { message: error.message, status: 400 };
    }
  };
  module.exports = {
    PostLmsCatData,
    getLmsCatData,
  };