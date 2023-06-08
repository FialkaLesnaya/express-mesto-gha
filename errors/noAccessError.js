const { NO_ACCESS_ERROR_CODE } = require('../utils/utils');

class NoAccessError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NO_ACCESS_ERROR_CODE;
  }
}

module.exports = NoAccessError;
