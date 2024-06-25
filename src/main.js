import { Car, Race } from "./domain/index.js";
import { inputManager, outputManager } from "./service/index.js";

async function main() {
  const carRace = new Race(Car, 5);

  const inputValue = await inputManager.scan(
    "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n"
  );
  const racerNameList = inputValue.split(",");

  carRace.ready(racerNameList);
  carRace.start();

  outputManager.linebreak();
  outputManager.print("실행 결과");
  carRace.records.forEach((record) => {
    outputManager.printAll(
      record,
      (racer) => `${racer.name} : ${"-".repeat(racer.position)}`
    );

    outputManager.linebreak();
  });

  outputManager.print(
    `${carRace.winners
      .map((racer) => racer.name)
      .join(", ")}가 최종 우승했습니다.`
  );
}

main();
