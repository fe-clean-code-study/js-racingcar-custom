import Validator from './Validator.js';

class NumberValidator extends Validator {
  static #ERROR_MESSAGES = Object.freeze({
    INVALID_NUMBER: '숫자 타입이 아닙니다.',
    INVALID_RANGE: '잘못된 숫자 범위입니다.',
    NOT_GREATER_THAN: '값이 기준 값보다 커야 합니다.',
    NOT_GREATER_THAN_OR_EQUAL: '값이 기준 값보다 크거나 같아야 합니다.',
    NOT_LESS_THAN: '값이 기준 값보다 작아야 합니다.',
    NOT_LESS_THAN_OR_EQUAL: '값이 기준 값보다 작거나 같아야 합니다.',
    NOT_SAME_AS: '값이 기준 값과 같아야 합니다.',
    NOT_INTEGER: '정수가 아닙니다.',
  });

  constructor(value) {
    super(value);
    NumberValidator.#validateNumber(value);
  }

  static from(value) {
    return new NumberValidator(value);
  }

  inRange(min, max, message) {
    NumberValidator.from(min);
    NumberValidator.from(max);

    if (this.value < min || this.value > max) {
      throw new Error(message || NumberValidator.#ERROR_MESSAGES.INVALID_RANGE);
    }

    return this;
  }

  greaterThan(otherValue, message) {
    NumberValidator.from(otherValue);

    if (this.value <= otherValue) {
      throw new Error(
        message || NumberValidator.#ERROR_MESSAGES.NOT_GREATER_THAN,
      );
    }

    return this;
  }

  greaterThanOrEqual(otherValue, message) {
    NumberValidator.from(otherValue);

    if (this.value < otherValue) {
      throw new Error(
        message || NumberValidator.#ERROR_MESSAGES.NOT_GREATER_THAN_OR_EQUAL,
      );
    }

    return this;
  }

  lessThan(otherValue, message) {
    NumberValidator.from(otherValue);

    if (this.value >= otherValue) {
      throw new Error(message || NumberValidator.#ERROR_MESSAGES.NOT_LESS_THAN);
    }

    return this;
  }

  lessThanOrEqual(otherValue, message) {
    NumberValidator.from(otherValue);

    if (this.value > otherValue) {
      throw new Error(
        message || NumberValidator.#ERROR_MESSAGES.NOT_LESS_THAN_OR_EQUAL,
      );
    }

    return this;
  }

  sameAs(otherValue, message) {
    NumberValidator.from(otherValue);

    if (this.value !== otherValue) {
      throw new Error(message || NumberValidator.#ERROR_MESSAGES.NOT_SAME_AS);
    }

    return this;
  }

  assertInteger(message) {
    if (!Number.isInteger(this.value)) {
      throw new Error(message || NumberValidator.#ERROR_MESSAGES.NOT_INTEGER);
    }

    return this;
  }

  static #validateNumber(...args) {
    if (args.some((value) => typeof value !== 'number' || isNaN(value))) {
      throw new Error(this.#ERROR_MESSAGES.INVALID_NUMBER);
    }
  }
}

export default NumberValidator;
