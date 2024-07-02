import Racer from './Racer.js';

class Car extends Racer {
  constructor({ name, position = 0 }) {
    super({ name, position });
  }
}

export default Car;
