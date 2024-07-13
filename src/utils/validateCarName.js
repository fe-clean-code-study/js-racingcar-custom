import { MAX_CAR_NAME_LENGTH } from "../constants/car";

export const validateCarName = (name) => {
  if (typeof name !== "string") {
    throw new Error("자동차 이름은 문자열만 가능합니다.");
  }
  if (name === "") {
    throw new Error("자동차 이름은 빈 문자열이 될 수 없습니다.");
  }
  if (name.length > MAX_CAR_NAME_LENGTH) {
    throw new Error("자동차 이름은 5자 이하만 가능합니다.");
  }
};
