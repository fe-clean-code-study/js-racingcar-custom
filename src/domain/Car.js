import NumberValidator from '../utils/validators/NumberValidator';
import StringValidator from '../utils/validators/StringValidator';

class Car {
  static #NAME_SIZE_LIMIT = 5;
  static #NAME_PATTERN = /^[a-zA-Z0-9ㄱ-ㅎ가-힣\s]*$/;

  #name;
  #position;

  constructor({ name, nameSize = Car.#NAME_SIZE_LIMIT }) {
    Car.#validateName(name.trim(), nameSize);
    this.#position = 0;
    this.#name = name.trim();
    this.mode;
  }

  get name() {
    return this.#name;
  }

  get position() {
    return this.#position;
  }

  move() {
    this.#position += 1;
  }

  static #validateName(name, nameSize) {
    // 이름 유효성 검사
    StringValidator.from(name).matches(this.#NAME_PATTERN);

    // 이름 길이 유효성 검사
    NumberValidator.from(nameSize);
    NumberValidator.from(nameSize % 1).sameAs(0);
    NumberValidator.from(name.length).lessThanOrEqual(nameSize).greaterThan(0);
  }
}

export default Car;
