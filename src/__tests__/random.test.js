import { describe, it, expect, vi } from 'vitest';
import { getRandomNumber } from '../util/random';

describe('getRandomNumber', () => {
  it('지정된 최소값과 최대값 사이의 숫자를 반환해야 합니다', () => {
    const min = 1;
    const max = 10;
    const randomNumber = getRandomNumber(min, max);

    expect(randomNumber).toBeGreaterThanOrEqual(min);
    expect(randomNumber).toBeLessThanOrEqual(max);
  });

  it('최소값과 최대값이 동일할 때 최소값을 반환해야 합니다', () => {
    const min = 5;
    const max = 5;
    const randomNumber = getRandomNumber(min, max);

    expect(randomNumber).toBe(min);
  });

  it('여러 번 호출될 때 다른 값을 반환해야 합니다', () => {
    const min = 1;
    const max = 100;

    const mockRandom = vi
      .spyOn(Math, 'random')
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.9);

    const randomNumber1 = getRandomNumber(min, max);
    const randomNumber2 = getRandomNumber(min, max);

    expect(randomNumber1).not.toBe(randomNumber2);

    mockRandom.mockRestore();
  });

  it('최소값이 최대값보다 클 때 값을 교환하여 숫자를 반환해야 합니다', () => {
    const min = 4;
    const max = 1;
    const randomNumber = getRandomNumber(min, max);

    expect(randomNumber).toBeGreaterThanOrEqual(max);
    expect(randomNumber).toBeLessThanOrEqual(min);
  });
});
