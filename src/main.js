import GameController from './controller/GameController.js';

class Main {
  constructor() {
    this.gameController = new GameController();
  }

  play() {
    this.gameController.start();
  }
}

const main = new Main();
main.play();

export default main;
