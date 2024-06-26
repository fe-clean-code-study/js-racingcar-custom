import readLineAsync from '../utils/readLine.js';

const InputView = {
  getCarName: async () => {
    return await readLineAsync(
      '🏎️ 자동차 이름을 쉼표로 구분지어 입력해주세요! 🏎️ > '
    );
  },
};

export default InputView;
