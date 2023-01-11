const Content = require("../models/content.model");
const pathSplit = require("../utils/pathSplit");
const deleteJsonEntries = require("../utils/deleteJsonEntries");
const ContentType = require("../models/content-type.model");

const addContent = async (req, res) => {
  const { name, category_id, content_type_id, description, tagOne, tagTwo ,file_type_id,license_type_id ,size_id} = req.body;

  const content = new Content({
    mainFile: req.files ? pathSplit(req, req.files?.mainFile[0].path) : "notfound",
    thumbFile: req.files ? pathSplit(req, req.files?.thumbFile[0].path) : "notfound",
    waterMarkFile: req.files ? pathSplit(req, req.files?.waterMarkFile[0].path) : "notfound",
    user_id: req.user._id,
    tag_one_id: tagOne,
    tag_two_id: tagTwo,
    file_type:file_type_id,
    license_type:license_type_id,
    size: size_id,
    name: name,
    content_type_id: content_type_id,
    category_id: category_id,
    description: description,
  });
  try {
    const data = await content.save();
    if (data) {
      res.status(200).json({ message: "data uploaded successfully" });
    }
  } catch (err) {
    res.status(err?.status || 500).json({
      message: err?.message,
    });
  }
};

const getContent = async (req, res) => {
  try {
    const populateQuery = [
      { path: "category_id", select: "name -_id" },
      { path: "content_type_id", select: "type -_id" },
    ];

    const content = await Content.find({ user_id: req.user._id }).populate(populateQuery).exec();

    const data = content.map((ele, index) => {
      const obj = ele.toObject();
      obj.contentType = obj.content_type_id.type;
      obj.categoryName = obj.category_id.name;
      deleteJsonEntries(obj, ["content_type_id", "category_id", "__v", "updatedAt", "createdAt"]);
      return obj;
    });

    return res.status(200).json(data);
  } catch (err) {
    res.status(err?.status || 500).json({
      message: err?.message,
    });
  }
};

const getAllFiles = async (req, res) => {
  const {tag , contentType} = req.body
  try {
    
    const populateQuery = [
      {
        path: "tag_one_id",
        select: "-_id",
        match: {
          tagName: { $regex: tag, $options: "i" },
        },
      },
      {
        path: "tag_two_id",
        select: "-_id",
        match: {
          tagName: { $regex: tag, $options: "i" },
        },
      },
      {
        path: "content_type_id",
        select: "-_id",
        match: {
          type: { $regex: contentType, $options: "i" },
        },
      },
      {
        path: "category_id",
        select: "-_id",
        match: {
          name: { $regex: tag, $options: "i" },
        },
      },
      {
        path: "file_type",
        select: "-_id",
      }, {
        path: "license_type",
        select: "-_id",
      }, {
        path: "size",
        select: "-_id",
      },
    ];

    const categoryArray = await Content.find({},{ _id: 1, thumbFile: 1, waterMarkFile: 1,description:1  }).sort({updatedAt: -1}).populate(populateQuery).exec();

    const sortedCategories = categoryArray.filter(ele=> ((ele?.tag_one_id || ele?.tag_two_id ||ele?.category_id)&&ele.content_type_id)?true:false)

    return res.status(200).json(sortedCategories);
  } catch (err) {
    res.status(err?.status || 500).json({
      message: err?.message,
    });
  }
};

const getMainFile = async (req, res) => {
  try {
    const categories = await Content.findById(req.params.id, { _id: 1, mainFile: 1 });
    return res.status(200).json(categories);
  } catch (err) {
    res.status(err?.status || 500).json({
      message: err?.message,
    });
  }
};

const updateContent = async (req, res) => {
  const { _id, category, contentType, tagOne, tagTwo, name, description ,fileType ,licenseType,size} = req.body;
  try {
    if (_id) {
      const updatedFields = {
        category_id: category.value,
        content_type_id: contentType.value,
        tag_one_id: tagOne.value,
        tag_two_id: tagTwo.value,
        file_type:fileType.value,
        license_type:licenseType.value,
        size: size.value,
      };
      if (name) {
        updatedFields.name = name;
      }
      if (description) {
        updatedFields.description = description;
      }
      const content = await Content.findByIdAndUpdate(_id, updatedFields);
      if (content) {
        return res.status(200).json({
          message: "updated successfully",
        });
      }
    }
    return res.status(200).json({
      message: "something wants wrong!!",
    });
  } catch (err) {
    res.status(err?.status || 500).json({
      message: err?.message,
    });
  }
};

module.exports = { addContent, getAllFiles, getMainFile, getContent, updateContent };
