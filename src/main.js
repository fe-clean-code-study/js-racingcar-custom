import RacingGame from "./domains/RacingGame.js";


async function main() {
  const racingGame = new RacingGame({
    maxRound: 5,
    termTime: 1000
  })

  await racingGame.play()
}

main();
