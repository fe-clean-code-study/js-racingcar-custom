export default class Racer {
  _name;
  _position;

  constructor({ name, position }) {
    name = name.trim();

    this.name = name;
    this.position = position;
  }

  set name(name) {
    const error = Racer.getNameError(name);

    if (error !== undefined) {
      throw new Error(error);
    }

    this._name = name;
  }

  set position(position) {
    const error = Racer.getPositionError(position);

    if (error !== undefined) {
      throw new Error(error);
    }

    this._position = position;
  }

  get name() {
    return this._name;
  }

  get position() {
    return this._position;
  }

  init() {
    this._position = 0;
  }

  move(distance = 1) {
    this.position = this.position + distance;

    return this.position;
  }

  static getNameError(name) {
    if (typeof name !== 'string') {
      return '레이서들의 이름은 문자열이어야 합니다.';
    }

    if (name.length < 1 || name.length > 5) {
      return '레이서들의 이름은 1 ~ 5 글자로 이뤄져야 합니다.';
    }

    return undefined;
  }

  static getPositionError(position) {
    if (typeof position !== 'number') {
      return '레이서들의 위치는 숫자 형태여야 합니다.';
    }

    return undefined;
  }
}
