import { describe, expect, test } from 'vitest';
import gameSupport from '../utils/gameSupport';
import isSubClass from '../utils/isSubClass';
import Racer from '../model/Racer';
import Car from '../model/Car';
import Race from '../model/Race';

describe('gameSupport 유틸 함수 테스트', () => {
  test('다이스에 최대값과 최소값을 전달하면 최소값과 최대값 사이의 값을 반환해야 한다.', () => {
    const min = 0;
    const max = 10;
    const results = [...new Array(10)].map(() => gameSupport.dice(min, max));

    expect(results.every((result) => result >= min && result < max)).toBe(true);
  });
});

describe('isSubclass 유틸 함수 테스트', () => {
  test('어떤 클래스를 상속받은 클래스와 원본 클래스의 경우 true 를 반환한다.', () => {
    const subClass = Car;
    const superClass = Racer;

    expect(isSubClass(subClass, superClass)).toBe(true);
  });

  test('상속관계가 아닌 클래스는 false 를 반환한다.', () => {
    const subClass = Car;
    const etcClass = Race;

    expect(isSubClass(subClass, etcClass)).toBe(false);
  });
});
