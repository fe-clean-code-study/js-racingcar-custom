import { RaceEntry, RaceScoreboard } from "./domain/index.js";

async function main() {
  const raceEntry = new RaceEntry();
  await raceEntry.selectEntityType();
  const racers = await raceEntry.registerRacers();
  const race = await raceEntry.setRaceLaps();
  race.start(racers);

  const raceScoreboard = new RaceScoreboard(race);
  raceScoreboard.displayRecords();
  raceScoreboard.displayWinners();
}

main();
