import readInput from "./utils/readInput.js";
import Car from "./domains/Car.js";
import {getRandomNumber} from "./utils/getRandomNumber.js";
import Game from "./domains/Game.js";


async function main() {
  const { input, error, retry: reInputCarName } = await readInput("경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).", [], 'repeat' )

  const carNames = []
  const cars = {}

  const game = new Game({
    maxRound: 5,
    setup: ()=>{
      input.split(',').forEach(name => {
        carNames.push(name)
        cars[name] = new Car(name)
      })
    },
    action: ()=> {
      carNames.forEach(name => {
        if (getRandomNumber(0, 9) >= 4) cars[name].move()
        cars[name].show()
      })
      console.log('')
    },
    ending: () => {
      const winnerPosition = Math.max(...carNames.map(name => cars[name].position))
      const winners = carNames.filter(name => cars[name].position === winnerPosition)

      console.log(`${winners.join(', ')}가 최종 우승했습니다.`)
    },
    termTime: 1000
  })

  await game.play()
}

main();
