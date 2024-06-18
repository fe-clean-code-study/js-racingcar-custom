import { describe, test, expect } from "vitest";

function sum(...args) {
  return args.reduce((a, b) => a+ b);
}

describe('예제 테스트입니다.', () => {
  test('sum > ', () => {
    expect(sum(1,2,3,4,5)).toBe(15);
  })
})
