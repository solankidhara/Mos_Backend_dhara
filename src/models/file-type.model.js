const mongoose = require("mongoose");

const deleteJsonEntries = require("../utils/deleteJsonEntries");

const fileTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);


fileTypeSchema.methods.toJSON = function () {
  const file = this;
  const fileObject = file.toObject();
  const configureObject = deleteJsonEntries(fileObject, ["createdAt", "updatedAt", "__v"]);
  return configureObject;
};

const FileType = mongoose.model("file_types", fileTypeSchema);

module.exports = FileType;
