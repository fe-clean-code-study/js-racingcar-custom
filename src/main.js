import readline from "readline";
import { Car } from "./domain/car.js";
import { Race } from "./domain/race.js";
import { RaceView } from "./view/race.js";

const INPUT_NAME_LABEL =
  "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분). ";
const INPUT_COUNT_LABEL = "시도할 회수는 몇회인가요? ";
const ALLOWED_MOVE_NUMBER = 4;

main();

async function main() {
  try {
    const names = await readLineAsync(INPUT_NAME_LABEL);
    const count = await readLineAsync(INPUT_COUNT_LABEL);

    const race = Race({
      names,
      Target: Car,
      isValidMove,
      count: Number(count),
    });

    const { playResultView, result } = RaceView();

    const playResult = race.play();
    playResultView(playResult);

    const winners = race.winners;
    result(winners);
  } catch (err) {
    console.log(err.message);
    main();
  }
}

function isValidMove() {
  return Math.random() * 10 >= ALLOWED_MOVE_NUMBER;
}

function readLineAsync(query) {
  return new Promise((resolve, reject) => {
    if (arguments.length !== 1) {
      reject(new Error("arguments must be 1"));
    }

    if (typeof query !== "string") {
      reject(new Error("query must be string"));
    }

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(query, (input) => {
      rl.close();
      resolve(input);
    });
  });
}
