import { deepCopy, getRandomNumber } from "../utils/index.js";
import Racer from "./Racer.js";

class Race {
  #laps;
  #racers;
  #records;

  constructor(laps) {
    Race.#validateLaps(laps);
    this.#laps = laps;
    this.#racers = [];
    this.#records = [];
  }

  start(racers, rules = [() => 4 <= getRandomNumber(0, 9)]) {
    Race.#validateRacers(racers);

    this.#addRacers(racers);

    this.#progressRace(rules);
  }

  #addRacer(racer) {
    Race.#validateRacer(racer);

    this.#racers.push(racer);
  }

  #addRacers(racers) {
    racers.forEach((racer) => {
      this.#addRacer(racer);
    });
  }

  #progressRacePerLap(rule) {
    let recordPerLap = [];

    this.#racers.forEach((racer) => {
      Race.#moveByRule(racer, rule);
      recordPerLap.push({ name: racer.name, position: racer.position });
    });

    this.#records.push(recordPerLap);
  }

  #progressRace(rules) {
    Array.from({ length: this.#laps }).forEach(() => {
      const rule = rules.length === 1 ? rules[0] : rule.shift();
      this.#progressRacePerLap(rule);
    });
  }

  get records() {
    const copiedRecords = deepCopy(this.#records);

    return copiedRecords;
  }

  get winners() {
    const finalLapRecord = deepCopy(this.#records.at(-1));

    if (!finalLapRecord) return [];

    const maxPosition = Math.max(
      ...finalLapRecord.map((racer) => racer.position)
    );

    return finalLapRecord.filter((racer) => racer.position === maxPosition);
  }

  static #moveByRule(racer, rule) {
    if (rule()) racer.move();
  }

  static #validateRacer(racer) {
    if (!(racer instanceof Racer)) {
      throw new Error("레이스에 적합하지 않은 레이서입니다.");
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

  static #validateRacers(racers) {
    if (!Array.isArray(racers)) {
      throw new Error("경기 시작에 적합하지 않은 입력값입니다.");
    }

    if (racers.length < 1) {
      throw new Error("경기를 시작하기엔 레이서가 부족합니다.");
    }
  }
}

export default Race;
