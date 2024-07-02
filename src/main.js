import { GAME } from './constants/game.js';
import Race from './model/Race.js';
import Car from './model/Car.js';
import GameView from './view/RaceView.js';
import gameSupport from './utils/gameSupport.js';

async function main() {
  const view = new GameView();
  let roundInput = undefined;
  let namesInput = undefined;

  while (true) {
    roundInput = await view.inputRound();
    const error = Race.getRoundError(roundInput);

    if (error === undefined) {
      break;
    }
    view.printError(error);
  }

  while (true) {
    namesInput = await view.inputRacerNames();
    const error = Race.getNamesError(namesInput);

    if (error === undefined) {
      break;
    }
    view.printError(error);
  }

  const race = new Race({
    Racer: Car,
    round: Number(roundInput),
    names: namesInput,
    rules: {
      diceRule: () => {
        return (
          gameSupport.dice(GAME.RULE.MAX_DICE, GAME.RULE.MIN_DICE) >=
          GAME.RULE.DICE_CONDITION
        );
      },
    },
    onProceed: () => {
      view.printMovedCar(race.getRacerStatus());
    },
  });

  const winners = race.startRace();
  view.printWinners(winners);
}

main();

export default main;
