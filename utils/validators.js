const Joi = require('joi');

module.exports.validateUserBody = Joi.object({
  name: Joi.string(),
  about: Joi.string(),
  avatar: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports.validateAuthentication = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
