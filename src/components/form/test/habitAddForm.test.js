import React from "react";
import { render, screen } from "@testing-library/react";
import HabitAddForm from "../habitAddForm";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";

describe("HabitAddForm", () => {
  it("renders", () => {
    // 스냅샷 테스트 실행
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
      input = screen.getByPlaceholderText("Habit");
      button = screen.getByText("Add");
    });

    it("습관의 이름이 있는 상황에서 버튼이 클릭되면 onAdd 함수를 호출한다 ", () => {
      userEvent.type(input, "New Habit");
      userEvent.click(button);

      expect(onAdd).toHaveBeenCalledWith("New Habit");
    });

    it("습관의 이름이 없는 상황에서 버튼을 클릭하면 onAdd 함수를 호출하지 않는다.", () => {
      userEvent.type(input, "");
      userEvent.click(button);

      expect(onAdd).toHaveBeenCalledTimes(0);
    });
  });
});
