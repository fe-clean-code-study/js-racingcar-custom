import RacingGame from './domains/RacingGame.js'
import { getRandomNumber } from './utils/getRandomNumber.js'

async function main() {
  const newRacingGame = new RacingGame({
    carNames: ['cha', 'cszzi', 'hello'],
    config: {
      maxRound: 5,
      rules: {
        ruleName1: () => getRandomNumber(0, 5),
        ruleName2: () => getRandomNumber(0, 100) > 40,
        ruleName3: () => getRandomNumber(1, 4) > 3,
      },
    },
  })

  newRacingGame.play()
  console.log(newRacingGame.results)
  console.log(newRacingGame.winner)
}

main()
