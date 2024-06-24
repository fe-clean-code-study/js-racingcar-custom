import { describe, expect, it, vi } from "vitest";
import { Race } from "../domain/race.js";
import { Car } from "../domain/car.js";
import { ERROR_COUNT_LABEL } from "../domain/validation.js";

const fn = vi.fn();

describe("Race", () => {
  it.each([1, 100, 9999])(
    "횟수가 양의 정수(%d)이면 정상적으로 호출됩니다.",
    (count) => {
      expect(() =>
        Race({ count, isValidMove: fn, names: "제네시스", Target: Car })
      ).not.toThrowError();
    }
  );

  it.each([-100, -50, 0, 1.5])(
    "횟수가 양의 정수가 아니면(%d) 에러를 발생시킵니다.",
    (count) => {
      expect(() =>
        Race({ count, isValidMove: fn, names: "제네시스", Target: Car })
      ).toThrowError(ERROR_COUNT_LABEL);
    }
  );

  it.each([3, 5, 10])("횟수(%d) 조절이 가능하다.", (count) => {
    const names = "제네시스";
    const validMove = fn.mockReturnValue(true);
    const mockRace = { count, isValidMove: validMove, names, Target: Car };
    const moveResultViewFn = vi.fn();

    const race = Race(mockRace);
    race.play({ moveView: fn, moveResultView: moveResultViewFn });

    expect(moveResultViewFn).toHaveBeenCalledTimes(count);
  });

  it("참가 대상이 움직이는 조건을 만족하면 전진해야 합니다.", () => {
    const count = 2;
    const names = "제네시스";
    const validMove = fn.mockReturnValue(true);
    const mockRace = { count, isValidMove: validMove, names, Target: Car };

    const race = Race(mockRace);
    race.play({ moveView: fn, moveResultView: fn });

    const result = race.targetNow;

    expect(result).toEqual([count]);
  });

  it("참가 대상이 움직이는 조건을 만족하지 못하면 정지해야 합니다.", () => {
    const count = 2;
    const names = "제네시스";
    const notValidMove = fn.mockReturnValue(false);
    const mockRace = { count, isValidMove: notValidMove, names, Target: Car };

    const race = Race(mockRace);
    race.play({ moveView: fn, moveResultView: fn });

    const result = race.targetNow;

    expect(result).toEqual([0]);
  });

  it.each([4, 3, 2])(
    "참가 대상의 전진 거리(%d)를 정할 수 있습니다.",
    (distance) => {
      const count = 2;
      const names = "제네시스";
      const validMove = fn.mockReturnValue(true);
      const mockRace = { count, isValidMove: validMove, names, Target: Car };

      const race = Race(mockRace);
      race.play({ distance, moveView: fn, moveResultView: fn });

      const result = race.targetNow;

      expect(result).toEqual([distance * count]);
    }
  );

  it("현재 전진 거리가 가장 높은 참가 대상은 우승자가 됩니다.", () => {
    const count = 2;
    const names = "제네시스,람보르기니,포르쉐";
    const isValidMove = fn.mockReturnValue(true).mockReturnValueOnce(false);
    const mockRace = { count, isValidMove, names, Target: Car };

    const race = Race(mockRace);
    race.play({ moveView: fn, moveResultView: fn });

    const result = race.winners;
    expect(result).toEqual(["람보르기니", "포르쉐"]);
  });
});
