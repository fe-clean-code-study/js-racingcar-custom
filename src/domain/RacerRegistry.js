import { inputManager } from "../service/index.js";

class RacerRegistry {
  #entityType;
  #separator;

  constructor(entityType, separator) {
    RacerRegistry.#validateEntityType(entityType);
    RacerRegistry.#validateSeparator(separator);
    this.#entityType = entityType;
    this.#separator = separator;
  }

  async register() {
    const inputValue = await inputManager.scan(
      `경주할 ${this.#entityType} 이름을 입력하세요(이름은 ${
        this.#separator
      }를 기준으로 구분).\n`
    );
    const racerNameList = inputValue.split(this.#separator);

    return racerNameList;
  }

  static #validateEntityType(entityType) {
    if (typeof entityType !== "string") {
      throw new Error("개체 유형은 문자열이어야 합니다.");
    }

    if (entityType.length < 1) {
      throw new Error("개체 유형은 1자 이상이어야 합니다.");
    }
  }

  static #validateSeparator(separator) {
    if (typeof separator !== "string") {
      throw new Error("분리 문자는 문자열이어야 합니다.");
    }

    if (separator.length < 1) {
      throw new Error("분리 문자는 1자 이상이어야 합니다.");
    }
  }
}

export default RacerRegistry;
