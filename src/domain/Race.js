import { getRandomNumber } from "../utils/index.js";
import { readLineAsync } from "../service/index.js";

class Race {
  #Racer;
  #laps;
  #racers;

  constructor(Racer, laps) {
    this.#Racer = Racer;
    this.#laps = laps;
    this.#racers = [];
  }

  async ready() {
    const input = await readLineAsync(
      "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n"
    );

    if (typeof input !== "string") {
      throw new Error("경기 준비에 적합하지 않은 입력값입니다.");
    }

    const racerNameList = input.split(",");
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
    this.#racers.forEach((racer) => {
      Race.#movementStrategy(racer);
      Race.#showRacer(racer);
    });
    console.log("");
  }

  get winners() {
    const maxPosition = Math.max(
      ...this.#racers.map((racer) => racer.position)
    );

    return this.#racers.filter((racer) => racer.position === maxPosition);
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
}

export default Race;
