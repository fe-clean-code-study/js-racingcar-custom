import readLineAsync from '../utils/readLine.js';

export default class RaceView {
  constructor() {
    this.rl = readLineAsync;
  }

  async inputRound() {
    return await this.rl(
      '몇번의 라운드를 진행할지 1 ~ 10 사이의 숫자를 입력해주세요! > ',
    );
  }

  async inputRacerNames() {
    return await this.rl(
      '🏎️ 자동차 이름을 쉼표로 구분지어 입력해주세요! 🏎️ > ',
    );
  }

  printMovedCar(carInfo) {
    carInfo.forEach(({ name, position }) => {
      console.log(`${name}: ${'-'.repeat(position)}`);
    });
    console.log('\n');
  }

  printWinners(winners) {
    console.log(`✨우승자 ✨: ${winners.join(', ')}`);
  }

  printError(message) {
    console.log(`🚨 ${message} 🚨`);
  }
}
