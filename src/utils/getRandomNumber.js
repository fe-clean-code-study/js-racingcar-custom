function getRandomNumber(min, max) {
  if (typeof min !== "number") {
    throw new Error("The min number must be number");
  }

  if (typeof max !== "number") {
    throw new Error("The max number must be number");
  }

  if (min > max) {
    throw new Error("The min number must be greater than the max number.");
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default getRandomNumber;
