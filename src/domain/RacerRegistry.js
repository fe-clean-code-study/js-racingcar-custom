import { RACER_ENTITY_TYPES } from "../constants/index.js";
import { inputManager } from "../service/index.js";

class RacerRegistry {
  #entityType;
  #separator;

  constructor(separator) {
    RacerRegistry.#validateSeparator(separator);
    this.#separator = separator;
  }

  async selectEntityType() {
    const typeNumber = await inputManager.scan(
      `원하시는 레이서의 유형을 선택해서 번호를 입력해주세요.\n${Object.entries(
        RACER_ENTITY_TYPES
      )
        .map(([number, type]) => `${number}. ${type}`)
        .join("\n")}\n`
    );

    this.#entityType = RACER_ENTITY_TYPES[typeNumber];
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
