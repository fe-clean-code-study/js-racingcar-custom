import { describe, expect, test } from "vitest";
import { getRandomNumber } from "../utils/index.js";

describe("getRandomNumber 함수 테스트", () => {
  test.each([
    [0, 10],
    [1, 11],
    [2, 12],
    [3, 13],
    [4, 14],
    [5, 15],
    [6, 16],
    [7, 17],
    [8, 18],
    [9, 19],
  ])("%i 이상 %i 이하의 정수가 무작위로 생성된다.", (min, max) => {
    for (let i = 0; i < 100; i++) {
      expect(getRandomNumber(min, max))
        .toBeGreaterThanOrEqual(min)
        .toBeLessThanOrEqual(max);
    }
  });

  test("첫번째 인수와 두번째 인수가 같으면 오류가 발생하지 않는다.", () => {
    expect(() => getRandomNumber(3, 3)).not.toThrowError();
  });

  test("두번째 인수보다 첫번째 인수가 크면 오류가 발생한다.", () => {
    expect(() => getRandomNumber(4, 2)).toThrowError();
  });
});
