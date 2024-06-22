import Vehicle from '../shared/Vehicle.js';
import ArrayValidator from '../utils/validators/ArrayValidator.js';
import FunctionValidator from '../utils/validators/FunctionValidator.js';
import NumberValidator from '../utils/validators/NumberValidator.js';

class Race {
  #runners;

  constructor(runners) {
    Race.#validateRunners(runners);
    this.#runners = runners;
  }

  get runners() {
    return this.#runners;
  }

  moveRunners(moveCondition) {
    FunctionValidator.from(moveCondition);

    this.#runners.forEach((runner) => {
      if (moveCondition(runner)) {
        runner.move();
      }
    });
  }

  sortRunners(victoryCondition) {
    FunctionValidator.from(victoryCondition);

    return this.#runners.sort(victoryCondition);
  }

  static #validateRunners(runners) {
    ArrayValidator.from(runners);
    NumberValidator.from(runners.length).greaterThan(0);
    runners.forEach((runner) => {
      FunctionValidator.from(Vehicle).hasInstance(runner);
    });
  }
}

export default Race;
