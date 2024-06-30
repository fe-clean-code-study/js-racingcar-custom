import { getRandomNumber } from '../utils/getRandomNumber.js'

export default class Game {
  #results

  constructor({ maxRound, rules }) {
    this.maxRound = maxRound
    this.rules = rules
    this.#results = []
    this.currentRound = 0
  }

  get results() {
    return this.#results
  }

  get lastResult() {
    return this.#results.at(-1)
  }

  get randomRule() {
    const ruleNames = Object.keys(this.rules)
    return ruleNames[getRandomNumber(0, ruleNames.length - 1)]
  }

  addResult(resultAfterRound) {
    this.#results.push(resultAfterRound)
  }

  doRound() {
  }

  play() {
    while (this.currentRound < this.maxRound) {
      this.doRound()
      this.currentRound += 1
    }
  }
}