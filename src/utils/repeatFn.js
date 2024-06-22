import FunctionValidator from './validators/FunctionValidator.js';
import NumberValidator from './validators/NumberValidator.js';

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
  FunctionValidator.from(fn);
  NumberValidator.from(times).greaterThan(0);
  NumberValidator.from(times % 1).sameAs(0);

  for (let i = 0; i < times; i++) {
    fn();
  }
}

export default repeatFn;
