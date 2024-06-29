import { RACER_ENTITY_TYPES } from "../constants/index.js";
import { inputManager } from "../service/index.js";
import Race from "./Race.js";
import Racer from "./Racer.js";

class RaceEntry {
  static #SEPARATOR = ",";
  #entityType;

  async selectEntityType() {
    const typeNumber = await inputManager.retryScan(
      `원하시는 레이서의 유형을 선택해서 번호를 입력해주세요.\n${RaceEntry.#stringifyRacerEntityTypes()}\n`,
      {
        processFn: (inputValue) => {
          RaceEntry.#validateTypeNumber(inputValue);

          return inputValue;
        },
        errorMessageQuery: "다시 입력해주세요.\n",
      }
    );

    this.#entityType = RACER_ENTITY_TYPES[typeNumber];
  }

  async registerRacers() {
    const racers = await inputManager.retryScan(
      `경주할 ${this.#entityType} 이름을 입력하세요(이름은 쉼표(${
        RaceEntry.#SEPARATOR
      })를 기준으로 구분).\n`,
      {
        processFn: (inputValue) => {
          const racerNameList = inputValue.split(RaceEntry.#SEPARATOR);

          return racerNameList.map((name) => new Racer(name.trim()));
        },
        errorMessageQuery: "다시 입력해주세요.\n",
      }
    );

    return racers;
  }

  async setRaceLaps() {
    const laps = await inputManager.retryScan("시도할 횟수는 몇회인가요?\n", {
      processFn: (inputValue) => {
        const numValue = Number(inputValue);

        RaceEntry.#validateRaceLaps(numValue);

        return numValue;
      },
      errorMessageQuery: "다시 입력해주세요.\n",
    });

    return new Race(laps);
  }

  static #stringifyRacerEntityTypes() {
    return Object.entries(RACER_ENTITY_TYPES)
      .map(([number, type]) => `${number}. ${type}`)
      .join("\n");
  }

  static #isCorrectTypeNumber(typeNumber) {
    return typeNumber in RACER_ENTITY_TYPES;
  }

  static #validateTypeNumber(typeNumber) {
    if (!RaceEntry.#isCorrectTypeNumber(typeNumber)) {
      throw new Error("올바른 유형의 번호가 아닙니다.");
    }
  }

  static #validateRaceLaps(numValue) {
    if (Number.isNaN(numValue) || !Number.isInteger(numValue)) {
      throw new Error("시도할 횟수로 정수를 입력해야 합니다.");
    }

    if (numValue < 1) {
      throw new Error("시도할 횟수는 1이상이어야 합니다.");
    }
  }
}

export default RaceEntry;
