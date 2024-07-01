import Car from './Car.js'
import Game from './Game.js'

export default class RacingGame extends Game {
  constructor({ carNames, playerName, config }) {
    super(config)
    this.player = playerName
    this.cars = this.createCars(carNames)
    this.gameLogs = []
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
      ruleName: this.currentMiniGame,
      cars: this.cars.reduce((acc, car) => ({
        ...acc,
        [car.name]: car.position,
      }), {}),
      gameLogs: this.gameLogs,
    }
  }


  async doRound() {
    this.selectRandomMiniGame()

    for (const car of this.cars) {
      await this.race(car)
    }
    this.addResult(this.createResult())
    this.gameLogs = []
  }

  async doMiniGame(car) {
    const miniGame = this.miniGames[this.currentMiniGame]
    if (car.name === this.player) {
      return await miniGame.PvC(car.name)
    }
    return miniGame.CvC(car.name)
  }

  async race(car) {
    const result = await this.doMiniGame(car)

    if (result.hasOwnProperty('score')) {
      car.move(result.score)
    }
    if (result.hasOwnProperty('win')) {
      car.move(result.win ? 1 : 0)
    }
    this.gameLogs.push(result.log)
  }
}
