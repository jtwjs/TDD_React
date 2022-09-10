import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";

import Habit from "./habit";

describe("habit", () => {
  const habit = {
    name: "taewoong",
    count: 28,
  };

  it("renders", () => {
    const component = renderer.create(
      <Habit
        habit={habit}
        onIncrement={jest.fn()}
        onDecrement={jest.fn()}
        onDelete={jest.fn()}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe("habit crud buttonn", () => {
    let onIncrement, onDecrement, onDelete, habitComponent;

    beforeEach(() => {
      onIncrement = jest.fn();
      onDecrement = jest.fn();
      onDelete = jest.fn();
      habitComponent = (
        <Habit
          habit={habit}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          onDelete={onDelete}
        />
      );
      render(habitComponent);
    });

    describe("increase", () => {
      let incrementBtn;
      beforeEach(() => {
        incrementBtn = screen.getByRole("button", { name: "increase" });
      });
      it("calls onIncreament when clicking 'increment' button", () => {
        userEvent.click(incrementBtn);

        expect(onIncrement).toHaveBeenCalledTimes(1);
      });
    });

    describe("decrease", () => {
      let decrementBtn;
      beforeEach(() => {
        decrementBtn = screen.getByRole("button", { name: "decrease" });
      });

      it("calls onDecreament when clicking 'decrement' button", () => {
        userEvent.click(decrementBtn);

        expect(onDecrement).toHaveBeenCalledTimes(1);
      });
    });

    describe("delete", () => {
      let deleteBtn;
      beforeEach(() => {
        deleteBtn = screen.getByRole("button", { name: "delete" });
      });
      it("calls onDelete when clicking 'decrement' button", () => {
        userEvent.click(deleteBtn);

        expect(onDelete).toHaveBeenCalledTimes(1);
      });
    });
  });
});
