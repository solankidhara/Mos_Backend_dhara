const Joi = require("joi");
const fs = require("fs");

const contentValidator = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    category_id: Joi.string().required(),
    content_type_id: Joi.string().required(),
    tagOne:Joi.string().required(),
    tagTwo:Joi.string().required(),
    file_type_id:Joi.string().required(),
    license_type_id:Joi.string().required(),
    size_id:Joi.string().required(),
    description: Joi.string().required(),
  });

  try {
    const result = await schema.validateAsync(req.body);
    if (result) {
      return next();
    }
  } catch (error) {
 
    const fileList = ["waterMarkFile", "thumbFile", "mainFile"];

    fileList.forEach((fileName) => {
      if (fs.existsSync(req?.files[fileName][0]?.path)) {
        fs.unlinkSync(req.files[fileName][0].path);
      }
    });

    return res.status(400).json({
      errorType: "validation error",
      message: error?.details[0]?.message,
    });
  }
};

module.exports = contentValidator;
