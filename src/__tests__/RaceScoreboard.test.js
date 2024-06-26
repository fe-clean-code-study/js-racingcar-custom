import { describe, expect, test } from "vitest";
import { Car, Race, RaceScoreboard } from "../domain/index.js";

describe("RaceScoreboard 클래스 테스트", () => {
  test("Race 클래스의 인스턴스를 할당하지 않으면 오류가 발생한다.", () => {
    class Person {}

    const person = new Person();

    expect(() => new RaceScoreboard(person)).toThrowError();
  });

  test("Race 클래스의 인스턴스를 할당하면 오류가 발생한다.", () => {
    const carRace = new Race(Car, 5);

    expect(() => new RaceScoreboard(carRace)).not.toThrowError();
  });
});
