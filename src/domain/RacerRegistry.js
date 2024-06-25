import { inputManager } from "../service/index.js";

class RacerRegistry {
  #label;
  #separator;

  constructor(label, separator) {
    this.#label = label;
    this.#separator = separator;
  }

  async register() {
    const inputValue = await inputManager.scan(
      `경주할 ${this.#label} 이름을 입력하세요(이름은 ${
        this.#separator
      }를 기준으로 구분).\n`
    );
    const racerNameList = inputValue.split(this.#separator);

    return racerNameList;
  }
}

export default RacerRegistry;
