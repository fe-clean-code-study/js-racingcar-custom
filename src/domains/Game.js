export default class Game {
  constructor(maxRound, process, termTime) {
    this.maxRound = maxRound;
    this.currentRound = 0;
    this.process = process;
    this.termTime = termTime;
  }

  playARound() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.process();
        this.currentRound += 1;
        resolve();
      }, this.termTime);
    });
  }

  async play() {
    while (this.currentRound < this.maxRound) {
      await this.playARound();
    }
  }
}
