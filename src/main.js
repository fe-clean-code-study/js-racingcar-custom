import RacingGame from './domains/RacingGame.js'
import GuessTimeOut from './domains/miniGames/GuessTimeOut.js'
import GuessRandomNumber from './domains/miniGames/GuessRandomNumber.js'
import RockPaperScissors from './domains/miniGames/RockPaperScissors.js'
import DiceDiffGame from './domains/miniGames/DiceDiffGame.js'
import RacingGameController from './domains/RacingGameController.js'
import RacingGameViewer from './domains/view/RacingGameViewer.js'

async function main() {
  const racingGame = new RacingGame({
    miniGames: {
      RockPaperScissors,
      GuessRandomNumber,
      GuessTimeOut,
      DiceDiffGame,
    },
  })

  const view = new RacingGameViewer()
  const controller = new RacingGameController(racingGame, view)

  await controller.startGame()
}

main()
