const mongoose = require("mongoose");

const deleteJsonEntries = require("../utils/deleteJsonEntries");

const tagSchema = new mongoose.Schema(
  {
    tagName: {
      type: String,
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);


tagSchema.methods.toJSON = function () {
  const tag = this;
  const tagObject = tag.toObject();
  const configureObject = deleteJsonEntries(tagObject, ["createdAt", "updatedAt", "__v"]);
  return configureObject;
};

const Tag = mongoose.model("tags", tagSchema);

module.exports = Tag;
