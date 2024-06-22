export default class Game {
  constructor({ maxRound, roundMode = 'single' }) {
    this.currentRound = 0
    this.maxRound = maxRound

    this.roundMode = roundMode
    if (this.roundMode === 'multiple') {
      this.bindRounds()
    }
  }

  async setup() {
  }

  rounds() {
  }

  bindRounds() {
    const roundMethodNames = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
      .filter(prop => typeof this[prop] === 'function' && prop.startsWith('round'))
    this.rounds = roundMethodNames.map(methodName => this[methodName].bind(this))
  }

  finish() {
  }

  playEachRounds() {
    this.rounds.forEach(round => {
      round()
      this.currentRound += 1
    })
  }

  playRepeatRounds() {
    while (this.currentRound++ < this.maxRound) {
      this.rounds()
    }
  }

  async play() {
    await this.setup()
    this.roundMode === 'multiple' ? this.playEachRounds() : this.playRepeatRounds()
    this.finish()
  }
}
