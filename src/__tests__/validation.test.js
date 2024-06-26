import { describe, test, expect } from 'vitest';
import validation from '../utils/validation';

describe('라운드 배열 유효성 검사', () => {
  test.each([
    {
      rounds: 1,
    },
    { rounds: function () {} },
    { rounds: null },
  ])('라운드 배열($rounds)이 배열이 아니면 오류가 발생한다.', ({ rounds }) => {
    expect(() => {
      validation.isValidateRounds(rounds);
    });
  });
});

describe('라운드 유효성 검사', () => {
  test('라운드가 숫자 형태가 아니면 오류가 발생한다.', () => {
    expect(() => {
      validation.isValidateRound('1');
    }).toThrow();
  }),
    test('라운드가 1 미만이면 에러가 발생한다.', () => {
      expect(() => {
        validation.isValidateRound(0);
      }).toThrow();
    }),
    test('라운드가 50을 초과하면 에러가 발생한다.', () => {
      expect(() => {
        validation.isValidateRound(51);
      }).toThrow();
    });
  test.each([
    {
      round: 1,
    },
    { round: 50 },
  ])(
    '라운드($round)가 1 이상 50 이하의 숫자면 에러를 발생하지 않는다.',
    ({ round }) => {
      expect(validation.isValidateRound(round)).toBe(true);
    }
  );
});

describe('자동차 배열 유효성 검사', () => {
  test('중복되는 이름이 있으면 에러가 발생한다.', () => {
    expect(() => {
      validation.isValidateCars(['1', '  1  ']);
    }).toThrow();
  }),
    test('자동차 이름이 2개 미만이면 에러가 발생한다.', () => {
      expect(() => {
        validation.isValidateCars(['suyeon']);
      }).toThrow();
    }),
    test('자동차 이름이 10개 초과면 에러가 발생한다.', () => {
      expect(() => {
        validation.isValidateCars([
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
        ]);
      }).toThrow();
    }),
    test('자동차 이름($)이 중복되지 않고, 2개 이상 10개여야 한다.', () => {
      expect(validation.isValidateCars(['suyeon', 'hodu'])).toBe(true);
    });
});

describe('자동차 이름 유효성 검사', () => {
  test('자동차 이름은 앞 뒤 공백을 제외하고 한 글자 이상, 열글자 이하여야 한다.', () => {
    expect(validation.isValidateCarName('  123  ')).toBe(true);
  }),
    test('자동차 이름이 앞 뒤 공백을 제외하고 한 글자 미만이면 에러를 발생한다.', () => {
      expect(() => {
        validation.isValidateCarName('   ').toThrow();
      });
    }),
    test('자동차 이름이 앞 뒤 공백을 제외하고 10글자를 초과하면 에러를 발생한다.', () => {
      expect(() => {
        validation.isValidateCarName('10글자를초과하는완전긴자동차이름!!');
      }).toThrow();
    });
});

describe('자동차 포지션 유효성 검사', () => {
  test('포지션이 0 미만인 경우 에러를 발생한다', () => {
    expect(() => {
      validation.isValidatePosition(-1);
    }).toThrow();
  }),
    test.each([
      {
        position: 'position',
      },
      { position: {} },
      { position: [] },
      { position: null },
    ])('포지션이($position) 숫자가 아니면 에러를 발생한다.', ({ position }) => {
      expect(() => {
        validation.isValidatePosition(position);
      }).toThrow();
    });
});
