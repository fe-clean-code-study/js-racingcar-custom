import { RACE_VELOCITY_RULE_FLAG } from "../constants/race.js";
import { getRandomNumberBetweenZeroAndTen } from "./getRandomNumberBetweenZeroAndTen.js";

export const randomVelocityRule = () => {
  return getRandomNumberBetweenZeroAndTen() >= RACE_VELOCITY_RULE_FLAG ? 1 : 0;
};

export const gettingFasterVelocityRule = (car) => {
  return car.velocity + 10;
};
