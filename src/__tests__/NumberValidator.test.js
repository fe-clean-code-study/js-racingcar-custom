import { describe, test, expect } from 'vitest';
import NumberValidator from '../shared/NumberValidator.js';

describe('NumberValidator >', () => {
  test('숫자 타입이 아닌 경우 오류가 발생한다.', () => {
    expect(() => NumberValidator.from('1')).toThrow();
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
});
