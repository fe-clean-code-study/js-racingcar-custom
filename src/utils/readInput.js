import createReadline from './createReadline.js'

const askQuestion = (rl, message) => {
  return new Promise((resolve) => {
    rl.question(message, input => {
      resolve(input)
    })
  })
}

const findInputError = (input, validations) => {
  const { errorMessage } = validations.find(({ check }) => !check(input)) ?? {}
  return errorMessage
}

const readInput = (message, validations = [], option = 'repeat') => {
  const rl = createReadline()
  const processInput = async () => {
    const input = await askQuestion(rl, message)
    const errorMessage = findInputError(input, validations)

    if (option === 'repeat' && errorMessage) {
      console.error(errorMessage)
      return processInput()
    }
    rl.close()
    return input
  }
  return processInput()
}

export default readInput