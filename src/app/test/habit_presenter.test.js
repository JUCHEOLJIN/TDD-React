import HabitPresenter from "../habit_presenter";

describe("해빗트래커", () => {
  let habitPresenter;
  let habitsState = [
    { id: 1, name: "Reading", count: 0 },
    { id: 2, name: "Running", count: 0 },
    { id: 3, name: "Coding", count: 0 },
  ];
  let update;

  beforeEach(() => {
    habitPresenter = new HabitPresenter(habitsState, 4);
    update = jest.fn();
  });

  it("초기화가 잘 되어야 한다", () => {
    expect(habitPresenter.getHabits()).toEqual(habitsState);
  });

  it("플러스 버튼을 누르면 카운트가 1 증가하고 콜백 함수가 1번 호출된다", () => {
    habitPresenter.increment(habitsState[0], update);

    expect(habitPresenter.getHabits()[0].count).toBe(1);
    checkUpdateIsCalled();
  });

  describe("마이너스 버튼", () => {
    it("0인 상황에서 마이너스 버튼을 누르면 카운트가 감소하지 않는다", () => {
      habitPresenter.decrement(habitsState[0], update);
      habitPresenter.decrement(habitsState[0], update);

      expect(habitPresenter.getHabits()[0].count).toBe(0);
      expect(update).toHaveBeenCalledTimes(2);
      expect(update).toHaveBeenCalledWith(habitPresenter.getHabits());
    });

    it("카운트가 0보다 큰 상황에서 마이너스 버튼을 누르면 카운트가 1 감소한다", () => {
      habitPresenter.increment(habitsState[0], update);
      habitPresenter.increment(habitsState[0], update);
      habitPresenter.decrement(habitsState[0], update);

      expect(habitPresenter.getHabits()[0].count).toBe(1);
    });
  });

  it("휴지통 버튼을 클릭하면 해빗을 삭제합니다.", () => {
    habitPresenter.delete(habitsState[0], update);

    expect(habitPresenter.getHabits().length).toBe(2);
    expect(habitPresenter.getHabits()[0].name).toBe("Running");
    checkUpdateIsCalled();
  });

  it("Add 버튼을 누르면 해빗을 추가할 수 있습니다.", () => {
    habitPresenter.add("TDD 공부", update);

    expect(habitPresenter.getHabits().length).toBe(4);
    expect(habitPresenter.getHabits()[3].name).toBe("TDD 공부");
    expect(habitPresenter.getHabits()[3].count).toBe(0);
    checkUpdateIsCalled();
  });

  it("Add 버튼을 누른 경우에 해빗이 4개가 넘으면 에러가 나타납니다.", () => {
    habitPresenter.add("TDD 공부", update);

    expect(() => {
      habitPresenter.add("TDD 실습", update);
    }).toThrow(
      `습관의 갯수는 ${habitPresenter.maxHabits} 이상이 될 수 없습니다.`
    );
  });

  describe("리셋 버튼", () => {
    it("리셋 버튼을 클릭하면 모든 카운트가 리셋된다.", () => {
      habitPresenter.reset(update);

      expect(habitPresenter.getHabits()[0].count).toBe(0);
      expect(habitPresenter.getHabits()[1].count).toBe(0);
      expect(habitPresenter.getHabits()[2].count).toBe(0);
      checkUpdateIsCalled();
    });

    it("이미 카운트가 0인 객체는 새로 만들지 않아야 한다.", () => {
      const habits = habitPresenter.getHabits();
      habitPresenter.reset(update);
      const resetHabits = habitPresenter.getHabits();

      expect(resetHabits[1]).toBe(habits[1]);
    });
  });

  function checkUpdateIsCalled() {
    expect(update).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledWith(habitPresenter.getHabits());
  }
});
