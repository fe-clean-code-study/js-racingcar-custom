import RacingGame from './domains/racingGame/RacingGame.js';
import RacingGameController from './domains/racingGame/RacingGameController.js';
import RacingGameViewer from './domains/racingGame/RacingGameViewer.js';
import RockPaperScissors from './domains/miniGames/RockPaperScissors.js';
import GuessRandomNumber from './domains/miniGames/GuessRandomNumber.js';
import GuessTimeOut from './domains/miniGames/GuessTimeOut.js';
import DiceDiffGame from './domains/miniGames/DiceDiffGame.js';

async function main() {
  await new RacingGameController({
    racingGame: new RacingGame({
      miniGames: {
        RockPaperScissors,
        GuessRandomNumber,
        GuessTimeOut,
        DiceDiffGame,
      },
    }),
    viewer: new RacingGameViewer(),
  }).startGame();
}

main();
