import { beforeEach, describe, expect, test, vi } from "vitest";
import { RacerRegistry } from "../domain/index.js";
import { inputManager } from "../service/index.js";

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

describe("RacerRegistry 클래스 mock 관련 테스트", () => {
  beforeEach(() => {
    vi.mock("../service/index.js", () => ({
      inputManager: {
        scan: vi.fn(),
      },
    }));
  });

  test("등록 질문에 인수로 할당한 개체 유형과 분리 문자가 포함된다.", async () => {
    const mockScan = inputManager.scan;
    mockScan.mockResolvedValueOnce("1-2-3");

    const entityType = "사람";
    const separator = "-";
    const personRegistry = new RacerRegistry(entityType, separator);

    await personRegistry.register();

    expect(mockScan).toHaveBeenCalledWith(
      `경주할 ${entityType} 이름을 입력하세요(이름은 ${separator}를 기준으로 구분).\n`
    );
  });

  test("레이서를 등록하면 분리 문자를 기준으로 나눠진 배열값을 반환한다.", async () => {
    const mockScan = inputManager.scan;
    mockScan.mockResolvedValueOnce("1-2-3");

    const personRegistry = new RacerRegistry("사람", "-");

    const result = await personRegistry.register();

    expect(result).toEqual(["1", "2", "3"]);
  });
});
