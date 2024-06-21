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

  move() {
    this.#position++;
  }
}

export default Racer;
