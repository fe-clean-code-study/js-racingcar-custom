import { Car } from "../Model/Car.js";
import { Race } from "../model/Race.js";
import { randomVelocityRule } from "../service/raceVelocityRules.js";

export class RaceController {
  #race;
  #view;

  constructor(view) {
    this.#race = new Race(randomVelocityRule);
    this.#view = view;
  }

  enrollCarsToRace(carNames) {
    const cars = carNames.split(",").map((name) => new Car(name));
    cars.forEach((car) => this.#race.enrollCar(car));
  }

  race(rounds) {
    this.#race.raceReady();
    for (let i = 0; i < rounds; i++) {
      this.#race.goRound();
    }
    this.#view.displayWinners(this.#race.chooseWinners());
  }

  endRace() {
    const winners = this.#race.chooseWinners();
    this.#view.displayRecord(this.#race.record);
    this.#view.displayWinners(winners);
  }

  get enrollCars() {
    return this.#race.cars;
  }

  get record() {
    return this.#race.record;
  }
}
