export const rockPaperScissorsValidations = [
  {
    check: (input) => [1, 2, 3].includes(Number(input)),
    errorMessage: '가위바위보 입력값은 1,2,3 중 하나여야 합니다.',
  },
]

export const guessRandomNumberValidations = [
  {
    check: (input) => Number(input) >= 1 && Number(input) <= 10 && Number.isInteger(Number(input)),
    errorMessage: '1 부터 10 까지의 자연수만 가능합니다.',
  },
]
