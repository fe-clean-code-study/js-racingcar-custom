import { describe, test, expect, beforeEach, vi } from 'vitest';
import RacingGame from '../domains/racingGame/RacingGame.js';
import { racingValidations } from '../validations/racing.js';

const mockMiniGame = {
  PvC: vi.fn().mockResolvedValue({ score: 1, log: { player: 1, computer: 0, result: 'win' } }),
  CvC: vi.fn().mockResolvedValue({ score: 2, log: { player: 1, computer: 0, result: 'win' } }),
};

describe('RacingGame', () => {
  let game;

  beforeEach(() => {
    game = new RacingGame({ miniGames: { MockGame: mockMiniGame } });
  });

  test('최대 라운드를 설정할 수 있다.', () => {
    game.setMaxRound(3);
    expect(game.maxRound).toBe(3);
  });

  test('자동차를 생성할 수 있다.', () => {
    game.setCars(['자동차1'], ['자동차2']);
    expect(game.cars).toHaveLength(2);
    expect(game.cars[0].name).toBe('자동차1');
    expect(game.cars[1].name).toBe('자동차2');
  });

  test('유효하지 않은 자동차에 대해 오류를 발생시킨다.', () => {
    expect(() => game.setCars(['자동차1', '자동차1'], [])).toThrow(racingValidations.uniqueCarName.errorMessage);
    expect(() => game.setCars([], [])).toThrow(racingValidations.leastCarCount.errorMessage);
  });

  test('유효하지 않은 최대 라운드 값에 대해 오류를 발생시킨다.', () => {
    expect(() => game.setMaxRound('문자열')).toThrow(racingValidations.maxRoundNumber.errorMessage);
    expect(() => game.setMaxRound(6)).toThrow(racingValidations.maxRoundRange.errorMessage);
  });

  test('유효하지 않은 미니게임 함수에 대해 오류를 발생시킨다.', () => {
    const invalidMiniGame = {
      CvC: vi.fn().mockResolvedValue({ score: 1, log: { player: 1, computer: 0 } }),
    };
    expect(() => new RacingGame({ miniGames: { MockGame: invalidMiniGame } })).toThrow(
      racingValidations.miniGameInterface.errorMessage,
    );
  });

  test('유효하지 않은 미니게임 결과에 대해 오류를 발생시킨다.', async () => {
    const invalidMiniGame = {
      PvC: vi.fn().mockResolvedValue({ score: 1, log: { hello: 'hello' } }),
      CvC: vi.fn().mockReturnValue({ score: 1, win: true }),
    };
    const racingGame = new RacingGame({
      miniGames: { MockGame: invalidMiniGame },
    });
    racingGame.setCars([], ['자동차1', '자동차2']);

    try {
      await racingGame.doRound();
    } catch (error) {
      expect(error.message).toBe(racingValidations.miniGameResult.errorMessage);
    }
  });

  test('우승자를 올바르게 계산할 수 있다.', async () => {
    game.setCars(['자동차1'], ['자동차2']);
    await game.doRound();

    expect(game.winners).toEqual(['자동차1', '자동차2']);
  });

  test('점수를 올바르게 저장하고 계산할 수 있다.', async () => {
    game.setCars(['자동차1'], ['자동차2']);

    await game.doRound();
    await game.doRound();

    expect(game.lastResult.positions).toEqual({
      자동차1: 2,
      자동차2: 4,
    });
    expect(game.maxPosition).toBe(4);
  });

  test('라운드 종료 후 이벤트가 발생한다..', async () => {
    const roundEndSpy = vi.spyOn(game, 'emitEvent');

    game.setCars(['자동차1'], ['자동차2']);
    await game.doRound();

    expect(roundEndSpy).toHaveBeenCalledWith('roundEnd');
  });
});
