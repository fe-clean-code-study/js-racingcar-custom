import { createCar, moveCar } from './domains/car.js'
import { getWinners } from './domains/winner.js'
import { inputCarNames } from './views/inputs.js'
import { printCar, printWinners } from './views/outputs.js'

const RACE_ROUND = 5

async function main() {
  const names = await inputCarNames()

  let cars = names.map((name) => createCar(name))

  console.log('✨ 실행 결과 ✨')
  console.log()

  for (let i = 0; i < RACE_ROUND; i++) {
    cars = cars.map((car) => {
      let movedCar = moveCar(car)

      printCar(movedCar)

      return movedCar
    })

    console.log()
  }

  const winners = getWinners(cars)

  printWinners(winners)
}

main()
