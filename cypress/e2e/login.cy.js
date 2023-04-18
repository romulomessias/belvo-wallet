/// <reference types="Cypress" />

describe("Login", () => {
  beforeEach(() => {
    // cy.clearCookie("accessToken");
  });

  it("successfully login", () => {
    cy.visit("http://localhost:3000/login");

    cy.get("form").within(() => {
      cy.get('input[name="Username"]').type("vicky");
      cy.get('input[name="Password"]').type("secret");
      cy.get('button[type="submit"]').click();
    });

    cy.get('[aria-label="greeting user"]').should("have.text", "Hi, vicky");
  });

  it("show login error", () => {
    cy.visit("http://localhost:3000/login");

    cy.get("form").within(() => {
      cy.get('input[name="Username"]').type("vicky");
      cy.get('input[name="Password"]').type("notsecret");
      cy.get('button[type="submit"]').click();
    });

    cy.get(".MuiAlert-message").should(
      "have.text",
      "Incorrect username or password"
    );
  });
});
