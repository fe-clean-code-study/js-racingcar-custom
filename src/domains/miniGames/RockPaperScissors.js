import MiniGame from './MiniGame.js'
import { getRandomNumber } from '../../utils/getRandomNumber.js'
import readInput from '../../utils/readInput.js'
import { rockPaperScissorsValidations } from '../../validations/miniGames.js'

const rockScissorPaperMap = {
  rock: {
    win: 'scissor',
    icon: '👊',
  },
  scissor: {
    win: 'paper',
    icon: '✌️',
  },
  paper: {
    win: 'rock',
    icon: '✋',
  },
}
export default class RockPaperScissors extends MiniGame {

  static get answerList() {
    return Object.keys(rockScissorPaperMap)
  }

  static get randomAnswer() {
    return this.answerList[getRandomNumber(0, 2)].padEnd(2, ' ')
  }


  static getIcon(answer) {
    return rockScissorPaperMap[answer].icon.padEnd(3, ' ')
  }

  static getPlayerResult(playerName, playerAnswer, opponentAnswer) {
    let score = 0
    let status = 'draw'
    if (rockScissorPaperMap[playerAnswer].win === opponentAnswer) {
      score = 1
      status = 'win'
    } else if (rockScissorPaperMap[opponentAnswer].win === playerAnswer) {
      score = -1
      status = 'lose'
    }
    return {
      score,
      log: `${playerName}:${this.getIcon(playerAnswer)}VS computer:${this.getIcon(opponentAnswer)} ➡️ ${status}`,
    }
  }

  static CvC(playerName) {
    return this.getPlayerResult(playerName, this.randomAnswer, this.randomAnswer)
  }

  static async PvC(playerName) {
    const answerIndex = await readInput('가위바위보 대결 : 1.바위 2.가위 3.보', rockPaperScissorsValidations)
    const playerAnswer = this.answerList[Number(answerIndex) - 1]
    return this.getPlayerResult(`*${playerName}`, playerAnswer, this.randomAnswer)
  }
}
