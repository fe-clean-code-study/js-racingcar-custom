import NumberValidator from './NumberValidator.js';
import Validator from './Validator.js';

class StringValidator extends Validator {
  static #ERROR_MESSAGES = Object.freeze({
    INVALID_STRING: '문자열 타입이 아닙니다.',
    INVALID_PATTERN: '정규식 패턴에 맞지 않습니다.',
    INVALID_REGEXP: '유효한 정규표현식이 아닙니다.',
    EMPTY_STRING: '빈 문자열은 허용되지 않습니다.',
    TOO_LONG: '문자열이 너무 깁니다.',
  });

  constructor(value) {
    super(value);
    StringValidator.#validateString(value);
  }

  static from(value) {
    return new StringValidator(value);
  }

  matches(pattern) {
    if (!(pattern instanceof RegExp)) {
      throw new Error(StringValidator.#ERROR_MESSAGES.INVALID_REGEXP);
    }

    if (!pattern.test(this.value)) {
      throw new Error(StringValidator.#ERROR_MESSAGES.INVALID_PATTERN);
    }

    return this;
  }

  notEmpty() {
    if (this.value === '') {
      throw new Error(StringValidator.#ERROR_MESSAGES.EMPTY_STRING);
    }

    return this;
  }

  maxLength(max) {
    NumberValidator.from(max);

    if (this.value.length > max) {
      throw new Error(StringValidator.#ERROR_MESSAGES.TOO_LONG);
    }

    return this;
  }

  static #validateString(...args) {
    if (args.some((value) => typeof value !== 'string')) {
      throw new Error(this.#ERROR_MESSAGES.INVALID_STRING);
    }
  }
}

export default StringValidator;
