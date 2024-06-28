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
    if (typeof name !== "string") {
      throw new Error("레이서 이름은 문자열이어야 합니다.");
    }

    if (Racer.#MAX_NAME_LENGTH < name.length) {
      throw new Error("레이서 이름은 5자 이하여야 합니다.");
    }

    if (name.length < 1) {
      throw new Error("레이서 이름은 1자 이상이어야 합니다.");
    }
  }

  static #validateDistance(distance) {
    if (typeof distance !== "number" || !Number.isInteger(distance)) {
      throw new Error("이동 거리는 정수여야 합니다.");
    }
  }
}

export default Racer;
