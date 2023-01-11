const Category = require("../models/category.model");
const pathSplit = require("../utils/pathSplit");

const addCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const categories = await Category.find({ name: name });

    if (!categories.length) {
      const category = new Category({
        name,
        thumbNailImg:pathSplit(req, req.file.path),
        description,
      });
      const data = await category.save();
      if (data) {
        return res.status(200).json({ message: "successfully inserted category" });
      }
    }

    return res.status(400).json({ message: "category name must be unique !!" });
  } catch (err) {
    res.status(err?.status || 500).json({
      message: err?.message,
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (err) {
    res.status(err?.status || 500).json({
      message: err?.message,
    });
  }
};

const categoryList = async (req, res) => {
  try {
    const categories = await Category.aggregate([{ $project: { value: "$_id", label: "$name", _id: 0 } }]);
    return res.status(200).json(categories);
  } catch (err) {
    res.status(err?.status || 500).json({
      message: err?.message,
    });
  }
};

const updateCategoryById = async (req, res) => {
  const {_id } = req.body
  try {
    const category = await Category.findByIdAndUpdate(_id, req.body)
    if(category){
      return res.status(200).json({
        message:"updated successfully"
      });
    }
  } catch (err) {
    res.status(err?.status || 500).json({
      message: err?.message,
    });
  }
};


module.exports = { addCategory, categoryList ,getAllCategories ,updateCategoryById};
