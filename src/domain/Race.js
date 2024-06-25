import { deepCopy, getRandomNumber, isSubclass } from "../utils/index.js";
import Racer from "./Racer.js";

class Race {
  #Racer;
  #laps;
  #racers;
  #records;

  constructor(Racer, laps) {
    Race.#validateRacer(Racer);
    Race.#validateLaps(laps);
    this.#Racer = Racer;
    this.#laps = laps;
    this.#racers = [];
    this.#records = [];
  }

  ready(racerNameList) {
    Race.#validateRacerNameList(racerNameList);

    this.#addRacers(racerNameList);
  }

  start() {
    console.log("\n실행 결과");

    Array.from({ length: this.#laps }).forEach(() => {
      this.#progressRace();
    });

    Race.#showResult(this.winners);
  }

  #addRacer(racer) {
    this.#racers.push(racer);
  }

  #addRacers(racerNameList) {
    racerNameList.forEach((name) => {
      this.#addRacer(new this.#Racer(name));
    });
  }

  #progressRace() {
    let recordPerLap = [];

    this.#racers.forEach((racer) => {
      Race.#movementStrategy(racer);
      recordPerLap.push({ name: racer.name, position: racer.position });
      Race.#showRacer(racer);
    });

    this.#records.push(recordPerLap);
    console.log("");
  }

  get winners() {
    const finalLapRecord = deepCopy(this.#records.at(-1));
    const maxPosition = Math.max(
      ...finalLapRecord.map((racer) => racer.position)
    );

    return finalLapRecord.filter((racer) => racer.position === maxPosition);
  }

  static #movementStrategy(racer) {
    const number = getRandomNumber(0, 9);

    if (4 <= number) racer.move();
  }

  static #showRacer(racer) {
    console.log(`${racer.name} : ${"-".repeat(racer.position)}`);
  }

  static #showResult(racers) {
    console.log(
      `${racers.map((racer) => racer.name).join(", ")}가 최종 우승했습니다.`
    );
  }

  static #validateRacer(racer) {
    if (!isSubclass(racer, Racer)) {
      throw new Error("레이서가 Racer 클래스를 자식 클래스가 아닙니다.");
    }
  }

  static #validateLaps(laps) {
    if (typeof laps !== "number") {
      throw new Error("레이스 횟수는 숫자여야 합니다.");
    }

    if (laps < 1) {
      throw new Error("레이스 횟수는 1이상이어야 합니다.");
    }
  }

  static #validateRacerNameList(racerNameList) {
    if (!Array.isArray(racerNameList)) {
      throw new Error("경기 준비에 적합하지 않은 입력값입니다.");
    }

    if (racerNameList.length < 1) {
      throw new Error("경기를 준비하기엔 레이서가 부족합니다.");
    }
  }
}

export default Race;
