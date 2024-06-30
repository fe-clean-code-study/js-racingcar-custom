import { getRandomNumber } from '../utils/getRandomNumber.js'

export default class Game {
  #results
  #rules

  constructor({ maxRound, rules }) {
    this.maxRound = maxRound
    this.currentRound = 1

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

  play(startRound = this.currentRound, endRound = this.maxRound) {
    this.currentRound = startRound
    while (this.currentRound <= endRound) {
      this.doRound()
      this.currentRound += 1
    }
  }
}