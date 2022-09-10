export default class HabitPresenter {
  #habits = [];
  #maxHabits;
  constructor(habits = [], maxHabits) {
    this.#habits = habits;
    this.#maxHabits = maxHabits;
  }

  getHabits() {
    return this.#habits;
  }

  increment(habit, update) {
    this.#habits = this.#habits.map((item) => {
      if (item.id === habit.id) {
        return { ...habit, count: habit.count + 1 };
      }
      return item;
    });
    update(this.#habits);
  }

  decrement(habit, update) {
    this.#habits = this.#habits.map((item) => {
      if (item.id === habit.id) {
        const count = item.count - 1;
        return { ...habit, count: count < 0 ? 0 : count };
      }
      return item;
    });
    update(this.#habits);
  }

  add(name, update) {
    if (this.#habits.length === this.#maxHabits) {
      throw new Error(
        `habit의 최대 갯수는 ${this.#maxHabits}를 초과할 수 없습니다.`
      );
    }
    this.#habits = [...this.#habits, { id: Date.now(), name, count: 0 }];
    update(this.#habits);
  }

  delete(habit, update) {
    this.#habits = this.#habits.filter((item) => item.id !== habit.id);
    update(this.#habits);
  }

  reset(update) {
    this.#habits = this.#habits.map((habit) =>
      habit.count !== 0 ? { ...habit, count: 0 } : habit
    );
    // this.#habits = this.#habits.map((habit) => ({ ...habit, count: 0 }));
    update(this.#habits);
  }
}
