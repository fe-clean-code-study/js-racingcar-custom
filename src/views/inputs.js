import readLineAsync from './readLineAsync.js'

export const inputCarNames = async () => {
  const names = await readLineAsync(
    '경주할 자동차 이름을 입력하세요! (이름은 쉼표(,)를 기준으로 구분해 주세요!) > '
  )

  return names.split(',').map((name) => name.trim())
}
