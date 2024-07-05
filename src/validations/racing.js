export const racingValidations = {
  uniqueCarName: {
    check: cars => {
      const carNames = cars.map(({ name }) => name);
      return new Set(carNames).size === carNames.length;
    },
    errorMessage: '경주할 자동차 이름은 각각 달라야 합니다.',
  },
  leastCarCount: {
    check: cars => cars.length > 1,
    errorMessage: '최소 2대의 자동차가 참가해야 합니다.',
  },
  maxRoundNumber: {
    check: maxRound => Number.isInteger(maxRound),
    errorMessage: '최대 라운드 값은 숫자여야 합니다.',
  },
  maxRoundRange: {
    check: maxRound => 1 <= maxRound && maxRound <= 5,
    errorMessage: '최소 1라운드부터 최대 5라운드 동안 플레이할 수 있습니다.',
  },
  miniGameInterface: {
    check: miniGames =>
      Object.values(miniGames).every(
        game => game.hasOwnProperty('CvC') && game.hasOwnProperty('PvC'),
      ),
    errorMessage:
      '올바른 미니게임이 아닙니다. 플레이 기능이 존재하지 않습니다.',
  },
  miniGameSize: {
    check: miniGames => Object.values(miniGames).length > 0,
    errorMessage: '최대 1개 이상의 미니게임이 있어야 합니다.',
  },
  miniGameResult: {
    check: miniGameResult => {
      const isResultCorrect =
        (miniGameResult.hasOwnProperty('score') ||
          miniGameResult.hasOwnProperty('win')) &&
        miniGameResult.hasOwnProperty('log');

      const { log } = miniGameResult;
      return (
        isResultCorrect &&
        log.hasOwnProperty('player') &&
        log.hasOwnProperty('computer') &&
        log.hasOwnProperty('result')
      );
    },
    errorMessage: '올바른 미니게임 결과가 아닙니다.',
  },
};
