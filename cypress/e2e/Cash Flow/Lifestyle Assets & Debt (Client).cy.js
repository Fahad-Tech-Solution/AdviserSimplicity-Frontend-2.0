// e2e/Cash Flow/Income & Expenses.cy.js
class ClientLifestyleAssetsandDebt {
  section() {
    cy.visit(Cypress.env('CashFlowUrl'));  // Access URL from cypress.env.json

    cy.get("img").click();
    cy.get(
      ".mx-0 > .Custom_Accordion > .accordion-item > .accordion-header > .accordion-button"
    ).click();
    cy.get(
      ":nth-child(6) > :nth-child(7) > :nth-child(1) > div > button"
    ).click();
    cy.contains("Edit").click();
    cy.wait(2000);
    cy.get(
      "li.m-0.p-0 > .Custom_Accordion > .accordion-item > .accordion-header > .accordion-button"
    ).click();
    cy.get("#cashFlow").click();

    cy.get(":nth-child(6) > .accordion-header > .accordion-button").click();
    cy.get(
      ":nth-child(6) > .accordion-collapse > .accordion-body > :nth-child(1) > :nth-child(1) > :nth-child(3) > .mt-4 > .table-responsive > .table > tbody > tr > :nth-child(6) > .ant-dropdown-trigger"
    ).click();
    cy.get(".ant-dropdown-menu").within(() => {
      cy.contains("Edit").click();
    });
    cy.wait(3000);

    cy.get(".btn").click();

    //LifeStyle Assets and Debt Navbar Icon :
    cy.get(".mt-2 > .col-md-12").within(() => {
      cy.get(".bgColor").click();
    });

    //Contents
    cy.wait(2000);
    cy.get(":nth-child(2) > .py-4").within(() => {
      cy.contains("Contents");
      cy.contains("Contents");
      cy.get("img");
    });
    cy.get(
      ":nth-child(2) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0"
    )
      .click()
      .should("be.visible");

    //Card Header
    //Use only for remove partner When Run code with Client only

    cy.get(".modal-header").contains("Contents");
    cy.get(".btn-close").should("be.visible");
    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");

      cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");
    });

    cy.get(".table").within(() => {
      cy.contains("Owner").should("be.visible");

      cy.contains("Aiden Smith").should("be.visible");

      cy.contains("Current Value").should("be.visible");
      cy.get("#currentValue").clear().type("100");

      cy.contains("Sell In Year").should("be.visible");
      cy.get(":nth-child(3) > .form-select").should("have.value", "No");

      cy.contains("New Purchase").should("be.visible");
      cy.get("#newPurchase").clear().type("100");

      cy.contains("Purchase In Year").should("be.visible");
      cy.get(":nth-child(5) > .form-select").should("have.value", "30");

      cy.contains("Indexation").should("be.visible");
      cy.get(":nth-child(6) > .form-select").should("have.value", "2.50%");
    });

    //Contents Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientcf_contents").should("have.value", "$100");

    //Car
    cy.wait(2000);
    cy.get(":nth-child(3) > .py-4").within(() => {
      cy.contains("Car");
      cy.contains("Aiden Smith");
      cy.get("img");
    });
    cy.get(
      ":nth-child(3) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0"
    )
      .click()
      .should("be.visible");

    //Card Header
    //Use only for remove partner When Run code with Client only
    cy.get(":nth-child(2) > .css-v7duua").click();
    cy.get(".modal-header").contains("Car");
    cy.get(".btn-close").should("be.visible");
    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");
      cy.get(".css-9jq23d").contains("Aiden Smith");
    });

    cy.get(".table").within(() => {
      cy.contains("Owner").should("be.visible");

      cy.contains("Aiden Smith").should("be.visible");

      cy.contains("Current Value").should("be.visible");
      cy.get("#currentValue").clear().type("100");

      cy.contains("Sell In Year").should("be.visible");
      cy.get(":nth-child(3) > .form-select").should("have.value", "No");

      cy.contains("New Purchase").should("be.visible");
      cy.get("#newPurchase").clear().type("943");

      cy.contains("Purchase In Year").should("be.visible");
      cy.get(":nth-child(5) > .form-select").should("have.value", "30");

      cy.contains("Indexation").should("be.visible");
      cy.get(":nth-child(6) > .form-select").should("have.value", "2.50%");
    });

    //Car Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientcf_car").should("have.value", "$100");

    // //Motor Vehicle 2
    // cy.wait(2000);
    // cy.get(':nth-child(4) > .py-4').within(() => {
    //   cy.contains("Motor Vehicle 2");
    //   cy.contains("Aiden Smith");
    //   cy.get("img");
    // });
    // cy.get(':nth-child(4) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0')
    //   .click()
    //   .should("be.visible");

    // //Card Header
    // //Use only for remove partner When Run code with Client only
    // cy.get(":nth-child(2) > .css-v7duua").click();
    // cy.get(".modal-header").contains("Motor Vehicle 2");
    // cy.get(".btn-close").should("be.visible");
    // cy.get(".col-md-12 > .d-flex").within(() => {
    //   cy.contains("Owner");
    //   cy.get('.css-1lx7dxn').type("Aiden Smith{enter}")
    // });

    // cy.get(".table").within(() => {
    //   cy.contains("Owner").should("be.visible");

    //   cy.contains("Aiden Smith").should("be.visible");

    //   cy.contains("Current Value").should("be.visible");
    //   cy.get('#currentValue').clear().type("487")

    //   cy.contains("Sell In Year").should("be.visible");
    //   cy.get(':nth-child(3) > .form-select').should("have.value", "No");

    //   cy.contains("New Purchase").should("be.visible");
    //   cy.get('#newPurchase').clear().type("100")

    //   cy.contains("Purchase In Year").should("be.visible");
    //   cy.get(':nth-child(5) > .form-select').should("have.value", "30");

    //   cy.contains("Indexation").should("be.visible");
    //   cy.get(':nth-child(6) > .form-select').should("have.value", "2.50%");
    // });

    // //Motor Vehicle 2 Footer
    // cy.get(".modal-footer").within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });

    // cy.get('#clientcf_motorVehicle2').should("have.value", "$487");

    //Other Assets
    cy.wait(2000);
    cy.get(":nth-child(6) > .py-4").within(() => {
      cy.contains("Other Assets");
      cy.contains("Other Assets");

      cy.get("img");
    });
    cy.get(
      ":nth-child(6) > .py-4 > .flex-column > .row > .col-12 > .d-flex > .mb-0"
    )
      .click()
      .should("be.visible");

    //Other Assets Card Header

    cy.get(".modal-header").contains("Other Assets");
    cy.get(".btn-close").should("be.visible");
    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");
      cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");
      //cy.get(".css-9jq23d").contains("Aiden Smith");
    });

    cy.get(".table").within(() => {
      cy.contains("Owner").should("be.visible");

      cy.contains("Aiden Smith").should("be.visible");

      cy.contains("Current Value").should("be.visible");
      cy.get("#currentValue").clear().type("100");

      cy.contains("Sell In Year").should("be.visible");
      cy.get(":nth-child(3) > .form-select").should("have.value", "No");

      cy.contains("New Purchase").should("be.visible");
      cy.get("#newPurchase").clear().type("100");

      cy.contains("Purchase In Year").should("be.visible");
      cy.get(":nth-child(5) > .form-select").should("have.value", "30");

      cy.contains("Indexation").should("be.visible");
      cy.get(":nth-child(6) > .form-select").should("have.value", "2.50%");
    });

    //Other Assets Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientcf_otherAssets").should("have.value", "$100");
  }
}
export default ClientLifestyleAssetsandDebt;
