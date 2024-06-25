import { Car, Race } from "./domain/index.js";
import { readLineAsync } from "./service/index.js";

async function main() {
  const carRace = new Race(Car, 5);

  const inputValue = await readLineAsync(
    "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n"
  );
  const racerNameList = inputValue.split(",");

  carRace.ready(racerNameList);
  carRace.start();

  console.log("\n실행 결과");
  carRace.records.forEach((record) => {
    record.forEach((racer) => {
      console.log(`${racer.name} : ${"-".repeat(racer.position)}`);
    });
    console.log("");
  });

  console.log(
    `${carRace.winners
      .map((racer) => racer.name)
      .join(", ")}가 최종 우승했습니다.`
  );
}

main();
