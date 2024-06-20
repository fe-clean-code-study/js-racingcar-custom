function makeCar(maxNameLength) {
  if (typeof maxNameLength !== "number") {
    throw new Error("makeCar 함수의 인수값이 숫자가 아닙니다.");
  }

  if (maxNameLength < 1) {
    throw new Error("makeCar 함수의 인수값이 1 이상이어야 합니다.");
  }

  return class Car {
    #name;
    #position;

    constructor(name) {
      Car.#validateName(name);
      this.#name = name;
      this.#position = 0;
    }

    get name() {
      return this.#name;
    }

    move() {
      this.#position++;
    }

    get position() {
      return this.#position;
    }

    static #validateName(name) {
      if (typeof name !== "string") {
        throw new Error("자동차 이름은 문자열이어야 합니다.");
      }

      const trimedName = name.trim();

      if (maxNameLength < trimedName.length) {
        throw new Error("자동차 이름은 5자 이하여야 합니다.");
      }

      if (trimedName.length < 1) {
        throw new Error("자동차 이름은 1자 이상이어야 합니다.");
      }
    }
  };
}

const Car = makeCar(5);

export default Car;
