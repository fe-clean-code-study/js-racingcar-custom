import RacingGame from './domains/RacingGame.js'

async function main() {

  const racingGame = new RacingGame({
    maxRound: 5, config: {
      min: 0,
      max: 9,
      threshold: 4,
    },
  })
  await racingGame.play()
}

main()
