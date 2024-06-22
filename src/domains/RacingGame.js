import Game from './Game.js'
import readInput from '../utils/readInput.js'
import Car from './Car.js'
import { getRandomNumber } from '../utils/getRandomNumber.js'

export default class RacingGame extends Game {
  constructor(props) {
    super(props)
    this.cars = {}
    this.carNames = []
    this.winners = []
  }

  async setup() {
    const { input } = await readInput(
      '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).',
      [],
      'repeat',
    )
    input.split(',').forEach(name => {
      this.cars[name] = new Car(name)
      this.carNames.push(name)
    })
  }

  rounds() {
    this.carNames.forEach(name => {
      if (getRandomNumber(0, 9) > 4) this.cars[name].move()
      console.log(`${name} : ${'_'.repeat(this.cars[name].position)}`)
    })
    console.log('')
  }

  finish() {
    const maxPosition = Math.max(...this.carNames.map(name => this.cars[name].position))
    this.winners = this.carNames.filter(name => this.cars[name].position === maxPosition)
    console.log(`${this.winners.join(', ')}가 최종 우승했습니다.`)

  }
}