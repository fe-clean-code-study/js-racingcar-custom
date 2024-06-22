import Validator from './Validator.js';

class FunctionValidator extends Validator {
  static #ERROR_MESSAGES = Object.freeze({
    INVALID_FUNCTION: '함수 타입이 아닙니다.',
    NOT_INSTANCE: '해당 객체의 인스턴스가 아닙니다.',
  });

  constructor(fn) {
    super(fn);
    FunctionValidator.#validateFunction(fn);
  }

  static from(fn) {
    return new FunctionValidator(fn);
  }

  hasInstance(instance, message) {
    if (!(instance instanceof this.value)) {
      throw new Error(
        `[${message}] ${message || FunctionValidator.#ERROR_MESSAGES.NOT_INSTANCE}`,
      );
    }

    return this;
  }

  static #validateFunction(...args) {
    if (args.some((fn) => typeof fn !== 'function')) {
      throw new Error(this.#ERROR_MESSAGES.INVALID_FUNCTION);
    }
  }
}

export default FunctionValidator;
