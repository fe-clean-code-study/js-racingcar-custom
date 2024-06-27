import { describe, expect, test } from "vitest";
import { Racer } from "../domain/index.js";

describe("Racer 클래스 테스트", () => {
  test("레이서의 이름 앞뒤 공백은 제거된다.", () => {
    const racer = new Racer(" jeong ");

    expect(racer.name).toHaveLength(5);
  });

  test("레이서에 이름을 지어줄 수 있다.", () => {
    const racer = new Racer("tom");

    expect(racer.name).toBe("tom");
  });

  test("레이서는 움직일 수 있다.", () => {
    const racer = createRacerWithName();

    racer.move();

    expect(racer.position).toBe(1);
  });

  test("레이서의 이름을 수정하려고 하면 오류가 발생한다.", () => {
    const racer = createRacerWithName();

    expect(() => {
      racer.name = "CAR";
    }).toThrowError();
  });

  test("레이서의 위치를 수정하려고 하면 오류가 발생한다.", () => {
    const racer = createRacerWithName();

    expect(() => {
      racer.position = 2;
    }).toThrowError();
  });
});

function createRacerWithName() {
  return new Racer("jeong");
}
