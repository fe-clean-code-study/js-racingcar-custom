import Racer from "./Racer.js";

class Car extends Racer {
  static #MAX_NAME_LENGTH = 5;

  constructor(name) {
    super(name);

    Car.#validateName(this.name);
  }

  static #validateName(name) {
    if (typeof name !== "string") {
      throw new Error("자동차 이름은 문자열이어야 합니다.");
    }

    if (Car.#MAX_NAME_LENGTH < name.length) {
      throw new Error("자동차 이름은 5자 이하여야 합니다.");
    }

    if (name.length < 1) {
      throw new Error("자동차 이름은 1자 이상이어야 합니다.");
    }
  }
}

export default Car;
