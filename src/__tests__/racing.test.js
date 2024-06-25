import { describe, expect, test } from 'vitest';
import Racing from '../model/Racing.js';
import Car from '../model/Car';

describe('Racing 클래스에 대한 단위 테스트', () => {
  const carSet = new Set(['jjanggu', 'hodu']);
  const racing = new Racing(5, ['jjanggu', 'hodu']);

  test('setRound 에 1 ~ 50 사이의 숫자를 할당하면 round 가 해당 값으로 바뀐다.', () => {
    expect(racing.getRound()).toBe(5);
  });

  test('setCars 에 1 ~ 10 자로 이뤄진 문자열 배열을 할당하면 Car 인스턴스가 담긴다.', () => {
    const isCarArray = racing.getCars().every((car) => car instanceof Car);

    expect(isCarArray).toBe(true);
  });

  test('startRacing 메서드는 자동차 이름을 포함한 문자열 배열을 반환한다.', () => {
    const winners = racing.startRacing();
    const isRightWinner = winners.every((winner) => carSet.has(winner));

    expect(isRightWinner).toBe(true);
  });

  test('dice 메서드는 0 ~ 9 사이의 값을 반환한다.', () => {
    const diceResult = [...new Array(10)].fill(Racing.dice());
    const isCollectNum = diceResult.every((dice) => dice <= 9 && dice >= 0);

    expect(isCollectNum).toBe(true);
  });

  test('getWinners 는 자동차 이름을 포함한 문자열 배열을 반환한다.', () => {
    const winners = racing.getWinners();
    const isRightWinner = winners.every((winner) => carSet.has(winner));

    expect(isRightWinner).toBe(true);
  });
});
