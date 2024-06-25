import { readLineAsync } from "../utils/index.js";

class InputManager {
  #inputFn;

  constructor(inputFn) {
    this.#inputFn = inputFn;
  }

  async scan(query) {
    const inputValue = await this.#inputFn(query);

    return inputValue;
  }
}

const inputManager = new InputManager(readLineAsync);

export default inputManager;
