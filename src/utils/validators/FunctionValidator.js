import Validator from './Validator.js';

class FunctionValidator extends Validator {
  static #ERROR_MESSAGES = Object.freeze({
    INVALID_FUNCTION: '함수 타입이 아닙니다.',
  });

  constructor(value) {
    super(value);
    FunctionValidator.#validateFunction(value);
  }

  static from(value) {
    return new FunctionValidator(value);
  }

  static #validateFunction(...args) {
    if (args.some((value) => typeof value !== 'function')) {
      FunctionValidator._throwError(
        FunctionValidator.#ERROR_MESSAGES.INVALID_FUNCTION,
      );
    }
  }
}

export default FunctionValidator;
