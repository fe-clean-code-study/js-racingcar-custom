export const racingValidations = {
    uniqueCarName: {
        check: (carNames) => new Set(carNames).size === carNames.length,
        errorMessage: '경주할 자동차 이름은 각각 달라야 합니다.'
    },
    leastCarCount: {
        check: (carNames) => carNames.length > 1,
        errorMessage: '최소 2대의 자동차가 참가해야 합니다.'
    }
}
