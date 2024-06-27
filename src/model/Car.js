class Car {
  constructor(name) {
    name = name.trim();

    this._name = name;
    this._position = 0;
  }

  /**
   * @param {string} name
   */
  set name(name) {
    Car.validateName(name);
    this._name = name;
  }

  /**
   * @param {number} position
   */
  set position(position) {
    Car.validatePosition(position);
    this._position = position;
  }

  get name() {
    return this._name;
  }

  get position() {
    return this._position;
  }

  move(distance = 1, rules) {
    if (rules && Array.isArray(rules)) {
      if (rules.some((rule) => rule() === false)) {
        return false;
      }
    }

    this.position = this.position + distance;

    return true;
  }

  static validateName(name) {
    if (typeof name !== 'string') {
      throw new Error('자동자 이름은 문자열이어야 합니다.');
    }

    if (name.length < 1 || name.length > 5) {
      throw new Error('자동차 이름은 1 ~ 5 글자로 이뤄져야 합니다.');
    }
  }

  static validatePosition(position) {
    if (typeof position !== 'number') {
      throw new Error('자동차의 위치는 숫자 형태여야 합니다.');
    }
  }
}

export default Car;
