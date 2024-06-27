class Racer {
  #name;
  #position;

  constructor(name) {
    const trimedName = name.trim();
    this.#name = trimedName;
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

  static #validateDistance(distance) {
    if (typeof distance !== "number" || !Number.isInteger(distance)) {
      throw new Error("이동 거리는 정수여야 합니다.");
    }
  }
}

export default Racer;
