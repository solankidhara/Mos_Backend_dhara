const mongoose = require("mongoose");

const deleteJsonEntries = require("../utils/deleteJsonEntries");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    thumbNailImg:{
      type:String,
      required:true
    },
  },
  {
    timestamps: true,
  }
);


categorySchema.methods.toJSON = function () {
  const category = this;
  const categoryObject = category.toObject();
  const configureObject = deleteJsonEntries(categoryObject, ["createdAt", "updatedAt", "__v"]);
  return configureObject;
};

const Category = mongoose.model("categories", categorySchema);

module.exports = Category;
