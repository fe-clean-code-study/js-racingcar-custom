import { describe, test, expect } from 'vitest';
import getRandomNumber from '../utils/getRandomNumber.js';

describe('getRandomNumber >', () => {
  test('시작 숫자보다 끝 숫자가 작으면 오류가 발생한다.', () => {
    expect(() => getRandomNumber(5, 3)).toThrow();
  });

  test('1부터 10까지의 범위를 입력하면 1 이상 10 이하의 랜덤 숫자를 반환한다.', () => {
    const randomNumber = getRandomNumber(1, 10);
    expect(randomNumber).toBeGreaterThanOrEqual(1);
    expect(randomNumber).toBeLessThanOrEqual(10);
  });

  test('0부터 0까지의 범위를 입력하면 0을 반환한다.', () => {
    expect(getRandomNumber(0, 0)).toBe(0);
  });

  test('-1부터 1까지의 범위를 입력하면 -1 이상 1 이하의 랜덤 숫자를 반환한다.', () => {
    const randomNumber = getRandomNumber(-1, 1);
    expect(randomNumber).toBeGreaterThanOrEqual(-1);
    expect(randomNumber).toBeLessThanOrEqual(1);
  });

  test('-5부터 -3까지의 범위를 입력하면 -5 이상 -3 이하의 랜덤 숫자를 반환한다.', () => {
    const randomNumber = getRandomNumber(-5, -3);
    expect(randomNumber).toBeGreaterThanOrEqual(-5);
    expect(randomNumber).toBeLessThanOrEqual(-3);
  });
});
