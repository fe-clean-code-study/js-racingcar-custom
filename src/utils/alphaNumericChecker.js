export const validateAlphaNumeric = (input) => {
  const alphaNumericRegex = /^[a-zA-Z0-9가-힣\s]+$/

  if (!alphaNumericRegex.test(input)) {
    throw new Error(
      '자동차 이름은 알파벳, 한글, 숫자로만 이루어져 있어야 합니다.'
    )
  }
}
