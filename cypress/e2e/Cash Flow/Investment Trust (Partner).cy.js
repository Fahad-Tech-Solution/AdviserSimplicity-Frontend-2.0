/// <reference types="cypress" />
class PartnerInvestmentTrust {
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

    cy.wait(3000);
    cy.get(".bgColor").click();
    cy.wait(3000);
    cy.get(".bgColor").click();
    cy.wait(3000);
    //Finensial Investment
    cy.get(".bgColor").click();

    cy.wait(3000);

    //Business Entities
    cy.get(".bgColor").click();
    cy.wait(3000);
    //SMSF
    cy.get(".bgColor").click();

    // //West Family Trust Investment

    // cy.wait(2000);
    // cy.get(":nth-child(1) > .py-4").within(() => {
    //   cy.contains("West Family Trust Investment");
    //   cy.get("img");
    //   cy.contains("Aiden Smith");
    //   cy.contains("Emma Taylor");
    // });
    // cy.get(
    //   ":nth-child(1) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0"
    // ).click();
    // cy.get(".modal-content").within(() => {
    //   cy.contains("West Family Trust Investment");
    //   cy.get(".btn-close");
    // });

    // cy.get(".col-md-12 > .d-flex").within(() => {
    //   cy.contains("Owner");

    //   cy.get(".css-d07bj1 > :nth-child(1)").click();

    //   cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");
    // });

    // cy.wait(2000);
    // cy.get(".table").within(() => {
    //   cy.contains("Owner");
    //   cy.contains("Aiden Smith");

    //   cy.contains("% of Beneficiary Accounts").should("be.visible");
    //   cy.get("#percentOfBeneficiaryAccounts")
    //     .clear()
    //     .type("23.00")
    //     .should("have.value", "23.00");

    //   cy.contains("Total of Beneficiary Accounts").should("be.visible");
    //   cy.get("#totalOfBeneficiaryAccounts");

    //   cy.wait(1000);
    //   cy.contains("Distribution of Income/CGT");
    //   cy.get("#distributionOfIncomeCGT").clear().type("70.00");

    //   cy.contains("Distribution Taken as Cash");
    //   cy.get(".radioButton2").contains("Yes").click();

    //   cy.contains("Distribution Taken as Cash From Year");
    //   cy.get(".form-select").select("10").should("have.value", "10");

    //   cy.get("#percentOfBeneficiaryAccounts").should("have.value", "23.00%");
    //   cy.get("#distributionOfIncomeCGT").should("have.value", "70.00%");
    // });

    // //West Family Trust Investment Partner Section
    // cy.get(".css-1lx7dxn").type("Emma Taylor{enter}");

    // cy.contains("Emma Taylor").should("be.visible");

    // cy.contains("% of Beneficiary Accounts").should("be.visible");
    // cy.get(":nth-child(2) > :nth-child(2) > #percentOfBeneficiaryAccounts")
    //   .clear()
    //   .type("30.00");

    // cy.contains("Total of Beneficiary Accounts").should("be.visible");
    // cy.get(":nth-child(2) > :nth-child(3) > #totalOfBeneficiaryAccounts");

    // cy.wait(1000);

    // cy.get(":nth-child(2) > :nth-child(4) > #distributionOfIncomeCGT")
    //   .clear()
    //   .type("37.00");

    // cy.contains("Distribution Taken as Cash");
    // cy.get(":nth-child(2) > :nth-child(5) > .form-check > .radioButton2")
    //   .contains("Yes")
    //   .click();

    // cy.contains("Distribution Taken as Cash From Year");
    // cy.get(":nth-child(2) > :nth-child(6) > .form-select")
    //   .select("10")
    //   .should("have.value", "10");

    // cy.get(
    //   ":nth-child(2) > :nth-child(2) > #percentOfBeneficiaryAccounts"
    // ).should("have.value", "30.00%");
    // cy.get(":nth-child(2) > :nth-child(4) > #distributionOfIncomeCGT").should(
    //   "have.value",
    //   "37.00%"
    // );

    // //Partner Section West Family Trust Investment Footer

    // cy.contains("Close").should("be.visible");
    // cy.contains("Submit").should("be.visible").click();

