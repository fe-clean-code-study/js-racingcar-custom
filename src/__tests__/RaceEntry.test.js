import { describe, expect, test, vi } from "vitest";
import { RaceEntry } from "../domain/index.js";
import { inputManager } from "../service/index.js";

vi.mock("../service/index.js");

describe("RaceEntry 클래스 테스트", () => {
  test("올바른 유형을 선택하지 않으면 오류가 발생한다.", async () => {
    inputManager.retryScan.mockImplementationOnce(async (_, { processFn }) => {
      return processFn("5");
    });

    const register = new RaceEntry();

    await expect(register.selectEntityType()).rejects.toThrowError(
      "올바른 유형의 번호가 아닙니다."
    );
  });
});
