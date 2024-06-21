import { describe, expect, test } from "vitest";
import { Car, Race } from "../domain/index.js";

describe("Race 클래스 테스트", () => {
  test("레이서가 Racer 클래스의 자식 클래스가 아니면 오류가 발생한다.", () => {
    expect(() => new Race({}, 1)).toThrowError();
  });

  test("레이서가 Racer 클래스의 자식 클래스면 오류가 발생하지 않는다.", () => {
    expect(() => new Race(Car, 1)).not.toThrowError();
  });

  test.each([
    { value: "1" },
    { value: true },
    { value: undefined },
    { value: null },
    { value: {} },
    { value: [] },
  ])(
    "레이스 횟수로 숫자가 아닌 값($value)을 할당하면 오류가 발생한다.",
    ({ value }) => {
      expect(() => new Race(Car, value)).toThrowError();
    }
  );

  test("레이스 횟수로 숫자를 할당하면 오류가 발생하지 않는다.", () => {
    expect(() => new Race(Car, 1)).not.toThrowError();
  });

  test("레이스 횟수가 0이하면 오류가 발생한다.", () => {
    expect(() => new Race(Car, 0)).toThrowError();
    expect(() => new Race(Car, -1)).toThrowError();
  });

  test("레이스 횟수가 1이상이면 오류가 발생하지 않는다.", () => {
    expect(() => new Race(Car, 1)).not.toThrowError();
  });
});
