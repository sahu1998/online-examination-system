const { postSiteSettingData, getSiteSettingData, putSiteSettingData } = require("../model/sitesettingmodel");

const postSitSettingController = async (req,res) => {
    console.log("req.file===>",req.files);
    const file=req?.files?.map((file)=> file.path);

    console.log("file path: ",file);
    const temp={...req.body,siteLogo:file};

    console.log("temp===>",temp);
  const data = await postSiteSettingData(temp);
  console.log("data====>",data);
  res.send(data);
};
const getSiteSettingController=async(req,res)=>{
  const data=await getSiteSettingData();
  res.send(data);
}
const putSiteSettingController=async(req,res)=>{
  const id=req.params.id;
  const file=req?.files?.map((file)=> file.path);

    console.log("file path: ",file);
  const body={...req.body,siteLogo:file};
  const data=await putSiteSettingData(id,body);
  res.send(data);
}
module.exports = { postSitSettingController,getSiteSettingController,putSiteSettingController };
