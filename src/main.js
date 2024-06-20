import { Car, Race } from "./domain/index.js";
import { readLineAsync } from "./service/index.js";

async function main() {
  const input = await readLineAsync(
    "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n"
  );

  const race = new Race(Car, 5);
  race.ready(input);
  race.start();
}

main();
