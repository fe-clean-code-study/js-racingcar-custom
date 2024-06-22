export function RaceView() {
  function moveView(name) {
    console.log(`꽁꽁 얼어붙은 한강 위로 ${name}가 전진합니다`);
  }

  function moveResultView(targetInfomationList) {
    const moveResultList = targetInfomationList.map(makeTargetsNowList);

    console.log(moveResultList.join("\n") + "\n");
  }

  function result(winners) {
    const winnersLabel = winners.join(",");

    console.log(`${winnersLabel}가 최종 우승했습니다.`);
  }

  return { moveView, moveResultView, result };
}

function makeTargetsNowList({ name, now }) {
  const nowLabel = "-".repeat(now);

  return `${name}: ${nowLabel}`;
}
