function isSubclass(child, parent) {
  let prototype = Object.getPrototypeOf(child);

  while (prototype) {
    if (prototype === parent) {
      return true;
    }

    prototype = Object.getPrototypeOf(prototype);
  }

  return false;
}

export default isSubclass;
