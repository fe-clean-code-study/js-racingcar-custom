import { describe, expect, test, vi } from "vitest";
import { Race, RaceEntry } from "../domain/index.js";
import { inputManager } from "../service/index.js";

vi.mock("../service/index.js");

function retryScanMock(inputValue) {
  inputManager.retryScan.mockImplementationOnce(async (_, processFn) => {
    return processFn(inputValue);
  });
}

describe("RaceEntry 클래스 테스트", () => {
  test("올바른 유형을 선택하지 않으면 오류가 발생한다.", async () => {
    retryScanMock("5");

    const register = new RaceEntry();

    await expect(register.selectEntityType()).rejects.toThrowError(
      "올바른 유형의 번호가 아닙니다."
    );
  });

  test("올바른 유형을 선택하면 오류가 발생하지 않는다.", async () => {
    retryScanMock("1");

    const register = new RaceEntry();

    await expect(register.selectEntityType()).resolves.not.toThrowError();
  });

  test("레이스 횟수로 정수가 아닌 값을 입력하면 오류가 발생한다.", async () => {
    retryScanMock("a");

    const register = new RaceEntry();

    await expect(register.setRaceLaps()).rejects.toThrowError(
      "시도할 횟수로 정수를 입력해야 합니다."
    );
  });

  test("레이스 횟수로 0이하를 입력하면 오류가 발생한다.", async () => {
    retryScanMock("0");

    const register = new RaceEntry();

    await expect(register.setRaceLaps()).rejects.toThrowError(
      "시도할 횟수는 1이상이어야 합니다."
    );
  });

  test("레이스 횟수로 1이상을 입력하면 오류가 발생하지 않는다.", async () => {
    retryScanMock("1");

    const register = new RaceEntry();

    await expect(register.setRaceLaps()).resolves.not.toThrowError();
  });

  test("레이스 횟수를 설정하면 Race 클래스 인스턴스를 반환받는다.", async () => {
    retryScanMock("1");
    const register = new RaceEntry();

    const race = await register.setRaceLaps();

    expect(race).toEqual(new Race(1));
  });
});
