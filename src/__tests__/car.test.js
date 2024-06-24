import { createCar, getPosition, moveCar } from '../domain/car'

describe('Car >', () => {
  test('자동차의 이름이 5글자보다 길면 오류가 발생한다.', () => {
    expect(() => createCar('123456')).toThrow()
  })

  test.each([
    { name: '' },
    { name: '1' },
    { name: '12' },
    { name: '1 2' },
    { name: '123' },
    { name: '1 2 3' },
    { name: '1234' },
    { name: '12345' },
    { name: ' 12345 ' },
  ])(
    '자동차의 이름이 5글자 이하($name)이면 오류가 발생하지 않는다.',
    ({ name }) => {
      expect(() => createCar(name)).not.toThrow()
    }
  )

  test('자동차는 전진할 수 있다.', () => {
    const car = createCar('이름')

    const movedCar = moveCar(car)

    expect(getPosition(movedCar)).toBe(1)
  })
})
