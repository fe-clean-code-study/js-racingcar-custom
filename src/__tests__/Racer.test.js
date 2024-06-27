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

  test.each([
    { value: 1.1 },
    { value: "1" },
    { value: true },
    { value: null },
    { value: {} },
  ])(
    "레이서의 이동 거리로 정수가 아닌 값($value)을 할당하면 오류가 발생한다.",
    ({ value }) => {
      const racer = createRacerWithName();

      expect(() => racer.move(value)).toThrowError();
    }
  );

  test.each([2, 3, 4, 5])(
    "레이서의 이동 거리(%i)를 지정할 수 있다.",
    (distance) => {
      const racer = createRacerWithName();

      racer.move(distance);

      expect(racer.position).toBe(distance);
    }
  );

  test("레이서의 위치는 0미만이 될 수 없다.", () => {
    const racer = createRacerWithName();

    racer.move(-1);

    expect(racer.position).toBe(0);
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
