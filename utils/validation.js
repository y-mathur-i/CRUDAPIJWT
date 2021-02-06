const { object } = require("joi");
const joi = require("joi");

const validateUserRegister = (body) => {
  const schema = joi.object({
    name: joi.string().min(6).max(25).required(),
    email: joi.string().min(8).required().email(),
    password: joi.string().min(6).required(),
  });
  return schema.validate(body);
};

const validateUserLogin = (body) => {
  const schema = joi.object({
    password: joi.string().min(6).required(),
    email: joi.string().min(8).max(255).email().required(),
  });
  return schema.validate(body);
};

module.exports = {
  validateUserRegister,
  validateUserLogin,
};
