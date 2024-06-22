import { ERROR_COUNT_LABEL } from "../util/validation.js";

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

  function moveOrStop({ target, distance = 1, rule, moveView }) {
    if (rule()) {
      const name = target.getName();

      target.setMovement(distance);

      moveView(name);
    }
  }

  function play({ distance = 1, moveView, moveResultView }) {
    for (let i = 0; i < count; i++) {
      targets.forEach((target) =>
        moveOrStop({ target, distance, rule: isValidMove, moveView })
      );

      const targetInfomationList = targets.map(makeTargetsNowList);
      moveResultView(targetInfomationList);
    }
  }

  function getTargetsNow() {
    return targets.map((target) => target.getNow());
  }

  function getWinners() {
    const winnerNow = targets.reduce(makewinnerNow, 0);

    return makeWinners(targets, winnerNow);
  }

  return { play, getWinners, getTargetsNow };
}

function isVaildCount(count) {
  return Number.isInteger(count) && count > 0;
}

function makeTargetsNowList(target) {
  const name = target.getName();
  const now = target.getNow();

  return { name, now };
}

function makewinnerNow(acc, target) {
  return Math.max(acc, target.getNow());
}

function makeWinners(targets, max) {
  return targets
    .filter((target) => target.getNow() === max)
    .map((target) => target.getName());
}
