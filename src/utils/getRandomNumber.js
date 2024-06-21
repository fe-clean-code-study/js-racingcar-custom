/**
 * 주어진 범위 내에서 랜덤 숫자를 반환하는 함수
 *
 * @param {number} num1 - num1만 전달된 경우 0부터 num1 중 랜덤 값을 반환
 * @param {number} [num2] - (선택적) 전달된 경우 num1부터 num2 중 랜덤 값을 반환
 *
 * @example
 * // 0부터 10까지의 랜덤 숫자 반환
 * getRandomNumber(10);
 *
 * @example
 * // 5부터 15까지의 랜덤 숫자 반환
 * getRandomNumber(5, 15);
 */
function getRandomNumber(num1, num2) {
  let random;

  if (
    typeof num1 !== 'number' ||
    (typeof num2 !== 'undefined' && typeof num2 !== 'number')
  ) {
    throw new Error('숫자를 전달해야 합니다.');
  }

  if (num1 > num2) {
    throw new Error('첫 번째 인자가 두 번째 인자보다 작거나 같아야 합니다.');
  }

  if (typeof num2 !== 'undefined') {
    random = Math.floor(Math.random() * (num2 - num1 + 1)) + num1;
    return parseInt(random);
  }

  if (num1 < 0) {
    random = Math.ceil(Math.random() * (num1 - 1));
    return parseInt(random);
  }

  random = Math.floor(Math.random() * (num1 + 1));
  return parseInt(random);
}

export default getRandomNumber;
