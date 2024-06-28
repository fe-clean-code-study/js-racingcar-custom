import { readLineAsync } from "../utils/index.js";

class InputManager {
  #inputFn;

  constructor(inputFn) {
    this.#inputFn = inputFn;
  }

  async scan(query) {
    const inputValue = await this.#inputFn(query);

    return inputValue.trim();
  }

  async retryScan(query, validateFn, errorMessageQuery = "") {
    try {
      const inputValue = await this.scan(query);

      validateFn(inputValue);

      return inputValue;
    } catch (error) {
      return await this.retryScan(
        `${error.message} ${errorMessageQuery}`,
        validateFn,
        errorMessageQuery
      );
    }
  }
}

const inputManager = new InputManager(readLineAsync);

export default inputManager;
