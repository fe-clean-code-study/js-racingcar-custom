import { getRandomNum } from '../utils/getRandomNum.js'
import { validateCarName } from '../validations/validateCarName.js'
import { validateRandomNum } from '../validations/validateRandomNum.js'

export const createCar = (name) => {
  validateCarName(name)

  return {
    name,
    position: 0,
  }
}

export const moveCar = (car) => {
  let randomNum = getRandomNum()

  if (validateRandomNum(randomNum)) {
    return { ...car, position: car.position + 1 }
  } else {
    return car
  }
}

// export const getPosition = (car) => car.position
