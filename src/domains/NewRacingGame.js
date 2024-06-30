import Car from './Car.js'
import { getRandomNumber } from '../utils/getRandomNumber.js'

export default class NewRacingGame {
  #results

  constructor({ carNames, config: { maxRound, rules, ...config } }) {
    this.config = config
    this.maxRound = maxRound
    this.rules = rules

    this.cars = this.createCars(carNames)
    this.#results = []
    this.currentRound = 0
  }

  get results() {
    return this.#results
  }

  get winner() {
    const lastResult = this.results.at(-1)
    const maxPosition = Math.max(...Object.values(lastResult))
    return Object.keys(lastResult).filter(name => lastResult[name] === maxPosition)
  }

  get randomRule() {
    const ruleNames = Object.keys(this.rules)
    return ruleNames[getRandomNumber(0, ruleNames.length - 1)]
  }

  createCars(carNames) {
    return carNames.map(name => new Car(name))
  }

  doRacing() {
    const ruleName = this.randomRule
    this.cars.forEach(car => {
      this.race(ruleName, car)
    })
    this.updateResult(ruleName)
  }

  race(ruleName, car) {
    const ruleResult = this.rules[ruleName]()
    if (typeof ruleResult === 'number') {
      car.move(ruleResult)
    } else if (ruleResult) {
      car.move(1)
    }
  }

  updateResult(ruleName) {
    const captureCars = this.cars.reduce((acc, car) => ({
      ...acc,
      [car.name]: car.position,
    }), {})
    this.#results.push({
      ruleName, cars: captureCars,
    })
  }

  play() {
    while (this.currentRound < this.maxRound) {
      this.doRacing()
      this.currentRound += 1
    }
  }

}