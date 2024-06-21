import { describe, test, expect } from 'vitest';
import Validator from '../shared/Validator.js';

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
