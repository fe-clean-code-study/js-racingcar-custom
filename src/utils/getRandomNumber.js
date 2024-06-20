function getRandomNumber(min, max) {
  if (min > max) {
    throw new Error("The min number must be greater than the max number.");
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default getRandomNumber;
