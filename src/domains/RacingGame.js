import Car from './Car.js'
import Game from './Game.js'

export default class RacingGame extends Game {
  constructor({ carNames, config }) {
    super(config)
    this.cars = this.createCars(carNames)
  }

  get winner() {
    const { cars } = this.lastResult
    const maxPosition = Math.max(...Object.values(cars))
    return Object.keys(cars).filter(name => cars[name] === maxPosition)
  }


  createCars(carNames) {
    return carNames.map(name => new Car(name))
  }

  createResult() {
    return {
      ruleName: this.currentRule,
      cars: this.cars.reduce((acc, car) => ({
        ...acc,
        [car.name]: car.position,
      }), {}),
    }
  }

  doRound() {
    this.selectRandomRule()
    this.cars.forEach(car => {
      this.race(car)
    })
    this.addResult(this.createResult())
  }

  race(car) {
    const moveCommand = this.rules[this.currentRule]()
    if (typeof moveCommand === 'number') {
      car.move(moveCommand)
    } else if (moveCommand) {
      car.move(1)
    }
  }
}
