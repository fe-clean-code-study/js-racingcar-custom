class Car {
  #name;
  #velocity = 0;
  #position = 0;

  constructor(name) {
    Car.validateName(name);
    this.#name = name;
  }

  static validateName(name) {
    if (name.length > 5) {
      throw new Error("자동차 이름은 5자 이하만 가능합니다.");
    }
  }

  get name() {
    return this.#name;
  }

  set name(newName) {
    Car.validateName(newName);
    this.#name = newName;
  }

  set velocity(newVelocity) {
    this.#velocity = newVelocity;
  }

  get position() {
    return this.#position;
  }

  move() {
    this.#position += this.#velocity;
  }

  resetPosition() {
    this.#position = 0;
  }
}
