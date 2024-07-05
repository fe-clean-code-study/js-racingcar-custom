import { getRandomNumber } from '../../utils/getRandomNumber.js';
import readInput from '../../utils/readInput.js';

export default class DiceDiffGame {
  static get diceNumber() {
    return getRandomNumber(1, 6);
  }

  static getPlayerResult(playerName, playerAnswer, opponentAnswer) {
    const diff = playerAnswer - opponentAnswer;
    return {
      score: diff,
      log: {
        player: playerAnswer,
        computer: opponentAnswer,
        result: diff,
      },
    };
  }

  static CvC(playerName) {
    return this.getPlayerResult(playerName, this.diceNumber, this.diceNumber);
  }

  static async PvC(playerName) {
    await readInput(
      '주사위 던지기 게임 : Enter 입력 시 주사위를 던지고, 그 차이만큼 이동합니다.',
    );
    const answer = this.diceNumber;
    return this.getPlayerResult(`*${playerName}`, answer, this.diceNumber);
  }
}
