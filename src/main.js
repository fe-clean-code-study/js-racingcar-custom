import {
  RacingGame,
  RacingGameViewer,
  RacingGameController,
} from './domains/racingGame';
import {
  GuessTimeOut,
  GuessRandomNumber,
  RockPaperScissors,
  DiceDiffGame,
} from './domains/miniGames';

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