    // cy.get("#clientcf_WestFamilyTrustInvestment").should(
    //   "have.value",
    //   "23.00%"
    // );
    // cy.get("#partnercf_WestFamilyTrustInvestment").should(
    //   "have.value",
    //   "30.00%"
    // );

    // //Family Trust Bank Account

    // cy.wait(2000);
    // cy.get(":nth-child(2) > .py-4").within(() => {
    //   cy.contains("Family Trust Bank Account");
    //   cy.get("img");
    //   cy.contains("Aiden Smith");
    //   cy.contains("Emma Taylor");
    // });
    // cy.get(
    //   ":nth-child(2) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0"
    // ).click();
    // cy.get(".modal-content").within(() => {
    //   cy.contains("Family Trust Bank Account");
    //   cy.get(".btn-close");
    // });

    // cy.get(".col-md-12 > .d-flex").within(() => {
    //   cy.contains("Owner");

    //   cy.get(".css-d07bj1 > :nth-child(1)").click();

    //   cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");
    // });

    // cy.wait(2000);
    // cy.get(".table").within(() => {
    //   cy.contains("Owner");
    //   cy.contains("Aiden Smith");

    // cy.contains("Opening Cash at Bank").should("be.visible");
    // cy.get("#openingCashAtBank").clear()
    //   .type("4,536").should("have.value", "$4,536");

    //   cy.contains("Investment Returns").should("be.visible");
    //   cy.get(":nth-child(3) > .form-select").select("Input Override");

    //   cy.wait(1000);
    //   cy.contains("Income Yield");
    //   cy.get("#incomeYield").clear().type("23");

    //   cy.contains("Accounting & Auditing Fees");
    //   cy.get("#accountingFees").clear().type("45").should("have.value", "$45");

    //   cy.contains("Adviser Service Fees");
    //   cy.get("#adviserFees").clear().type("23").should("have.value", "$23");

    //   cy.contains("Indexation of Fund Fees");
    //   cy.get(":nth-child(7) > .form-select").select("2.50%");

    //   cy.get("#incomeYield").should("have.value", "23.00%");
    // });

    // //Family Trust Bank Account Partner Section
    // cy.get(".css-1lx7dxn").type("Emma Taylor{enter}");

    // cy.contains("Emma Taylor").should("be.visible");

    // cy.contains("Opening Cash at Bank").should("be.visible");
    // cy.get(":nth-child(2) > :nth-child(2) > #openingCashAtBank")
    //   .clear()
    //   .type("24")
    //   .should("have.value", "$24");

    // cy.contains("Investment Returns").should("be.visible");
    // cy.get(":nth-child(2) > :nth-child(3) > .form-select").select(
    //   "Input Override"
    // );

    // cy.wait(1000);
    // cy.contains("Income Yield");
    // cy.get(":nth-child(2) > :nth-child(4) > #incomeYield")
    //   .clear()
    //   .type("79.00");

    // cy.contains("Accounting & Auditing Fees");
    // cy.get(":nth-child(2) > :nth-child(5) > #accountingFees")
    //   .clear()
    //   .type("45")
    //   .should("have.value", "$45");

    // cy.contains("Adviser Service Fees");
    // cy.get(":nth-child(2) > :nth-child(6) > #adviserFees")
    //   .clear()
    //   .type("23")
    //   .should("have.value", "$23");

    // cy.contains("Indexation of Fund Fees");
    // cy.get(":nth-child(2) > :nth-child(7) > .form-select").select("7.50%");

    // cy.get(":nth-child(2) > :nth-child(4) > #incomeYield").should(
    //   "have.value",
    //   "79.00%"
    // );

    // //Family Trust Bank Account Footer

    // cy.contains("Close").should("be.visible");
    // cy.contains("Submit").should("be.visible").click();

    // cy.get("#clientcf_FamilyTrustBankAccount").should("have.value", "$4,536");
    // cy.get("#partnercf_FamilyTrustBankAccount").should("have.value", "$24");

    // //Family Trust Term Deposits

