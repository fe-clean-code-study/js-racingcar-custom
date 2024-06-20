import { Car, Race } from "./domain/index.js";

async function main() {
  const carRace = new Race(Car, 5);
  await carRace.ready();
  carRace.start();
}

main();
