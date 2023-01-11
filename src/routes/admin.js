const express = require("express");

const auth = require("../middleware/auth");
const adminAuth = require("../middleware/admin-auth");
const categoryValidator = require("../middleware/validation/categoryValidation");
const contentValidator = require("../middleware/validation/contentValidation");
const uploadContent = require("../middleware/file-operation/upload-content" );
const uploadCategoryThumbnail = require("../middleware/file-operation/upload-single-file");

const { addCategory, categoryList, updateCategoryById } = require("../controller/category.controller");
const { addContent, getContent, updateContent, getAllFiles } = require("../controller/content.controller");
const { addContentType, getContentType, updateContentTypeById } = require("../controller/content-type.controller");
const { addTag, getAllTag, updateTagById } = require("../controller/tag.controller");
const { getAllUsers } = require("../controller/user.controller");
const { getAllFileTypes, updateFileById, addFileType } = require("../controller/file-type.controller");
const { getLicense, updateLicenseById, addLicense } = require("../controller/license-type.controller");
const { addSize, getSizes, updateSizeById } = require("../controller/size.controller");

const router = express.Router();
const uploadFields = uploadContent.fields([{ name: "mainFile" }, { name: "thumbFile" }, { name: "waterMarkFile" }]);

router.get("/users", auth, adminAuth, getAllUsers);

// category 
router.post("/add-category", auth, adminAuth, uploadCategoryThumbnail.single("categoryThumbImg"), categoryValidator, addCategory);
router.get("/category", auth, adminAuth, categoryList);
router.patch("/category", auth, adminAuth, updateCategoryById);

//content type
router.post("/add-content-type", auth, adminAuth, addContentType);
router.get("/content-type", auth, adminAuth, getContentType);
router.patch("/content-type", auth, adminAuth, updateContentTypeById);

//content
router.post("/add-content", auth, adminAuth, uploadFields, contentValidator, addContent);
router.get("/content-list", auth, adminAuth, getContent);
router.patch("/content", auth, adminAuth, updateContent);

// tags
router.post("/add-tag" ,auth, adminAuth,addTag)
router.get("/tag" ,auth, adminAuth,getAllTag)
router.patch("/tag" ,auth, adminAuth,updateTagById)

// file type
router.post("/file-type" ,auth, adminAuth,addFileType)
router.get("/file-type" ,auth, adminAuth,getAllFileTypes)
router.patch("/file-type" ,auth, adminAuth,updateFileById)

// license type
router.post("/license" ,auth, adminAuth,addLicense)
router.get("/license" ,auth, adminAuth,getLicense)
router.patch("/license" ,auth, adminAuth,updateLicenseById)

// tags
router.post("/size" ,auth, adminAuth,addSize)
router.get("/size" ,auth, adminAuth,getSizes)
router.patch("/size" ,auth, adminAuth,updateSizeById)


module.exports = router;
