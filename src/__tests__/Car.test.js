import { describe, test, expect } from "vitest";
import Car from "../domain/Car.js";

describe('Car >', () => {
  test('자동차의 이름이 5글자보다 길면 오류가 발생한다.', () => {
    expect(() => new Car('123456')).toThrow();
  })

  test.each([
    { name: '', },
    { name: '1', },
    { name: '12', },
    { name: '1 2', },
    { name: '123', },
    { name: '1 2 3', },
    { name: '1234', },
    { name: '12345', },
    { name: ' 12345 ', },
  ])('자동차의 이름이 5글자 이하($name)이면 오류가 발생하지 않는다.', ({ name }) => {
    expect(() => new Car(name)).not.toThrow();
  })

  test('자동차는 전진할 수 있다.', () => {
    const car = new Car('이름');
    car.move();
    expect(car.position).toBe(1);
  })
})
