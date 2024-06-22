import NumberValidator from './validators/NumberValidator.js';

/**
 * 주어진 범위 내에서 랜덤 숫자를 반환하는 함수
 *
 * @param {number} num1
 * @param {number} num2
 *
 * @example
 * // 0부터 10까지의 랜덤 숫자 반환
 * getRandomNumber(0, 10);
 *
 * @example
 * // 5부터 15까지의 랜덤 숫자 반환
 * getRandomNumber(5, 15);
 */
function getRandomNumber(num1, num2) {
  let random;

  NumberValidator.from(num1).lessThanOrEqual(num2);
  NumberValidator.from(num2);

  random = Math.floor(Math.random() * (num2 - num1 + 1)) + num1;
  return parseInt(random);
}

export default getRandomNumber;
