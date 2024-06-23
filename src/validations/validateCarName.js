const MAX_NAME_SIZE = 5

export const validateCarName = (name) => {
  if (name.trim().length > MAX_NAME_SIZE) {
    throw new Error('자동차의 이름은 5글자 이하여야 합니다.')
  }
}
