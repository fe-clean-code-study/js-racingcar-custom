import { validate } from "../utils/index.js";

class Racer {
  static #MAX_NAME_LENGTH = 5;
  #name;
  #position;

  constructor(name) {
    Racer.#validateName(name);
    this.#name = name;
    this.#position = 0;
  }

  get name() {
    return this.#name;
  }

  get position() {
    return this.#position;
  }

  move(distance = 1) {
    Racer.#validateDistance(distance);

    const movedPosition = this.#position + distance;

    this.#position = movedPosition < 0 ? 0 : movedPosition;
  }

  static #validateName(name) {
    validate.string(name, "레이서 이름은 문자열이어야 합니다.");
    validate.lessThan(
      Racer.#MAX_NAME_LENGTH,
      name.length,
      "레이서 이름은 5자 이하여야 합니다."
    );
    validate.lessThan(name.length, 1, "레이서 이름은 1자 이상이어야 합니다.");
  }

  static #validateDistance(distance) {
    validate.integer(distance, "이동 거리는 정수여야 합니다.");
  }
}

export default Racer;
