import { ERROR_COUNT_LABEL } from "./validation.js";

/**
 * @callback Target 참가 대상
 * @param {string} name 이름
 * @param {number} [now] 위치
 * @returns {{incrementMovement: (distance: number) => void, now: number, name: any}}
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

  function play(distance = 1) {
    const playResult = [];

    for (let i = 0; i < count; i++) {
      const movingTargetList = targets.reduce((acc, target) => {
        if (isValidMove()) {
          const name = target.name;
          target.incrementMovement(distance);

          acc.push(name);
        }

        return acc;
      }, []);

      const targetsNowList = targets.map(makeTargetsNowList);
      playResult.push({ targetsNowList, movingTargetList });
    }

    return playResult;
  }

  return {
    play,

    get winners() {
      const winnerNow = targets.reduce(makeWinnerNow, 0);

      return findWinners(targets, winnerNow);
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

function findWinners(targets, winnerMovement) {
  return targets
    .filter((target) => target.now === winnerMovement)
    .map((target) => target.name);
}
