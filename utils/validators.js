const Joi = require('joi');

module.exports.validateUserBody = Joi.object({
  name: Joi.string().min(2).max(30),
  about: Joi.string().min(2).max(30),
  avatar: Joi.string().pattern(/^https?:\/\/(?:www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+$/),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports.validateAuthentication = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
