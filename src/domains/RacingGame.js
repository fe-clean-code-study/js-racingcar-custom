import Game from './Game.js'
import readInput from '../utils/readInput.js'
import Car from './Car.js'
import { getRandomNumber } from '../utils/getRandomNumber.js'

export default class RacingGame extends Game {
  constructor(props) {
    super(props)
    this.cars = {}
    this.carNames = []
  }

  async setup() {
    const { input } = await readInput(
        '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).',
        [],
        'repeat',
    )
    input.split(',').forEach(name => this.register(name.trim()))
  }

  eachRound() {
    this.carNames.forEach(name => this.moveCarByRandomNumber(name))
    this.carNames.forEach(name => this.showCarPosition(name))
    console.log('')
  }

  finish() {
    this.showWinners()
  }

  register(name) {
    this.cars[name] = new Car(name)
    this.carNames.push(name)
  }

  moveCarByRandomNumber(name) {
    const { min, max, threshold } = this.config
    if (getRandomNumber(min, max) > threshold) this.cars[name].move()
  }

  showCarPosition(name) {
    console.log(`${name} : ${'_'.repeat(this.cars[name].position)}`)
  }

  showWinners() {
    console.log(`${this.winners.join(', ')}가 최종 우승했습니다.`)
  }

  get winners() {
    const maxPosition = Math.max(...this.carNames.map(name => this.cars[name].position))
    return this.carNames.filter(name => this.cars[name].position === maxPosition)
  }
}
