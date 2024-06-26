import { RACER_TYPE } from '../constant/racerType.js';
import { Car } from '../model/Car.js';

export class RacerFactory {
  static createRacer(type, args) {
    switch (type) {
      case RACER_TYPE.CAR:
        return new Car(args);
      default:
        throw new Error('Unknown type');
    }
  }
}
