import { describe, expect, test } from 'vitest';
import Racer from '../model/Racer';

describe('Racer 클래스에 대한 단위 테스트', () => {
  test('Racer 를 초기화 할 때 name 프로퍼티에 앞 뒤 공백을 제외한 1~5자 사이의 문자열을 입력하면 아무 에러를 반환하지 않는다.', () => {
    expect(() => {
      makeRacerMockData({ name: '수연' });
    }).not.toThrow();
  });

  test('Racer 를 초기화할 때 position 프로퍼티에 숫자 타입을 입력하면 아무 에러를 반환하지 않는다.', () => {
    expect(() => {
      makeRacerMockData({ name: '수연', position: 0 });
    }).not.toThrow();
  });

  test.each([
    { name: undefined },
    { name: 1 },
    { name: null },
    { name: function name() {} },
    { name: {} },
  ])(
    'name 프로퍼티에 할당하는 값($name) 문자열 타입이 아니면 에러를 발생한다.',
    ({ name }) => {
      expect(() => {
        makeRacerMockData({ name }, false);
      }).toThrow();
    },
  );

  test.each([{ name: '' }, { name: '123456' }])(
    'name 프로퍼티에 해당하는 값($name)이 1글자 미만 5글자 초과인 경우 에러를 발생한다',
    ({ name }) => {
      expect(() => {
        makeRacerMockData({ name }, false);
      }).toThrow();
    },
  );

  test.each([
    { position: undefined },
    { position: '1' },
    { position: null },
    { position: function num() {} },
    { position: {} },
  ])(
    'position 프로퍼티에 해당하는 값($position)이 숫자 타입이 아닌 경우 에러를 발생한다.',
    ({ position }) => {
      expect(() => {
        makeRacerMockData({ position }, false);
      }).toThrow();
    },
  );

  test('position 프로퍼티를 가져올 수 있다.', () => {
    const racer = makeRacerMockData({ position: 5 });

    expect(racer.position).toBe(5);
  });

  test('position 프로퍼티를 가져올 수 있다.', () => {
    const racer = makeRacerMockData({ position: 5 });

    expect(racer.position).toBe(5);
  });

  test('init 메서드를 사용하면 postion 이 0 이 된다.', () => {
    const racer = makeRacerMockData({ position: 5 });
    racer.init();

    expect(racer.position).toBe(0);
  });

  test('init 함수를 사용하면 postion 이 0 이 된다.', () => {
    const racer = makeRacerMockData({ position: 5 });
    racer.init();

    expect(racer.position).toBe(0);
  });

  test('move 메서드에 숫자 타입을 전달하면 변경된 position 을 반환한다.', () => {
    const racer = makeRacerMockData({ position: 0 });
    const nextPosition = racer.move(5);

    expect(nextPosition).toBe(5);
  });

  test.each([
    { distance: '1' },
    { distance: function num() {} },
    { distance: {} },
  ])(
    'move 메서드에 빈값 (undefined, null)이나 숫자가 아닌 값($distance)을 전달하면 에러를 발생한다.',
    ({ distance }) => {
      const racer = makeRacerMockData();

      expect(() => {
        racer.move(distance);
      }).toThrow();
    },
  );
});

function makeRacerMockData(raceProperty) {
  const racer = new Racer({
    name: '수연',
    position: 0,
    ...raceProperty,
  });

  return racer;
}
