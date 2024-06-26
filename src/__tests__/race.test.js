import { describe, expect, test } from "vitest";
import { Race } from "../model/Race";
import { Car } from "../Model/Car";
import {
  gettingFasterVelocityRule,
  randomVelocityRule,
} from "../service/raceVelocityRules";
import { RaceController } from "../controller/RaceController";

describe("레이스 테스트", () => {
  test("레이스에 참여할 Car를 등록할 수 있다.", () => {
    const car = new Car("test");
    const race = new Race((car) => randomVelocityRule(car));
    race.enrollCar(car);
    expect(race.cars).toEqual([car]);
  });
  test("레이스를 준비단계에서 모든 car의 속도와 위치는 0이다.", () => {
    const carNames = ["test1", "test2", "test3"];
    const cars = carNames.map((name) => new Car(name));
    const race = new Race((car) => randomVelocityRule(car));

    cars.forEach((car) => race.enrollCar(car));
    race.raceReady();

    cars.forEach((car) => {
      expect(car.velocity).toBe(0);
      expect(car.position).toBe(0);
    });
  });

  test("레이스 종료 시 가장 큰 위치를 가진 car가 우승자가 된다.", () => {
    const carNames = ["test1", "test2", "test3"];

    const cars = carNames.map((name) => new Car(name));
    const race = new Race((car) => randomVelocityRule(car));

    cars.forEach((car) => race.enrollCar(car));
    race.raceReady();
    race.goRound();

    const winners = race.chooseWinners();
    const maxPosition = Math.max(...cars.map((car) => car.position));

    winners.forEach((winner) => {
      expect(winner.position).toBe(maxPosition);
      expect(cars).toContain(winner);
    });
  });

  test("라운드를 진행하지 않았으면 모든 car의 위치는 0이다.", () => {
    const carNames = ["test1", "test2", "test3"];
    const cars = carNames.map((name) => new Car(name));
    const race = new Race((car) => randomVelocityRule(car));

    cars.forEach((car) => race.enrollCar(car));
    expect(race.cars.every((car) => car.position === 0)).toBe(true);
  });
});

describe("레코드 테스트", () => {
  test("레이스 준비단계에서 record는 초기화 된다.", () => {
    const race = new Race((car) => randomVelocityRule(car));
    expect(race.record).toEqual([]);
  });

  test("라운드가 진행되면 모든 car의 이름과 위치,속도가 record에 기록된다.", () => {
    const carNames = ["test1", "test2", "test3"];
    const cars = carNames.map((name) => new Car(name));
    const race = new Race((car) => randomVelocityRule(car));

    cars.forEach((car) => race.enrollCar(car));
    race.raceReady();
    race.goRound();

    const roundRecord = race.record[0];
    roundRecord.forEach((record) => {
      expect(record).toHaveProperty("carName");
      expect(record).toHaveProperty("position");
      expect(record).toHaveProperty("velocity");
    });
  });

  test("모든 라운드마다 레코드가 기록된다.", () => {
    const carNames = ["test1", "test2", "test3"];
    const cars = carNames.map((name) => new Car(name));
    const race = new Race((car) => randomVelocityRule(car));

    cars.forEach((car) => race.enrollCar(car));
    race.raceReady();
    race.goRound();
    race.goRound();
    race.goRound();

    expect(race.record.length).toBe(3);
  });
});

describe("레이스 규칙 테스트", () => {
  test("레이스 속력 변경 규칙을 변경할 수 있다.", () => {
    const race = new Race((car) => randomVelocityRule(car));
    race.velocityRule = gettingFasterVelocityRule;

    expect(race.velocityRule).toBe(gettingFasterVelocityRule);
  });
  test("레이스 속력 변경 규칙에 따라 속력이 변경된다.", () => {
    const race = new Race(gettingFasterVelocityRule);
    const carNames = ["test1", "test2", "test3"];
    const cars = carNames.map((name) => new Car(name));
    cars.forEach((car) => race.enrollCar(car));

    race.goRound();
    race.goRound();
    race.goRound();

    race.cars.every((car) => {
      expect(car.position).toBe(60);
    });
  });
});
