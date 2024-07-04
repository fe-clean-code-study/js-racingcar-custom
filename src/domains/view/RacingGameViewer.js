import ConsolePrinter from '../../service/Printer.js'
import readInput from '../../utils/readInput.js'

export default class RacingGameViewer {
  constructor() {
    this.printer = new ConsolePrinter({
      roundStart: '------------------------⭐ Round%{1}⭐️️------------------------',
      carPosition: '%{1} : %{2} (%{3}%{4} ➡ %{5})',
      gameLog: '%{1} : %{2} VS computer : %{3} ➡➡ %{4}',
      miniGameStart: '>> player %{1} Turn!',
      winner: '최종 우승자는 👑 %{1} 입니다. 축하합니다!',
    })
  }

  displayGameStart() {
    this.printer.print('🚕 레이싱 게임을 시작합니다 🚗')
    this.printer.print('각 라운드마다 랜덤 미니 게임을 진행하여 이동할 수 있습니다.')
    this.printer.lineBreak()
  }

  displayStartRound({ currentRound }) {
    this.printer.printWithTemplate('roundStart', [currentRound])
  }

  displayMiniGameStart(playerName) {
    this.printer.lineBreak()
    this.printer.printWithTemplate('miniGameStart', [playerName])
  }

  displayGameLogs({ results }) {
    const { gameLogs } = results.at(-1)
    this.printer.lineBreak()
    Object.entries(gameLogs).forEach(([name, log]) => {
      this.printer.printWithTemplate('gameLog', [name.padEnd(5, ' '), ...Object.values(log)])
    })
    this.printer.lineBreak()
  }

  displayRoundResult({ results, maxPosition, currentRound }) {
    const { positions } = results[currentRound - 1]
    const prevPositions = currentRound > 1 ? results[currentRound - 2].positions : {}
    Object.entries(positions).forEach(([name, position]) => {
      const positionString = this.formatPositionString(position, maxPosition)
      const positionDiffArgs = this.getPositionDiffArgs(position, prevPositions[name] || 0)
      this.printer.printWithTemplate('carPosition', [name.padEnd(5, ' '), positionString, ...positionDiffArgs])
    })
    this.printer.lineBreak()
  }

  displayWinners({ winners }) {
    this.printer.printWithTemplate('winner', [winners.join(', ')])
    this.printer.lineBreak()
  }

  async readPlayerCarNames() {
    return await readInput('직접 레이싱에 참여할 자동차들의 이름을 입력해주세요. (쉼표로 구분)\n')
  }

  async readCarNames() {
    return await readInput('봇으로 참여할 자동차들의 이름을 입력해주세요. (쉼표로 구분)\n')
  }

  async readRoundCount() {
    return await readInput('몇 라운드 플레이할 지 알려주세요.\n')
  }

  formatPositionString(position, maxPosition) {
    return '⛳️'.padStart((position + 1) * 2, '__').padEnd((maxPosition + 1) * 2, '__')
  }

  getPositionDiffArgs(position, prevPosition) {
    const positionDiff = position - prevPosition
    return [positionDiff < 0 ? '' : '+', positionDiff, position]
  }
}
