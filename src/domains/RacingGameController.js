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

  onMiniGameStart(name) {
    this.viewer.displayMiniGameStart(name)
  }

  onRoundEnd() {
    this.viewer.displayGameLogs(this.racingGame)
    this.viewer.displayRoundResult(this.racingGame)
  }

  async startGame() {
    this.viewer.displayGameStart()
    await this.setupNames()
    await this.setupMaxRound()
    await this.racingGame.play()
    this.viewer.displayWinners(this.racingGame)
  }

  async setupNames() {
    try {
      const playerNames = await this.viewer.readPlayerCarNames()
      const botNames = await this.viewer.readBotCarNames()
      this.racingGame.setCars(
          playerNames.split(',').filter(Boolean),
          botNames.split(',').filter(Boolean),
      )
    } catch (error) {
      this.viewer.displayError(error)
      await this.setupNames()
    }
  }

  async setupMaxRound() {
    try {
      const maxRound = await this.viewer.readRoundCount()
      this.racingGame.setMaxRound(Number(maxRound))
    }catch (error) {
      this.viewer.displayError(error)
      await this.setupMaxRound()
    }
  }
}
