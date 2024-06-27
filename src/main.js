import GameController from './controller/GameController.js';

class Main {
  constructor(round) {
    this.gameController = new GameController(round);
  }

  play() {
    this.gameController.startGame();
  }
}

const main = new Main(5);
main.play();

export default main;
