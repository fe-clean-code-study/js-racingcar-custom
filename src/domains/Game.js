export default class Game {
  constructor({ maxRound, config }) {
    this.currentRound = 0
    this.maxRound = maxRound
    this.config = config

    this.bindRounds()
  }

  async setup() {
  }

  rounds() {
  }

  bindRounds() {
    const roundMethodNames = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
      .filter(prop => prop.startsWith('round') && prop !== 'rounds')
    if (roundMethodNames.length > 0) {
      this.rounds = roundMethodNames.map(methodName => this[methodName].bind(this))
    }
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
    Array.isArray(this.rounds) ? this.playEachRounds() : this.playRepeatRounds()
    this.finish()
  }
}
