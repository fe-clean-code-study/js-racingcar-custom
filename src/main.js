import { RACER_TYPE } from './constant/racerType.js';
import { RaceController } from './controller/raceController.js';

async function main() {
  const raceController = new RaceController({ racerType: RACER_TYPE.CAR });

  await raceController.init();
  raceController.startRace();
  raceController.printWinner();
}

main();
