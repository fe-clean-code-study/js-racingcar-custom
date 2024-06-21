import Validator from './Validator.js';

class NumberValidator extends Validator {
  static #ERROR_MESSAGES = Object.freeze({
    INVALID_NUMBER: '숫자 타입이 아닙니다.',
    INVALID_RANGE: '잘못된 숫자 범위입니다.',
    NOT_GREATER_THAN: '값이 기준 값보다 커야 합니다.',
    NOT_LESS_THAN: '값이 기준 값보다 작아야 합니다.',
    NOT_SAME_AS: '값이 기준 값과 같아야 합니다.',
  });

  constructor(value) {
    super(value);
    NumberValidator.#validateNumber(value);
  }

  static from(value) {
    return new NumberValidator(value);
  }

  inRange(min, max) {
    NumberValidator.from(min);
    NumberValidator.from(max);

    if (this.value < min || this.value > max) {
      this._throwError(NumberValidator.#ERROR_MESSAGES.INVALID_RANGE);
    }

    return this;
  }

  greaterThan(otherValue) {
    NumberValidator.from(otherValue);

    if (this.value <= otherValue) {
      this._throwError(NumberValidator.#ERROR_MESSAGES.NOT_GREATER_THAN);
    }

    return this;
  }

  lessThan(otherValue) {
    NumberValidator.from(otherValue);

    if (this.value >= otherValue) {
      this._throwError(NumberValidator.#ERROR_MESSAGES.NOT_LESS_THAN);
    }

    return this;
  }

  sameAs(otherValue) {
    NumberValidator.from(otherValue);

    if (this.value !== otherValue) {
      this._throwError(NumberValidator.#ERROR_MESSAGES.NOT_SAME_AS);
    }

    return this;
  }

  static #validateNumber(...args) {
    if (args.some((value) => typeof value !== 'number' || isNaN(value))) {
      NumberValidator._throwError(
        NumberValidator.#ERROR_MESSAGES.INVALID_NUMBER,
      );
    }
  }
}

export default NumberValidator;
