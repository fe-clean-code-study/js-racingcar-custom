import { describe, expect, test } from 'vitest';
import Rule from '../model/Rule';
import gameSupport from '../utils/gameSupport';

describe('Rule 클래스에 대한 단위 테스트', () => {
  const truthyRules = {
    rule1: () => {
      return true;
    },
    rule2: () => {
      return true;
    },
  };
  const halfTruthyRules = {
    rule1: () => {
      return true;
    },
    rule2: () => {
      return false;
    },
  };
  test('Rule 의 생성자 매개변수론 boolean 값을 반환하는 함수를 값으로 가지는 객체를 전달해야 한다.', () => {
    expect(() => {
      createCorrectRule();
    }).not.toThrow();
  });

  test('Rule 의 생성자 생성자 매개변수로 boolean 값을 반환하는 함수 값을 가진 객체 외의 값을 전달하는 경우 에러를 반환한다.', () => {
    expect(() => {
      createUncorrectRule();
    }).toThrow();
  });

  test('getKeys 메서드는 현재 룰의 모든 키값을 반환한다.', () => {
    const rule = new Rule({ ...truthyRules });
    const keys = Object.keys(truthyRules);
    const isSameKey = rule.getKeys().every((key) => keys.includes(key));

    expect(isSameKey).toBeTruthy();
  });

  test('run 메서드는 모든 규칙이 true 를 반환하는 경우 true 를 반환한다.', () => {
    const rule = new Rule({ ...truthyRules });

    expect(rule.run()).toBeTruthy();
  });

  test('run 메서드는 하나라도 규칙 실행의 결과가 true 가 아닐 경우 false 를 반환한다.', () => {
    const rule = new Rule({ ...halfTruthyRules });

    expect(rule.run()).toBeFalsy();
  });

  test('change 메서드는 룰에 없는 키 값을 바꾸려고 하는 경우 에러를 반환한다.', () => {
    const rule = new Rule({ ...halfTruthyRules });

    expect(() => {
      rule.change('rule3', () => {
        return false;
      });
    }).toThrow();
  });

  test('change 메서드는 룰에 있는 키 값을 전달할 경우 전달한 value 값으로 객체 값을 바꾼다.', () => {
    const rule = new Rule({ ...halfTruthyRules });
    rule.change('rule2', () => {
      return true;
    });

    expect(rule.run()).toBe(true);
  });

  test('change 메서드에 boolean 값을 반환하는 함수가 아닌, 다른 값을 전달하면 에러를 반환한다.', () => {
    const rule = new Rule({ ...halfTruthyRules });

    expect(() => {
      rule.change('rule2', () => {
        return 3;
      });
    }).toThrow();
  });

  test('add 메서드에 이미 존재하는 키를 추가하려고 하면 에러를 반환한다.', () => {
    const rule = new Rule({ ...truthyRules });

    expect(() => {
      rule.add('rule1', () => {
        return true;
      });
    }).toThrow();
  });

  test('add 메서드로 룰 객체에 없는 키를 추가하면 해당 프로퍼티를 추가한다.', () => {
    const rule = new Rule({ ...truthyRules });
    rule.add('rule3', () => {
      return true;
    });

    expect(rule.run()).toBeTruthy();
  });

  test('add 메서드에 불리언 값을 반환하는 함수가 아닌 다른 타입을 전달하면 에러를 반환한다.', () => {
    const rule = new Rule({ ...truthyRules });

    expect(() => {
      rule.add('rule3', () => {
        return undefined;
      });
    }).toThrow();
  });

  test('remove 메서드는 매개변수로 전달한 key 값을 없앤다.', () => {
    const rule = new Rule({ ...truthyRules });
    rule.remove('rule1');

    expect(rule.isExist('rule')).toBeFalsy();
  });

  test('removeAll 메서드는 rules 프로퍼티를 모두 삭제한다.', () => {
    const rule = new Rule({ ...truthyRules });
    const keys = rule.getKeys();
    rule.removeAll();

    expect(keys.every((key) => rule.isExist(key) === false)).toBeTruthy();
  });

  test('isExistKey 메서드에 이미 존재하는 키를 매개변수로 전달하면 true를 반환한다.', () => {
    const rule = new Rule({ ...truthyRules });

    expect(rule.isExist('rule1')).toBeTruthy();
  });

  test('isExistKey 메서드에 존재하지 않는 키를 매개변수로 전달하면 false를 반환한다.', () => {
    const rule = new Rule({ ...truthyRules });

    expect(rule.isExist('rule3')).toBeFalsy();
  });
});

function createCorrectRule() {
  const rule = new Rule({
    dice: () => {
      return gameSupport.dice(0, 10) >= 4;
    },
  });

  return rule;
}

function createUncorrectRule() {
  const uncorrectRules = [
    undefined,
    null,
    1,
    {
      a: () => {
        return 1;
      },
    },
  ];
  const rules = uncorrectRules.map((rule) => new Rule(rule));

  return rules;
}
