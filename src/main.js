import { readLineAsync } from "./service/index.js";

async function main() {
  let input = await readLineAsync(
    "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n"
  );

  console.log(input);
}

main();
