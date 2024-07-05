import { getRandomNumber } from '../utils/getRandomNumber.js'
import { EventEmitter } from 'events'

export default class Game {
  #results
  #miniGames

  constructor({ miniGames }) {
    this.maxRound = 1
    this.currentRound = 1

    this.#miniGames = miniGames
    this.currentMiniGame = ''

    this.#results = []
    this.eventEmitter = new EventEmitter()
  }

  get results() {
    return this.#results
  }

  get miniGames() {
    return this.#miniGames
  }

  get lastResult() {
    return this.#results.at(-1)
  }

  selectRandomMiniGame() {
    const miniGameNames = Object.keys(this.miniGames)
    this.currentMiniGame = miniGameNames[getRandomNumber(0, miniGameNames.length - 1)]
  }

  emitEvent(eventName, ...args) {
    this.eventEmitter.emit(eventName, ...args)
  }


  addResult(resultAfterRound) {
    this.#results.push(resultAfterRound)
  }

  doRound() {
  }


  async play(startRound = this.currentRound, endRound = this.maxRound) {
    this.currentRound = startRound
    while (this.currentRound <= endRound) {
      await this.doRound()
      this.currentRound += 1
    }
  }
}
