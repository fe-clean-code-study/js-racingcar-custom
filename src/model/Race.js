import isSubClass from '../utils/isSubClass.js';
import Rule from './Rule.js';
import RacerClass from './Racer.js';

export default class Race {
  _Racer;
  _round;
  #rule;
  #racers;

  constructor({ Racer, rules, names, round, onProceed }) {
    this.Racer = Racer;
    this.round = round;
    this.#rule = new Rule(rules);
    this.#racers = this.#makeRacers(names);
    this.onProceed = onProceed;
  }

  #makeRacers(names) {
    const error = Race.getNamesError(names);

    if (error !== undefined) {
      throw new Error(error);
    }

    return (names = names
      .split(',')
      .map((name) => name.trim())
      .map((name) => new this.Racer({ name })));
  }

  get round() {
    return this._round;
  }

  get Racer() {
    return this._Racer;
  }

  set round(round) {
    const error = Race.getRoundError(round);

    if (error !== undefined) {
      throw new Error(error);
    }

    this._round = round;
  }

  set Racer(Racer) {
    const error = Race.getRacerError(Racer);

    if (error !== undefined) {
      throw new Error(error);
    }

    this._Racer = Racer;
  }

  getRacerStatus(name) {
    if (name === undefined) {
      return this.#racers.map((racer) => ({
        name: racer.name,
        position: racer.position,
      }));
    }

    const targetRacer = this.#racers.find((racer) => racer.name === name);

    return {
      name: targetRacer.name,
      position: targetRacer.position,
    };
  }

  startRace() {
    for (let currentRound = 0; currentRound < this.round; currentRound++) {
      this.#proceedRound();
      if (this.onProceed && typeof this.onProceed === 'function') {
        this.onProceed();
      }
    }

    const racers = this.getRacerStatus();
    const maxPosition = Math.max(...racers.map((racer) => racer.position));

    return racers
      .filter((racer) => racer.position === maxPosition)
      .map((racer) => racer.name);
  }

  #proceedRound() {
    this.#racers.forEach((racer) => {
      this.#rule.run() && racer.move();
    });
  }

  static getRacerError(Racer) {
    if (isSubClass(Racer, RacerClass) === false) {
      return '인자로받는 Racer 프로퍼티는 Racer 클래스의 서브 클래스여야 합니다.';
    }
    return undefined;
  }

  static getRoundError(round) {
    round = Number(round);

    if (isNaN(round) === true) {
      return '라운드가 숫자 형태가 아닙니다.';
    }

    if (round < 1 || round > 10) {
      return '라운드는 1 ~ 10 사이여야 합니다.';
    }

    return undefined;
  }

  static getNamesError(names) {
    if (typeof names !== 'string') {
      return '이름은 , 로 분리된 문자열 형태로 입력해야 합니다.';
    }

    const namesArr = names.split(',');

    if (namesArr.length < 1 || namesArr.length > 10) {
      return '레이서의 개수는 1 ~ 10 개여야 합니다';
    }

    if (
      namesArr.some((carName) => {
        carName = carName.trim();

        return carName.length < 1 || carName.length > 10 ? true : false;
      })
    ) {
      return '이름은 1 글자 이상, 10글자 미만의 문자열이어야 합니다.';
    }

    return undefined;
  }
}
