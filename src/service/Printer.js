import createReadline from '../utils/createReadline.js'

export default class Printer {
  constructor() {
    this.rl = createReadline()
  }

  print(message) {
    console.log(message)
  }

  printError(error) {
    console.log(`\n⚠️ ${error.message}\n`)
  }

  async read(message) {
    if (!this.rl.isOpened) {
      this.rl = createReadline()
    }
    return new Promise(resolve => {
      this.rl.question(`⬇️ ${message}\n\n`, input => {
        resolve(input)
        this.rl.close()
      })
    })
  }
}
