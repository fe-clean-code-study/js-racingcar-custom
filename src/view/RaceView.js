import { RaceController } from "../controller/RaceController.js";
import { readLineAsync } from "../utils/readLineAsync.js";

export class RaceView {
  #controller;

  constructor() {
    this.#controller = new RaceController(this);
  }

  get controller() {
    return this.#controller;
  }

  async enrollCars() {
    const carNames = await readLineAsync(
      "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분)"
    );

    this.#controller.enrollCarsToRace(carNames);
  }

  async startRace() {
    const round = await readLineAsync("시도할 회수는 몇회인가요?");
    this.#controller.race(round);
  }

  displayRecord(record) {
    console.log(record);
  }

  displayWinners(winners) {
    console.log(
      winners.map((winner) => winner.carName).join(",") +
        "가 최종 우승했습니다."
    );
  }
}
