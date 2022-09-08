import React from "react";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";

import HabitAddForm from "./habitAddForm";
import userEvent from "@testing-library/user-event";

describe("habitAddForm", () => {
  it("renders", () => {
    // snapshot test
    const component = renderer.create(<HabitAddForm onAdd={jest.fn()} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe("Form Submit", () => {
    let onAdd;
    let input;
    let button;
    beforeEach(() => {
      onAdd = jest.fn();
      render(<HabitAddForm onAdd={onAdd} />);
      // -- Given --
      input = screen.getByPlaceholderText("Habit");
      button = screen.getByText("Add");
    });

    it("calles onAdd when button is clikced and valid habit is entered", () => {
      // -- When --
      // 인풋에 원하는 습관의 이름을 타이핑 후
      // add라는 버튼을 클릭하면
      // -- Then --
      // onAdd가 input에 입력된 이름과 함께 호출되어야 한다.
      userEvent.type(input, "new Habit");
      userEvent.click(button);

      expect(onAdd).toHaveBeenCalledWith("new Habit");
    });

    it("does not call onAdd when the habit is empty", () => {
      userEvent.type(input, "");
      userEvent.click(button);

      expect(onAdd).toHaveBeenCalledTimes(0);
    });
  });
});
