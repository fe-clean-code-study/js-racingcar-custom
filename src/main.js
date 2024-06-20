import readInput from "./utils/readInput.js";
import Car from "./domains/Car.js";
import {getRandomNumber} from "./utils/getRandomNumber.js";


async function main() {
  const { input, error, retry: reInputCarName } = await readInput("경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).", [], 'repeat' )

  const carNames = []
  const cars = {}

  input.split(',').forEach(name => {
    carNames.push(name)
    cars[name] = new Car(name)
  })
  const playOneRound = () => {
    carNames.forEach(name => {
      if (getRandomNumber(0, 9) >= 4){
        cars[name].move()
      }
      cars[name].show()
    })
    console.log('')
  }

  playOneRound()
  playOneRound()
  playOneRound()
  playOneRound()
  playOneRound()
}

main();
