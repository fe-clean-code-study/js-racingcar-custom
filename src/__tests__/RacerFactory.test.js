import { describe, it, expect } from 'vitest';
import { RACER_TYPE } from '../constant/racerType';
import { RacerFactory } from '../factory/RacerFactory';
import { Car } from '../model/Car';

describe('RacerFactory 클래스 테스트', () => {
  it('RACER_TYPE.CAR 타입으로 Car 인스턴스를 생성할 수 있어야 합니다', () => {
    const args = { name: 'Test', position: 0 };
    const racer = RacerFactory.createRacer(RACER_TYPE.CAR, args);

    expect(racer).toBeInstanceOf(Car);
    expect(racer.name).toBe('Test');
    expect(racer.position).toBe(0);
  });

  it('알 수 없는 타입으로 인스턴스를 생성하려고 하면 오류를 발생시켜야 합니다', () => {
    const args = { name: 'Test', position: 0 };

    expect(() => RacerFactory.createRacer('UNKNOWN_TYPE', args)).toThrow();
  });
});
