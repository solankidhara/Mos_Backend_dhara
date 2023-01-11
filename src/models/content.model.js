const mongoose = require("mongoose");

const deleteJsonEntries = require("../utils/deleteJsonEntries");

const contentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    tag_one_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "tags",
    },
    tag_two_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "tags",
    },
    content_type_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "content_types",
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      //   required: true,
      ref: "categories",
    },
    file_type: {
      type: mongoose.Schema.Types.ObjectId,
      //   required: true,
      ref: "file_types",
    },
    license_type: {
      type: mongoose.Schema.Types.ObjectId,
      //   required: true,
      ref: "license_types",
    },
    size: {
      type: mongoose.Schema.Types.ObjectId,
      //   required: true,
      ref: "sizes",
    },
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
    mainFile: {
      type: String,
    },
    thumbFile: {
      type: String,
    },
    waterMarkFile: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

contentSchema.methods.toJSON = function () {
  const content = this;
  const contentObject = content.toObject();
  const configureObject = deleteJsonEntries(contentObject, ["createdAt", "updatedAt", "__v"]);
  return configureObject;
};

const Content = mongoose.model("contents", contentSchema);

module.exports = Content;
