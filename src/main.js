import { Car, Race, RaceScoreboard, RacerRegistry } from "./domain/index.js";

async function main() {
  const carRacerRegistry = new RacerRegistry("자동차", ",");
  const racerNameList = await carRacerRegistry.register();

  const carRace = new Race(Car, 5);
  carRace.start(racerNameList);

  const carRaceScoreboard = new RaceScoreboard(carRace);

  carRaceScoreboard.displayRecords();
  carRaceScoreboard.displayWinners();
}

main();
