export default class Game {
  constructor({ maxRound, setup, action, ending, termTime }) {
    this.maxRound = maxRound;
    this.currentRound = 0;
    this.setup = setup
    this.action = action
    this.ending = ending
    this.termTime = termTime;
  }

  playARound() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.action();
        this.currentRound += 1;
        resolve();
      }, this.termTime);
    });
  }

  async play() {
    this.setup()
    while (this.currentRound < this.maxRound) {
      await this.playARound();
    }
    this.ending()
  }
}
