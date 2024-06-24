import { validateAlphaNumeric } from '../utils/alphaNumericChecker.js'

const MAX_NAME_SIZE = 5
const MIN_NAME_SIZE = 0

export const validateCarName = (name) => {
  validateAlphaNumeric(name)

  if (name.trim().length > MAX_NAME_SIZE) {
    throw new Error('자동차의 이름은 5글자 이하여야 합니다.')
  }

  if (name.trim().length === MIN_NAME_SIZE) {
    throw new Error('자동차의 이름은 1글자 이상이어야 합니다.')
  }
}
