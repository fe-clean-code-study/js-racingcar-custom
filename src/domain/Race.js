import Vehicle from '../shared/Vehicle.js';
import ArrayValidator from '../utils/validators/ArrayValidator.js';
import FunctionValidator from '../utils/validators/FunctionValidator.js';
import NumberValidator from '../utils/validators/NumberValidator.js';

class Race {
  #runners;

  static #ERROR_MESSAGES = Object.freeze({
    INVALID_RUNNERS_LENGTH: '참가자는 1명 이상이어야 합니다.',
    INVALID_RUNNER_TYPE: '참가자는 Vehicle의 인스턴스여야 합니다.',
  });

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

    return this;
  }

  sortRunners(victoryCondition) {
    FunctionValidator.from(victoryCondition);
    this.#runners.sort(victoryCondition);

    return this;
  }

  static #validateRunners(runners) {
    ArrayValidator.from(runners);
    NumberValidator.from(runners.length).greaterThan(
      0,
      this.#ERROR_MESSAGES.INVALID_RUNNERS_LENGTH,
    );
    runners.forEach((runner) => {
      FunctionValidator.from(Vehicle).hasInstance(
        runner,
        this.#ERROR_MESSAGES.INVALID_RUNNER_TYPE,
      );
    });
  }
}

export default Race;
