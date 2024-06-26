import { getRandomNumber } from '../util/random.js';
import { validateName } from '../util/validate.js';
import { Vehicle } from './Vehicle.js';

export class Car extends Vehicle {
  static MIN_NAME_LENGTH = 1;
  static MAX_NAME_LENGTH = 5;

  constructor({ name, position }) {
    if (
      !validateName({
        name,
        minLength: Car.MIN_NAME_LENGTH,
        maxLength: Car.MAX_NAME_LENGTH,
      })
    )
      throw new Error(
        `자동차의 이름은 ${Car.MIN_NAME_LENGTH}자 이상 ${Car.MAX_NAME_LENGTH}자 이하의 문자열만 가능합니다.`
      );

    super({ name, position });
  }

  move() {
    const randomNumber = getRandomNumber(0, 9);

    if (randomNumber >= 4) {
      super.move();
    }
  }
}
