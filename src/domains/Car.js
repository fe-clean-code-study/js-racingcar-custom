export default class Car{
  #position
  constructor(name) {
    this.name = name
    this.#position = 0
  }
  get position() {
    return this.#position
  }
  move() {
    this.#position += 1
  }
}