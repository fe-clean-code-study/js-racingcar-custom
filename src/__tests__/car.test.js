import { createCar, getCarPosition, moveCar } from '../domains/car.js'
import { getRandomNum } from '../utils/getRandomNum.js'
import { validateRandomNum } from '../validations/validateRandomNum.js'

vi.mock('../utils/getRandomNum.js')
vi.mock('../validations/validateRandomNum.js')

describe('Car >', () => {
  test('자동차의 이름이 5글자 보다 길면 오류가 발생한다.', () => {
    expect(() => createCar('abcdef')).toThrow()
  })

  test('자동차의 이름으로 빈 값이 입력되면 오류가 발생한다.', () => {
    expect(() => createCar('')).toThrow()
  })

  test.each([
    { name: 'a' },
    { name: 'ab' },
    { name: 'a b' },
    { name: 'abc' },
    { name: 'a b c' },
    { name: 'abcd' },
    { name: ' abcdf' },
    { name: ' abcdf ' },
  ])(
    '자동차의 이름이 5글자 이하($name)이면 오류가 발생하지 않는다.',
    ({ name }) => {
      expect(() => createCar(name)).not.toThrow()
    }
  )

  test.each([
    { name: 'a!' },
    { name: 'ab$' },
    { name: 'ab%' },
    { name: 'abc^' },
    { name: '-' },
    { name: '*' },
  ])('자동차의 이름($name)에는 한글, 알파벳, 숫자만 포함된다.', ({ name }) => {
    expect(() => createCar(name)).toThrow()
  })

  test('자동차는 전진할 수 있다.', () => {
    const car = createCar('이름')

    getRandomNum.mockReturnValue(4)
    validateRandomNum.mockReturnValue(true)

    const movedCar = moveCar(car)

    expect(getCarPosition(movedCar)).toBe(1)
  })

  test('자동차의 초기 위치는 0 이어야 한다.', () => {
    const car = createCar('이름')

    expect(getCarPosition(car)).toBe(0)
  })
})
