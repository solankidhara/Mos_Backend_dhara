const mongoose = require("mongoose");

const deleteJsonEntries = require("../utils/deleteJsonEntries");

const contentTypeSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);


contentTypeSchema.methods.toJSON = function () {
  const category = this;
  const categoryObject = category.toObject();
  const configureObject = deleteJsonEntries(categoryObject, ["createdAt", "updatedAt", "__v"]);
  return configureObject;
};

const ContentType = mongoose.model("content_types", contentTypeSchema);

module.exports = ContentType;