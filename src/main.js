import Printer from './service/Printer.js'
import NewRacingGame from './domains/NewRacingGame.js'
import { getRandomNumber } from './utils/getRandomNumber.js'

async function main() {
  const printer = new Printer()

  // const racingGame = new RacingGame({
  //   display: printer,
  //   maxRound: 5,
  //   config: {
  //     min: 0,
  //     max: 9,
  //     threshold: 4,
  //   },
  // })
  // await racingGame.play()

  const newRacingGame = new NewRacingGame({
    carNames: ['cha', 'cszzi', 'hello'],
    config: {
      maxRound: 3,
      rules: {
        randomNumberMove: () => getRandomNumber(0, 5),
        randomNumberOver40: () => getRandomNumber(0, 100) > 40,
        randomNumberOver3: () => getRandomNumber(1, 4) > 3,
      },
    },
  })

  newRacingGame.play()
  console.log(newRacingGame.results)
  console.log(newRacingGame.winner)
}

main()
