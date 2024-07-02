import { describe, expect, test } from "vitest";
import { Racer, Race } from "../domain/index.js";

describe("Race 클래스 테스트", () => {
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
      expect(() => new Race(value)).toThrowError();
    }
  );

  test("레이스 횟수로 숫자를 할당하면 오류가 발생하지 않는다.", () => {
    expect(() => new Race(1)).not.toThrowError();
  });

  test("레이스 횟수가 0이하면 오류가 발생한다.", () => {
    expect(() => new Race(0)).toThrowError();
    expect(() => new Race(-1)).toThrowError();
  });

  test("레이스 횟수가 1이상이면 오류가 발생하지 않는다.", () => {
    expect(() => new Race(1)).not.toThrowError();
  });

  test.each([
    { value: 1 },
    { value: "str" },
    { value: true },
    { value: undefined },
    { value: null },
    { value: {} },
  ])(
    "레이스 시작시 배열이 아닌 값($value)을 할당하면 오류가 발생한다.",
    ({ value }) => {
      const race = createRaceWith5Laps();

      expect(() => race.start(value)).toThrowError(
        "레이스 시작에 적합하지 않은 입력값입니다."
      );
    }
  );

  test("레이스 시작의 입력값이 0개 이하면 오류가 발생한다.", () => {
    const race = createRaceWith5Laps();

    expect(() => race.start([])).toThrowError(
      "레이스를 시작하기엔 레이서가 부족합니다."
    );
  });

  test("레이스 시작의 입력값이 레이서들이면 오류가 발생하지 않는다.", () => {
    const race = createRaceWith5Laps();

    expect(() => race.start([new Racer("1")])).not.toThrowError();
  });

  test("레이스 시작전에 기록을 가져오면 빈배열입니다.", () => {
    const race = createRaceWith5Laps();

    expect(race.records).toEqual([]);
  });

  test("레이스 시작후에 기록을 알 수 있습니다.", () => {
    const race = createRaceWith5Laps();
    race.start([new Racer("1"), new Racer("2")]);

    expect(race.records).toHaveLength(5);
  });

  test("레이스 시작전에 우승자를 가져오면 빈배열입니다.", () => {
    const race = createRaceWith5Laps();

    expect(race.winners).toEqual([]);
  });

  test("레이스 우승자는 1이상입니다..", () => {
    const race = createRaceWith5Laps();
    race.start([new Racer("1"), new Racer("2")]);

    expect(race.winners.length).toBeGreaterThanOrEqual(1);
  });
});

function createRaceWith5Laps() {
  return new Race(5);
}
