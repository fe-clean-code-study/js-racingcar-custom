import { describe, expect, test } from "vitest";
import { Car } from "../domain/index.js";

describe("Car 클래스 테스트", () => {
  test.each([
    { value: 1 },
    { value: true },
    { value: undefined },
    { value: null },
    { value: {} },
    { value: [] },
  ])(
    "자동차의 이름으로 문자열이 아닌 값($value)을 할당하면 오류가 발생한다.",
    ({ value }) => {
      expect(() => new Car(value)).toThrowError();
    }
  );

  test("자동차의 이름으로 문자열을 할당하면 오류가 발생하지 않는다.", () => {
    expect(() => new Car("car")).not.toThrowError();
  });

  test("자동차 이름이 5자 초과이면 오류가 발생한다.", () => {
    expect(() => new Car("123456")).toThrowError();
  });

  test("자동차 이름이 1자 미만이면 오류가 발생한다.", () => {
    expect(() => new Car("")).toThrowError();
  });
});
