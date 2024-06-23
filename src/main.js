import { createCar } from './domains/Car.js'
import { inputCarNames } from './views/inputCarNames.js'

const RACE_ROUND = 5

async function main() {
  const names = await inputCarNames()

  const cars = names.map((name) => createCar(name))

  console.log('결과 확인 >', cars)
}

main()
