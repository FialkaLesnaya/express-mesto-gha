const Joi = require('joi');

module.exports.validateUserBody = Joi.object({
  name: Joi.string().required(),
  about: Joi.string().required(),
  avatar: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports.validateAuthentication = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
