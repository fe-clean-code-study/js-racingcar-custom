import { describe, test, expect } from 'vitest';
import Car from '../domains/Car.js';
import { carValidations } from '../validations/car.js';

describe('Car', () => {
  test('올바른 이름과 초기 위치(0)으로 자동차를 초기화한다.', () => {
    const car = new Car('테스트');
    expect(car.name).toBe('테스트');
    expect(car.position).toBe(0);
  });

  test('자동차를 올바르게 이동시킨다.', () => {
    const car = new Car('테스트');
    car.move(3);
    expect(car.position).toBe(3);
    car.move(-1);
    expect(car.position).toBe(2);
    car.move(-3);
    expect(car.position).toBe(0);
  });

  test('유효하지 않은 이름에 대해 오류를 발생시킨다.', () => {
    expect(() => new Car(' ')).toThrow(
      carValidations.carNameLength.errorMessage,
    );
    expect(() => new Car('기이이인이름')).toThrow(
      carValidations.carNameLength.errorMessage,
    );
  });
});
