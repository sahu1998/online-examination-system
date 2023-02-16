const mongoose = require("mongoose");
const subjectSchema = mongoose.Schema({

  image: String,
  subjectName: String,
  title: String,
  description: String,
  type: String,
  categoryId: mongoose.Schema.Types.ObjectId,
});
const lmssubject = mongoose.model("lmssubject", subjectSchema);
const PostLmsSubData = async (obj) => {
  try {
    console.log("obj==========", obj);
    const data = await lmssubject.create(obj);
    return { data: data, message: "data added succesfully", status: 200 };
  } catch (error) {
    return { message: error.message, status: 400 };
  }
};
const getLmsSubData = async () => {
  try {
    const data = await lmssubject.find();
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
    const data = await lmssubject.aggregate([
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
      {
        $project: {
          _id: 1,
          subjectName: 1,
          image: 1,
          categoryName: {
            $arrayElemAt: ["$category.examName", 0],
          },

        },
      },
    ]);
    console.log("data =======", data);
    return { data: data, status: 200, message: "success by id" };
  } catch (error) {
    console.log("error catch====");
    return { message: error.message, status: 400 };
  }
};

const getRandomLmsSubData = async (limit = null) => {
  const data = await lmssubject.aggregate([
    { $sample: { size: parseInt(limit) || 4 } },

    {
      $lookup: {
        from: "lmscategories",
        localField: "categoryId",
        foreignField: "_id",
        as: "category",
      }
    },
    {
      $project: {
        _id: 1,
        subjectName: 1,
        image: 1,
        categoryName: {
          $arrayElemAt: ["$category.examName", 0],
        },

      },
    },


  ]);
  return { data, status: 200, message: "success" };
};
module.exports = {
  PostLmsSubData,
  getLmsSubByCategory,
  getLmsSubData,
  getRandomLmsSubData
};
