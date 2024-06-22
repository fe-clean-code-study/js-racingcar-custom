import { describe, test, expect } from 'vitest';
import Car from '../domain/Car.js';

describe('Car >', () => {
  test('자동차의 이름이 문자가 아닌 경우 오류가 발생한다.', () => {
    expect(() => new Car({ name: 123 })).toThrow();
  });

  test.each([{ name: '' }, { name: '123456' }])(
    '기본적으로 자동차의 이름이 1~5글자 범위에서 벗어나면 오류가 발생한다: $name',
    ({ name }) => {
      expect(() => new Car({ name })).toThrow();
    },
  );

  test('자동차의 이름 길이 제한을 5글자보다 늘릴 수 있다.', () => {
    expect(() => new Car({ name: '123456', nameSize: 7 })).not.toThrow();
  });

  test('자동차의 이름 길이 속성에 숫자가 아닌 값이 들어오면 오류가 발생한다.', () => {
    expect(() => new Car({ name: '123456', nameSize: '7' })).toThrow();
  });

  test('자동차의 이름 길이 속성에 정수가 아닌 값이 들어오면 오류가 발생한다.', () => {
    expect(() => new Car({ name: '123', nameSize: 3.456 })).toThrow();
  });

  test.each([
    { name: '자동차@' },
    { name: '자동차_' },
    { name: '자동차\\' },
    { name: '자동차:' },
    { name: '자동차<' },
    { name: '자동차.' },
    { name: '자동차/' },
  ])(
    '자동차의 이름에 공백이 아닌 특수문자가 있을 경우 오류가 발생한다: $name',
    ({ name }) => {
      expect(() => new Car({ name, nameSize: 20 })).toThrow();
    },
  );

  test.each([
    { name: '자동차' },
    { name: '자동차123' },
    { name: 'ㅈㄷㅊ 123' },
    { name: 'car' },
    { name: 'car123' },
    { name: 'car 123' },
    { name: '자동차 CAR 123' },
  ])(
    '자동차의 이름이 영어 대소문자, 한글, 숫자, 공백문자로 이루어져 있다면 오류가 발생하지 않는다: $name',
    ({ name }) => {
      expect(() => new Car({ name, nameSize: 20 })).not.toThrow();
    },
  );

  test('자동차의 이름 앞뒤에 공백을 입력하면 자동으로 제거된다.', () => {
    const car = new Car({ name: '  자동차  ' });
    expect(car.name).toBe('자동차');
  });

  test('자동차의 이름을 변경할 수 없다.', () => {
    const car = new Car({ name: '자동차' });
    expect(() => (car.name = '차동자')).toThrow();
  });

  test('자동차는 전진할 수 있다.', () => {
    const car = new Car({ name: '자동차' });
    const initialPosition = car.position;
    car.move();
    expect(car.position).toBe(initialPosition + 1);
  });
});
