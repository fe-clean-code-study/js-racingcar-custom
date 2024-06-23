function deepCopy(value) {
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
