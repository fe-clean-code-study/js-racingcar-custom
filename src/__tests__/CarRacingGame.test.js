import { describe, test, expect } from 'vitest';
import CarRacingGame from '../app/CarRacingGame.js';

describe('CarRacingGame >', () => {
  test('참가자를 등록할 수 있다.', () => {
    expect(
      new CarRacingGame().register(['A', 'B', 'C']).players.length,
    ).toBeGreaterThan(0);
  });

  test('참가자를 등록하지 않으면 게임을 진행할 수 없다.', () => {
    expect(() => new CarRacingGame().play()).toThrow();
  });

  test('참가자를 등록하지 않으면 현재 자동차들의 위치를 알 수 없다.', () => {
    expect(() => new CarRacingGame().printCurrentPositions()).toThrow();
  });

  test('참가자를 등록하면 게임을 진행할 수 있다.', () => {
    expect(() =>
      new CarRacingGame().register(['A', 'B', 'C']).play(),
    ).not.toThrow();
  });

  test('참가자를 등록하지 않으면 우승자를 알 수 없다.', () => {
    expect(() => new CarRacingGame().printWinners()).toThrow();
  });

  test('참가자를 등록하면 현재 자동차들의 위치를 알 수 있다.', () => {
    expect(() =>
      new CarRacingGame().register(['A', 'B', 'C']).printCurrentPositions(),
    ).not.toThrow();
  });

  test('원하는 횟수만큼 게임을 진행할 수 있다.', () => {
    expect(() =>
      new CarRacingGame().register(['A', 'B', 'C']).play(5),
    ).not.toThrow();
  });

  test('게임을 한 번도 진행하지 않았다면 우승자를 알 수 없다.', () => {
    expect(() =>
      new CarRacingGame().register(['A', 'B', 'C']).printWinners(),
    ).toThrow();
  });

  test('게임을 한 번 이상 진행했다면 우승자를 알 수 있다.', () => {
    expect(() =>
      new CarRacingGame().register(['A', 'B', 'C']).play().printWinners(),
    ).not.toThrow();
  });
});
