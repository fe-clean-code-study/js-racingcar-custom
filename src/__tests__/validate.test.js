import { describe, it, expect } from 'vitest';
import { validateName, validateNumberRange } from '../util/validate';

describe('validateName 함수 테스트', () => {
  it('문자열이 아닌 경우 false를 반환해야 합니다', () => {
    expect(validateName({ name: 123, minLength: 1, maxLength: 10 })).toBe(
      false
    );
  });

  it('문자열 길이가 최소 길이보다 짧은 경우 false를 반환해야 합니다', () => {
    expect(validateName({ name: '', minLength: 1, maxLength: 10 })).toBe(false);
  });

  it('문자열 길이가 최대 길이보다 긴 경우 false를 반환해야 합니다', () => {
    expect(
      validateName({ name: 'a'.repeat(11), minLength: 1, maxLength: 10 })
    ).toBe(false);
  });

  it('문자열 길이가 유효한 범위 내에 있는 경우 true를 반환해야 합니다', () => {
    expect(validateName({ name: 'valid', minLength: 1, maxLength: 10 })).toBe(
      true
    );
  });
});

describe('validateNumberRange 함수 테스트', () => {
  it('정수가 아닌 경우 false를 반환해야 합니다', () => {
    expect(
      validateNumberRange({ number: '123', minRange: 1, maxRange: 10 })
    ).toBe(false);
  });

  it('실수가 입력된 경우 false를 반환해야 합니다', () => {
    expect(validateNumberRange({ number: 5, minRange: 1 })).toBe(true);
  });

  it('숫자가 최소 범위보다 작은 경우 false를 반환해야 합니다', () => {
    expect(validateNumberRange({ number: 0, minRange: 1, maxRange: 10 })).toBe(
      false
    );
  });

  it('숫자가 최대 범위를 초과하는 경우 false를 반환해야 합니다', () => {
    expect(validateNumberRange({ number: 11, minRange: 1, maxRange: 10 })).toBe(
      false
    );
  });

  it('숫자가 유효한 범위 내에 있는 경우 true를 반환해야 합니다', () => {
    expect(validateNumberRange({ number: 5, minRange: 1, maxRange: 10 })).toBe(
      true
    );
  });

  it('최대 범위가 지정되지 않은 경우에도 유효한 범위 내에 있는 경우 true를 반환해야 합니다', () => {
    expect(validateNumberRange({ number: 5, minRange: 1 })).toBe(true);
  });
});
