const { NOT_CORRECT_VALUE_ERROR_CODE } = require('../utils/utils');

class NotCorrectValueError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_CORRECT_VALUE_ERROR_CODE;
  }
}

module.exports = NotCorrectValueError;
