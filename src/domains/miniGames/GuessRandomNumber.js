import { getRandomNumber } from '../../utils/getRandomNumber.js'
import readInput from '../../utils/readInput.js'
import { guessRandomNumberValidations } from '../../validations/miniGames.js'

export default class GuessRandomNumber {
  static get randomNumber() {
    return getRandomNumber(1, 10)
  }

  static getPlayerResult(playerName, playerAnswer, opponentAnswer) {
    const win = playerAnswer === opponentAnswer
    return {
      win,
      log: {
        player: playerAnswer,
        computer: opponentAnswer,
        result: win ? 'win' : 'lose',
      },
    }
  }

  static CvC(playerName) {
    return this.getPlayerResult(playerName, this.randomNumber, this.randomNumber)
  }

  static async PvC(playerName) {
    const answer = await readInput('숫자 맞추기 대결 : 1 부터 10 까지의 숫자 중 하나를 입력\n', guessRandomNumberValidations)
    return this.getPlayerResult(`*${playerName}`, Number(answer), this.randomNumber)
  }
}