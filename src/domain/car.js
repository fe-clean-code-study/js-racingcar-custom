import { ERROR_NAME_LABEL } from "./validation.js";

const VALID_NAME_LENGTH = 5;
const DEFAULT_CAR_NOW = 0;

/**
 * @type {import("./race").Target}
 */

export function Car(name, now = DEFAULT_CAR_NOW) {
  if (!isVaildName(name)) {
    throw new Error(ERROR_NAME_LABEL);
  }

  function setMovement(distance) {
    now += distance;
  }

  return {
    setMovement,

    get now() {
      return now;
    },

    get name() {
      return name;
    },
  };
}

function isVaildName(name) {
  return name.length <= VALID_NAME_LENGTH;
}
