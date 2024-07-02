class Validator {
  static throwErrorWithCondition(condition, errorMessage) {
    if (condition) {
      throw new Error(errorMessage);
    }
  }

  static type(value, typeValue, errorMessage) {
    Validator.throwErrorWithCondition(typeof value !== typeValue, errorMessage);
  }

  static string(value, errorMessage) {
    Validator.type(value, "string", errorMessage);
  }

  static function(value, errorMessage) {
    Validator.type(value, "function", errorMessage);
  }

  static boolean(value, errorMessage) {
    Validator.type(value, "boolean", errorMessage);
  }

  static integer(value, errorMessage) {
    Validator.throwErrorWithCondition(
      typeof value !== "number" || !Number.isInteger(value),
      errorMessage
    );
  }

  static array(value, errorMessage) {
    Validator.throwErrorWithCondition(!Array.isArray(value), errorMessage);
  }

  static lessThan(value, otherValue, errorMessage) {
    Validator.throwErrorWithCondition(value < otherValue, errorMessage);
  }

  static instance(value, classValue, errorMessage) {
    Validator.throwErrorWithCondition(
      !(value instanceof classValue),
      errorMessage
    );
  }

  static property(value, objectValue, errorMessage) {
    Validator.throwErrorWithCondition(!(value in objectValue), errorMessage);
  }
}

export default Validator;
