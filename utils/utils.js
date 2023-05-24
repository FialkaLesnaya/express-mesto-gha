const mongoose = require("mongoose");

module.exports.DEFAULT_ERROR_CODE = 500;
module.exports.NOT_CORRECT_ERROR_CODE = 400;
module.exports.NOT_FOUND_ERROR_CODE = 404;

module.exports.handleError = (res, statusCode, message) => {
  res.status(statusCode).send({ message });
};

module.exports.isValidId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};
