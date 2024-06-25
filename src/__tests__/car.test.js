import { describe, expect, test } from 'vitest';
import Car from '../model/Car.js';

describe('car 클래스에 대한 단위 테스트.', () => {
  const car = new Car('meca');
  const position = 4;

  test('setName 에 올바른 문자열을 할당하면 해당 문자열을 반환한다.', () => {
    const nextName = car.setName('Dva');

    expect(nextName).toBe('Dva');
  });

  test.each([
    {
      name: ['hello'],
    },
    {
      name: '',
    },
    {
      name: { name: 'hello' },
    },
    { name: undefined },
  ])(
    'setName 에 문자열이 아닌 값($name)을 할당하면 에러를 반환한다.',
    ({ name }) => {
      expect(() => {
        car.setName(name);
      }).toThrow();
    }
  );

  test('getName 은 현재 car 인스턴스의 이름을 반환한다.', () => {
    const currName = car.getName();

    expect(currName).toBe('Dva');
  });

  test('setPosition 에 올바른 숫자를 할당하면 해당 숫자를 반환한다.', () => {
    const nextPosition = car.setPosition(position);

    expect(nextPosition).toBe(position);
  });

  test.each([
    { position: '1' },
    { position: [] },
    { position: {} },
    { position: undefined },
  ])(
    'setPosition 에 숫자가 아닌 값($position)을 할당하면 에러를 반환한다.',
    ({ position }) => {
      expect(() => {
        car.setPosition(position);
      }).toThrow();
    }
  );

  test('getPosition 은 현재 포지션의 값을 반환해야 한다.', () => {
    expect(car.getPosition()).toBe(position);
  });

  test.each([
    { distance: 1 },
    { distance: 2 },
    { distance: 3 },
    { distance: 4 },
  ])(
    'move 는 현재 포지션에 ($distance) 값을 추가한 만큼 position 을 증가시켜야 한다.',
    ({ distance }) => {
      const prevPosition = car.getPosition();

      expect(car.move(distance)).toBe(prevPosition + distance);
    }
  );
});
