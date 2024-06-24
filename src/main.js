import RacingGame from './domains/RacingGame.js'
import Printer from './service/Printer.js'

async function main() {
  const printer = new Printer()

  const racingGame = new RacingGame({
    printer,
    maxRound: 5, config: {
      min: 0,
      max: 9,
      threshold: 4,
    },
  })
  await racingGame.play()
}

main()
