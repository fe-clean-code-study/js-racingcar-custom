export function dice(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
