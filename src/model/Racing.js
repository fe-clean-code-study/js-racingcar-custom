import { GAME } from '../constants/index.js';
import validation from '../utils/validation.js';
import Car from './Car.js';

class Racing {
  #round;
  #cars;

  constructor(round = GAME.ROUND, cars = []) {
    this.#round = this.setRound(round);
    this.#cars = this.setCars(cars);
  }

  setRound(round) {
    if (!validation.isValidateRound(round)) {
      return 0;
    }

    this.round = round;
    return this.round;
  }

  setCars(cars) {
    cars = typeof cars === 'string' ? cars.split(',') : cars;

    if (!validation.isValidateCars(cars)) {
      return [];
    }

    this.#cars = cars.map((car) => new Car(car));
    return this.#cars;
  }

  startRacing() {
    if (!validation.isValidateRacing(this.#cars, this.#round)) {
      return [];
    }

    for (let currRound = 0; currRound < this.#round; currRound++) {
      this.proceedRound();
    }

    return this.getWinners();
  }

  proceedRound() {
    this.#cars.forEach((car) => {
      Racing.dice() >= 4 ? car.move(1) : car.move(0);
    });
  }

  static dice() {
    return Math.floor(Math.random() * 10);
  }

  getWinners() {
    const maxPosition = Math.max(...this.#cars.map((car) => car.getPosition()));

    return this.#cars
      .filter((car) => car.getPosition() === maxPosition)
      .map((car) => car.getName());
  }
}

export default Racing;
