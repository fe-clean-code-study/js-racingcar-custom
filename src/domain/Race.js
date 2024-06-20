import { getRandomNumber } from "../utils/index.js";

class Race {
  static #INPUT_SEPARATOR = ",";
  #Racer;
  #laps;
  #racers;

  constructor(Racer, laps) {
    this.#Racer = Racer;
    this.#laps = laps;
    this.#racers = [];
  }

  #addRacer(racer) {
    this.#racers.push(racer);
  }

  ready(input) {
    if (typeof input !== "string") {
      throw new Error("경기 준비에 적합하지 않은 입력값입니다.");
    }

    input.split(Race.#INPUT_SEPARATOR).forEach((val) => {
      this.#addRacer(new this.#Racer(val));
    });
  }

  start() {
    console.log("\n실행 결과");
    for (let i = 0; i < this.#laps; i++) {
      this.#racers.forEach(this.#moveRacer);
      console.log("");
    }
    this.#showResult();
  }

  #moveRacer(racer) {
    this.#movementStrategy(racer);
    Race.#showRacer(racer);
  }

  #movementStrategy(racer) {
    const number = getRandomNumber(0, 9);

    if (4 <= number) {
      racer.move();
    }
  }

  get winners() {
    const max = Math.max(...this.#racers.map((racer) => racer.position));

    return this.#racers.filter((racer) => racer.position === max);
  }

  #showResult() {
    console.log(
      `${this.winners.map((w) => w.name).join(",")}가 최종 우승했습니다.`
    );
  }

  static #showRacer(racer) {
    console.log(`${racer.name} : ${"-".repeat(racer.position)}`);
  }
}

export default Race;
