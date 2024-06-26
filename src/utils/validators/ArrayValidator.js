import Validator from './Validator.js';

class ArrayValidator extends Validator {
  static #ERROR_MESSAGES = Object.freeze({
    INVALID_ARRAY: '배열 타입이 아닙니다.',
  });

  constructor(array) {
    super(array);
    ArrayValidator.#validateArray(array);
  }

  static from(array) {
    return new ArrayValidator(array);
  }

  static #validateArray(...args) {
    if (args.some((array) => !Array.isArray(array))) {
      throw new Error(this.#ERROR_MESSAGES.INVALID_ARRAY);
    }
  }
}

export default ArrayValidator;
