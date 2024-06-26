export function validateName({ name, minLength, maxLength }) {
  if (typeof name !== 'string') return false;

  if (name.length < minLength || name.length > maxLength) return false;

  return true;
}

export function validateNumberRange({ number, minRange = 1, maxRange }) {
  if (!Number.isInteger(number)) return false;

  if (number < minRange) return false;

  if (maxRange && number > maxRange) return false;

  return true;
}
