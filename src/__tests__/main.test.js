import { describe, expect, test } from 'vitest';
import Main from '../main.js';

describe('Main 클래스에 대한 단위 테스트 진행', () => {
  test.each([
    { rounds: '' },
    { rounds: function () {} },
    { rounds: null },
    { rounds: ['12', '23'] },
  ])(
    'Main 클래스 초기화 시 전달하는 ($rounds) 는 숫자 배열이 아니면 에러를 반환한다.',
    ({ rounds }) => {
      expect(() => {
        new Main(rounds);
      }).toThrow();
    }
  );

  test('setRounds 에 1 이상 50 이하의 숫자로 이뤄진 배열을 넣으면 해당 값을 다시 반환한다.', () => {
    const rounds = [3, 4, 5];
    const main = new Main([5]);
    const nextRounds = main.setRounds(rounds);

    expect(nextRounds.every((value, index) => value === rounds[index])).toBe(
      true
    );
  });
});
