const multer = require("multer");
const siteSettingStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("mahi=======");
    cb(null, "./storage/setting");
  },
  filename: (req, file, cb) => {
    console.log("file===>", file);
    cb(null, file.originalname);
  },
});
const uploadSiteSettingImage = multer({
  storage: siteSettingStorage,
//   limits: { fileSize: 1000000 },
});
module.exports = { uploadSiteSettingImage };
