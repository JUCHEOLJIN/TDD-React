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
      { id: 1, name: "Reading", count: 0 },
      { id: 2, name: "Running", count: 0 },
      { id: 3, name: "Coding", count: 1 },
    ]);
  });

  it("스냅샷 테스트", () => {
    const component = renderer.create(<App presenter={presenter} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe("컴포넌트", () => {
    beforeEach(() => {
      render(<App presenter={presenter} />);
    });

    it("Navbar에서는 카운트가 1 이상인 습관들의 갯수를 보여준다", () => {
      const button = screen.getAllByTitle("increase")[0];
      userEvent.click(button);
      const count = screen.getByTestId("total-count");
      expect(count.innerHTML).toBe("2");
    });

    it("add 버튼을 누르면 카운트가 0인 습관이 추가된다", () => {
      const newHabit = "New Habit";
      const input = screen.getByPlaceholderText("Habit");
      const button = screen.getByText("Add");
      userEvent.type(input, newHabit);
      userEvent.click(button);
      const addedName = screen.getAllByTestId("habit-name")[3];
      expect(addedName.innerHTML).toBe(newHabit);
      const addedCount = screen.getAllByTestId("habit-count")[3];
      expect(addedCount.innerHTML).toBe("0");
    });

    it("삭제 버튼을 누르면 습관이 삭제 된다.", () => {
      const first = screen.getAllByTitle("delete")[0];
      userEvent.click(first);
      const next = screen.getAllByTestId("habit-name")[0];
      expect(next.innerHTML).not.toBe("Reading");
    });

    it("증가 버튼을 누르면 카운트가 증가한다", () => {
      const button = screen.getAllByTitle("increase")[0];
      userEvent.click(button);
      const count = screen.getAllByTestId("habit-count")[0];
      expect(count.innerHTML).toBe("1");
    });

    it("감소 버튼을 누르면 카운트가 감소한다", () => {
      const button = screen.getAllByTitle("decrease")[2];
      userEvent.click(button);
      const count = screen.getAllByTestId("habit-count")[2];
      expect(count.innerHTML).toBe("0");
    });

    it("리셋 버튼을 누르면 모든 카운트가 초기화된다.", () => {
      const button = screen.getByText("Reset All");
      userEvent.click(button);
      screen.getAllByTestId("habit-count").forEach((count) => {
        expect(count.innerHTML).toBe("0");
      });
    });
  });
});
