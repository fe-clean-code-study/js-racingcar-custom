class Vehicle {
  #position;

  constructor() {
    this.#position = 0;
  }

  get position() {
    return this.#position;
  }

  move() {
    this.#position += 1;
  }
}

export default Vehicle;
