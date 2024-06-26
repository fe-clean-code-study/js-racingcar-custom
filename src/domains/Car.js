import { carValidations } from '../validations/car.js'

export default class Car {
  #position

  constructor(name) {
    this.name = name.replaceAll(' ', '')

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
    Object.values(carValidations).forEach(({ check, errorMessage }) => {
      if (!check(this.name)) {
        throw new Error(errorMessage)
      }
    })
  }
}
