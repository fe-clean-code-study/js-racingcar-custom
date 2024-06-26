import CarRacingGame from './app/CarRacingGame.js';
import readLineAsync from './utils/readLineAsync.js';

async function main() {
  const carRacingGame = new CarRacingGame();

  const name = await readLineAsync(
    CarRacingGame.CONSOLE_MESSAGE.PROMPT_CAR_NAMES,
  );
  const players = name.split(',');

  carRacingGame.register(players).play(5).printWinners();
}

main();
