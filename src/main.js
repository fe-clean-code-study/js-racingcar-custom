import RacingGame from './domains/RacingGame.js'
import GuessTimeOut from './domains/miniGames/GuessTimeOut.js'
import GuessRandomNumber from './domains/miniGames/GuessRandomNumber.js'
import RockPaperScissors from './domains/miniGames/RockPaperScissors.js'
import DiceDiffGame from './domains/miniGames/DiceDiffGame.js'

async function main() {
  const newRacingGame = new RacingGame({
    carNames: ['miko', 'cszzi', 'hello'],
    playerNames: ['cszzi', 'miko'],
    config: {
      maxRound: 3,
      miniGames: {
        RockPaperScissors,
        GuessRandomNumber,
        GuessTimeOut,
        DiceDiffGame,
      },
    },
  })

  await newRacingGame.play()
  console.log(newRacingGame.results)
  console.log(newRacingGame.winner)
}

main()
