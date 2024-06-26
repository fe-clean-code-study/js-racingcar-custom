export function RaceView() {
  function moveView(name) {
    console.log(`꽁꽁 얼어붙은 한강 위로 ${name}가 전진합니다`);
  }

  function playResultView(targetInfomationList) {
    targetInfomationList.forEach(({ targetsNowList, movingTargetList }) => {
      const targetsNowViewList = targetsNowList.map(makeTargetsNowViewList);

      movingTargetList.forEach(moveView);
      console.log(targetsNowViewList.join("\n") + "\n");
    });
  }

  function result(winners) {
    const winnersLabel = winners.join(",");

    console.log(`${winnersLabel}가 최종 우승했습니다.`);
  }

  return { moveView, playResultView, result };
}

function makeTargetsNowViewList({ name, now }) {
  const nowLabel = "-".repeat(now);

  return `${name}: ${nowLabel}`;
}
