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
  ])("%i 이상 %i 이하의 정수가 무작위로 생성됩니다.", (min, max) => {
    for (let i = 0; i < 100; i++) {
      expect(getRandomNumber(min, max))
        .toBeGreaterThanOrEqual(min)
        .toBeLessThanOrEqual(max);
    }
  });
});
