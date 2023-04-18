/// <reference types="Cypress" />
import wallet from "../fixtures/wallet.json";

describe("SendCrypto", () => {
  it("successfully send crypto", () => {
    cy.visit("http://localhost:3000/login");

    cy.get("form").within(() => {
      cy.get('input[name="Username"]').type("vicky");
      cy.get('input[name="Password"]').type("secret");
      cy.get('button[type="submit"]').click();
    });

    // cy.wait(1000);

    cy.intercept("GET", "**/wallet", { ...wallet }).as("getWallet");

    cy.wait("@getWallet");
    //start send crypto flow
    cy.get('button[name="Send crypto"]').click();

    cy.wait(1000);

    //select a contact
    cy.get('[data-contact="Pablo"]').click();

    cy.wait(1000);

    //select currency
    cy.get('[data-currency="ETH"]').click();

    //set amount and description
    cy.get("form").within(() => {
      const submitButton = cy.get('button[type="submit"]');
      submitButton.should("be.disabled");

      cy.get('input[name="Amount"]').type("0.1");
      cy.wait(500);

      cy.get('[aria-label="amount input error massage"]').should(
        "have.text",
        "The value is greater than your balance"
      );

      cy.wait(500);
      submitButton.should("be.disabled");

      cy.get('input[name="Amount"]').clear();
      cy.get('input[name="Amount"]').type("0.000001");

      cy.get('textarea[name="Description"]').type("this is the way");

      submitButton.click();
    });

    cy.wait(1000);

    //summary
    cy.get("[data-receiver]").should("have.text", "Pablo");
    cy.get("[data-amount]").should("have.text", "0.000001 ETH");
    cy.get("[data-description]").should("have.text", "this is the way");

    cy.intercept("POST", "/wallet/send", {
      statusCode: 201,
      body: {
        amount: 0.000001,
        currency: "ETH",
        description: "this is the way",
        receiver: "pablo@belvo.com",
      },
    }).as("sendCrypto");

    cy.get('button[name="Send"]').click();

    cy.wait("@sendCrypto");

    cy.get('button[name="Close"]').click();

    cy.wait(500);

    cy.get('[aria-label="greeting user"]').should("have.text", "Hi, vicky");
  });
});
