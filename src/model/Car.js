import validation from '../utils/validation.js';

class Car {
  #name;
  #position;

  constructor(name) {
    this.#name = this.setName(name);
    this.#position = 0;
  }

  setName(name) {
    if (!validation.isValidateCarName(name)) return '';

    this.#name = name.trim();
    return this.#name;
  }

  getName() {
    return this.#name;
  }

  setPosition(position) {
    if (!validation.isValidatePosition(position)) return this.#position;

    this.#position = position;
    return this.#position;
  }

  getPosition() {
    return this.#position;
  }

  move(distance = 1) {
    this.setPosition(this.#position + distance);
  }
}

export default Car;
