import React from "react";
import { render, screen } from "@testing-library/react";
import Habits from "../habits";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";

describe("Habits", () => {
  const habits = [
    { id: 1, name: "Reading", count: 0 },
    { id: 2, name: "Running", count: 0 },
    { id: 3, name: "Coding", count: 0 },
  ];
  let HabitsComponent;
  let onIncrement;
  let onDecrement;
  let onDelete;
  let onAdd;
  let onReset;

  beforeEach(() => {
    onIncrement = jest.fn();
    onDecrement = jest.fn();
    onDelete = jest.fn();
    onAdd = jest.fn();
    onReset = jest.fn();

    HabitsComponent = (
      <Habits
        habits={habits}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onDelete={onDelete}
        onAdd={onAdd}
        onReset={onReset}
      />
    );
  });

  it("스냅샷 테스트", () => {
    const component = renderer.create(HabitsComponent);
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe("Habits Button Function", () => {
    beforeEach(() => {
      render(HabitsComponent);
    });

    it("추가 버튼을 누르면 onAdd 함수를 호출한다", () => {
      const input = screen.getByPlaceholderText("Habit");
      const button = screen.getByText("Add");
      const newHabit = "New Habit";
      userEvent.type(input, newHabit);
      userEvent.click(button);
      expect(onAdd).toHaveBeenCalledWith(newHabit);
    });

    it("증가 버튼을 누르면 전달받은 onIncrement 함수를 호출한다", () => {
      const button = screen.getAllByTitle("increase")[0];
      userEvent.click(button);
      expect(onIncrement).toHaveBeenCalledWith(habits[0]);
    });

    it("감소 버튼을 누르면 전달받은 onDecrement 함수를 호출된다.", () => {
      const button = screen.getAllByTitle("decrease")[0];
      userEvent.click(button);
      expect(onDecrement).toHaveBeenCalledWith(habits[0]);
    });

    it("삭제 버튼을 클릭하면 전달받은 onDelete 함수를 호출한다", () => {
      const button = screen.getAllByTitle("delete")[0];
      userEvent.click(button);
      expect(onDelete).toHaveBeenCalledWith(habits[0]);
    });

    it("리셋 버튼을 누르면 전달받은 onReset 함수를 호출한다", () => {
      const button = screen.getByText("Reset All");
      userEvent.click(button);
      expect(onReset).toHaveBeenCalledTimes(1);
    });
  });
});
