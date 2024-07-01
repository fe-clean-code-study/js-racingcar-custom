import Racer from './Racer';

export default class Animal extends Racer {
  _sound;

  constructor({ name, position = 0, sound }) {
    super({ name, position });
    this.sound = sound;
  }

  get sound() {
    return this._sound;
  }

  set sound(sound) {
    const soundError = Animal.getSoundError(sound);

    if (soundError !== undefined) {
      throw new Error(soundError);
    }

    this._sound = sound;
  }

  static getSoundError(sound) {
    if (typeof sound !== 'string') {
      return 'sound 는 문자열 타입이어야 합니다.';
    }

    return undefined;
  }
}
