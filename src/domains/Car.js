import { carValidations } from '../validations/car.js';

export default class Car {
  #position;

  constructor(name) {
    this.name = name.replaceAll(' ', '');

    this.validate();
    this.#position = 0;
  }

  get position() {
    return this.#position;
  }

  move(diff) {
    if (this.#position + diff < 0) {
      this.#position = 0;
    } else {
      this.#position += diff;
    }
  }

  validate() {
    Object.values(carValidations).forEach(({ check, errorMessage }) => {
      if (!check(this.name)) {
        throw new Error(errorMessage);
      }
    });
  }
}
