import { describe, expect, test } from "vitest";
import { RacerRegistry } from "../domain/index.js";

describe("RacerRegistry 클래스 테스트", () => {
  test.each([
    { value: 1 },
    { value: true },
    { value: undefined },
    { value: null },
    { value: {} },
    { value: [] },
  ])(
    "개체 유형으로 문자열이 아닌($value)을 할당하면 오류가 발생한다.",
    ({ value }) => {
      expect(() => new RacerRegistry(value, ",")).toThrowError();
    }
  );

  test("개체 유형으로 문자열을 할당하면 오류가 발생하지 않는다.", () => {
    expect(() => new RacerRegistry("사람", ",")).not.toThrowError();
  });

  test("개체 유형이 1자 미만이면 오류가 발생한다.", () => {
    expect(() => new RacerRegistry("", ",")).toThrowError();
  });

  test("개체 유형이 1자 이상이면 오류가 발생하지 않는다.", () => {
    expect(() => new RacerRegistry("차", ",")).not.toThrowError();
  });

  test.each([
    { value: 1 },
    { value: true },
    { value: undefined },
    { value: null },
    { value: {} },
    { value: [] },
  ])(
    "분리 문자로 문자열이 아닌($value)을 할당하면 오류가 발생한다.",
    ({ value }) => {
      expect(() => new RacerRegistry("사람", value)).toThrowError();
    }
  );

  test("분리 문자로 문자열을 할당하면 오류가 발생하지 않는다.", () => {
    expect(() => new RacerRegistry("사람", ",")).not.toThrowError();
  });

  test("분리 문자가 1자 미만이면 오류가 발생한다.", () => {
    expect(() => new RacerRegistry("사람", "")).toThrowError();
  });

  test("분리 문자가 1자 이상이면 오류가 발생하지 않는다.", () => {
    expect(() => new RacerRegistry("사람", "-")).not.toThrowError();
  });
});
