import createReadline from "../utils/createReadline.js";


export default class Printer {
  constructor() {
    this.rl = createReadline()
  }

  print(message) {
    console.log(message);
  }

  async read(message) {
    if (!this.rl.isOpened) {
      this.rl = createReadline()
    }
    return new Promise((resolve) => {
      this.rl.question(`${message}\n`, (input) => {
        resolve(input)
        this.rl.close()
      })
    })
  }
}
