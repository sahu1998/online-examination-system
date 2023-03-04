const mongoose = require("mongoose");
const siteSchema = mongoose.Schema({
  siteTitle: String,
  siteAddress: String,
  siteState: String,
  siteZipcode: String,

  fbLogin: String,
  siteLogo: Array,
  siteCity: String,
  siteFavicoverImage: String,
  siteContry: String,
  sitePhone: String,
  currencyCode: String,
  twitterLogin: String,
  validityType: String,
  enableOtpLogin: String,
  contryCode: String,
  backgroundLogo: String,
});
const site = mongoose.model("sites", siteSchema);
const postSiteSettingData = async (obj) => {
  try {
    console.log("obj===>", obj);
    const postData = await site.create(obj);
    console.log("postData====>", postData);
    return {
      data: postData,
      message: "site setting post data success ",
      status: 200,
    };
  } catch (error) {
    return { message: error.message, status: 400 };
  }
};
const getSiteSettingData = async () => {
  try {
    const data = await site.find();
    return { data: data, message: "site data get succesfully", status: 200 };
  } catch (error) {
    return { message: error.message, status: 400 };
  }
};
const putSiteSettingData = async (id, body) => {
  try {
    const data = await site.findByIdAndUpdate(id, { $set: body });
    return { data: data, message: "site data updated success", status: 200 };
  } catch (error) {
    return { message: error.message, status: 400 };
  }
};
module.exports = {
  postSiteSettingData,
  getSiteSettingData,
  putSiteSettingData,
};
