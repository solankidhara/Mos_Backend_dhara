const Joi = require("joi");
const fs = require("fs");

const categoryValidator = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
  });

  try {
    const result = await schema.validateAsync(req.body);
    if (result) next();
  } catch (error) {
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(400).json({
      errorType: "validation error",
      message: error.details[0].message,
    });
  }
};

module.exports = categoryValidator;
