import { describe, test, expect } from 'vitest'
import Car from '../domains/Car.js'
import { carValidations } from '../validations/car.js'

const spacedCarNameCases = ['  ab', 'a   b', '  ab  ', 'a b ']
const invalidCarNameCases = ['', 'abcdef', '    ']

describe('Car Test', () => {
  test.each(invalidCarNameCases)(
    '자동차 이름은 공백 제외 1자 이상 5자 이하여야 한다.',
    name => {
      expect(() => new Car(name)).toThrow(
        carValidations.carNameLength.errorMessage
      )
    }
  )

  test.each(spacedCarNameCases)(
    '생성된 자동차 이름에는 공백이 없어야 한다.',
    name => {
      const car = new Car(name)
      expect(car.name).toBe('ab')
    }
  )

  test('생성된 자동차의 위치는 0으로 초기화되어야 한다.', () => {
    const car = new Car('car')
    expect(car.position).toBe(0)
  })

  test('move 시 자동차의 위치가 1 증가해야 한다.', () => {
    const car = new Car('car')
    car.move()
    expect(car.position).toBe(1)
  })
})
