// e2e/Cash Flow/Income & Expenses.cy.js
class IncomeAndExpenses {
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

    //Overseas Pension
    cy.wait(2000);
    cy.get(":nth-child(1) > .py-4").within(() => {
      cy.contains("Overseas Pensions");
      cy.contains("Quality Assurance");
      cy.get("img");
    });
    cy.get(
      ":nth-child(1) > .py-4 > .flex-column > .row > .col-12 > .d-flex > .mb-0"
    )
      .click()
      .should("be.visible");

    //Card Header
    cy.get(".modal-header").contains("Overseas Pensions");
    cy.get(".btn-close").should("be.visible");
    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");
      cy.get(".css-9jq23d").contains("Quality Assurance");
    });

    cy.get(".table").within(() => {
      //LifeTime Benefits Card
      cy.contains("Owner").should("be.visible");
      // Assert the input field has a value and is disabled
      cy.contains("Quality Assurance").should("be.visible");

      cy.contains("Other Taxable Income").should("be.visible");
      cy.get("#otherTaxableIncome").should("have.value", "$789");

      cy.contains("Include From Year").should("be.visible");
      cy.get(":nth-child(3) > .form-select").should("have.value", "1");

      cy.contains("Up Until Year").should("be.visible");
      cy.get(":nth-child(4) > .form-select").should("have.value", "30");

      cy.contains("Indexation").should("be.visible");
      cy.get(":nth-child(5) > .form-select").should("have.value", "2.50%");
    });

    //Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientcf_incomeFromOverseas").should("have.value", "$789");

    //Overseas Pension
    cy.wait(2000);
    cy.get(":nth-child(2) > .py-4").within(() => {
      cy.contains("Sole Trader Income");
      cy.contains("Quality Assurance");
      cy.get("img");
    });
    cy.get(':nth-child(2) > .py-4 > .flex-column > .row > .col-12 > .d-flex > .mb-0')
      .click()
      .should("be.visible");

    //Card Header
    cy.get(".modal-header").contains("Sole Trader Income");
    cy.get(".btn-close").should("be.visible");
    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");
      cy.get(".css-9jq23d").contains("Quality Assurance");
    });

    cy.get(".table").within(() => {
      //LifeTime Benefits Card
      cy.contains("Owner").should("be.visible");
      // Assert the input field has a value and is disabled
      cy.contains("Quality Assurance").should("be.visible");

      cy.contains("Net Business Income").should("be.visible");
      cy.get('#netBusinessIncome').should("have.value", "$56,745");

      cy.contains("Include From Year").should("be.visible");
      cy.get(":nth-child(3) > .form-select").should("have.value", "1");

      cy.contains("Up Until Year").should("be.visible");
      cy.get(":nth-child(4) > .form-select").should("have.value", "30");

      cy.contains("Indexation").should("be.visible");
      cy.get(":nth-child(5) > .form-select").should("have.value", "2.50%");
    });

    //Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get('#netBusinessIncome').should("have.value", "$56,745");
  }
}
export default IncomeAndExpenses;
