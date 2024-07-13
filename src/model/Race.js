export class Race {
  #cars;
  #record;
  velocityRule;
  currentRound;

  constructor(velocityRule) {
    this.#cars = [];
    this.#record = [];
    this.currentRound = 0;
    this.velocityRule = velocityRule;
  }

  get record() {
    return this.#record;
  }

  get cars() {
    return this.#cars;
  }

  enrollCar(car) {
    this.#cars.push(car);
  }

  raceReady() {
    this.#cars.every((car) => car.ready);
    this.#record = [];
  }

  goRound() {
    this.#cars.forEach((car) => (car.velocity = this.velocityRule(car)));
    this.#cars.forEach((car) => car.move());
    this.currentRound++;
    this.#record.push(
      this.#cars.map((car) => ({
        carName: car.carName,
        position: car.position,
        velocity: car.velocity,
      }))
    );
  }

  chooseWinners() {
    const maxPosition = Math.max(...this.#cars.map((car) => car.position));
    return this.#cars.filter((car) => car.position === maxPosition);
  }
}
