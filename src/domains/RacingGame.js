import Game from './Game.js'
import Car from './Car.js'
import { getRandomNumber } from '../utils/getRandomNumber.js'
import {racingValidations} from "../validations/racing.js";

export default class RacingGame extends Game {
  constructor(props) {
    super(props)
    this.cars = {}
    this.carNames = []
  }

  async setup() {
    while (this.carNames.length === 0) {
      try {
        const carNames = await this.readCarNames()
        carNames.forEach((name) => this.registerCar(name))

        this.validate()
      }catch({ message }) {
        this.printer.print(message)
      }
    }
  }

  eachRound() {
    this.carNames.forEach(name => this.moveCarByRandomNumber(name))
    this.carNames.forEach(name => this.showCarPosition(name))
    this.printer.print('')
  }

  finish() {
    this.showWinners()
  }

  registerCar(name) {
    this.cars[name] = new Car(name)
    this.carNames.push(name)
  }

  moveCarByRandomNumber(name) {
    const { min, max, threshold } = this.config
    if (getRandomNumber(min, max) > threshold) this.cars[name].move()
  }

  async readCarNames() {
    return (await this.printer.read('경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).')).split(',')
  }

  showCarPosition(name) {
    this.printer.print(`${name} : ${'_'.repeat(this.cars[name].position)}`)
  }

  showWinners() {
    this.printer.print(`${this.winners.join(', ')}가 최종 우승했습니다.`)
  }

  validate() {
    racingValidations.forEach(({ check, errorMessage }) => {
      if (!check(this.carNames)) {
        this.carNames = []
        this.cars = {}
        throw new Error(errorMessage)
      }
    })
  }

  get winners() {
    const maxPosition = Math.max(...this.carNames.map(name => this.cars[name].position))
    return this.carNames.filter(name => this.cars[name].position === maxPosition)
  }
}
