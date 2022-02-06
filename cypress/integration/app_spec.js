/// <reference types="cypress" />
import "@testing-library/cypress/add-commands";

describe("해빗 트래커", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("렌더 테스트", () => {
    cy.findByText("Habit Tracker").should("exist");
  });

  it("사용자가 습관을 입력하고 Add 버튼을 클릭하면 카운트가 0으로 초기화 된 습관이 추가된다.", () => {
    cy.findByPlaceholderText("Habit").type("New Habit");
    cy.findByText("Add").click();
    cy.findAllByTestId("habit-name").last().should("have.text", "New Habit");
    cy.findAllByTestId("habit-count").last().should("have.text", "0");
  });

  it("각 습관은 증가 버튼을 통해서 카운트를 증가시킬 수 있다.", () => {
    cy.findAllByTitle("increase").first().click();
    cy.findAllByTestId("habit-count").first().should("have.text", "1");
  });

  it("각 습관의 감소 버튼을 클릭하면 카운트를 1 감소 시킬 수 있다.", () => {
    cy.findAllByTitle("increase").first().click();
    cy.findAllByTitle("increase").first().click();
    cy.findAllByTitle("increase").first().click();
    cy.findAllByTitle("decrease").first().click();
    cy.findAllByTestId("habit-count").first().should("have.text", "2");
  });

  it("0 이하로는 감소하지 않는다", () => {
    cy.findAllByTitle("decrease").first().click();
    cy.findAllByTestId("habit-count").first().should("have.text", "0");
  });

  it("헤더에서는 활동 중인 습관들의 카운트를 보여줘야 한다.", () => {
    cy.findAllByTitle("increase").first().click();
    cy.findAllByTitle("increase").last().click();
    cy.findByTestId("total-count").should("have.text", "2");
  });

  it("리셋 버튼을 누르면 모든 습관의 카운트가 초기화 된다.", () => {
    cy.findAllByTitle("increase").first().click();
    cy.findAllByTitle("increase").last().click();
    cy.findByText("Reset All").click();
    cy.findAllByTestId("habit-count").each((item) => {
      cy.wrap(item).should("have.text", "0");
    });
  });

  it("삭제 버튼을 누르면 습관이 삭제 된다.", () => {
    cy.findAllByTitle("delete").first().click();
    cy.findAllByTestId("habit-name").findByText("Reading").should("not.exist");
  });
});
