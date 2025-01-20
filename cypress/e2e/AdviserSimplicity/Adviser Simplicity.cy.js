/// <reference types="cypress" />

describe("Adviser Simplicity", () => {
  it("Test 1", () => {
    cy.visit("http://ec2-3-25-227-176.ap-southeast-2.compute.amazonaws.com/");

    cy.get(":nth-child(6) > :nth-child(7)").click();
    cy.get("#popover > :nth-child(3)").click();

    cy.get(":nth-child(2) > .btn").click();

    cy.get(".px-5")
      .should("be.visible")
      .within(() => {
        // Click and verify the first option
        cy.get(":nth-child(1) > .d-flex > .border")
          .as("btn1")
          .should("be.visible")
          .click();
        cy.get("img").should("be.visible");
        cy.contains("Investment Properties").should("be.visible");

        // Click and verify the second option
        cy.get(":nth-child(2) > .d-flex > .border")
          .as("btn2")
          .should("be.visible")
          .click();
        cy.get("img").should("be.visible");
        cy.contains("Personal Insurance").should("be.visible");

        // Click and verify the third option
        cy.get(":nth-child(3) > .d-flex > .border")
          .as("btn3")
          .should("be.visible")
          .click();
        cy.get("img").should("be.visible");
        cy.contains("A Company (Pty Ltd) Structure to run a business").should(
          "be.visible"
        );

        // Click and verify the fourth option
        cy.get("img").should("be.visible");
        cy.contains("A Self-Managed Super Fund").should("be.visible");

        // Click and verify the fifth option
        cy.get("img").should("be.visible");
        cy.contains("An Investment Family Trust").should("be.visible");
      });

    cy.get(".bgColor").contains("Next").click();
    cy.get(".pb-4 > :nth-child(1) > .QuestionIcon > .img-fluid").click();

    cy.get(".modal-content").contains("Questions").should("be.visible");
    cy.get(".btn-close").should("be.visible");

    // Run this code then add data on first time:
    // cy.get('.ant-notification-notice').should('be.visible')
    //   .contains('User Data Successfully Saved!')

    // cy.get(':nth-child(1) > .d-flex > .border').click()
    // cy.contains('Overseas Pensions')

    // cy.get(':nth-child(2) > .d-flex > .border').click();
    // cy.contains('Sole Trader Income')

    // cy.get(':nth-child(3) > .d-flex > .border').click();
    // cy.contains('Partnership Income')

    // cy.get(':nth-child(4) > .d-flex > .border').click();
    // cy.contains('Centrelink Payments/Benefits')

    // cy.get(':nth-child(5) > .d-flex > .border').click();
    // cy.contains('Lifetime/Defined Benefit Super Pensions')

    // cy.get(':nth-child(6) > .d-flex > .border').click();
    // cy.contains('Employment Income')

    // Test for the "Close" button
    cy.get("button")
      .contains("Close")
      .should("be.visible")
      .and("not.be.disabled");

    // Test for the "Submit" button
    cy.get("button")
      .contains("Submit")
      .should("be.visible")
      .and("not.be.disabled")
      .click();

    cy.get(".ant-notification-notice").contains('Data of "Questions" is Saved');

    cy.get(".pb-4 > .container-fluid").within(() => {
      //Employement Income
      cy.get(":nth-child(1) > .py-4").contains("Employement Income");
      cy.get(
        ":nth-child(1) > .py-4 > :nth-child(3) > .col-12 > .d-flex > .mb-0"
      ).click();

      cy.get(".btn-close");

      cy.contains("Employement Income");

      // //Sole Trader
      // cy.get(':nth-child(1) > .py-4').contains('Sole Trader').click();

      // //Partnership
      // cy.get(':nth-child(1) > .py-4').contains('Partnership').click();

      // //Centerlink Payments
      // cy.get(':nth-child(1) > .py-4').contains('Centerlink Payments').click();

      // //LifeTime Benefits
      // cy.get(':nth-child(1) > .py-4').contains('LifeTime Benefits').click();

      // //Overseas Pension
      // cy.get(':nth-child(1) > .py-4').contains('Overseas Pension').click();

      // //Regular Living Expenses
      // cy.get(':nth-child(1) > .py-4').contains('Regular Living Expenses').click();
    });
  });
});
