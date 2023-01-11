const mongoose = require("mongoose");

const deleteJsonEntries = require("../utils/deleteJsonEntries");

const licenseTypeSchema = new mongoose.Schema(
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


licenseTypeSchema.methods.toJSON = function () {
  const file = this;
  const fileObject = file.toObject();
  const configureObject = deleteJsonEntries(fileObject, ["createdAt", "updatedAt", "__v"]);
  return configureObject;
};

const LicenseType = mongoose.model("license_types", licenseTypeSchema);

module.exports = LicenseType;
