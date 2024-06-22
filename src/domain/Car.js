import Vehicle from '../shared/Vehicle.js';
import NumberValidator from '../utils/validators/NumberValidator.js';
import StringValidator from '../utils/validators/StringValidator.js';

class Car extends Vehicle {
  static #NAME_SIZE_LIMIT = 5;
  static #NAME_PATTERN = /^[a-zA-Z0-9ㄱ-ㅎ가-힣\s]*$/;

  static #ERROR_MESSAGES = Object.freeze({
    INVALID_NAME: '이름은 특수문자를 제외한 문자만 가능합니다.',
    EMPTY_NAME: '이름은 공백일 수 없습니다.',
    INVALID_NAME_SIZE: `이름은 ${this.#NAME_SIZE_LIMIT}자 이하여야 합니다.`,
  });

  #name;

  constructor({ name, nameSize = Car.#NAME_SIZE_LIMIT }) {
    super();
    Car.#validateName(name, nameSize);
    this.#name = name.trim();
    this.mode;
  }

  get name() {
    return this.#name;
  }

  static #validateName(name, nameSize) {
    // 이름 유효성 검사
    StringValidator.from(name)
      .notEmpty(this.#ERROR_MESSAGES.EMPTY_NAME)
      .matches(this.#NAME_PATTERN, this.#ERROR_MESSAGES.INVALID_NAME);

    // 이름 길이 유효성 검사
    NumberValidator.from(nameSize).assertInteger();
    NumberValidator.from(name.trim().length)
      .lessThanOrEqual(nameSize, this.#ERROR_MESSAGES.INVALID_NAME_SIZE)
      .greaterThan(0, this.#ERROR_MESSAGES.EMPTY_NAME);
  }
}

export default Car;
