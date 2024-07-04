export default class RacingGameController {
  constructor(racingGame, viewer) {
    this.racingGame = racingGame
    this.viewer = viewer

    this.racingGame.eventEmitter.on('roundStart', () => this.onRoundStart())
    this.racingGame.eventEmitter.on('roundEnd', () => this.onRoundEnd())
    this.racingGame.eventEmitter.on('miniGameStart', (name) => this.onMiniGameStart(name))
  }

  onRoundStart() {
    this.viewer.displayStartRound(this.racingGame)
  }

  onRoundEnd() {
    this.viewer.displayGameLogs(this.racingGame)
    this.viewer.displayRoundResult(this.racingGame)
  }

  onMiniGameStart(name) {
    this.viewer.displayMiniGameStart(name)
  }

  async setupGame() {
    const playerNames = await this.viewer.readPlayerCarNames()
    playerNames.split(',').forEach(name => this.racingGame.addPlayer(name))

    const carNames = await this.viewer.readCarNames()
    carNames.split(',').forEach(name => this.racingGame.addCar(name))

    const maxRound = await this.viewer.readRoundCount()
    this.racingGame.setMaxRound(Number(maxRound))
  }

  async startGame() {
    this.viewer.displayGameStart()
    await this.setupGame()
    await this.racingGame.play()

    this.viewer.displayWinners(this.racingGame)
  }
}


