/// <reference types="cypress" />
import "@testing-library/cypress/add-commands";

describe("Habit tracker", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders", () => {
    cy.findByText("Habit Tracker").should("exist");
  });
});
