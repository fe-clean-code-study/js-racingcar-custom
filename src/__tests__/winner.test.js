import { getMaxPosition, getWinners } from '../domains/Winner.js'

describe('winner >', () => {
  test('가장 높은 위치 값을 반환해야 한다.', () => {
    const cars = [
      { name: 'car1', position: 1 },
      { name: 'car2', position: 3 },
      { name: 'car3', position: 2 },
    ]

    const maxPosition = getMaxPosition(cars)
    expect(maxPosition).toBe(3)
  })

  test('가장 높은 위치에 있는 자동차의 이름을 반환해야 한다.', () => {
    const cars = [
      { name: 'car1', position: 1 },
      { name: 'car2', position: 3 },
      { name: 'car3', position: 2 },
    ]

    const winners = getWinners(cars)
    expect(winners).toEqual(['car2'])
  })

  test('가장 높은 위치에 여러 자동차가 있을 때, 그들의 이름을 모두 반환해야 한다.', () => {
    const cars = [
      { name: 'car1', position: 3 },
      { name: 'car2', position: 3 },
      { name: 'car3', position: 2 },
    ]

    const winners = getWinners(cars)
    expect(winners).toEqual(['car1', 'car2'])
  })

  test('모든 자동차가 같은 위치에 있을 때, 모든 이름을 반환해야 한다.', () => {
    const cars = [
      { name: 'car1', position: 1 },
      { name: 'car2', position: 1 },
      { name: 'car3', position: 1 },
    ]

    const winners = getWinners(cars)
    expect(winners).toEqual(['car1', 'car2', 'car3'])
  })
})
