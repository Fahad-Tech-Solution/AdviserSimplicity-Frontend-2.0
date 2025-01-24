// e2e/Cash Flow/Income & Expenses.cy.js
class PartnerLifestyleAssetsandDebt {
  section() {
    cy.visit("http://ec2-3-25-227-176.ap-southeast-2.compute.amazonaws.com/");

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

    //Car
    cy.wait(2000);
    cy.get(":nth-child(2) > .py-4").within(() => {
      cy.contains("Car");
      cy.contains("Aiden Smith");
      cy.get("img");
    });
    cy.get(
      ":nth-child(2) > .py-4 > .flex-column > .row > .col-12 > .d-flex > .mb-0"
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
      cy.get("#newPurchase").clear().type("100");

      cy.contains("Purchase In Year").should("be.visible");
      cy.get(":nth-child(5) > .form-select").should("have.value", "30");

      cy.contains("Indexation").should("be.visible");
      cy.get(":nth-child(6) > .form-select").should("have.value", "2.50%");
    });

    //PartnerShip Section :
    //cy.get(":nth-child(2) > .css-v7duua").click();

    cy.get(".css-1lcv7hw").type("Emma Taylor{enter}");

    cy.get(".table").within(() => {
      cy.get(":nth-child(2) > :nth-child(1) > th").contains("Emma Taylor");

      cy.get(":nth-child(2) > :nth-child(2) > #currentValue")
        .clear()
        .type("100");

      cy.get(":nth-child(2) > :nth-child(3) > .form-select").should(
        "have.value",
        "No"
      );

      cy.get(":nth-child(2) > :nth-child(4) > #newPurchase")
        .clear()
        .type("100");

      cy.get(":nth-child(2) > :nth-child(5) > .form-select")
        .select("30")
        .should("have.value", "30");

      cy.get(":nth-child(2) > :nth-child(6) > .form-select")
        .select("2.50%")
        .should("have.value", "2.50%");
    });

    //Car Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientcf_car").should("have.value", "$100");
    cy.get("#partnercf_car").should("have.value", "$100");

    //Boat
    cy.wait(2000);
    cy.get(":nth-child(3) > .py-4").within(() => {
      cy.contains("Boat");
      cy.contains("Boat");
      cy.get("img");
    });
    cy.get(
      ":nth-child(3) > .py-4 > .flex-column > .row > .col-12 > .d-flex > .mb-0"
    )
      .click()
      .should("be.visible");

    //Card Header

    cy.get(".modal-header").contains("Boat");
    cy.get(".btn-close").should("be.visible");
    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");
      cy.get(".css-9jq23d").contains("Aiden Smith + Emma Taylor");
    });

    cy.get(".table").within(() => {
      cy.contains("Owner").should("be.visible");

      cy.contains("Aiden Smith + Emma Taylor").should("be.visible");

      cy.contains("Current Value").should("be.visible");
      cy.get("#currentValue").should("have.value", "$11");

      cy.contains("Sell In Year").should("be.visible");
      cy.get(":nth-child(3) > .form-select").should("have.value", "17");

      cy.contains("New Purchase").should("be.visible");
      cy.get("#newPurchase").should("have.value", "$1");

      cy.contains("Purchase In Year").should("be.visible");
      cy.get(":nth-child(5) > .form-select").should("have.value", "17");

      cy.contains("Indexation").should("be.visible");
      cy.get(":nth-child(6) > .form-select").should("have.value", "3.00%");
    });

    //Boat Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientcf_boat").should("have.value", "$11");
  }
}

export default PartnerLifestyleAssetsandDebt;
