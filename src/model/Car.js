import { validateCarName } from "../utils/validateCarName.js";

export class Car {
  #carName;
  #velocity = 0;
  #position = 0;

  constructor(carName) {
    validateCarName(carName);
    this.#carName = carName;
  }

  move() {
    this.#position += this.#velocity;
  }

  ready() {
    this.#position = 0;
    this.#velocity = 0;
  }

  set velocity(newVelocity) {
    this.#velocity = newVelocity;
  }

  get carName() {
    return this.#carName;
  }

  set carName(newName) {
    validateCarName(newName);
    this.#carName = newName;
  }

  set velocity(newVelocity) {
    this.#velocity = newVelocity;
  }

  get velocity() {
    return this.#velocity;
  }

  get position() {
    return this.#position;
  }
}
