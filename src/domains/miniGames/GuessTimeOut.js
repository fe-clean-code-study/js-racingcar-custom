import { getRandomNumber } from '../../utils/getRandomNumber.js'
import readInput from '../../utils/readInput.js'

export default class GuessTimeOut {
  static get randomSeconds() {
    return getRandomNumber(5, 10) // 5초에서 10초 사이의 랜덤 시간 생성
  }


  static async getPlayerTime(opponentTime) {
    const startTime = Date.now()
    await readInput(`타이머 맞추기: ${opponentTime} 뒤에 Enter 누르기`)
    const endTime = Date.now()
    return (endTime - startTime) / 1000 // 밀리초를 초로 변환
  }

  static getPlayerResult(playerName, playerTime, opponentTime) {
    const difference = Math.abs(playerTime - opponentTime)
    const win = difference < 0.5
    return {
      win,
      log: `${playerName}:${playerTime.toFixed(2)}s VS computer:${opponentTime.toFixed(2)}s  ➡➡ ${win ? 'win' : 'lose'}`,
    }
  }

  static CvC(playerName) {
    const opponentTime = this.randomSeconds
    const playerTime = opponentTime + (Math.random() * 2 - 1)
    return this.getPlayerResult(playerName, playerTime, opponentTime)
  }

  static async PvC(playerName) {
    const opponentTime = this.randomSeconds
    const playerTime = await this.getPlayerTime(opponentTime)
    return this.getPlayerResult(`*${playerName}`, playerTime, opponentTime)
  }
}
