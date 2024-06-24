import { PROMPTS } from '../constant/prompt.js';
import { RacerFactory } from '../factory/RacerFactory.js';
import { validateNumberRange } from '../util/validate.js';
import { RaceView } from '../view/raceView.js';

export class RaceController {
  #POSITION_MARKER = '-';
  #racers = [];
  #rounds = 0;
  #maxNameLength = 0;

  #raceView;
  #minRounds;
  #maxRounds;
  #racerType;

  constructor({ minRounds = 1, maxRounds = Infinity, racerType }) {
    this.#raceView = new RaceView();
    this.#minRounds = minRounds;
    this.#maxRounds = maxRounds;
    this.#racerType = racerType;
  }

  get racers() {
    return this.#racers;
  }

  get rounds() {
    return this.#rounds;
  }

  async init() {
    await this.getValidInput(
      this.#getRacersNameList.bind(this),
      this.#setRacers.bind(this)
    );
    await this.getValidInput(
      this.#getRounds.bind(this),
      this.#setRounds.bind(this)
    );

    this.#maxNameLength = Math.max(
      ...this.#racers.map((racer) => racer.name.length)
    );
  }

  async getValidInput(inputFn, setterFn) {
    while (true) {
      try {
        const input = await inputFn();
        setterFn(input);
        return;
      } catch (error) {
        this.#raceView.printMessage(error.message);
      }
    }
  }

  async #getRacersNameList() {
    const names = await this.#raceView.ask(PROMPTS.CAR_NAMES);
    const nameList = names.split(',').map((name) => name.trim());

    return nameList;
  }

  async #getRounds() {
    const rounds = await this.#raceView.ask(PROMPTS.ROUNDS);

    return Number(rounds);
  }

  #setRacers(nameList) {
    this.#racers = nameList.map((name) =>
      RacerFactory.createRacer(this.#racerType, { name })
    );
  }

  #setRounds(rounds) {
    const isValidateRounds = validateNumberRange({
      number: rounds,
      minRange: this.#minRounds,
    });

    if (!isValidateRounds) {
      throw new Error(
        `시도 횟수는 ${this.#minRounds} 이상${
          this.#maxRounds !== Infinity ? `, ${this.#maxRounds} 이하의` : '의'
        } 정수만 입력 가능합니다.`
      );
    }

    this.#rounds = rounds;
  }

  #printRaceStatus() {
    this.#racers.forEach((racer) => {
      const racerName = racer.name.padEnd(this.#maxNameLength, ' ');
      const currentPosition = this.#POSITION_MARKER.repeat(racer.position);

      this.#raceView.printMessage(`${racerName} : ${currentPosition}`);
    });
    this.#raceView.printMessage('');
  }

  startRace() {
    this.#raceView.printMessage('\n🏁 경주 시작! 🏁');

    for (let _ = 0; _ < this.#rounds; _++) {
      this.#racers.forEach((racer) => racer.move());
      this.#printRaceStatus();
    }
  }

  printWinner() {
    const maxPosition = Math.max(
      ...this.#racers.map((racer) => racer.position)
    );

    const winnerNames = this.#racers
      .filter((racer) => racer.position === maxPosition)
      .map((winner) => winner.name)
      .join(', ');

    this.#raceView.printMessage(`${winnerNames} 이(가) 최종 우승했습니다.`);
  }
}
