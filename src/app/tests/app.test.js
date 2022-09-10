import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";

import App from "../app";
import HabitPresenter from "../habit_presenter";

describe("App", () => {
  let presenter;
  beforeEach(() => {
    presenter = new HabitPresenter([
      { id: 1, name: "Reading", count: 1 },
      { id: 2, name: "Running", count: 0 },
      { id: 3, name: "Coding", count: 1 },
    ]);
  });

  it("renders", () => {
    const component = renderer.create(<App presenter={presenter} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe("Component", () => {
    beforeEach(() => {
      render(<App presenter={presenter} />);
    });

    it("counts only active habits", () => {
      const button = screen.getAllByRole("button", { name: "increase" })[0];
      userEvent.click(button);
      const count = screen.getAllByTestId("count")[0];
      expect(count.innerHTML).toBe("2");
    });

    it("adds new habit", () => {
      const newHabit = "whats";
      const input = screen.getByPlaceholderText("Habit");
      const button = screen.getByText("Add");
      userEvent.type(input, newHabit);
      userEvent.click(button);
      const addedName = screen.getAllByTestId("name")[3];
      expect(addedName.innerHTML).toBe(newHabit);
      const addedCount = screen.getAllByTestId("count")[3];
      expect(addedCount.innerHTML).toBe("0");
    });

    it("deletes an item", () => {
      const first = screen.getAllByRole("button", { name: "delete" })[0];
      userEvent.click(first);
      const next = screen.getAllByTestId("name")[0];
      expect(next.innerHTML).not.toBe("Reading");
    });

    it("increases the counter", () => {
      const button = screen.getAllByRole("button", { name: "increase" })[0];
      userEvent.click(button);
      const count = screen.getAllByTestId("count")[0];
      expect(count.innerHTML).toBe("2");
    });

    it("decreases the counter", () => {
      const button = screen.getAllByRole("button", { name: "decrease" })[2];
      userEvent.click(button);
      const count = screen.getAllByTestId("count")[2];
      expect(count.innerHTML).toBe("0");
    });

    it("resets all counters", () => {
      const button = screen.getByText("Reset All");
      userEvent.click(button);
      screen.getAllByTestId("count").forEach((count) => {
        expect(count.innerHTML).toBe("0");
      });
    });
  });
});
