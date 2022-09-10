import React from "react";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";

import Habits from "./habits";
import userEvent from "@testing-library/user-event";

describe("Habits", () => {
  const habits = [
    { name: "taewoong", id: 1, count: 1 },
    { name: "woong", id: 2, count: 2 },
  ];

  let onReset = jest.fn();

  const HabitComponent = (
    <Habits
      habits={habits}
      onIncrement={jest.fn()}
      onDecrement={jest.fn()}
      onDelete={jest.fn()}
      onAdd={jest.fn()}
      onReset={onReset}
    />
  );
  it("renders", () => {
    const component = renderer.create(HabitComponent);
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe("Button Click", () => {
    beforeEach(() => {
      render(HabitComponent);
    });

    it("calls onReset when clicking 'reset' button", () => {
      const resetBtn = screen.getByText("Reset All");
      userEvent.click(resetBtn);
      expect(onReset).toHaveBeenCalledTimes(1);
    });
  });
});