    // cy.wait(2000);
    // cy.get(":nth-child(3) > .py-4").within(() => {
    //   cy.contains("Family Trust Term Deposits");
    //   cy.get("img");
    //   cy.contains("Aiden Smith");
    //   cy.contains("Emma Taylor");
    // });
    // cy.get(
    //   ":nth-child(3) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0"
    // ).click();
    // cy.get(".modal-content").within(() => {
    //   cy.contains("Family Trust Term Deposits");
    //   cy.get(".btn-close");
    // });

    // cy.get(".col-md-12 > .d-flex").within(() => {
    //   cy.contains("Owner");

    //   cy.get(".css-d07bj1 > :nth-child(1)").click();

    //   cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");
    // });

    // cy.wait(2000);
    // cy.get(".table").within(() => {
    //   cy.contains("Owner");
    //   cy.contains("Aiden Smith");

    //   cy.contains("Opening Balance").should("be.visible");
    //   cy.get("#openingBalance")
    //     .clear()
    //     .type("4,536")
    //     .should("have.value", "$4,536");

    //   cy.contains("Investment Returns").should("be.visible");
    //   cy.get(":nth-child(3) > .form-select").select("Input Override");

    //   cy.wait(1000);
    //   cy.contains("Income Yield");
    //   cy.get("#incomeYield")
    //     .clear()
    //     .type("23.00%")
    //     .invoke("val")
    //     .should("contain", "23.00");

    //   cy.contains("Reinvest income");
    //   cy.get("tbody > tr > :nth-child(5)").contains("Yes").click();

    //   cy.contains("Reinvest Up Until");
    //   cy.get(":nth-child(6) > .form-select")
    //     .select("10")
    //     .should("have.value", "10");

    //   cy.contains("Risk Profile/SAA");
    //   cy.get(":nth-child(7) > .form-select").select("Cash");

    //   cy.contains("Cashout in Year");
    //   cy.get(":nth-child(8) > .form-select")
    //     .select("2")
    //     .should("have.value", "2");
    // });

    // //SMSF Term Deposit Partner Section
    // cy.get(".css-1lx7dxn").type("Emma Taylor{enter}");

    // cy.contains("Emma Taylor").should("be.visible");

    // cy.contains("Opening Balance").should("be.visible");
    // cy.get(":nth-child(2) > :nth-child(2) > #openingBalance")
    //   .clear()
    //   .type("44")
    //   .should("have.value", "$44");

    // cy.contains("Investment Returns").should("be.visible");
    // cy.get(":nth-child(2) > :nth-child(3) > .form-select").select(
    //   "Input Override"
    // );

    // cy.wait(1000);
    // cy.contains("Income Yield");
    // cy.get(":nth-child(2) > :nth-child(4) > #incomeYield")
    //   .clear()
    //   .type("23.00%")
    //   .invoke("val")
    //   .should("contain", "23.00"); // Ensures value contains "23.00"

    // cy.contains("Reinvest income");
    // cy.get("tbody > :nth-child(2) > :nth-child(5)").contains("Yes").click();

    // cy.contains("Reinvest Up Until");
    // cy.get(":nth-child(2) > :nth-child(6) > .form-select")
    //   .select("23")
    //   .should("have.value", "23");

    // cy.contains("Risk Profile/SAA");
    // cy.get(":nth-child(2) > :nth-child(7) > .form-select").select("Cash");

    // cy.contains("Cashout in Year");
    // cy.get(":nth-child(2) > :nth-child(8) > .form-select")
    //   .select("13")
    //   .should("have.value", "13");

    // //Partner Section SMSF Term Deposit Inner Footer

    // cy.contains("Close").should("be.visible");
    // cy.contains("Submit").should("be.visible").click();

    // cy.get('#clientcf_WestFamilyTrustTermDeposits').should("have.value", "$4,536");
    // cy.get('#partnercf_WestFamilyTrustTermDeposits').should("have.value", "$44");

    //Family Trust Investment Loan

    cy.wait(2000);
    cy.get(":nth-child(7) > .py-4").within(() => {
      cy.contains("Family Trust Investment Loan");
      cy.get("img");
      cy.contains("Aiden Smith");
      cy.contains("Emma Taylor");
    });
    cy.get(
      ":nth-child(7) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0"
    ).click();
    cy.get(".modal-content").within(() => {
      cy.contains("Family Trust Investment Loan");
      cy.get(".btn-close");
    });

    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");

