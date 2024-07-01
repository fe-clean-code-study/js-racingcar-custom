import RacingGame from './domains/RacingGame.js'
import RockPaperScissors from './domains/miniGames/RockPaperScissors.js'

async function main() {
  const newRacingGame = new RacingGame({
    carNames: ['cha', 'cszzi', 'hello'],
    playerName: 'cszzi',
    config: {
      maxRound: 5,
      miniGames: {
        RockPaperScissors,
      },
    },
  })

  await newRacingGame.play(1, 1)
  console.log(newRacingGame.lastResult)

  await newRacingGame.play(2, 2)
  console.log(newRacingGame.lastResult)

  console.log(newRacingGame.winner)
}

main()
