import { describe, test, expect } from 'vitest';
import { NumberValidator } from '../utils/validators';

describe('NumberValidator >', () => {
  test('숫자 타입이 아닌 경우 오류가 발생한다.', () => {
    expect(() => NumberValidator.from('1')).toThrow();
  });

  test('비교 주체 값이 여러 개일 때, 첫 번째 인자를 제외하고는 무시한다.', () => {
    expect(() => NumberValidator.from(1, 2, 3)).not.toThrow();
  });

  test('1이 2보다 작다고 판단하면 오류가 발생하지 않는다.', () => {
    expect(() => NumberValidator.from(1).lessThan(2)).not.toThrow();
  });

  test('1이 2보다 크다고 판단하면 오류가 발생한다.', () => {
    expect(() => NumberValidator.from(1).isGreaterThan(2)).toThrow();
  });

  test('1과 1이 같다고 판단하면 오류가 발생하지 않는다.', () => {
    expect(() => NumberValidator.from(1).sameAs(1)).not.toThrow();
  });

  test('0과 10 사이에 5가 포함되면 오류가 발생하지 않는다.', () => {
    expect(() => NumberValidator.from(5).inRange(0, 10)).not.toThrow();
  });

  test('0과 10 사이에 11이 포함되면 오류가 발생한다.', () => {
    expect(() => NumberValidator.from(11).inRange(0, 10)).toThrow();
  });

  test('범위 내에 있는지 확인할 때, 범위 값을 입력하지 않으면 오류가 발생한다.', () => {
    expect(() => NumberValidator.from(1).inRange()).toThrow();
  });
});
