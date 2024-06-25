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

  test.each([
    { value: 1 },
    { value: "str" },
    { value: true },
    { value: undefined },
    { value: null },
    { value: {} },
  ])(
    "레이스 준비시 배열이 아닌 값($value)을 할당하면 오류가 발생한다.",
    ({ value }) => {
      const race = createRaceWithCarAndLaps();

      expect(() => race.ready(value)).toThrowError(
        "경기 준비에 적합하지 않은 입력값입니다."
      );
    }
  );

  test("레이스 준비시 배열을 할당하면 오류가 발생하지 않는다.", () => {
    const race = createRaceWithCarAndLaps();

    expect(() => race.ready(["1", "2"])).not.toThrowError();
  });

  test("레이스 준비의 입력값이 0개 이하면 오류가 발생한다.", () => {
    const race = createRaceWithCarAndLaps();

    expect(() => race.ready([])).toThrowError(
      "경기를 준비하기엔 레이서가 부족합니다."
    );
  });

  test("레이스 준비의 입력값이 1개 이상이면 오류가 발생하지 않는다.", () => {
    const race = createRaceWithCarAndLaps();

    expect(() => race.ready(["1"])).not.toThrowError();
  });
});

function createRaceWithCarAndLaps() {
  return new Race(Car, 1);
}
