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

module.exports.validateUserId = Joi.object({
  userId: Joi.string().pattern(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/).required(),
});

module.exports.validateCardId = Joi.object({
  cardId: Joi.string().pattern(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/).required(),
});

module.exports.validateUserDetails = Joi.object({
  name: Joi.string().min(2).max(30),
  about: Joi.string().min(2).max(30),
  avatar: Joi.string().pattern(/^https?:\/\/(?:www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+$/),
});

module.exports.validateUserAvatar = Joi.object({
  avatar: Joi.string().pattern(/^https?:\/\/(?:www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+$/),
});

module.exports.validateCardBody = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  link: Joi.string().pattern(/^https?:\/\/(?:www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+$/).required(),
  owner: Joi.string(),
  likes: Joi.array().items(Joi.string()),
  createdAt: Joi.date(),
});
