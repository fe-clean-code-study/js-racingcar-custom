import { describe, test, expect } from 'vitest';
import { StringValidator } from '../utils/validators';

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
