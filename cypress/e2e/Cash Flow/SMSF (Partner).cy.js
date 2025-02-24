/// <reference types="cypress" />
class PartnerSMSF {
  section() {
    cy.visit("http://ec2-54-66-20-19.ap-southeast-2.compute.amazonaws.com/");

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

    cy.wait(3000);
    cy.get(".bgColor").click();
    cy.wait(3000);
    cy.get(".bgColor").click();
    cy.wait(3000);

    cy.get(".bgColor").click();

    cy.wait(3000);

    cy.get(".bgColor").click();

    //SMSF Investment Properties
    cy.wait(2000);
    cy.get(":nth-child(9) > .py-4").within(() => {
      cy.contains("SMSF Investment Properties");
      cy.get("img");
      cy.contains("Market Value");
      cy.contains("Loan Balance");
    });
    cy.get(
      ":nth-child(9) > .py-4 > .flex-column > .row > :nth-child(1) > .d-flex > .mb-0"
    ).click();
    cy.get(".modal-content").within(() => {
      cy.contains("SMSF Investment Properties");
      cy.get(".btn-close");
    });

    cy.wait(2000);
    cy.get(".table").within(() => {
      cy.contains("Street Address");
      cy.get("#streetAddress")
        .invoke("val")
        .should((actualValue) => {
          expect(actualValue.trim()).to.equal("99");
        });

      cy.contains("Value of Property").should("be.visible");
      cy.get("#valueOfProperty").clear().type("24").should("have.value", "$24");

      cy.contains("State").should("be.visible");
      cy.get(":nth-child(4) > .form-select").select("ACT");

      cy.contains("Year Of Purchase");
      cy.get(":nth-child(5) > .form-select")
        .select("1")
        .should("have.value", "1");

      cy.contains("Expected Growth Rate");
      cy.get("#expectedGrowthRate").should("have.value", "2.50%");
      cy.contains("Sell Property in Year");
      cy.get(":nth-child(10) > .form-select").select("2");

      cy.contains("Estimated Future Selling Cost (%)");
      cy.get(":nth-child(11) > .form-select").select("2.50%");

      cy.get(":nth-child(6) > .d-flex > .btn").click();
    });

    //Loan Attachment Inner Card
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    ).within(() => {
      cy.contains("Total Cost Base");
      //cy.get('[style="display: block;"] > .modal-dialog > .modal-content > .modal-header > .btn-close').should('be.visible')
    });

    cy.get(
      ":nth-child(1) > .col-md-12 > .row > .mt-4 > .table-responsive"
    ).within(() => {
      cy.contains("Stamp Duty");
      Cypress.on("uncaught:exception", (err, runnable) => {
        return false; // Prevent Cypress from failing the test
      });

      cy.get(":nth-child(1) > .form-select").select("Manual");

      cy.get("#stampDutyValue").clear().type("170");
      cy.contains("Other Purchase Costs");
      cy.get("#otherPurchaseCosts").clear().type("100");
      cy.contains("Cost Base (Existing)");
      cy.get("#costBaseExisting").clear().type("9");

      cy.contains("Total Cost Base");
      cy.get("#totalCostBase").should("have.value", "$294");
    });
    //Footer
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    ).within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });
    //Loan Attachment Inner Card End

    cy.wait(2000);

    cy.contains("Loan Balance");

    cy.get(":nth-child(8) > .form-check > .radioButton2")
      .contains("Yes")
      .click();
    cy.get("#button-addon2").click();

    //Loan Balance Inner Card
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    ).within(() => {
      cy.contains("Loan Balance");
      //cy.get('[style="display: block;"] > .modal-dialog > .modal-content > .modal-header > .btn-close').should('be.visible')
    });

    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-body > form > :nth-child(2) > .col-md-12 > .row > .mt-4 > .table-responsive > .table'
    ).within(() => {
      cy.contains("Loan Type");
      cy.get(":nth-child(2) > .form-select").select("I/Only");

      cy.contains("Loan Term");
      cy.get(":nth-child(3) > .form-select").select("10");

      cy.contains("Interest Only Period");
      cy.get(":nth-child(4) > .form-select").select("2");

      cy.contains("Interest Rate (p.a)");
      cy.get("#initialInterestRatePA").clear().type("3.00%");

      cy.contains("Deductible interest %");
      cy.get("#deductibleInterest").clear().type("3.00%");

      cy.contains("Minimum Repayments (p.a)");
      cy.get("#minimumRepaymentsPA");

      cy.contains("Apply Minimum Repayments OR");
      cy.get(".radioButton2").contains("Yes").click();

      cy.contains("Actual Annual Repayments");
      cy.get("#actualAnnualRepayments").should("have.value", "$52");

      cy.contains("Repay Loan in Year");
      cy.get('select[name="repayLoanInYear"]').select("5");

      cy.contains("Loan Balance");
      cy.get(".input-group").within(() => {
        cy.get("#button-addon2").click();
      });
    });

    //Loan Attachment Inner Card Loan Balance

    cy.get(
      ":nth-child(7) > .modal-dialog > .modal-content > .modal-header"
    ).within(() => {
      cy.contains("Loan Balance");
      //cy.get('[style="display: block;"] > .modal-dialog > .modal-content > .modal-header > .btn-close').should('be.visible')
    });

    cy.get(
      ":nth-child(7) > .modal-dialog > .modal-content > .modal-body > form > :nth-child(2) > .col-md-12 > .row > .mt-4 > .table-responsive > .table"
    ).within(() => {
      cy.contains("Loan to Value Ratio (LVR)");
      cy.get("#LVR").clear().type("77.00%");

      cy.contains("Loan Amount");
      cy.get("#loanAmount").clear().type("18").should("have.value", "$18");

      cy.contains("Loan Balance");
      cy.get(":nth-child(3) > #loanBalance");
    });
    //Loan Balance Inner Footer
    cy.get(
      ":nth-child(7) > .modal-dialog > .modal-content > .modal-footer"
    ).within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    //Home Loan Footer
    cy.contains("Close");
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer > .bgColor'
    )
      .contains("Submit")
      .click();

    //SMSF Investment Properties Footer
    cy.contains("Close").should("be.visible");
    cy.contains("Submit").should("be.visible").click();

    cy.get('[placeholder="Market Value"]').should("have.value", "$24");
  }
}
export default PartnerSMSF;
