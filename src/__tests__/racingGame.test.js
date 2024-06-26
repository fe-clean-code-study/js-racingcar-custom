import { describe, test, expect, beforeEach, vi } from 'vitest'
import RacingGame from '../domains/RacingGame.js'
import Car from '../domains/Car.js'
import * as randomNumberModule from '../utils/getRandomNumber.js'
import { racingValidations } from '../validations/racing.js'

const testRacingConfig = {
  min: 0,
  max: 100,
  threshold: 50,
}

describe('RacingGame Test', () => {
  let display
  let racingGame

  beforeEach(() => {
    display = {
      print: vi.fn(),
      printError: vi.fn(),
      read: vi.fn(),
    }

    racingGame = new RacingGame({
      display: display,
      maxRound: 3,
      config: testRacingConfig,
    })
  })

  // 출력된 문자열을 확인하기 위해 display 호출의 매개변수를 가져오는 함수
  const getDisplayText = type => {
    return display[type === 'error' ? 'printError' : 'print'].mock.calls.map(
      call => call[0]
    )[0]
  }

  test('게임에 참여하는 자동차 이름은 각각 달라야 한다.', async () => {
    // display.read 에서 겹치는 자동차 입력값을 읽어온 것으로 모킹
    display.read.mockResolvedValue('car1,car2,car1')

    // matcher 가 1번은 실행되야 함 (toBe 메소드가 실행되어야 함 = 에러 발생해야 함)
    expect.assertions(1)
    try {
      await racingGame.setup()
    } catch (error) {
      // 에러 메시지 확인
      expect(error.message).toBe(racingValidations.uniqueCarName.errorMessage)
    }
  })

  test('게임에는 최소 2대의 자동차가 참여해야 한다.', async () => {
    // display.read 에서 1대 자동차를 읽어온 것으로 모킹
    display.read.mockResolvedValue('car1')

    expect.assertions(1)
    try {
      await racingGame.setup()
    } catch (error) {
      expect(error.message).toBe(racingValidations.leastCarCount.errorMessage)
    }
  })

  const testCarMovement = move => {
    racingGame.carNames = ['car1']
    racingGame.cars = { car1: new Car('car1') }

    // getRandomNumber 에서 설정한 가짜 값을 반환하도록 spyOn 호출
    const mockGetRandomNumber = vi.spyOn(randomNumberModule, 'getRandomNumber')

    // 기준치 초과, 또는 기준치 이하를 반환하도록 하여 테스트
    mockGetRandomNumber.mockReturnValue(
      move ? testRacingConfig.threshold + 1 : testRacingConfig.threshold
    )
    // move 함수 모킹
    racingGame.cars['car1'].move = vi.fn()
    racingGame.eachRound()

    if (move) expect(racingGame.cars['car1'].move).toBeCalled() // '전진한다' 테스트
    else expect(racingGame.cars['car1'].move).not.toBeCalled()  // '움직이지 않는다' 테스트
    mockGetRandomNumber.mockRestore()
  }

  test('자동차는 라운드에서 랜덤 숫자가 설정값보다 크면 전진한다.', () => {
    // getRandomNumber 가 기준치 초과해서 반환했을 때의 테스트 작동
    testCarMovement(true)
  })

  test('자동차는 라운드에서 랜덤 숫자가 설정값보다 작거나 같으면 움직이지 않는다', () => {
    // getRandomNumber 가 기준치 이하을 반환했을 때의 테스트 작동
    testCarMovement(false)
  })

  test('가장 많이 움직인 자동차들이 게임에서 승리한다', () => {
    racingGame.carNames = ['car1', 'car2', 'car3']
    racingGame.cars = {
      car1: new Car('car1'),
      car2: new Car('car2'),
      car3: new Car('car3'),
    }

    // 1,3 번 자동차만 이동
    racingGame.cars['car1'].move()
    racingGame.cars['car3'].move()

    // winner 확인
    expect(racingGame.winners).toEqual(['car1', 'car3'])

    racingGame.finish()
    const winnerMessage = getDisplayText()

    // 우승자 출력 확인
    expect(winnerMessage).toContain('car1')
    expect(winnerMessage).toContain('car3')
  })
})
