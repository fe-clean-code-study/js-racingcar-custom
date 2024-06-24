export const carValidations = [
    {
        check: name => name.length >= 1 && name.length <= 5,
        errorMessage: '자동차 이름은 1자 이상 5자 이하여야 합니다.'
    }
]
