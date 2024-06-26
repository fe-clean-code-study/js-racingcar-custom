export class Vehicle {
  static DEFAULT_POSITION = 0;
  #name;
  #position;

  constructor({ name, position = Vehicle.DEFAULT_POSITION }) {
    this.#name = name;
    this.#position = position;
  }

  get name() {
    return this.#name;
  }

  get position() {
    return this.#position;
  }

  move(distance = 1) {
    this.#position += distance;
  }
}
