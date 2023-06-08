const { IS_EXIST_ERROR_CODE } = require('../utils/utils');

class IsExistError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = IS_EXIST_ERROR_CODE;
  }
}

module.exports = IsExistError;
