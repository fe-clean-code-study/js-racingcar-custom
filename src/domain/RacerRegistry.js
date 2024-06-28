import { RACER_ENTITY_TYPES } from "../constants/index.js";
import { inputManager } from "../service/index.js";

class RacerRegistry {
  static #SEPARATOR = ",";
  #entityType;

  async selectEntityType() {
    let typeNumber = await inputManager.scan(
      `원하시는 레이서의 유형을 선택해서 번호를 입력해주세요.\n${RacerRegistry.#stringifyRacerEntityTypes()}\n`
    );

    while (!RacerRegistry.#isCorrectTypeNumber(typeNumber)) {
      typeNumber = await inputManager.scan(
        "올바른 유형의 번호가 아닙니다. 다시 입력해주세요.\n"
      );
    }

    this.#entityType = RACER_ENTITY_TYPES[typeNumber];
  }

  async register() {
    const inputValue = await inputManager.scan(
      `경주할 ${this.#entityType} 이름을 입력하세요(이름은 쉼표(${
        RacerRegistry.#SEPARATOR
      })를 기준으로 구분).\n`
    );
    const racerNameList = inputValue.split(RacerRegistry.#SEPARATOR);

    return racerNameList;
  }

  static #stringifyRacerEntityTypes() {
    return Object.entries(RACER_ENTITY_TYPES)
      .map(([number, type]) => `${number}. ${type}`)
      .join("\n");
  }

  static #isCorrectTypeNumber(typeNumber) {
    return typeNumber in RACER_ENTITY_TYPES;
  }
}

export default RacerRegistry;
