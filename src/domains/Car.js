import { validateCarName } from '../validations/validateCarName.js'

const NAME_SIZE = 5

export const createCar = (name) => {
  validateCarName(name)

  return {
    name,
    position: 0,
  }
}

export const moveCar = (car) => ({
  ...car,
  position: car.position + 1,
})

export const getPosition = (car) => car.position
