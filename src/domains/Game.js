export default class Game {
  constructor({ display, maxRound, config }) {
    this.display = display
    this.currentRound = 0
    this.maxRound = maxRound
    this.config = config
    this.rounds = []
    this.bindRounds()
  }

  async setup() {
  }


  eachRound() {
  }


  finish() {
  }


  bindRounds() {
    if (Object.getPrototypeOf(this).hasOwnProperty('eachRound')) {
      this.rounds = Array.from({ length: this.maxRound }, (_) => this.eachRound.bind(this))
    } else {
      const roundMethodNames = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
        .filter(prop => prop.startsWith('round') && prop !== 'rounds')
      this.rounds = roundMethodNames.map(methodName => this[methodName].bind(this))
    }
  }


  async play() {
    try {
      await this.setup()
    } catch (error) {
      this.display.printError(error)
      return this.play()
    }

    while (this.currentRound < this.maxRound) {
      this.rounds[this.currentRound++]()
    }

    this.finish()
  }
}
