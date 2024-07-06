import { outputManager } from "../service/index.js";
import { validate } from "../utils/index.js";
import Race from "./Race.js";

class RaceScoreboard {
  #race;

  constructor(race) {
    RaceScoreboard.#validateRace(race);
    this.#race = race;
  }

  displayRecords() {
    outputManager.linebreak();
    outputManager.print("실행 결과");

    this.#race.records.forEach((record) => {
      outputManager.printAll(
        record,
        (racer) => `${racer.name} : ${"-".repeat(racer.position)}`
      );

      outputManager.linebreak();
    });
  }

  displayWinners() {
    outputManager.print(
      `${this.#race.winners
        .map((racer) => racer.name)
        .join(", ")}가 최종 우승했습니다.`
    );
  }

  static #validateRace(race) {
    validate.instance(race, Race, "Race 클래스의 인스턴스가 아닙니다.");
  }
}

export default RaceScoreboard;
