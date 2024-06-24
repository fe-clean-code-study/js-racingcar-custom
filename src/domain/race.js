import { ERROR_COUNT_LABEL } from "./validation.js";

/**
 * @callback Target 참가 대상
 * @param {string} name 이름
 * @param {number} [now] 위치
 * @returns {{setMovement: (distance: number) => void, now: number, name: any}}
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
      const name = target.name;

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

  return {
    play,

    get winners() {
      const winnerNow = targets.reduce(makeWinnerNow, 0);

      return makeWinners(targets, winnerNow);
    },

    get targetNow() {
      return targets.map((target) => target.now);
    },
  };
}

function isVaildCount(count) {
  return Number.isInteger(count) && count > 0;
}

function makeTargetsNowList(target) {
  const name = target.name;
  const now = target.now;

  return { name, now };
}

function makeWinnerNow(acc, target) {
  return Math.max(acc, target.now);
}

function makeWinners(targets, max) {
  return targets
    .filter((target) => target.now === max)
    .map((target) => target.name);
}
