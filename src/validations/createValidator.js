const createValidator = validations => {
  return (target, validationKeys) => {
    validationKeys.forEach(key => {
      if (!validations.hasOwnProperty(key)) {
        throw new Error('올바른 검사 키가 아닙니다.');
      }
      if (!validations[key].check(target)) {
        throw new Error(validations[key].errorMessage);
      }
    });
  };
};

export default createValidator;
