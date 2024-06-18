export default class Car {
  static NAME_SIZE = 5;

  #position;
  #name;

  constructor(name) {
    Car.#validateName(name);
    this.#position = 0;
    this.#name = name;
  }

  move() {
    this.#position += 1;
  }

  get position() {
    return this.#position;
  }

  static #validateName(name) {
    if (name.trim().length > this.NAME_SIZE) {
      throw new Error('자동차의 이름은 5글자 이하여야 합니다.')
    }
  }
}
