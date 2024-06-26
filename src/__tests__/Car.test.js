import { describe, it, expect, vi } from 'vitest';
import { Car } from '../model/Car';

describe('Car 클래스 테스트', () => {
  it('유효한 이름과 초기 위치로 Car 인스턴스를 생성할 수 있어야 합니다', () => {
    const car = new Car({ name: 'Test', position: 0 });
    expect(car).toBeInstanceOf(Car);
    expect(car.name).toBe('Test');
    expect(car.position).toBe(0);
  });

  it('유효하지 않은 이름으로 Car 인스턴스를 생성하려고 하면 오류를 발생시켜야 합니다', () => {
    expect(() => new Car({ name: 'TooLongName', position: 0 })).toThrow();
  });

  it('move 메서드는 randomNumber가 4 이상일 때 위치를 증가시켜야 합니다', () => {
    const car = new Car({ name: 'Test', position: 0 });

    const mockRandom = vi.spyOn(Math, 'random').mockReturnValue(0.5);

    car.move();
    expect(car.position).toBe(1);

    mockRandom.mockRestore();
  });

  it('move 메서드는 randomNumber가 4 미만일 때 위치를 증가시키지 않아야 합니다', () => {
    const car = new Car({ name: 'Test', position: 0 });

    const mockRandom = vi.spyOn(Math, 'random').mockReturnValue(0.3);

    car.move();
    expect(car.position).toBe(0);

    mockRandom.mockRestore();
  });
});
