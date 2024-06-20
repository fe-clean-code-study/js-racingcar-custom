import readline from "readline"
import { defaultInputValidations } from "../validations/input.js"

const createReadline = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  rl.isOpened = true;
  rl.on('close', () => {
    rl.isOpened = false;
  })
  return rl
}

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
  let rl = createReadline()
  const processInput = async () => {
    if (!rl.isOpened) rl = createReadline()
    const input = await askQuestion(rl, message)
    const errorMessage = findInputError(input, [...defaultInputValidations, ...validations])

    if (option === 'repeat' && errorMessage){
      console.error(errorMessage)
      return processInput()
    }
    rl.close()
    return { input, error: errorMessage, retry: processInput }
  }
  return processInput()
}

export default readInput

