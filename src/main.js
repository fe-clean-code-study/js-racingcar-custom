import Racing from './model/Racing.js';
import { GAME } from './constants/index.js';
import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';

class Main {
  constructor(rounds) {
    this.rounds = rounds;
  }

  async play() {
    const result = this.rounds.map(async (round) => {
      const cars = await InputView.getCarName();
      const racing = new Racing(round, cars);
      const winners = racing.startRacing(cars);

      OutputView.printWinners(winners);
      return winners;
    });

    return result;
  }
}

const main = new Main([GAME.ROUND]);
main.play();
