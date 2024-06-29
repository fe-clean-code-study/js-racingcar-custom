import { Race, RaceScoreboard, RaceEntry } from "./domain/index.js";
import inputManager from "./service/inputManager.js";

async function main() {
  const raceEntry = new RaceEntry();
  await raceEntry.selectEntityType();
  const racers = await raceEntry.register();

  const laps = await inputManager.retryScan("시도할 횟수는 몇회인가요?\n", {
    processFn: (inputValue) => {
      const numValue = Number(inputValue);

      if (Number.isNaN(numValue) || !Number.isInteger(numValue)) {
        throw new Error("시도할 횟수로 정수를 입력해야 합니다.");
      }

      if (numValue < 1) {
        throw new Error("시도할 횟수는 1이상이어야 합니다.");
      }

      return numValue;
    },
    errorMessageQuery: "다시 입력해주세요.\n",
  });

  const race = new Race(laps);
  race.start(racers);

  const raceScoreboard = new RaceScoreboard(race);

  raceScoreboard.displayRecords();
  raceScoreboard.displayWinners();
}

main();
