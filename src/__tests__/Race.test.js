import { describe, expect, test } from 'vitest';
import Race from '../domain/Race.js';
import Vehicle from '../shared/Vehicle.js';
import Car from '../domain/Car.js';

describe('Race >', () => {
  test('참가자가 없으면 오류가 발생한다.', () => {
    expect(() => new Race()).toThrow();
  });

  test('참가자가 잘못된 데이터로 전달되면 오류가 발생한다.', () => {
    expect(() => new Race('')).toThrow();
  });

  test('참가자가 이동할 수 없다면 오류가 발생한다.', () => {
    expect(() => new Race(['A', 'B', 'C'])).toThrow();
  });

  test('참가자가 이동할 수 있다면 오류가 발생하지 않는다.', () => {
    expect(
      () => new Race([new Vehicle(), new Car({ name: 'car' })]),
    ).not.toThrow();
  });

  test('A와 B 중 A만 전진시킬 수 있다.', () => {
    const A = new Car({ name: 'A' });
    const B = new Car({ name: 'B' });

    expect(A.position).toBe(0);
    expect(B.position).toBe(0);

    new Race([A, B]).moveRunners((runner) => runner.name === 'A');

    expect(A.position).toBe(1);
    expect(B.position).toBe(0);
  });

  test('B가 A보다 더 많이 이동했을 때 B 순위가 더 높다.', () => {
    const A = new Car({ name: 'A' });
    const B = new Car({ name: 'B' });
    const race = new Race([A, B]);

    expect(race.runners.indexOf(A) < race.runners.indexOf(B)).toBe(true);

    race.moveRunners((runner) => runner.name === 'B');
    race.sortRunners((runner1, runner2) => runner2.position - runner1.position);

    expect(race.runners.indexOf(A) > race.runners.indexOf(B)).toBe(true);
  });

  test('B가 A보다 더 많이 이동했을 때 B 순위가 더 높지 않을 수도 있다.', () => {
    const A = new Car({ name: 'A' });
    const B = new Car({ name: 'B' });
    const race = new Race([A, B]);

    expect(race.runners.indexOf(A) < race.runners.indexOf(B)).toBe(true);

    race.moveRunners((runner) => runner.name === 'A');
    race.sortRunners((runner1, runner2) => runner2.position - runner1.position);

    expect(race.runners.indexOf(A) > race.runners.indexOf(B)).toBe(false);
  });
});
