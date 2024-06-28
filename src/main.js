import { Race, RaceScoreboard, RacerRegistry } from "./domain/index.js";

async function main() {
  const racerRegistry = new RacerRegistry();
  await racerRegistry.selectEntityType();
  const racers = await racerRegistry.register();

  const race = new Race(5);
  race.start(racers);

  const raceScoreboard = new RaceScoreboard(race);

  raceScoreboard.displayRecords();
  raceScoreboard.displayWinners();
}

main();
