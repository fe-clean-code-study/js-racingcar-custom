import Game from './Game.js'
import Car from './Car.js'
import { getRandomNumber } from '../utils/getRandomNumber.js'
import { racingValidations } from '../validations/racing.js'

export default class RacingGame extends Game {
  cars = {}
  carNames = []

  get winners() {
    const maxPosition = Math.max(...this.carNames.map(name => this.cars[name].position))
    return this.carNames.filter(name => this.cars[name].position === maxPosition)
  }

  async setup() {
    this.initializeCars()
    const carNames = await this.readCarNames()
    carNames.forEach((name) => this.registerCar(name))
    this.validate()
  }

  eachRound() {
    this.display.print('')
    this.carNames.forEach(name => this.moveCarByRandomNumber(name))
    this.carNames.forEach(name => this.showCarPosition(name))
  }

  finish() {
    this.showWinners()
  }


  initializeCars() {
    this.cars = {}
    this.carNames = []
  }

  async readCarNames() {
    return (await this.display.read('경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).')).split(',')
  }

  registerCar(name) {
    const registeredCar = new Car(name)

    this.cars[registeredCar.name] = registeredCar
    this.carNames.push(registeredCar.name)
  }


  validate() {
    racingValidations.forEach(({ check, errorMessage }) => {
      if (!check(this.carNames)) {
        throw new Error(errorMessage)
      }
    })
  }

  moveCarByRandomNumber(name) {
    const { min, max, threshold } = this.config
    if (getRandomNumber(min, max) > threshold) this.cars[name].move()
  }

  showCarPosition(name) {
    this.display.print(`${name} : ${'_'.repeat(this.cars[name].position)}`)
  }

  showWinners() {
    this.display.print(`\n🎉 우승자 : ${this.winners.join(', ')} 🎉\n`)
  }
}