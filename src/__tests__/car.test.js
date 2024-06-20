import { describe, expect, it } from "vitest";
import { Car } from "../domain/car.js";

describe("Car", () => {
  it("이름이 5자 이하이면 정상적으로 호출됩니다.", () => {
    expect(Car("람보르기니")).toBeCalled;
  });

  it("이름이 5자 이상이면 에러를 발생시킵니다.", () => {
    expect(() => Car("람보르기니니")).toThrowError(
      /^이름은 5자 이하만 가능합니다.$/
    );
  });
});
