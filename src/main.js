import { RaceView } from "./view/RaceView.js";

async function main() {
  const raceView = new RaceView();
  await raceView.enrollCars();
  await raceView.startRace();
  raceView.controller.endRace();
}

main();
