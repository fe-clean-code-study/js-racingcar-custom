export default class Rule {
  #rules;

  constructor(rules) {
    this.#initRules(rules);
  }

  #initRules(rules) {
    if (rules === undefined) {
      this.#rules = {};
      return;
    }

    const ruleKeys = Object.keys(rules);

    for (const key of ruleKeys) {
      const keyError = Rule.getKeyError(key);
      const valueError = Rule.getValueError(rules[key]);

      if (keyError !== undefined || valueError !== undefined) {
        throw new Error(keyError && valueError);
      }

      this.#definePropertyRule(rules, key);
    }

    this.#rules = rules;
  }

  #definePropertyRule(obj, key) {
    let _value = obj[key];

    Object.defineProperty(obj, key, {
      get() {
        return _value;
      },
      set(value) {
        const keyError = Rule.getKeyError(key);
        const valueError = Rule.getValueError(value);

        if (keyError !== undefined || valueError !== undefined) {
          throw new Error(keyError && valueError);
        }

        _value = value;
      },
    });
  }

  getKeys() {
    return Object.keys(this.#rules);
  }

  run() {
    const rules = Object.values(this.#rules);

    return rules.every((rule) => rule() === true);
  }

  change(key, value) {
    if (this.isExist(key) === false) {
      throw new Error('해당 이름의 룰이 존재하지 않습니다.');
    }

    this.#rules[key] = value;
  }

  add(key, value) {
    if (this.isExist(key)) {
      throw new Error('이미 같은 이름의 룰이 존재합니다.');
    }

    const nextRule = { ...this.#rules };
    nextRule[key] = value;

    this.#initRules(nextRule);
  }

  remove(removeKey) {
    const ruleKeys = Object.keys(this.#rules);
    const nextRules = {};

    for (const key of ruleKeys) {
      if (removeKey === key) {
        continue;
      }

      nextRules[key] = this.#rules[key];
    }

    this.#initRules(nextRules);
  }

  removeAll() {
    this.#rules = {};
  }

  isExist(key) {
    return this.#rules[key] === undefined ? false : true;
  }

  static getRulesError(rules) {
    if (typeof rules !== 'object') {
      return '룰은 객체여야 합니다.';
    }

    const keys = Object.keys(rules);
    const values = Object.values(rules);
    const length = keys.length;

    if (length < 1 || 10 < length) {
      return '룰은 1 ~ 10 개여야 합니다.';
    }

    if (keys.some((key) => Rule.getKeyError(key) !== undefined)) {
      return '룰의 키는 문자열이어야 합니다.';
    }

    if (values.some((value) => Rule.getValueError(value) !== undefined)) {
      return '룰의 값은 불리언을 반환하는 함수여야 합니다.';
    }

    return undefined;
  }

  static getKeyError(key) {
    if (typeof key !== 'string') {
      return '룰의 키는 문자열이어야 합니다.';
    }

    return undefined;
  }

  static getValueError(value) {
    if (typeof value !== 'function') {
      return '룰의 값은 함수 타입이어야 합니다.';
    }

    if (typeof value() !== 'boolean') {
      return '룰의 반환값은 불리언 타입이어야 합니다.';
    }

    return undefined;
  }
}