      cy.get(".css-d07bj1 > :nth-child(1)").click();

      cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");
    });

    cy.wait(2000);
    cy.get(".table").within(() => {
      cy.contains("Owner");
      cy.contains("Aiden Smith");
      //  cy.get("#streetAddress")
      //    .invoke("val")
      //    .should((actualValue) => {
      //      expect(actualValue.trim()).to.equal("FTS");
      //    });)

      cy.contains("Year of Loan");
      cy.get(":nth-child(2) > .form-select").select("21");

      cy.contains("Current Loan Balance").should("be.visible");
      cy.get("#currentLoanBalance")
        .clear()
        .type("24")
        .should("have.value", "$24");
      cy.contains("Loan Type").should("be.visible");
      cy.get(":nth-child(4) > .form-select").select("I/Only");

      cy.contains("Loan Term");
      cy.get(":nth-child(5) > .form-select").select("19");

      cy.contains("Interest Only Period");
      cy.get(":nth-child(6) > .form-select")
        .select("19")
        .should("have.value", "19");

      cy.contains("Initial Interest Rate (p.a.)");
      cy.get("#initialInterestRate").clear().type("20.00%");

      cy.contains("Deductible interest");
      cy.get("#deductibleInterest").clear().type("20.00%");

      cy.contains("Minimum Repayments (p.a)");
      cy.get("#minimumRepayments");

      cy.contains("Apply Minimum Repayments OR");
      cy.get("tbody > tr > :nth-child(10)").contains("Yes").click();

      cy.contains("Actual Annual Repayments");
      cy.get("#actualAnnualRepayments")
        .clear()
        .type("20")
        .should("have.value", "$20");

      cy.contains("Repay Loan in Year");
      cy.get(":nth-child(12) > .form-select").should("have.value", "No");
    });

    //Investment Loans (LOC) Inner Footer

    // Partner Section
    cy.get(".css-1lx7dxn").type("Emma Taylor{enter}");

    cy.contains("Emma Taylor").should("be.visible");

    cy.contains("Year of Loan");
    cy.get(":nth-child(2) > :nth-child(2) > .form-select").select("21");

    cy.contains("Current Loan Balance").should("be.visible");
    cy.get(":nth-child(2) > :nth-child(3) > #currentLoanBalance")
      .clear()
      .type("24")
      .should("have.value", "$24");

    cy.contains("Loan Type").should("be.visible");
    cy.get(":nth-child(2) > :nth-child(4) > .form-select").select("I/Only");

    cy.contains("Loan Term");
    cy.get(":nth-child(2) > :nth-child(5) > .form-select").select("19");

    cy.contains("Interest Only Period");
    cy.get(":nth-child(2) > :nth-child(6) > .form-select").select("19");

    cy.contains("Initial Interest Rate (p.a.)");
    cy.get(":nth-child(2) > :nth-child(7) > #initialInterestRate")
      .clear()
      .type("20.00%");
    cy.contains("Deductible interest");
    cy.get(":nth-child(2) > :nth-child(8) > #deductibleInterest")
      .clear()
      .type("20.00%");

    cy.contains("Minimum Repayments (p.a)");
    cy.get(":nth-child(2) > :nth-child(9) > #minimumRepayments");

    cy.contains("Apply Minimum Repayments OR");
    cy.get(":nth-child(2) > :nth-child(10) > .form-check > .radioButton2")
      .contains("Yes")
      .click();

    cy.contains("Actual Annual Repayments");
    cy.get(":nth-child(2) > :nth-child(11) > #actualAnnualRepayments")
      .clear()
      .type("20")
      .should("have.value", "$20");

    cy.contains("Repay Loan in Year");
    cy.get(":nth-child(2) > :nth-child(12) > .form-select").select("14");

    cy.contains("Close").should("be.visible");
    cy.contains("Submit").should("be.visible").click();

    cy.get("#clientcf_FamilyTrustInvestmentLoan").should("have.value", "$20");
    cy.get("#partnercf_FamilyTrustInvestmentLoan").should("have.value", "$20");
  }
}
export default PartnerInvestmentTrust;
