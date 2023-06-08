const Joi = require('joi');
const { REG_EXP_URL } = require('./utils');

module.exports.validateUserBody = Joi.object({
  name: Joi.string().min(2).max(30),
  about: Joi.string().min(2).max(30),
  avatar: Joi.string().pattern(REG_EXP_URL),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports.validateAuthentication = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports.validateUserId = Joi.object({
  userId: Joi.string().length(24).hex().required(),
});

module.exports.validateCardId = Joi.object({
  cardId: Joi.string().length(24).hex().required(),
});

module.exports.validateUserDetails = Joi.object({
  name: Joi.string().min(2).max(30),
  about: Joi.string().min(2).max(30),
  avatar: Joi.string().pattern(REG_EXP_URL),
});

module.exports.validateUserAvatar = Joi.object({
  avatar: Joi.string().pattern(REG_EXP_URL),
});

module.exports.validateCardBody = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  link: Joi.string().pattern(REG_EXP_URL).required(),
  owner: Joi.string(),
  likes: Joi.array().items(Joi.string()),
  createdAt: Joi.date(),
});
