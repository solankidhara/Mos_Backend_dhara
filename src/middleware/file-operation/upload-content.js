const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "mainFile") {
      const dir = "./public/images/mainFile";
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      return cb(null, dir);
    } else if (file.fieldname === "thumbFile") {
      const dir = "./public/images/thumbFile";
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      return cb(null, dir);
    } else if (file.fieldname === "waterMarkFile") {
      const dir = "./public/images/waterMarkFile";
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      return cb(null, dir);
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const uploadContent = multer({
  storage: storage,
  // limits: { fileSize: 18 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    // if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    //   cb(null, true);
    // } else {
    //   cb(null, false);
    //   const err = new Error("Only .png, .jpg and .jpeg format allowed!");
    //   err.name = "ExtensionError";
    //   return cb(err);
    // }
      cb(null, true);
  },
});

module.exports = uploadContent;
