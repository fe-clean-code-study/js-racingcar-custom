import RacingGame from './domains/RacingGame.js'

async function main() {

  const racingGame = new RacingGame({ maxRound: 5 })
  await racingGame.play()
}

main()
