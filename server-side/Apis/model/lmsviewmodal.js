const mongoose = require("mongoose");
const viewSchema = mongoose.Schema({
  viewName: String,
  viewImage:String,
  viewId: mongoose.Schema.Types.ObjectId,
  
});
const view = mongoose.model("views", viewSchema);
 const objectId =mongoose.Types.ObjectId;

const postLmsViewData = async (obj) => {
  try {
    console.log("obj=====>",obj);
    const result = await view.create(obj);
    console.log("result====>",result);
    return {
      data: result,
      message: "view data addesd succesfullhy",
      status: 200,
    };
  } catch (error) {
    return { message: error.message, status: 400 };
  }
};
const getLmsViewData = async () => {
  try {
    const result = await view.find();
    return { data: result, message: "view data get succesfully", status: 200 };
  } catch (error) {
    return { message: error.message, status: 400 };
  }
};
const getLmsByIdViewData = async (id) => {
    console.log("id====",id);
  try {
    const data = await view.aggregate([
      {
        $match: {
          viewId: new objectId(id) ,
        },
      },
      {
        $lookup: {
          from: "lmssubjects",
          localField: "viewId",
          foreignField: "_id",
          as: "viewData",
        },
      },
    ]);

   

    console.log("view data", data);
    return { data: data, message: "view by yd success", status: 200 };
  } catch (error) {
    console.log("view data err=======", error);
    return { message: error.message, status: 400 };
  }
};
module.exports = { postLmsViewData, getLmsViewData, getLmsByIdViewData };
