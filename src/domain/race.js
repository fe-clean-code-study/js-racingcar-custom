const ERROR_COUNT_LABEL = "횟수는 양의 정수만 가능합니다.";

/**
 * @callback Target 참가 대상
 * @param {string} name 이름
 * @param {number} [now] 위치
 * @returns {{setMovement: (distance: number) => void, getNow: () => number, getName: () => string}}
 */

/**
 * @param {Object} props
 * @param {string} props.names 명단
 * @param {Target} props.Target 참가 대상
 * @param {() => boolean} props.isValidMove 움직이는 조건
 * @param {number} props.count 횟수
 */

export function Race({ names, Target, isValidMove, count = 5 }) {
  if (!isVaildCount(count)) {
    throw new Error(ERROR_COUNT_LABEL);
  }

  const targets = names.split(",").map((name) => Target(name));

  function moveOrStop({ target, distance = 1, rule }) {
    if (rule()) {
      const name = target.getName();

      target.setMovement(distance);

      tellMove(name);
    }

    tellTargetsNow();
  }

  function start() {
    for (let i = 0; i < count; i++) {
      targets.forEach((target) => moveOrStop({ target, rule: isValidMove }));
    }
  }

  function end() {
    const winners = getWinners();

    console.log(`${winners}가 최종 우승했습니다.`);
  }

  function tellMove(name) {
    console.log(`꽁꽁 얼어붙은 한강 위로 ${name}가 전진합니다`);
  }

  function tellTargetsNow() {
    const tellTargetsNowList = targets.map(makeTargetsNowList);

    console.log(tellTargetsNowList.join("\n") + "\n");
  }

  function getWinners() {
    const winnerNow = targets.reduce(makewinnerNow, 0);

    return makeWinners(targets, winnerNow);
  }

  return { start, end };
}

function isVaildCount(count) {
  return Number.isInteger(count) && count > 0;
}

function makeTargetsNowList(target) {
  const name = target.getName();
  const now = target.getNow();
  const nowLabel = "-".repeat(now);

  return `${name}: ${nowLabel}`;
}

function makewinnerNow(acc, target) {
  return Math.max(acc, target.getNow());
}

function makeWinners(targets, max) {
  return targets
    .filter((target) => target.getNow() === max)
    .map((target) => target.getName())
    .join(",");
}
