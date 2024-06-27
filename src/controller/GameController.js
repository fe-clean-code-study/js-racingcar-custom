import Car from '../model/Car.js';
import { dice } from '../utils/gameSupport.js';
import CarView from '../view/CarView.js';

export default class GameController {
  static DEFAULT_ROUND;
  #cars;
  #carView;

  constructor() {
    this._round = GameController.DEFAULT_ROUND;
    this.#cars = [];
    this.#carView = new CarView();
  }

  getGameRules() {
    return {
      round: this._round,
      carNames: this.#cars.map((car) => car.name),
    };
  }

  setGameRules({ round, carNames }) {
    GameController.validateRound(round);
    GameController.ValidateCarNames(carNames);

    this._round = Number(round);
    this.#cars = carNames.split(',').map((name) => new Car(name));
  }

  async start() {
    const round = await this.#carView.inputRound();
    const carNames = await this.#carView.inputCarName();
    this.setGameRules({ round, carNames });

    for (let currRound = 0; currRound < this._round; currRound++) {
      this.#proceedRound();
      const carInfo = this.#cars.map((car) => ({
        name: car.name,
        position: car.position,
      }));
      this.#carView.printMovedCar(carInfo);
    }

    const winners = this.getWinnersName();
    this.#carView.printWinners(winners);

    return winners;
  }

  #proceedRound() {
    this.#cars.filter((car) => {
      return (
        car.move(1, [
          () => {
            const result = dice(10, 0);
            return result > 4 ? true : false;
          },
        ]) === true
      );
    });
  }

  getWinnersName() {
    const maxPosition = Math.max(...this.#cars.map((car) => car.position));

    return this.#cars
      .filter((car) => car.position === maxPosition)
      .map((car) => car.name);
  }

  static validateRound(round) {
    round = Number(round);

    if (isNaN(round) || typeof round !== 'number') {
      throw new Error('라운드 횟수는 숫자 타입이어야 합니다.');
    }

    if (round < 1 && 10 < round) {
      throw new Error('라운드 횟수는 1 ~ 10 사이의 숫자여야 합니다.');
    }
  }

  static ValidateCarNames(carNames) {
    if (typeof carNames !== 'string') {
      throw new Error(
        '자동차 이름은 , 로 분리된 문자열 형태로 입력해야 합니다.',
      );
    }

    const carNamesArr = carNames.split(',');

    if (carNamesArr.length < 1 || carNamesArr > 10) {
      throw new Error('자동차는 최소 1개에서 10 개 이상이어야 합니다');
    }

    if (
      carNamesArr.some((carName) => {
        carName = carName.trim();

        return carName.length < 1 || carName.length > 10 ? true : false;
      })
    ) {
      throw new Error(
        '자동차 이름은 1 글자 이상, 10글자 미만의 문자열이어야 합니다.',
      );
    }
  }
}
