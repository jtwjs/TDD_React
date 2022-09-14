/// <reference types="cypress" />
import "@testing-library/cypress/add-commands";

describe("Habit tracker", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders", () => {
    cy.findByText("Habit Tracker").should("exist");
  });

  it("adds new habit at the end", () => {
    cy.findByPlaceholderText("Habit").type("new habit");
    cy.findByRole("button", { name: "Add" }).click();
    cy.findAllByTestId("name").last().should("have.text", "new habit");
    cy.findAllByTestId("count").last().should("have.text", "0");
  });

  it("increase count", () => {
    cy.findAllByRole("button", { name: "increase" }).first().click();
    cy.findAllByTestId("count").first().should("have.text", "1");
  });

  it("dose not decrease below 0", () => {
    cy.findAllByRole("button", { nmae: "decrease" }).first().click();
    cy.findAllByTestId("count").first().should("have.text", "0");
  });

  it("shows active count on the header", () => {
    cy.findAllByRole("button", { name: "increase" }).first().click();
    cy.findAllByRole("button", { name: "increase" }).last().click();
    cy.findByTestId("total-count").should("have.text", "2");
  });

  it("reset to 0 when clicking reset all", () => {
    cy.findByPlaceholderText("Habit").type("new habit");
    cy.findByRole("button", { name: "Add" }).click();
    cy.findAllByRole("button", { name: "increase" }).first().click();
    cy.findAllByRole("button", { name: "increase" }).last().click();
    cy.findByRole("button", { name: "Reset All" }).click();
    cy.findAllByTestId("count").each((item) => {
      cy.wrap(item).should("have.text", "0");
    });
  });

  it("delete an item", () => {
    cy.findAllByRole("button", { name: "delete" }).first().click();
    cy.findAllByTestId("name").findByText("Reading").should("not.exist");
  });
});
