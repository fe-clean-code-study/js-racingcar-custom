class Validator {
  static throwErrorWithCondition(condition, errorMessage) {
    if (condition) {
      throw new Error(errorMessage);
    }
  }

  static string(value, errorMessage) {
    Validator.throwErrorWithCondition(typeof value !== "string", errorMessage);
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

  static function(value, errorMessage) {
    Validator.throwErrorWithCondition(
      typeof value !== "function",
      errorMessage
    );
  }

  static boolean(value, errorMessage) {
    Validator.throwErrorWithCondition(typeof value !== "boolean", errorMessage);
  }
}

export default Validator;
