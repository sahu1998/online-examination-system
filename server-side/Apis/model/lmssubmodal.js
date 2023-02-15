const mongoose = require("mongoose");
const subjectSchema = mongoose.Schema({
  image: String,
  subjectName: String,
  title: String,
  description: String,
  type: String,
  categoryId: mongoose.Schema.Types.ObjectId,
});
const subject = mongoose.model("lmssubject", subjectSchema);
const PostLmsSubData = async (obj) => {
  try {
    const data = await subject.create(obj);
    return { data: data, message: "data added succesfully", status: 200 };
  } catch (error) {
    return { message: error.message, status: 400 };
  }
};
const getLmsSubData = async () => {
  try {
    const data = await subject.find();
    return {
      data: data,
      message: "subject  data get succesfully",
      status: 200,
    };
  } catch (error) {
    return { message: error.message, status: 400 };
  }
};
const objectId = mongoose.Types.ObjectId;
const getLmsSubByCategory = async (id) => {
  console.log("id :================", id);
  try {
    const data = await subject.aggregate([
      {
        $match: {
          categoryId: objectId(id),
        },
      },
      {
        $lookup: {
          from: "lmscategories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      // {
      //   $project: {
      //     _id: 1,
      //     subjectName: 1,
      //     image: 1,
      //     categoryName: {
      //       $arrayElemAt: ["$category.examName", 0],
      //     },

      //   },
      // },
    ]);
    console.log("data =======", data);
    return { data: data, status: 200, message: "success by id" };
  } catch (error) {
    return { message: error.message, status: 400 };
  }
};
module.exports = {
  PostLmsSubData,
  getLmsSubByCategory,
  getLmsSubData,
};
