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
      cy.contains("Owner").should("be.visible");

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

    //Overseas Pension Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientcf_incomeFromOverseas").should("have.value", "$789");

    //Sole Trader Income
    cy.wait(2000);
    cy.get(":nth-child(2) > .py-4").within(() => {
      cy.contains("Sole Trader Income");
      cy.contains("Quality Assurance");
      cy.get("img");
    });
    cy.get(
      ":nth-child(2) > .py-4 > .flex-column > .row > .col-12 > .d-flex > .mb-0"
    )
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
      cy.contains("Owner").should("be.visible");

      cy.contains("Quality Assurance").should("be.visible");

      cy.contains("Net Business Income").should("be.visible");
      cy.get("#netBusinessIncome").should("have.value", "$56,745");

      cy.contains("Include From Year").should("be.visible");
      cy.get(":nth-child(3) > .form-select").should("have.value", "1");

      cy.contains("Up Until Year").should("be.visible");
      cy.get(":nth-child(4) > .form-select").should("have.value", "30");

      cy.contains("Indexation").should("be.visible");
      cy.get(":nth-child(5) > .form-select").should("have.value", "2.50%");
    });

    //Sole Trader Income Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#netBusinessIncome").should("have.value", "$56,745");

    //PartnerShip Income

    cy.wait(2000);
    cy.get(":nth-child(3) > .py-4").within(() => {
      cy.contains("Partnership Income");
      cy.contains("Quality Assurance");
      cy.get("img");
    });
    cy.get(
      ":nth-child(3) > .py-4 > .flex-column > .row > .col-12 > .d-flex > .mb-0"
    )
      .click()
      .should("be.visible");

    //Card Header
    cy.get(".modal-header").contains("Partnership Income");
    cy.get(".btn-close").should("be.visible");
    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");
      cy.get(".css-9jq23d").contains("Quality Assurance");
    });

    cy.get(".table").within(() => {
      cy.contains("Owner").should("be.visible");

      cy.contains("Quality Assurance").should("be.visible");

      cy.contains("Net Business Income").should("be.visible");
      cy.get("#netBusinessIncome").should("have.value", "$896");

      cy.contains("Include From Year").should("be.visible");
      cy.get(":nth-child(3) > .form-select").should("have.value", "1");

      cy.contains("Up Until Year").should("be.visible");
      cy.get(":nth-child(4) > .form-select").should("have.value", "30");

      cy.contains("Indexation").should("be.visible");
      cy.get(":nth-child(5) > .form-select").should("have.value", "2.50%");
    });

    //PartnerShip Income Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientcf_incomeFromPartnership").should("have.value", "$896");

    //Centrelink Payments/Benefits
    cy.wait(2000);
    cy.get(":nth-child(4) > .py-4").within(() => {
      cy.contains("Centrelink Payments/Benefits");
      cy.contains("Quality Assurance");
      cy.get("img");
    });
    cy.get(
      ":nth-child(4) > .py-4 > .flex-column > .row > .col-12 > .d-flex > .mb-0"
    )
      .click()
      .should("be.visible");

    //Card Header
    cy.get(".modal-header").contains("Centrelink Payments/Benefits");
    cy.get(".btn-close").should("be.visible");
    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");
      cy.get(".css-9jq23d").contains("Quality Assurance");
    });

    cy.get(".table").within(() => {
      cy.contains("Owner").should("be.visible");

      cy.contains("Quality Assurance").should("be.visible");

      cy.contains("Centrelink Payment").should("be.visible");
      cy.get(
        "tr > :nth-child(2) > .css-b62m3t-container > .css-14gfs0a-control > .css-1lcv7hw > .css-1p3m7a8-multiValue > .css-9jq23d"
      )
        .contains("Age Pension")
        .should("be.visible");

      cy.contains("Include From Year").should("be.visible");
      cy.get(".form-select").should("have.value", "1");

      cy.contains("Allow Carer Allowance").should("be.visible");
      cy.get(
        ":nth-child(4) > .css-b62m3t-container > .css-14gfs0a-control > .css-1lcv7hw > .css-1p3m7a8-multiValue > .css-9jq23d"
      )
        .contains("Age Pension")
        .should("be.visible");

      cy.contains("Is Client Renting").should("be.visible");
      cy.get(
        ":nth-child(5) > .css-b62m3t-container > .css-14gfs0a-control > .css-1lcv7hw > .css-1p3m7a8-multiValue > .css-9jq23d"
      )
        .contains("Age Pension")
        .should("be.visible");

      cy.contains("Apply Separated By illness").should("be.visible");
      cy.get(".radioButton2").contains("No").click();
    });

    // Centrelink Payments/Benefits Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientcf_incomeFromCentrelink").should("have.value", "Year 1");

    //Lifetime Benefits
    cy.wait(2000);
    cy.get(":nth-child(3) > .py-4").within(() => {
      cy.contains("Partnership Income");
      cy.contains("Quality Assurance");
      cy.get("img");
    });
    cy.get(
      ":nth-child(5) > .py-4 > .flex-column > .row > .col-12 > .d-flex > .mb-0"
    )
      .click()
      .should("be.visible");

    //Card Header
    cy.get(".modal-header").contains("Lifetime Benefits");
    cy.get(".btn-close").should("be.visible");
    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");
      cy.get(".css-9jq23d").contains("Quality Assurance");
    });

    cy.get(".table").within(() => {
      cy.contains("Owner").should("be.visible");

      cy.contains("Quality Assurance").should("be.visible");

      cy.contains("Lifetime Pension Income").should("be.visible");
      cy.get("#lifetimePensionIncome").should("have.value", "$20,514");

      cy.contains("Include From Year").should("be.visible");
      cy.get(":nth-child(3) > .form-select").should("have.value", "1");

      cy.contains("Up Until Year").should("be.visible");
      cy.get(":nth-child(4) > .form-select").should("have.value", "30");

      cy.contains("Indexation").should("be.visible");
      cy.get(":nth-child(5) > .form-select").should("have.value", "2.50%");

      cy.contains("Tax-Free").should("be.visible");
      cy.get(".radioButton2").contains("Yes").click();

      cy.contains("Centrelink Deductible Amount").should("be.visible");
      cy.get("#centrelinkDeductibleAmount").should("have.value", "$896");
    });

    // Lifetime Benefits Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientcf_incomeFromLifeTimePension").should(
      "have.value",
      "$20,514"
    );

    //Lifetime Benefits
    cy.wait(2000);
    cy.get(":nth-child(7) > .py-4").within(() => {
      cy.contains("Regular Living Expenses");
      cy.contains("Regular Living Expenses");
      cy.get("img");
    });
    cy.get(
      ":nth-child(7) > .py-4 > .flex-column > .row > .col-12 > .d-flex > .mb-0"
    )
      .click()
      .should("be.visible");

    //Card Header
    cy.get(".modal-header").contains("Regular Living Expenses");
    cy.get(".btn-close").should("be.visible");

    cy.get(".table").within(() => {
      cy.contains("Owner").should("be.visible");

      cy.contains("Quality Assurance").should("be.visible");

      cy.contains("Expenses").should("be.visible");
      cy.get(":nth-child(2) > .form-select").select("Living Expenses");

      cy.contains("Amount").should("be.visible");
      cy.get("#amount").clear().type("$20514");

      cy.contains("Include From Year").should("be.visible");
      cy.get(":nth-child(4) > .form-select").should("have.value", "1");

      cy.contains("Up Until Year").should("be.visible");
      cy.get(":nth-child(5) > .form-select").should("have.value", "30");

      cy.contains("Indexation").should("be.visible");
      cy.get(":nth-child(6) > .form-select").should("have.value", "2.50%");
    });

    // Lifetime Benefits Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientcf_incomeFromRegularLivingExpense").should(
      "have.value",
      "$20,514"
    );
  }
}
export default IncomeAndExpenses;
