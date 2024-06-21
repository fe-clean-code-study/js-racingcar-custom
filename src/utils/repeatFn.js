import { ERROR_MESSAGES } from '../constants/errorMessages.js';

/**
 * 콜백 함수를 전달된 횟수만큼 반복 실행
 *
 * @param {function} fn - 반복 실행할 콜백 함수
 * @param {number} times - 반복 횟수
 *
 * @example
 * // 0부터 10까지의 랜덤 숫자 반환
 * getRandomNumber(10);
 *
 * @example
 * // 5부터 15까지의 랜덤 숫자 반환
 * getRandomNumber(5, 15);
 */
function repeatFn(fn, times = 1) {
  if (typeof fn !== 'function') {
    throw new Error(ERROR_MESSAGES.INVALID_FUNCTION);
  }

  if (typeof times !== 'number') {
    throw new Error(ERROR_MESSAGES.INVALID_NUMBER);
  }

  if (times < 1) {
    throw new Error(ERROR_MESSAGES.INVALID_TIMES_RANGE);
  }

  for (let i = 0; i < times; i++) {
    fn();
  }
}

export default repeatFn;
