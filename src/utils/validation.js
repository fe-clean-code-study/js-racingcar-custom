const validation = {
  isValidateRacing: (cars, round) => {
    return validation.isValidateCars(cars) && validation.isValidateRound(round);
  },
  isValidateRound: (round) => {
    if (isNaN(round) === true || typeof round !== 'number') {
      throw new Error('라운드는 숫자형태여야 합니다.');
    }
    if (round < 1 || round > 50) {
      throw new Error('라운드 횟수는 1회 이상 50회 이하여야 합니다.');
    }

    return true;
  },
  isValidateCars: (cars) => {
    const carSet = new Set(cars);

    if (carSet.size !== cars.length) {
      throw new Error('중복되는 이름이 있습니다.');
    }
    if (carSet.size < 2 || carSet.size > 10) {
      throw new Error('자동차는 2개 이상 10개 이하여야 합니다.');
    }

    return true;
  },
  isValidatePosition: (position) => {
    if (position < 0) {
      throw new Error('거리는 최소 0부터 시작해야 합니다.');
    }

    return true;
  },
  isValidateCarName: (name) => {
    name = name.trim();

    if (name.length === 0) {
      throw new Error(
        '자동차의 이름은 공백을 제외한 한 글자 이상이어야 합니다.'
      );
    }
    if (name.length < 1 || name.length > 10) {
      throw new Error('자동차 이름은 한 글자 이상 열글자 이하여야 합니다.');
    }

    return true;
  },
};

export default validation;