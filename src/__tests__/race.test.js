import { describe, expect, test } from 'vitest';
import Race from '../model/Race';
import Car from '../model/Car';
import gameSupport from '../utils/gameSupport';
import Rule from '../model/Rule';
import Animal from '../model/Animal';

describe('Race 클래스에 대한 단위 테스트 작성', () => {
  test('Race 를 초기화 할때 Racer 의 서브클래스가 아닌 클래스를 Racer 프로퍼티에 전달하면 에러를 발생한다', () => {
    expect(() => {
      makeRaceMockData({ Racer: Rule });
    }).toThrow();
  });

  test.each([
    { round: '으아' },
    { round: {} },
    { round: null },
    { round: undefined },
    { round: function round() {} },
  ])(
    'Race 를 초기화할 때 round 에 숫자 형태로 바뀔 수 잇는 값($round)이 아닌 값을 전달하면 에러를 발생한다.',
    ({ round }) => {
      expect(() => {
        makeRaceMockData({ round });
      }).toThrow();
    },
  );

  test.each([{ round: 0 }, { round: 11 }])(
    'Race 를 초기화할 때 round 에 1미만 10초과의 숫자($round)를 전달하면 에러가 난다.',
    ({ round }) => {
      expect(() => {
        makeRaceMockData({ round });
      }).toThrow();
    },
  );

  test.each([
    { names: undefined },
    { names: null },
    { names: {} },
    { names: function name() {} },
    { names: 123 },
    { names: [123, 124] },
  ])(
    'Race 초기화 시 names 에 문자열이 아닌 값($names)이 들어가면 에러가 발생한다.',
    ({ names }) => {
      expect(() => {
        makeRaceMockData({ names });
      }).toThrow();
    },
  );

  test.each([{ names: '' }, { names: '1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11' }])(
    'Race 초기화 시 names($names)을 콤마로 나눠 1명 미만 10명 초과의 레이서를 가지게 되면 에러가 발생한다.',
    ({ names }) => {
      expect(() => {
        makeRaceMockData({ names });
      }).toThrow();
    },
  );

  test.each([
    { rules: null },
    { rules: '' },
    { rules: { diceRule: () => 9 } },
    { rules: [] },
    { rules: function diceRule() {} },
  ])(
    'Race 초기화 시 rules 프로퍼티에 불리언값을 반환하는 함수를 값으로 갖는 객체($rules)로 이루어져있지 않다면 에러를 발생한다.',
    ({ rules }) => {
      expect(() => {
        makeRaceMockData({ rules });
      }).toThrow();
    },
  );

  test('round 프로퍼티를 통해 round 를 가져올 수 있다.', () => {
    const race = makeRaceMockData({ round: 10 });

    expect(race.round).toBe(10);
  });

  test('round 프로퍼티를 통해 round 를 설정할 수 있다.', () => {
    const race = makeRaceMockData({ round: 10 });
    race.round = 6;

    expect(race.round).toBe(6);
  });

  test('Racer 프로퍼티를 통해 현재 Racer 에 해당하는 클래스를 가져올 수 있다.', () => {
    const race = makeRaceMockData({ Racer: Car });

    expect(race.Racer).toBe(Car);
  });

  test('Racer 프로퍼티를 통해 현재 Racer 에 해당하는 클래스를 가져올 수 있다.', () => {
    const race = makeRaceMockData({ Racer: Car });
    race.Racer = Animal;

    expect(race.Racer).toBe(Animal);
  });

  test('getRacerState 메서드는 현재 레이서들의 이름과 포지션을 받아올 수 있다.', () => {
    const names = ['a', 'b'];
    const race = makeRaceMockData({ names: 'a, b' });
    const state = race.getRacerStatus();

    expect(
      state.every(
        ({ name, position }) => names.includes(name) && position === 0,
      ),
    ).toBeTruthy();
  });

  test('startRace 메서드는 레이스를 진행하고 우승자 이름 목록을 반환한다.', () => {
    const race = makeRaceMockData({ names: 'a', rules: { win: () => true } });

    expect(race.startRace()[0]).toBe('a');
  });
});

function makeRaceMockData(raceProperty) {
  const race = new Race({
    Racer: Car,
    round: 5,
    rules: {
      diceRule: () => gameSupport.dice(0, 10) >= 4,
    },
    names: '1, 2, 3',
    ...raceProperty,
  });

  return race;
}
