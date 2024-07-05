import { describe, test, expect, vi, beforeEach } from 'vitest';

import RacingGame from '../domains/racingGame/RacingGame.js';
import RacingGameController from '../domains/racingGame/RacingGameController.js';

const mockMiniGame = {
  PvC: null,
  CvC: null,
};

const mockViewer = {
  readPlayerCarNames: vi.fn().mockResolvedValue('자동차1,자동차2'),
  readBotCarNames: vi.fn().mockResolvedValue('봇1,봇2,봇3'),
  readRoundCount: vi.fn().mockResolvedValue('3'),
};

describe('RacingGameController', () => {
  let racingGame, viewer, controller;

  beforeEach(() => {
    racingGame = new RacingGame({ miniGames: { MockGame: mockMiniGame } });
    viewer = mockViewer;
    controller = new RacingGameController({ racingGame, viewer });
  });

  test('플레이어와 봇의 이름을 설정한다.', async () => {
    await controller.setupNames();

    expect(racingGame.players).toEqual(['자동차1', '자동차2']);
    expect(racingGame.cars.length).toBe(5);
  });

  test('최대 라운드를 설정한다.', async () => {
    vi.spyOn(racingGame, 'setMaxRound');
    await controller.setupMaxRound();

    expect(racingGame.maxRound).toBe(3);
  });
});
