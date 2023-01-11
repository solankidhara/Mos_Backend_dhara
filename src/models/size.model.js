const mongoose = require("mongoose");

const deleteJsonEntries = require("../utils/deleteJsonEntries");

const sizeTypeSchema = new mongoose.Schema(
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


sizeTypeSchema.methods.toJSON = function () {
  const size = this;
  const sizeObject = size.toObject();
  const configureObject = deleteJsonEntries(sizeObject, ["createdAt", "updatedAt", "__v"]);
  return configureObject;
};

const SizeType = mongoose.model("sizes", sizeTypeSchema);

module.exports = SizeType;
