class Validator {
  static #ERROR_MESSAGES = Object.freeze({
    INVALID_VALUE: '빈 값은 허용되지 않습니다.',
  });

  constructor(value) {
    Validator.#validateValue(value);
    this.value = value;
  }

  static from(value) {
    return new Validator(value);
  }

  static #validateValue(value) {
    if (value === undefined || value === null) {
      throw new Error(`[${value}] ${this.#ERROR_MESSAGES.INVALID_VALUE}`);
    }
  }
}

export default Validator;
