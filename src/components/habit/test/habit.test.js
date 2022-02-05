import React from "react";
import { render, screen } from "@testing-library/react";
import Habit from "../habit";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";

describe("Habit", () => {
  const habit = { id: 1, name: "Reading", count: 4 };
  let HabitComponent;
  let onIncrement;
  let onDecrement;
  let onDelete;

  beforeEach(() => {
    onIncrement = jest.fn();
    onDecrement = jest.fn();
    onDelete = jest.fn();
    HabitComponent = (
      <Habit
        habit={habit}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onDelete={onDelete}
      />
    );
  });

  it("renders", () => {
    const component = renderer.create(HabitComponent);
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe("Habit Buttons Function", () => {
    beforeEach(() => {
      render(HabitComponent);
    });

    it("증가 버튼을 누르면 전달받은 onIncrement 함수를 호출한다", () => {
      const button = screen.getByTitle("increase");
      userEvent.click(button);
      expect(onIncrement).toHaveBeenCalledWith(habit);
    });

    it("감소 버튼을 누르면 전달받은 onDecrement 함수를 호출된다.", () => {
      const button = screen.getByTitle("decrease");
      userEvent.click(button);
      expect(onDecrement).toHaveBeenCalledWith(habit);
    });

    it("삭제 버튼을 클릭하면 전달받은 onDelete 함수를 호출한다", () => {
      const button = screen.getByTitle("delete");
      userEvent.click(button);
      expect(onDelete).toHaveBeenCalledWith(habit);
    });
  });
});
