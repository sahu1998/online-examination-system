const mongoose = require("mongoose");
require("../../dbConnection");

const subjectSchema = mongoose.Schema({
  subjectName: String,
  marks: Number,
  timeLimit: Number,
  subjectDesc: String,
  subjectImg: String,
  categoryId: mongoose.Schema.Types.ObjectId,
});

const subjectModel = mongoose.model("subjects", subjectSchema);

const ObjectId = mongoose.Types.ObjectId;

const postSubjectData = async (values) => {
  try {
    const result = await subjectModel.create(values);
    return { response: result, status: 200, message: "success" };
  } catch (error) {
    return { error, status: 400, message: "error" };
  }
};

const getAllSubjectData = async () => {
  try {
    const result = await subjectModel.find();
    return { response: result, status: 200, message: "success" };
  } catch (error) {
    return { error, status: 400, message: "error" };
  }
};
const getSubjectByCategory = async (id) => {
  console.log("id: ", id);
  try {
    const result = await subjectModel.aggregate([
      {
        $match: {
          categoryId: ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "exams",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $project: {
          _id: 1,
          subjectName: 1,
          // categoryId: 1,
          marks: 1,
          subjectImg: 1,
          timeLimit: 1,
          categoryName: {
            $arrayElemAt: ["$category.examName", 0],
          },
        },
      },
    ]);
    return { response: result, status: 200, message: "success" };
  } catch (error) {
    return { error, status: 400, message: "error" };
  }
};

const getRandomSubjects = async (limit = null) => {
  const response = await subjectModel.aggregate([
    { $sample: { size: parseInt(limit) || 4 } },
    {
      $lookup: {
        from: "exams",
        localField: "categoryId",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $project: {
        _id: 1,
        subjectName: 1,
        // categoryId: 1,
        marks: 1,
        subjectImg: 1,
        timeLimit: 1,
        categoryName: {
          $arrayElemAt: ["$category.examName", 0],
        },
      },
    },
  ]);
  return { response, status: 200, message: "success" };
};

module.exports = {
  // postModel,
  postSubjectData,
  getAllSubjectData,
  getSubjectByCategory,
  getRandomSubjects,
};
