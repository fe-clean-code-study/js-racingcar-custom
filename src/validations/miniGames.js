export const rockPaperScissorsValidations = [
  {
    check: (input) => [1, 2, 3].includes(Number(input)),
    errorMessage: '가위바위보 입력값은 1,2,3 중 하나여야 합니다.',
  },
]