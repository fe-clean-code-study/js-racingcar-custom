import { describe, test, expect, beforeEach, vi } from 'vitest'
import Game from '../domains/Game.js'

const testMaxRound = 4

describe('Game Test', () => {
  let display
  let game

  beforeEach(() => {
    display = {
      print: vi.fn(),
      printError: vi.fn(),
    }

    game = new Game({
      display,
      maxRound: testMaxRound,
      config: {},
    })
  })

  test('eachRound 메소드가 rounds 에 올바르게 바인딩되어야 한다.', () => {
    // eachRound 모킹
    game.eachRound = vi.fn()

    // rounds 배열에 바인딩
    game.bindRounds()

    // 설정한 라운드 수 만큼 배열에 들어갔는지 + 실행되었는지 확인
    expect(game.rounds.length).toBe(testMaxRound)
    game.rounds.forEach(round => {
      round()
    })
    expect(game.eachRound).toHaveBeenCalledTimes(testMaxRound)
  })

  test('round(..) 메소드가 rounds 에 올바르게 바인딩되어야 한다.', () => {
    // mock 함수 생성
    const play1 = vi.fn()
    const play2 = vi.fn()
    const notPlay = vi.fn()

    // round 함수 방식의 게임 생성
    class ExtendedGame extends Game {
      round1() {
        play1()
      }
      round2() {
        play2()
      }
      anyMethod() {
        notPlay()
      }
    }
    const extendedGame = new ExtendedGame({
      display,
      maxRound: 2,
      config: {},
    })

    // rounds 배열 에 바인딩
    extendedGame.bindRounds()

    // rounds 배열에 [round1(), round2()] 있는지 비교
    expect(extendedGame.rounds.length).toBe(2)

    extendedGame.rounds.forEach(round => {
      round()
    })

    // round1,2 함수 안에서 실행했던 mock 함수의 호출 확인 (round1,2 함수가 제대로 실행되었는가)
    expect(play1).toHaveBeenCalled()
    expect(play2).toHaveBeenCalled()
    expect(notPlay).not.toHaveBeenCalled()
  })

  test('play 시 setup, eachRound, finish 가 순서에 맞게 동작해야 한다.', async () => {
    // setup, eachRound, finish 모킹
    game.setup = vi.fn()
    game.eachRound = vi.fn()
    game.finish = vi.fn()

    game.bindRounds()
    await game.play()

    // setup, eachRound, finish 호출 확인
    expect(game.setup).toHaveBeenCalled()
    expect(game.eachRound).toHaveBeenCalledTimes(testMaxRound)
    expect(game.finish).toHaveBeenCalled()

    // currentRound 변경 확인
    expect(game.currentRound).toBe(testMaxRound)

    // setup - eachRound - finish 순서로 호출되었는지 확인
    expect(game.setup.mock.invocationCallOrder[0]).toBeLessThan(
      game.eachRound.mock.invocationCallOrder[0]
    )
    expect(game.finish.mock.invocationCallOrder[0]).toBeGreaterThan(
      game.eachRound.mock.invocationCallOrder[0]
    )
  })

  test('setup 도중 에러가 발생하면 다시 play 한다.', async () => {
    const setUpError = new Error('setup error')

    // setup 모킹 / 첫번째 호출 시에는 에러, 두번째 호출 시에는 성공
    game.setup = vi
      .fn()
      .mockImplementationOnce(() => {
        throw setUpError
      })
      .mockImplementationOnce(() => Promise.resolve())

    game.finish = vi.fn()
    await game.play()

    // 에러 출력 여부 확인 / 다시 play 되었는지 확인
    expect(display.printError).toHaveBeenCalledWith(setUpError)
    expect(game.setup).toHaveBeenCalledTimes(2)
    expect(game.finish).toHaveBeenCalledTimes(1)
  })
})
