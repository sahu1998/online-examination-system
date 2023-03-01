const mongoose = require("mongoose");
require("../../dbConnection");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  answer: {
    type: Number,
    required: true,
  },
});

const subjectSchema = mongoose.Schema({
  subjectName: String,
  subjectDesc: String,
  marks: Number,
  timeLimit: Number,
  subjectImg: String,
  subjectQues: [questionSchema],
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

const postQuesInSubject = async (subj_id, values) => {
  try {
    const response = await subjectModel.findByIdAndUpdate(ObjectId(subj_id), {
      subjectQues: values,
    });
    return { response, status: 200, message: "success" };
  } catch (error) {
    return { error, status: 400, message: "error" };
  }
};

const pushQuesInSubj = async (subj_id, values) => {
  console.log("hello: ", values);
  try {
    const response = await subjectModel.findByIdAndUpdate(
      ObjectId(subj_id),
      {
        $push: { subjectQues: values },
      },
      { safe: true, upsert: true, new: true }
    );
    return { response, status: 200, message: "success" };
  } catch (error) {
    return { error, status: 400, message: "error" };
  }
};

const getSubjectDataById = async (id) => {
  try {
    // const data = await subjectModel.find({}, { subjectQues: 0 });
    const data = await subjectModel.aggregate([
      {
        $match: {
          _id: ObjectId(id),
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
          subjectDesc: 1,
          // subjectQues: 0,
          categoryName: {
            $arrayElemAt: ["$category.examName", 0],
          },
        },
      },
    ]);
    return { data, status: 200, message: "success" };
  } catch (error) {
    return { error, status: 400, message: "error" };
  }
};

const getAllSubjectData = async () => {
  try {
    // const data = await subjectModel.find({}, { subjectQues: 0 });
    const data = await subjectModel.aggregate([
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
          subjectDesc: 1,
          // subjectQues: 0,
          categoryName: {
            $arrayElemAt: ["$category.examName", 0],
          },
        },
      },
    ]);
    return { data, status: 200, message: "success" };
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
          // subjectQues: 0,
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

const getRandomSubjects = async () => {
  const response = await subjectModel.aggregate([
    { $sample: { size: 4 } },
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

const getPracticeQues = async (id) => {
  try {
    const response = await subjectModel.findById(id, { subjectQues: 1 });
    return { response, status: 200, message: "success" };
  } catch (error) {
    return { error, status: 400, message: "error" };
  }
};

const deletePracticeExamData = async (id) => {
  try {
    const result = await subjectModel.findByIdAndDelete(id);
    return { data: result, status: 200, message: "success" };
  } catch (error) {
    return { error, status: 400, message: "error" };
  }
};

const putPracticeSubjData = async (id, values) => {
  try {
    const result = await subjectModel.findByIdAndUpdate(id, values);
    return { data: result, status: 200, message: "success" };
  } catch (error) {
    return { error, status: 400, message: "error" };
  }
};

module.exports = {
  // postModel,
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
};
