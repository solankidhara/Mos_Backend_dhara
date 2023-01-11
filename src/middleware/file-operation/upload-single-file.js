const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null, './public/images/contentThumbFile');    
    }, 
    filename: function (req, file, cb) { 
       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
       cb(null , file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));   
    }
 });

 const uploadCategoryThumbnail = multer({ storage: storage });

 module.exports = uploadCategoryThumbnail;