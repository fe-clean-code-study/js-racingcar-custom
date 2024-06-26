import { describe, test, expect } from 'vitest';
import Validator from '../utils/validators/Validator.js';
import NumberValidator from '../utils/validators/NumberValidator';
import StringValidator from '../utils/validators/StringValidator';
import FunctionValidator from '../utils/validators/FunctionValidator';
import ArrayValidator from '../utils/validators/ArrayValidator';

describe('Validator >', () => {
  test('값이 없으면 오류가 발생한다.', () => {
    expect(() => new Validator()).toThrow();
    expect(() => Validator.from()).toThrow();
  });

  test('값이 있으면 오류가 발생하지 않는다.', () => {
    expect(() => new Validator('value')).not.toThrow();
    expect(() => Validator.from('value')).not.toThrow();
  });
});

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

describe('StringValidator >', () => {
  test('문자열이 아닌 경우 오류가 발생한다.', () => {
    expect(() => StringValidator.from(123)).toThrow();
  });

  test('문자열의 길이가 0일 경우 오류가 발생한다.', () => {
    expect(() => StringValidator.from('').notEmpty()).toThrow();
  });

  test('문자열이 5글자보다 길면 오류가 발생한다.', () => {
    expect(() => StringValidator.from('123456').maxLength(5)).toThrow();
  });

  test.each([
    {
      value: '+_+',
      pattern: /^[a-zA-Z0-9ㄱ-힣 ]+$/,
      describe: '특수문자를 허용하지 않는 경우',
    },
    {
      value: 'AaBbCc',
      pattern: /^[a-z]+$/,
      describe: '소문자만 허용하는 경우',
    },
    {
      value: '안녕하세요',
      pattern: /^[A-Z]+$/,
      describe: '대문자만 허용하는 경우',
    },
  ])(
    '문자열이 주어진 정규식 패턴에 맞지 않는 경우 오류가 발생한다. ($describe: 입력값 - $value)',
    ({ value, pattern }) => {
      expect(() => StringValidator.from(value).matches(pattern)).toThrow();
    },
  );

  test.each([
    {
      value: '한글abcABC123',
      pattern: /^[a-zA-Z0-9ㄱ-힣 ]+$/,
      describe: '특수문자를 허용하지 않는 경우',
    },
    {
      value: 'hello',
      pattern: /^[a-z]+$/,
      describe: '소문자만 허용하는 경우',
    },
    {
      value: 'HELLO',
      pattern: /^[A-Z]+$/,
      describe: '대문자만 허용하는 경우',
    },
  ])(
    '문자열이 주어진 정규식 패턴에 일치하는 경우 오류가 발생하지 않는다.($describe: 입력값 - $value)',
    ({ value, pattern }) => {
      expect(() => StringValidator.from(value).matches(pattern)).not.toThrow();
    },
  );

  test('정규식 패턴을 검사할 때 정규식이 아닌 경우 오류가 발생한다.', () => {
    expect(() => StringValidator.from('value').matches('pattern')).toThrow();
  });
});

describe('FunctionValidator >', () => {
  test('함수가 아닌 경우 오류가 발생한다.', () => {
    expect(() => FunctionValidator.from(123)).toThrow();
  });

  test('함수인 경우 오류가 발생하지 않는다.', () => {
    expect(() => FunctionValidator.from(() => {})).not.toThrow();
  });

  test('A가 B의 인스턴스가 아닌 경우 오류가 발생한다.', () => {
    class B {}
    class C {}
    const A = new C();
    expect(() => FunctionValidator.from(B).hasInstance(A)).toThrow();
  });

  test('A가 B의 인스턴스인 경우 오류가 발생하지 않는다.', () => {
    class B {}
    const A = new B();
    expect(() => FunctionValidator.from(B).hasInstance(A)).not.toThrow();
  });
});

describe('ArrayValidator >', () => {
  test('배열이 아닌 경우 오류가 발생한다.', () => {
    expect(() => ArrayValidator.from(123)).toThrow();
  });

  test('배열인 경우 오류가 발생하지 않는다.', () => {
    expect(() => ArrayValidator.from([])).not.toThrow();
  });
});
