import Car from '../domain/Car.js';
import Race from '../domain/Race.js';
import getRandomNumber from '../utils/getRandomNumber.js';
import repeatFn from '../utils/repeatFn.js';
import ArrayValidator from '../utils/validators/ArrayValidator.js';
import NumberValidator from '../utils/validators/NumberValidator.js';

class CarRacingGame {
  static #MOVEMENT_SYMBOL = '-';
  static #RANDOM_NUMBER_MIN = 0;
  static #RANDOM_NUMBER_MAX = 9;
  static #RANDOM_NUMBER_CONDITION = 4;

  static CONSOLE_MESSAGE = Object.freeze({
    PROMPT_CAR_NAMES: `경주할 자동차 이름을 입력하세요. (이름은 쉼표(,) 기준으로 구분).\n`,
    RESULT_HEADER: '실행 결과',
    FINAL_WINNER(winners) {
      return `${winners}(이)가 최종 우승했습니다.`;
    },
  });

  #players;
  #playCount;
  #race;

  constructor() {
    this.#players = [];
    this.#playCount = 0;
    this.#race;
  }

  get players() {
    return this.#players;
  }

  get playCount() {
    return this.#playCount;
  }

  register(players) {
    CarRacingGame.#validatePlayers(players);

    this.#race = new Race([
      ...this.#players,
      ...players.map((player) => new Car({ name: player })),
    ]);

    this.#players = this.#race.runners;

    return this;
  }

  #printHeader() {
    console.log(CarRacingGame.CONSOLE_MESSAGE.RESULT_HEADER);

    return this;
  }

  printCurrentPositions() {
    CarRacingGame.#validatePlayers(this.#players);

    this.#players.forEach((player) => {
      console.log(
        `${player.name}: ${CarRacingGame.#MOVEMENT_SYMBOL.repeat(player.position)}`,
      );
    });
    console.log();

    return this;
  }

  printWinners() {
    CarRacingGame.#validatePlayers(this.#players);
    CarRacingGame.#validateCount(this.#playCount);

    const winners = this.#players
      .filter(
        (player) =>
          player.position ===
          Math.max(...this.#players.map((player) => player.position)),
      )
      .map((player) => player.name)
      .join(', ');

    console.log(CarRacingGame.CONSOLE_MESSAGE.FINAL_WINNER(winners));

    return this;
  }

  play(count = 1) {
    CarRacingGame.#validatePlayers(this.#players);
    this.#printHeader();

    repeatFn(() => {
      this.#playCount += 1;
      this.#players = this.#race.moveRunners(
        () =>
          getRandomNumber(
            CarRacingGame.#RANDOM_NUMBER_MIN,
            CarRacingGame.#RANDOM_NUMBER_MAX,
          ) >= CarRacingGame.#RANDOM_NUMBER_CONDITION,
      ).runners;

      this.printCurrentPositions();
    }, count);

    return this;
  }

  static #validateCount(count) {
    NumberValidator.from(count).greaterThan(0);
  }

  static #validatePlayers(players) {
    ArrayValidator.from(players);
    NumberValidator.from(players.length).greaterThan(0);
  }
}

export default CarRacingGame;
