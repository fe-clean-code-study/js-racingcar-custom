export default class Car{
  constructor(name) {
    this.name = name
    this.pos = 0
  }
  get position() {
    return this.pos
  }
  move() {
    this.pos += 1
  }
  show() {
    console.log(`${this.name} : ${'_'.repeat(this.pos)}`)
  }
}