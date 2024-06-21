import Car from '../model/Car.js';

const validation = {
  isValidateRounds: (rounds) => {
    if (Array.isArray(rounds) === false) {
      throw new Error('rounds 는 배열이어야 합니다.');
    }
    if (rounds.some((round) => typeof round !== 'number')) {
      throw new Error('rounds 는 숫자 배열이어야 합니다.');
    }

    return true;
  },
  isValidateRacing: (cars, round) => {
    return (
      cars.every((car) => car instanceof Car) &&
      validation.isValidateRound(round)
    );
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
    if (Array.isArray(cars) === false) {
      throw new Error('cars 는 배열이어야 합니다');
    }
    if (cars.some((car) => typeof car !== 'string')) {
      throw new Error('cars 는 문자열로 이뤄져야 합니다');
    }

    cars = cars.map((car) => car.trim());
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
    if (isNaN(position) || typeof position !== 'number') {
      throw new Error('포지션은 숫자여야 합니다');
    }
    if (position < 0) {
      throw new Error('거리는 최소 0부터 시작해야 합니다.');
    }

    return true;
  },
  isValidateCarName: (name) => {
    if (typeof name !== 'string') {
      throw new Error('자동차의 이름은 문자열 형태여야 합니다.');
    }
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
