import HabitPresenter from "../habit_presenter";

describe("HabitPresenter", () => {
  const habits = [
    { id: 1, name: "running", count: 1 },
    { id: 2, name: "game", count: 0 },
  ];
  let presenter;
  let update;
  beforeEach(() => {
    presenter = new HabitPresenter(habits, 3);
    update = jest.fn();
  });

  it("inits with habits", () => {
    expect(presenter.getHabits()).toEqual(habits);
  });

  it("increments habit count and call update callback", () => {
    presenter.increment(habits[0], update);
    expect(presenter.getHabits()[0].count).toBe(2);
    checkUpdateIsCalled();
  });

  it("decrements habit count and call update callback", () => {
    presenter.decrement(habits[0], update);
    expect(presenter.getHabits()[0].count).toBe(0);
    checkUpdateIsCalled();
  });

  it("dose not set the count value below 0 when decrements", () => {
    presenter.decrement(habits[0], update);
    presenter.decrement(habits[0], update);

    expect(presenter.getHabits()[0].count).toBe(0);
  });

  it("adds new habit to the list", () => {
    presenter.add("taewoong", update);

    expect(presenter.getHabits().at(-1).name).toBe("taewoong");
    expect(presenter.getHabits().at(-1).count).toBe(0);
    checkUpdateIsCalled();
  });

  it("throw an error when the max habits limit is exceeded", () => {
    presenter.add("ning", update);

    expect(() => presenter.add("ning", update)).toThrowError(
      "habit의 최대 갯수는 3를 초과할 수 없습니다."
    );
  });

  it("deletes habit from the list and update callback", () => {
    presenter.delete(habits[0], update);

    expect(presenter.getHabits().length).toBe(1);
    expect(presenter.getHabits()[0].name).toBe("game");
    checkUpdateIsCalled();
  });

  describe("reset", () => {
    it("set all habit counts to 0", () => {
      presenter.reset(update);

      expect(presenter.getHabits()[0].count).toBe(0);
      expect(presenter.getHabits()[1].count).toBe(0);
      checkUpdateIsCalled();
    });

    it("does not create new object when count is 0", () => {
      const habit = presenter.getHabits();
      presenter.reset(update);
      const updateHabit = presenter.getHabits();

      expect(habit[1]).toBe(updateHabit[1]);
    });
  });

  function checkUpdateIsCalled() {
    expect(update).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledWith(presenter.getHabits());
  }
});
