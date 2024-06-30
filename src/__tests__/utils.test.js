import { describe, expect, test } from "vitest";
import { deepCopy, getRandomNumber } from "../utils/index.js";

describe("getRandomNumber 함수 테스트", () => {
  test.each([
    { value: "1" },
    { value: true },
    { value: undefined },
    { value: null },
    { value: {} },
    { value: [] },
  ])(
    "최솟값으로 숫자가 아닌 값($value)을 할당하면 오류가 발생한다.",
    ({ value }) => {
      expect(() => getRandomNumber(value, 10)).toThrowError();
    }
  );

  test("최솟값으로 숫자를 할당하면 오류가 발생하지 않는다.", () => {
    expect(() => getRandomNumber(1, 10)).not.toThrowError();
  });

  test.each([
    { value: "1" },
    { value: true },
    { value: undefined },
    { value: null },
    { value: {} },
    { value: [] },
  ])(
    "최댓값으로 숫자가 아닌 값($value)을 할당하면 오류가 발생한다.",
    ({ value }) => {
      expect(() => getRandomNumber(1, value)).toThrowError();
    }
  );

  test("최댓값으로 숫자를 할당하면 오류가 발생하지 않는다.", () => {
    expect(() => getRandomNumber(1, 10)).not.toThrowError();
  });

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

describe("deepCopy 함수 테스트", () => {
  test("Map을 인수로 할당하면 오류가 발생한다.", () => {
    expect(() => deepCopy(new Map())).toThrowError();
  });

  test("Set을 인수로 할당하면 오류가 발생한다.", () => {
    expect(() => deepCopy(new Set())).toThrowError();
  });

  test.each([
    { value: 1 },
    { value: true },
    { value: undefined },
    { value: null },
    { value: {} },
    { value: [] },
  ])("$value을(를) 인수로 할당하면 오류가 발생하지 않는다.", ({ value }) => {
    expect(() => deepCopy(value)).not.toThrowError();
  });

  test("기존 값을 수정하면 복사한 값과 일치하지 않는다.", () => {
    const originalValue = [
      [
        { a: 1, b: 2 },
        { c: 3, d: 4 },
      ],
      [
        { e: 5, f: 6 },
        { g: 7, h: 8 },
      ],
    ];
    const copiedValue = deepCopy(originalValue);

    originalValue[0][0].b = 20;

    expect(originalValue).not.toEqual(copiedValue);
  });
});
