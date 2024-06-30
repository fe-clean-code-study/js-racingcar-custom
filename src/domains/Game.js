import { getRandomNumber } from '../utils/getRandomNumber.js'

export default class Game {
  #results
  #rules

  constructor({ startRound = 1, maxRound, rules }) {
    this.maxRound = maxRound
    this.currentRound = startRound - 1

    this.#rules = rules
    this.currentRule = ''

    this.#results = []
  }

  get results() {
    return this.#results
  }

  get rules() {
    return this.#rules
  }

  get lastResult() {
    return this.#results.at(-1)
  }

  selectRandomRule() {
    const ruleNames = Object.keys(this.rules)
    this.currentRule = ruleNames[getRandomNumber(0, ruleNames.length - 1)]
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