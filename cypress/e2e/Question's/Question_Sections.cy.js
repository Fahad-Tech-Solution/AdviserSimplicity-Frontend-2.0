class Questions_section {
  visitAndCheck() {
    cy.visit("http://ec2-54-253-45-171.ap-southeast-2.compute.amazonaws.com/ImportantQuestion");

    cy.get(".px-5")
      .should("be.visible")
      .within(() => {
        // Click and verify the first option
        cy.get(":nth-child(1) > .d-flex > .border")
          .as('btn1')
          .should("be.visible")
          .click();
        cy.get('img').should("be.visible");
        cy.contains("Investment Properties").should("be.visible");

        // Click and verify the second option
        cy.get(":nth-child(2) > .d-flex > .border")
          .as('btn2')
          .should("be.visible")
          .click();
        cy.get('img').should("be.visible");
        cy.contains("Personal Insurance").should("be.visible");

        // Click and verify the third option
        cy.get(":nth-child(3) > .d-flex > .border")
          .as('btn3')
          .should("be.visible")
          .click();
        cy.get('img').should("be.visible");
        cy.contains("A Company (Pty Ltd) Structure to run a business").should("be.visible");

        // Click and verify the fourth option
        cy.get(":nth-child(4) > .d-flex > .border")
          .as('btn4')
          .should("be.visible")
          .click();
        cy.get('img').should("be.visible");
        cy.contains("A Self-Managed Super Fund").should("be.visible");

        // Click and verify the fifth option
        cy.get(":nth-child(5) > .d-flex > .border")
          .as('btn5')
          .should("be.visible")
          .click();
        cy.get('img').should("be.visible");
        cy.contains("An Investment Family Trust").should("be.visible");
      });

    cy.get('.pb-4 > :nth-child(1) > .QuestionIcon > .img-fluid');
  }
}

export default Questions_section;
