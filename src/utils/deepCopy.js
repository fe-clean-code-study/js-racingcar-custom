function deepCopy(value) {
  if (value instanceof Map) {
    throw new Error("The value must not be Map");
  }

  if (value instanceof Set) {
    throw new Error("The value must not be Set");
  }

  if (Array.isArray(value)) {
    return value.map((v) => deepCopy(v));
  } else if (value === null) {
    return null;
  } else if (typeof value === "object") {
    let copy = {};

    for (const key of Object.keys(value)) {
      copy[key] = deepCopy(value[key]);
    }

    return copy;
  } else {
    return value;
  }
}

export default deepCopy;
