import { describe, test, expect, beforeEach, vi, } from "vitest";
import RacingGame from "../domains/RacingGame.js";
import Car from "../domains/Car.js";
import * as randomNumberModule from "../utils/getRandomNumber.js";

const testRacingConfig = {
    min: 0,
    max: 100,
    threshold: 50
}

describe("RacingGame", () => {
    let display;
    let racingGame;

    beforeEach(() => {
        display = {
            print: vi.fn(),
            printError: vi.fn(),
            read: vi.fn().mockResolvedValue('car1,car2,car3'),
        };

        racingGame = new RacingGame({
            display: display,
            maxRound: 3,
            config: testRacingConfig,
        });
    });

    const getDisplayText = (type) => {
        return display[type === 'error' ? 'printError' : 'print'].mock.calls.map(call => call[0])[0]
    }

    test('게임에 참여하는 자동차 이름은 각각 달라야 한다.', async() => {
        display.read.mockResolvedValue('car1,car2,car1');
        expect.assertions(1);
        try {
            await racingGame.setup()
        }catch (error) {
            expect(error.message).toBe('경주할 자동차 이름은 각각 달라야 합니다.')
        }
    })


    test('게임에는 최소 2대의 자동차가 참여해야 한다.', async() => {
        display.read.mockResolvedValue('car1');
        expect.assertions(1);
        try {
            await racingGame.setup()
        }catch (error) {
            expect(error.message).toBe('최소 2대의 자동차가 참가해야 합니다.')
        }
    })


    const testCarMovement = (move) => {
        racingGame.carNames = ['car1'];
        racingGame.cars = { car1: new Car('car1') }

        const mockGetRandomNumber = vi.spyOn(randomNumberModule, 'getRandomNumber')
        mockGetRandomNumber.mockReturnValue(move ? testRacingConfig.threshold+1 : testRacingConfig.threshold)

        racingGame.cars['car1'].move = vi.fn()
        racingGame.eachRound()

        if (move) expect(racingGame.cars['car1'].move).toBeCalled()
        else expect(racingGame.cars['car1'].move).not.toBeCalled()
        mockGetRandomNumber.mockRestore()
    }


    test('자동차는 라운드에서 랜덤 숫자가 설정값보다 크면 전진한다.', () => {
        testCarMovement(true)
    })

    test('자동차는 라운드에서 랜덤 숫자가 설정값보다 작거나 같으면 움직이지 않는다', () => {
        testCarMovement(false)
    })

    test('가장 많이 움직인 자동차들이 게임에서 승리한다', () => {
        racingGame.carNames = ['car1', 'car2', 'car3'];
        racingGame.cars = {
            car1: new Car('car1'),
            car2: new Car('car2'),
            car3: new Car('car3'),
        };
        racingGame.cars['car1'].move()
        racingGame.cars['car3'].move()
        expect(racingGame.winners).toEqual(['car1', 'car3'])

        racingGame.finish();
        const winnerMessage = getDisplayText()
        expect(winnerMessage).toContain('car1');
        expect(winnerMessage).toContain('car3');
    });
})
