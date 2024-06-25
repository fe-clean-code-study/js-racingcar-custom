import { Car, Race } from "./domain/index.js";
import { OutputManager, readLineAsync } from "./service/index.js";

async function main() {
  const carRace = new Race(Car, 5);

  const inputValue = await readLineAsync(
    "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n"
  );
  const racerNameList = inputValue.split(",");

  carRace.ready(racerNameList);
  carRace.start();

  const output = new OutputManager(console.log);

  output.linebreak();
  output.print("실행 결과");
  carRace.records.forEach((record) => {
    output.printAll(
      record,
      (racer) => `${racer.name} : ${"-".repeat(racer.position)}`
    );

    output.linebreak();
  });

  output.print(
    `${carRace.winners
      .map((racer) => racer.name)
      .join(", ")}가 최종 우승했습니다.`
  );
}

main();
