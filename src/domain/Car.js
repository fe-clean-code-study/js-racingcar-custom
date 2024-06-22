import Vehicle from '../shared/Vehicle.js';
import NumberValidator from '../utils/validators/NumberValidator.js';
import StringValidator from '../utils/validators/StringValidator.js';

class Car extends Vehicle {
  static #NAME_SIZE_LIMIT = 5;
  static #NAME_PATTERN = /^[a-zA-Z0-9ㄱ-ㅎ가-힣\s]*$/;

  #name;

  constructor({ name, nameSize = Car.#NAME_SIZE_LIMIT }) {
    super();
    Car.#validateName(name.trim(), nameSize);
    this.#name = name.trim();
    this.mode;
  }

  get name() {
    return this.#name;
  }

  static #validateName(name, nameSize) {
    // 이름 유효성 검사
    StringValidator.from(name).notEmpty().matches(this.#NAME_PATTERN);

    // 이름 길이 유효성 검사
    NumberValidator.from(nameSize).assertInteger();
    NumberValidator.from(name.length).lessThanOrEqual(nameSize).greaterThan(0);
  }
}

export default Car;
