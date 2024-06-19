import readline from "readline"

const defaultValidations = [
  {
    check: input => input.trim().length > 0,
    errorMessage: "1자 이상 입력해야 합니다."
  },
  {
    check: input => input !== 'abc',
    errorMessage: "abc라는 이름은 없습니다."
  }
]


const createReadline = () => readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const askQuestion = (rl, message) => {
  return new Promise((resolve) => {
    rl.question(`${message}\n`, input => {
      resolve(input)
    })
  })
}

const findInputError = (input, validations) => {
  const { errorMessage } = validations.find(({check}) => !check(input)) ?? {}
  return errorMessage
}

const readInput = (message, validations = [], option = 'once') => {
  const rl = createReadline()
  const processInput = async () => {
    const input = await askQuestion(rl, message)
    const errorMessage = findInputError(input, [...defaultValidations, ...validations])

    if (option === 'keep' && errorMessage){
      console.error(errorMessage)
      return processInput()
    }
    rl.close()
    return { input, error: errorMessage }
  }
  return processInput()
}

export default readInput

