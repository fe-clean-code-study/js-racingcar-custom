export default class Game {
  constructor({ maxRound, termTime }) {
    this.maxRound = maxRound;
    this.currentRound = 0;
    this.termTime = termTime;
  }
  setup(){}
  action(){}
  ending(){}
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
    await this.setup()
    while (this.currentRound < this.maxRound) {
      await this.playARound();
    }
    this.ending()
  }
}
