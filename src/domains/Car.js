import { carValidations } from "../validations/car.js";

export default class Car{
  #position

  constructor(name) {
    this.name = name.trim();

    this.validate()
    this.#position = 0
  }

  get position() {
    return this.#position
  }

  move() {
    this.#position += 1
  }

  validate() {
    carValidations.forEach(({ check, errorMessage }) => {
      if (!check(this.name)) {
        throw new Error(errorMessage)
      }
    })
  }
}

