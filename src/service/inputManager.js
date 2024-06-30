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

  async retryScan(query, processFn) {
    try {
      const inputValue = await this.scan(query);

      return processFn ? processFn(inputValue) : inputValue;
    } catch (error) {
      return await this.retryScan(
        `${error.message} 다시 입력해주세요.\n`,
        processFn
      );
    }
  }
}

const inputManager = new InputManager(readLineAsync);

export default inputManager;
