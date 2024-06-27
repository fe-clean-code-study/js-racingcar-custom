import readLineAsync from '../utils/readLine.js';

export default class CarView {
  constructor() {
    this.rl = readLineAsync;
  }

  async inputCarName() {
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
}
