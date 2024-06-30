import Car from './Car.js'
import Game from './Game.js'

export default class RacingGame extends Game {
  constructor({ carNames, config }) {
    super(config)
    this.cars = this.createCars(carNames)
  }

  get winner() {
    const lastCapturedCars = this.lastResult.cars
    const maxPosition = Math.max(...Object.values(lastCapturedCars))
    return Object.keys(lastCapturedCars).filter(name => lastCapturedCars[name] === maxPosition)
  }

  createCars(carNames) {
    return carNames.map(name => new Car(name))
  }

  doRound() {
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
    this.addResult({
      ruleName, cars: captureCars,
    })
  }

}