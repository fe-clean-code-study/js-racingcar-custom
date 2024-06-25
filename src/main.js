import { Car, Race, RaceScoreboard } from "./domain/index.js";
import { inputManager } from "./service/index.js";

async function main() {
  const carRace = new Race(Car, 5);

  const inputValue = await inputManager.scan(
    "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n"
  );
  const racerNameList = inputValue.split(",");

  carRace.ready(racerNameList);
  carRace.start();

  const carRaceScoreboard = new RaceScoreboard(carRace);

  carRaceScoreboard.displayRecords();
  carRaceScoreboard.displayWinners();
}

main();
