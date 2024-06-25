import { describe, test, expect, beforeEach, vi } from "vitest";
import Game from "../domains/Game.js";

const testMaxRound = 4

describe("Game Test", () => {
    let display
    let game

    beforeEach(() => {
        display = {
            print: vi.fn(),
            printError: vi.fn()
        }

        game = new Game({
            display,
            maxRound: testMaxRound,
            config: {}
        })
    })

    test('eachRound 메소드가 rounds 에 올바르게 바인딩되어야 한다.', () => {
        game.eachRound = vi.fn()
        game.bindRounds()
        expect(game.rounds.length).toBe(testMaxRound)
        game.rounds.forEach(round => {
            round()
        })

        expect(game.eachRound).toHaveBeenCalledTimes(testMaxRound)
    })

    test('round(..) 메소드가 rounds 에 올바르게 바인딩되어야 한다.', () => {
        const play1 = vi.fn();
        const play2 = vi.fn();
        const notPlay = vi.fn()

        class ExtendedGame extends Game {
            round1() {
                play1();
            }
            round2() {
                play2();
            }
            anyMethod() {
                notPlay()
            }
        }

        const extendedGame = new ExtendedGame({
            display: display,
            maxRound: 2,
            config: {},
        });

        extendedGame.bindRounds();
        expect(extendedGame.rounds.length).toBe(2);

        extendedGame.rounds.forEach(round => {
            round()
        })

        expect(play1).toHaveBeenCalled();
        expect(play2).toHaveBeenCalled();
        expect(notPlay).not.toHaveBeenCalled();
    })

    test('play 시 setup, eachRound, finish 가 순서에 맞게 동작해야 한다.', async () => {
        game.setup = vi.fn().mockResolvedValue({})
        game.eachRound = vi.fn()
        game.finish = vi.fn()
        game.bindRounds()
        await game.play()

        expect(game.setup).toHaveBeenCalled()
        expect(game.eachRound).toHaveBeenCalledTimes(testMaxRound)
        expect(game.currentRound).toBe(testMaxRound)
        expect(game.finish).toHaveBeenCalled();

        expect(game.setup.mock.invocationCallOrder[0]).toBeLessThan(game.eachRound.mock.invocationCallOrder[0])
        expect(game.finish.mock.invocationCallOrder[0]).toBeGreaterThan(game.eachRound.mock.invocationCallOrder[0])
    })

    test('setup 도중 에러가 발생하면 다시 play 한다.', async () => {
        const setUpError = new Error('setup error')

        game.setup = vi.fn().mockImplementationOnce(() => {
            throw setUpError
        }).mockImplementationOnce(() => Promise.resolve())
        game.finish = vi.fn()

        await game.play()

        expect(display.printError).toHaveBeenCalledWith(setUpError)
        expect(game.setup).toHaveBeenCalledTimes(2)
        expect(game.finish).toHaveBeenCalledTimes(1)
    })
})
