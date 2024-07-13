import { describe, expect, test } from "vitest";
import { Car } from "../Model/Car";

describe("자동차 생성 테스트", () => {
  test("자동차의 이름은 5자 이하만 허용된다.", () => {
    const car = new Car("자동차");
    expect(car.carName).toBe("자동차");

    expect(() => {
      car.carName = "긴긴긴긴긴자동차";
    }).toThrow("자동차 이름은 5자 이하만 가능합니다.");
  });

  test("자동차의 이름은 변경 가능하다.", () => {
    const car = new Car("자동차");
    car.carName = "새자동차";
    expect(car.carName).toBe("새자동차");
  });

  test("자동차의 위치는 0위치부터 시작한다.", () => {
    const car = new Car("자동차");
    expect(car.position).toBe(0);
  });

  test("자동차의 속도를 설정할 수 있다.", () => {
    const car = new Car("자동차");
    car.velocity = 10;
    expect(car.velocity).toBe(10);
  });

  test("자동차는 이동할 수 있다.", () => {
    const car = new Car("자동차");
    car.velocity = 5;
    car.move();
    expect(car.position).toBe(5);
  });

  test("자동차는 준비 상태로 설정할 수 있다.", () => {
    const car = new Car("자동차");
    car.velocity = 5;
    car.move();
    car.ready();
    expect(car.position).toBe(0);
    expect(car.velocity).toBe(0);
  });
});
