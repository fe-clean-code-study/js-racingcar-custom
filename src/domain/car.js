export function Car(name, now = 0) {
  if (!isVaildName(name)) {
    throw new Error("이름은 5자 이하만 가능합니다.");
  }

  function setMovement(distance) {
    now += distance;
  }

  function tellName() {
    console.log(name);
  }

  function tellNow() {
    console.log(now);
  }

  return { tellName, tellNow, setMovement };
}

function isVaildName(name) {
  return name.length <= 5;
}
