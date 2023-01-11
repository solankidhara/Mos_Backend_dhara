const Joi = require("joi");

const loginValidator = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(15).required(),
  });

  try {
    const result = await schema.validateAsync(req.body);
    if (result) next();
  } catch (error) {
    return res.status(400).json({
      errorType: "validation error",
      message: error.details[0].message,
    });
  }
};

module.exports = loginValidator;
