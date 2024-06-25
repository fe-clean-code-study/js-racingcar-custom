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

export default InputManager;
