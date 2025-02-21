/// <reference types="cypress" />
class PartnerFinancialInvestments {
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

    //Income and Expense
    cy.wait(2000);
    cy.get(".bgColor").click();

    //Lifestyle Assets & Debt
    cy.wait(2000);
    cy.get(".bgColor").click();

    //Platform Investment

    cy.wait(2000);
    cy.get(":nth-child(2) > .py-4").within(() => {
      cy.contains("Platform Investment");
      cy.get("img");
      cy.contains("Aiden Smith");
      cy.contains("Emma Taylor");
    });
    cy.get(
      ":nth-child(2) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0"
    ).click();
    cy.get(".modal-content").within(() => {
      cy.contains("Platform Investment");
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
      //    });

      cy.contains("Current Balance").should("be.visible");
      cy.get("#currentBalance").clear().type("24").should("have.value", "$24");

      cy.contains("Cost Base").should("be.visible");
      cy.get("#costBase").clear().type("77").should("have.value", "$77");

      cy.contains("Regular Contributions");
      cy.get(":nth-child(6) > .form-check > .radioButton2")
        .contains("Yes")
        .click();
      cy.contains("Risk Profile/SAA");
      cy.get(":nth-child(7) > .form-select").select("Cash");

      cy.contains("Cashout Funds");
      cy.get(":nth-child(8) > .form-select").should("have.value", "No");

      cy.contains("Investment Returns");
      cy.get(".input-group > .form-select").select("Input Override");
      cy.wait(1000);
      cy.get(".modalBtn").eq(0).click({ force: true }); // Clicks the first button
    });

    //Investment Returns Inner Card
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    ).within(() => {
      cy.contains("Input Override");
      //cy.get('[style="display: block;"] > .modal-dialog > .modal-content > .modal-header > .btn-close').should('be.visible')
    });

    cy.get(".col-md-12 > .row > .mt-4").within(() => {
      cy.contains("Income Yield");
      cy.get("#incomeYield").clear().type("23").should("have.value", "23");
      //  Cypress.on("uncaught:exception", (err, runnable) => {
      //    return false; // Prevent Cypress from failing the test
      //  });

      cy.contains("Growth Rate");
      cy.get("#growthRate").clear().type("53").should("have.value", "53");
      cy.contains("Franking");
      cy.get("#franking").clear().type("66").should("have.value", "66");
    });
    //Investment Returns Footer
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    ).within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.wait(2000);
    cy.contains("Reinvest income");
    cy.get(":nth-child(5) > .form-check > .radioButton2")
      .contains("Yes")
      .click();

    //Regular Contributions
    cy.get("tbody > tr > :nth-child(6)").within(() => {
      cy.get("#button-addon2").click();
    });

    //Regular Contributions Inner Card End
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    ).within(() => {
      cy.contains("Regular Contributions");
      //cy.get('[style="display: block;"] > .modal-dialog > .modal-content > .modal-header > .btn-close').should('be.visible')
    });

    cy.get(".col-md-12 > .row > .mt-4").within(() => {
      cy.contains("Contribution");
      cy.get("#contribution").clear().type("100").should("have.value", "$100");

      cy.contains("Regular contributions p.a");
      cy.get("#regularContributions")
        .clear()
        .type("200")
        .should("have.value", "$200");

      cy.contains("Contribute from Year");
      cy.get(":nth-child(3) > .form-select").select("21");

      cy.contains("Contribute Up Until");
      cy.get(":nth-child(4) > .form-select").select("10");

      cy.contains("Indexation");
      cy.get(":nth-child(5) > .form-select").select("2.50%");
    });
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    ).within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    // Partner Section
    cy.get(".css-1lx7dxn").type("Emma Taylor{enter}");

    cy.contains("Emma Taylor").should("be.visible");

    cy.get(":nth-child(2) > :nth-child(2) > #currentBalance")
      .clear()
      .type("24")
      .should("have.value", "$24");

    cy.get(":nth-child(2) > :nth-child(3) > #costBase")
      .clear()
      .type("77")
      .should("have.value", "$77");

    cy.get(":nth-child(2) > :nth-child(5) > .form-check > .radioButton2")
      .contains("Yes")
      .click();

    cy.get(":nth-child(2) > :nth-child(7) > .form-select").select(
      "High Growth"
    );

    cy.get(":nth-child(2) > :nth-child(8) > .form-select")
      .select("13")
      .should("have.value", "13");

    cy.get(
      ":nth-child(2) > :nth-child(4) > .input-group > .form-select"
    ).select("Input Override");

    cy.get(":nth-child(2) > :nth-child(4) > .GInputSelect").within(() => {
      cy.get(".btn.bgColor.modalBtn.border-0.btn.btn-primary").click();
    });

    //Partner Section  Investment Returns Inner Card
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    ).within(() => {
      cy.contains("Input Override");
      //cy.get('[style="display: block;"] > .modal-dialog > .modal-content > .modal-header > .btn-close').should('be.visible')
    });
    cy.get(".col-md-12 > .row > .mt-4").within(() => {
      cy.contains("Income Yield");
      cy.get("#incomeYield").clear().type("23").should("have.value", "23");
      //  Cypress.on("uncaught:exception", (err, runnable) => {
      //    return false; // Prevent Cypress from failing the test
      //  });

      cy.contains("Growth Rate");
      cy.get("#growthRate").clear().type("53").should("have.value", "53");
      cy.contains("Franking");
      cy.get("#franking").clear().type("66").should("have.value", "66");
    });
    //Partner Section  Investment Returns Footer
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    ).within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.wait(2000);
    cy.contains("Reinvest income");

    //Partner Section  Regular Contributions
    cy.get(
      ":nth-child(2) > :nth-child(6) > .form-check > .radioButton2"
    ).within(() => {
      cy.contains("Yes").click();
    });

    cy.get("tbody > :nth-child(2) > :nth-child(6) > .d-flex").within(() => {
      cy.get(".btn.bgColor.modalBtn.border-0.btn.btn-primary").click();
    });

    // Partner Section  Regular Contributions Inner Card End
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    ).within(() => {
      cy.contains("Regular Contributions");
      //cy.get('[style="display: block;"] > .modal-dialog > .modal-content > .modal-header > .btn-close').should('be.visible')
    });

    cy.get(".col-md-12 > .row > .mt-4").within(() => {
      cy.contains("Contribution");
      cy.get("#contribution").clear().type("100").should("have.value", "$100");

      cy.contains("Regular contributions p.a");
      cy.get("#regularContributions")
        .clear()
        .type("200")
        .should("have.value", "$200");

      cy.contains("Contribute from Year");
      cy.get(":nth-child(3) > .form-select").select("21");

      cy.contains("Contribute Up Until");
      cy.get(":nth-child(4) > .form-select").select("10");

      cy.contains("Indexation");
      cy.get(":nth-child(5) > .form-select").select("2.50%");
    });
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    ).within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    //Partner Section Platform Investment Inner Footer

    cy.contains("Close").should("be.visible");
    cy.contains("Submit").should("be.visible").click();

    cy.get("#clientcf_AustralianShares").should("have.value", "$24");
    cy.get("#partnercf_AustralianShares").should("have.value", "$24");

    //Platform Investment

    cy.wait(2000);
    cy.get(":nth-child(2) > .py-4").within(() => {
      cy.contains("Platform Investment");
      cy.get("img");
      cy.contains("Aiden Smith");
      cy.contains("Emma Taylor");
    });
    cy.get(
      ":nth-child(2) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0"
    ).click();
    cy.get(".modal-content").within(() => {
      cy.contains("Platform Investment");
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
      //    });

      cy.contains("Current Balance").should("be.visible");
      cy.get("#currentBalance").clear().type("24").should("have.value", "$24");

      cy.contains("Cost Base").should("be.visible");
      cy.get("#costBase").clear().type("77").should("have.value", "$77");

      cy.contains("Regular Contributions");
      cy.get(":nth-child(6) > .form-check > .radioButton2")
        .contains("Yes")
        .click();
      cy.contains("Risk Profile/SAA");
      cy.get(":nth-child(7) > .form-select").select("Cash");

      cy.contains("Cashout Funds");
      cy.get(":nth-child(9) > .form-select").should("have.value", "No");

      cy.contains("Investment Returns");
      cy.get(".input-group > .form-select").select("Input Override");
      cy.wait(1000);
      cy.get(".modalBtn").eq(0).click({ force: true }); // Clicks the first button
    });

    //Investment Returns Inner Card
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    ).within(() => {
      cy.contains("Input Override");
      //cy.get('[style="display: block;"] > .modal-dialog > .modal-content > .modal-header > .btn-close').should('be.visible')
    });

    cy.get(".col-md-12 > .row > .mt-4").within(() => {
      cy.contains("Income Yield");
      cy.get("#incomeYield").clear().type("23").should("have.value", "23");
      //  Cypress.on("uncaught:exception", (err, runnable) => {
      //    return false; // Prevent Cypress from failing the test
      //  });

      cy.contains("Growth Rate");
      cy.get("#growthRate").clear().type("53").should("have.value", "53");
      cy.contains("Franking");
      cy.get("#franking").clear().type("66").should("have.value", "66");
    });
    //Investment Returns Footer
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    ).within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.wait(2000);
    cy.contains("Reinvest income");
    cy.get(":nth-child(5) > .form-check > .radioButton2")
      .contains("Yes")
      .click();

    //Regular Contributions
    cy.get("tbody > tr > :nth-child(6)").within(() => {
      cy.get("#button-addon2").click();
    });

    //Regular Contributions Inner Card End
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    ).within(() => {
      cy.contains("Regular Contributions");
      //cy.get('[style="display: block;"] > .modal-dialog > .modal-content > .modal-header > .btn-close').should('be.visible')
    });

    cy.get(".col-md-12 > .row > .mt-4").within(() => {
      cy.contains("Contribution");
      cy.get("#contribution").clear().type("100").should("have.value", "$100");

      cy.contains("Regular contributions p.a");
      cy.get("#regularContributions")
        .clear()
        .type("200")
        .should("have.value", "$200");

      cy.contains("Contribute from Year");
      cy.get(":nth-child(3) > .form-select").select("21");

      cy.contains("Contribute Up Until");
      cy.get(":nth-child(4) > .form-select").select("10");

      cy.contains("Indexation");
      cy.get(":nth-child(5) > .form-select").select("2.50%");
    });
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    ).within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    // Partner Section
    cy.get(".css-1lx7dxn").type("Emma Taylor{enter}");

    cy.contains("Emma Taylor").should("be.visible");

    cy.get(":nth-child(2) > :nth-child(2) > #currentBalance")
      .clear()
      .type("24")
      .should("have.value", "$24");

    cy.get(":nth-child(2) > :nth-child(3) > #costBase")
      .clear()
      .type("77")
      .should("have.value", "$77");

    cy.get(":nth-child(2) > :nth-child(5) > .form-check > .radioButton2")
      .contains("Yes")
      .click();

    cy.get(":nth-child(2) > :nth-child(7) > .form-select").select(
      "High Growth"
    );

    cy.get(":nth-child(2) > :nth-child(9) > .form-select")
      .select("13")
      .should("have.value", "13");

    cy.get(
      ":nth-child(2) > :nth-child(4) > .input-group > .form-select"
    ).select("Input Override");

    cy.get(":nth-child(2) > :nth-child(4) > .GInputSelect").within(() => {
      cy.get(".btn.bgColor.modalBtn.border-0.btn.btn-primary").click();
    });

    //Partner Section  Investment Returns Inner Card
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    ).within(() => {
      cy.contains("Input Override");
      //cy.get('[style="display: block;"] > .modal-dialog > .modal-content > .modal-header > .btn-close').should('be.visible')
    });
    cy.get(".col-md-12 > .row > .mt-4").within(() => {
      cy.contains("Income Yield");
      cy.get("#incomeYield").clear().type("23").should("have.value", "23");
      //  Cypress.on("uncaught:exception", (err, runnable) => {
      //    return false; // Prevent Cypress from failing the test
      //  });

      cy.contains("Growth Rate");
      cy.get("#growthRate").clear().type("53").should("have.value", "53");
      cy.contains("Franking");
      cy.get("#franking").clear().type("66").should("have.value", "66");
    });
    //Partner Section  Investment Returns Footer
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    ).within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.wait(2000);
    cy.contains("Reinvest income");

    //Partner Section  Regular Contributions
    cy.get(
      ":nth-child(2) > :nth-child(6) > .form-check > .radioButton2"
    ).within(() => {
      cy.contains("Yes").click();
    });

    cy.get("tbody > :nth-child(2) > :nth-child(6) > .d-flex").within(() => {
      cy.get(".btn.bgColor.modalBtn.border-0.btn.btn-primary").click();
    });

    // Partner Section  Regular Contributions Inner Card End
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    ).within(() => {
      cy.contains("Regular Contributions");
      //cy.get('[style="display: block;"] > .modal-dialog > .modal-content > .modal-header > .btn-close').should('be.visible')
    });

    cy.get(".col-md-12 > .row > .mt-4").within(() => {
      cy.contains("Contribution");
      cy.get("#contribution").clear().type("100").should("have.value", "$100");

      cy.contains("Regular contributions p.a");
      cy.get("#regularContributions")
        .clear()
        .type("200")
        .should("have.value", "$200");

      cy.contains("Contribute from Year");
      cy.get(":nth-child(3) > .form-select").select("21");

      cy.contains("Contribute Up Until");
      cy.get(":nth-child(4) > .form-select").select("10");

      cy.contains("Indexation");
      cy.get(":nth-child(5) > .form-select").select("2.50%");
    });
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    ).within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    //Partner Section Platform Investment Inner Footer

    cy.contains("Close").should("be.visible");
    cy.contains("Submit").should("be.visible").click();

    cy.get("#clientcf_AustralianShares").should("have.value", "$24");
    cy.get("#partnercf_AustralianShares").should("have.value", "$24");

    //Investments Property
    cy.wait(2000);
    cy.get(":nth-child(9) > .py-4").within(() => {
      cy.contains("Investments Property");
      cy.get("img");
      cy.contains("Market Value");
      cy.contains("Loan Balance");
    });
    cy.get(
      ":nth-child(9) > .py-4 > .flex-column > .row > :nth-child(1) > .d-flex > .mb-0"
    ).click();
    cy.get(".modal-content").within(() => {
      cy.contains("Investments Property");
      cy.get(".btn-close");
    });

    cy.wait(2000);
    cy.get(".table").within(() => {
      cy.contains("Street Address");
      cy.get("#streetAddress")
        .invoke("val")
        .should((actualValue) => {
          expect(actualValue.trim()).to.equal("FTS");
        });

      cy.contains("Value of Property").should("be.visible");
      cy.get("#valueOfProperty").should("have.value", "$24");

      cy.contains("Client %Ownership").should("be.visible");
      cy.get("#clientOwnership").clear().type("77").should("have.value", "77");

      cy.contains("Partner %Ownership");
      cy.get("#partnerOwnership").clear().type("77").should("have.value", "77");
      cy.contains("Year Of Purchase");
      cy.get(":nth-child(6) > .form-select")
        .select("1")
        .should("have.value", "1");

      cy.contains("Expected Growth Rate");
      cy.get("#expectedGrowthRate").should("have.value", "2.50%");
      cy.contains("Sell Property in Year");
      cy.get(":nth-child(11) > .form-select").should("have.value", "No");

      cy.contains("Convert into PPR in year");
      cy.get(":nth-child(12) > .form-select").should("have.value", "No");

      cy.contains("Convert into PPR in year");
      cy.get(":nth-child(12) > .form-select").should("have.value", "No");

      cy.get(":nth-child(7) > .d-flex > .btn").click();
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
      cy.get("#costBaseExisting").should("have.value", "$567");

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

    cy.get(":nth-child(9) > .form-check > .radioButton2")
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
      cy.get(":nth-child(2) > .form-select").should("have.value", "i/only");

      cy.contains("Loan Term");
      cy.get(":nth-child(3) > .form-select").should("have.value", "19");

      cy.contains("Interest Rate (p.a)");
      cy.get("#initialInterestRatePA").should("have.value", "22.00%");

      cy.contains("Deductible interest %");
      cy.get("#deductibleInterest").should("have.value", "33.00%");

      cy.contains("Minimum Repayments (p.a)");
      cy.get("#minimumRepaymentsPA");

      cy.contains("Actual Annual Repayments");
      cy.get("#actualAnnualRepayments").should("have.value", "$105,144");

      cy.contains("Repay Loan in Year");
      cy.get(":nth-child(8) > .form-select").should("have.value", "No");

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
      cy.get("#loanAmount").should("have.value", "$987");

      cy.contains("Loan Balance");
      cy.get(":nth-child(3) > #loanBalance");

      cy.contains("Client %Ownership");
      cy.get(":nth-child(4) > #clientOwnership");

      cy.contains("Partner %Ownership");
      cy.get(":nth-child(5) > #partnerOwnership");
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

    //Investments Property Footer
    cy.contains("Close").should("be.visible");
    cy.contains("Submit").should("be.visible").click();

    cy.get('[placeholder="Market Value"]').should("have.value", "$24");

    //Investment Loans (LOC)

    cy.wait(2000);
    cy.get(":nth-child(7) > .py-4").within(() => {
      cy.contains("Investment Loans (LOC)");
      cy.get("img");
      cy.contains("Aiden Smith");
      cy.contains("Emma Taylor");
    });
    cy.get(
      ":nth-child(7) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0"
    ).click();
    cy.get(".modal-content").within(() => {
      cy.contains("Investment Loans (LOC)");
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
      //    });

      cy.contains("Current Loan Balance").should("be.visible");
      cy.get("#currentLoanBalance")
        .clear()
        .type("24")
        .should("have.value", "$24");
      cy.contains("Loan Type").should("be.visible");
      cy.get(":nth-child(3) > .form-select").select("i/only");

      cy.contains("Loan Term");
      cy.get(":nth-child(4) > .form-select").select("19");

      cy.contains("Initial Interest Rate (p.a.)");
      cy.get("#initialInterestRate").clear().type("20.00%");

      cy.contains("Deductible interest");
      cy.get("#deductibleInterest").clear().type("20.00%");

      cy.contains("Minimum Repayments (p.a)");
      cy.get("#minimumRepayments");

      cy.contains("Actual Annual Repayments");
      cy.get("#actualAnnualRepayments")
        .clear()
        .type("20")
        .should("have.value", "$20");

      cy.contains("Repay Loan in Year");
      cy.get(":nth-child(9) > .form-select").should("have.value", "No");
    });

    //Investment Loans (LOC) Inner Footer

    // Partner Section
    cy.get(".css-1lx7dxn").type("Emma Taylor{enter}");

    cy.contains("Emma Taylor").should("be.visible");

    cy.contains("Current Loan Balance").should("be.visible");
    cy.get(":nth-child(2) > :nth-child(2) > #currentLoanBalance")
      .clear()
      .type("24")
      .should("have.value", "$24");
    cy.contains("Loan Type").should("be.visible");
    cy.get(":nth-child(2) > :nth-child(3) > .form-select").select("i/only");

    cy.contains("Loan Term");
    cy.get(":nth-child(2) > :nth-child(4) > .form-select").select("19");

    cy.contains("Initial Interest Rate (p.a.)");
    cy.get(":nth-child(2) > :nth-child(5) > #initialInterestRate")
      .clear()
      .type("20.00%");

    cy.contains("Deductible interest");
    cy.get(":nth-child(2) > :nth-child(6) > #deductibleInterest")
      .clear()
      .type("20.00%");

    cy.contains("Minimum Repayments (p.a)");
    cy.get(":nth-child(2) > :nth-child(7) > #minimumRepayments");

    cy.contains("Actual Annual Repayments");
    cy.get(":nth-child(2) > :nth-child(8) > #actualAnnualRepayments")
      .clear()
      .type("20")
      .should("have.value", "$20");

    cy.contains("Repay Loan in Year");
    cy.get(":nth-child(2) > :nth-child(9) > .form-select").select("14");

    cy.contains("Close").should("be.visible");
    cy.contains("Submit").should("be.visible").click();

    cy.get("#clientcf_investmentLoansLOC").should("have.value", "$20");
    cy.get("#partnercf_investmentLoansLOC").should("have.value", "$20");

    //Margin Loan

    cy.wait(2000);
    cy.get(":nth-child(8) > .py-4").within(() => {
      cy.contains("Margin Loan");
      cy.get("img");
      cy.contains("Aiden Smith");
      cy.contains("Emma Taylor");
    });
    cy.get(
      ":nth-child(8) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0"
    ).click();
    cy.get(".modal-content").within(() => {
      cy.contains("Margin Loan");
      cy.get(".btn-close");
    });

    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");

      cy.get(".css-v7duua").click();

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
      //    });

      cy.contains("Current Loan Balance").should("be.visible");
      cy.get("#currentLoanBalance")
        .clear()
        .type("24")
        .should("have.value", "$24");

      cy.contains("Loan Term").should("be.visible");
      cy.get(":nth-child(3) > .form-select").select("19");

      cy.contains("Initial Interest Rate (p.a.)");
      cy.get("#initialInterestRate").clear().type("20.00%");
      cy.contains("Deductible interest");
      cy.get("#deductibleInterest").clear().type("20.00%");

      cy.contains("Repay Loan in Year");
      cy.get(":nth-child(7) > .form-select").should("have.value", "No");
    });

    cy.wait(2000);
    cy.contains("Monthly Contributions");
    cy.get(".radioButton2").contains("Yes").click();

    //Regular Contributions
    cy.get("tbody > tr > :nth-child(6)").within(() => {
      cy.get("#button-addon2").click();
    });

    //Regular Contributions Inner Card End
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    ).within(() => {
      cy.contains("Monthly Contributions");
      //cy.get('[style="display: block;"] > .modal-dialog > .modal-content > .modal-header > .btn-close').should('be.visible')
    });

    cy.get(".col-md-12 > .row > .mt-4").within(() => {
      cy.contains("Contribution");
      cy.get("#contribution").clear().type("100").should("have.value", "$100");

      cy.contains("Regular contributions p.a");
      cy.get("#regularContributions")
        .clear()
        .type("200")
        .should("have.value", "$200");

      cy.contains("Contribute from Year");
      cy.get(":nth-child(3) > .form-select").select("21");

      cy.contains("Contribute Up Until");
      cy.get(":nth-child(4) > .form-select").select("10");

      cy.contains("Indexation");
      cy.get(":nth-child(5) > .form-select").select("2.50%");
    });
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    ).within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    // Partner Section
    cy.get(".css-1lx7dxn").type("Emma Taylor{enter}");

    cy.contains("Emma Taylor").should("be.visible");

    cy.wait(2000);
    cy.get(".table").within(() => {
      cy.contains("Owner");
      cy.contains("Aiden Smith");

      cy.contains("Current Loan Balance").should("be.visible");
      cy.get(":nth-child(2) > :nth-child(2) > #currentLoanBalance")
        .clear()
        .type("24")
        .should("have.value", "$24");

      cy.contains("Loan Term").should("be.visible");
      cy.get(":nth-child(2) > :nth-child(3) > .form-select").select("19");

      cy.contains("Initial Interest Rate (p.a.)");
      cy.get(":nth-child(2) > :nth-child(4) > #initialInterestRate")
        .clear()
        .type("20.00%");

      cy.contains("Deductible interest");
      cy.get(":nth-child(2) > :nth-child(5) > #deductibleInterest")
        .clear()
        .type("20.00%");

      cy.contains("Repay Loan in Year");
      cy.get(":nth-child(2) > :nth-child(7) > .form-select").select("14");
    });

    cy.wait(2000);
    cy.contains("Monthly Contributions");
    cy.get(":nth-child(2) > :nth-child(6) > .form-check > .radioButton2")
      .contains("Yes")
      .click();

    //Regular Contributions
    cy.get("tbody > :nth-child(2) > :nth-child(6)").within(() => {
      cy.get("#button-addon2").click();
    });

    //Monthly Contributions Inner Card End
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    ).within(() => {
      cy.contains("Monthly Contributions");
      //cy.get('[style="display: block;"] > .modal-dialog > .modal-content > .modal-header > .btn-close').should('be.visible')
    });

    cy.get(".col-md-12 > .row > .mt-4").within(() => {
      cy.contains("Contribution");
      cy.get("#contribution").clear().type("100").should("have.value", "$100");

      cy.contains("Regular contributions p.a");
      cy.get("#regularContributions")
        .clear()
        .type("200")
        .should("have.value", "$200");

      cy.contains("Contribute from Year");
      cy.get(":nth-child(3) > .form-select").select("21");

      cy.contains("Contribute Up Until");
      cy.get(":nth-child(4) > .form-select").select("10");

      cy.contains("Indexation");
      cy.get(":nth-child(5) > .form-select").select("2.50%");
    });
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    ).within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    //Margin Loan Inner Footer

    cy.contains("Close").should("be.visible");
    cy.contains("Submit").should("be.visible").click();

    cy.get("#clientcf_marginLoan").should("have.value", "$24");
    cy.get("#partnercf_marginLoan").should("have.value", "$24");

    //Cash

    cy.wait(2000);
    cy.get(":nth-child(4) > .py-4").within(() => {
      cy.contains("Cash");
      cy.get("img");
      cy.contains("Aiden Smith");
      cy.contains("Emma Taylor");
    });
    cy.get(
      ":nth-child(4) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0"
    ).click();
    cy.get(".modal-content").within(() => {
      cy.contains("Cash");
      cy.get(".btn-close");
    });

    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");

      // cy.get(".css-v7duua").click();

      cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");
    });

    cy.wait(2000);
    cy.get(".table").within(() => {
      cy.contains("Owner");
      cy.contains("Aiden Smith");

      cy.contains("Current Balance").should("be.visible");
      cy.get("#currentBalance").clear().type("24").should("have.value", "$24");

      cy.contains("Investment Returns").should("be.visible");
      cy.get(":nth-child(3) > .form-select").select("Input Override");

      cy.contains("Income Yield");
      cy.get("#incomeYield").clear().type("23").should("have.value", "23");

      cy.contains("Reinvest income");
      cy.get(":nth-child(5) > .form-check > .radioButton2")
        .contains("Yes")
        .click();

      cy.contains("Risk Profile/SAA");
      cy.get(":nth-child(7) > .form-select").select("Cash");

      cy.contains("Regular Contributions");
      cy.get(":nth-child(6) > .form-check > .radioButton2")
        .contains("Yes")
        .click();

      cy.get("tbody > tr > :nth-child(6)").within(() => {
        cy.get(".modalBtn").click("");
      }); // Clicks the first button
    });

    //Regular Contributions Inner Card End
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    ).within(() => {
      cy.contains("Regular Contributions");
    });

    cy.get(".col-md-12 > .row > .mt-4").within(() => {
      cy.contains("Contribution");
      cy.get("#contribution").clear().type("100").should("have.value", "$100");

      cy.contains("Regular contributions p.a");
      cy.get("#regularContributions")
        .clear()
        .type("200")
        .should("have.value", "$200");

      cy.contains("Contribute from Year");
      cy.get(":nth-child(3) > .form-select").select("21");

      cy.contains("Contribute Up Until");
      cy.get(":nth-child(4) > .form-select").select("10");

      cy.contains("Indexation");
      cy.get(":nth-child(5) > .form-select").select("2.50%");
    });
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    ).within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    // Partner Section
    cy.get(".css-1lx7dxn").type("Emma Taylor{enter}");

    cy.contains("Emma Taylor").should("be.visible");

    cy.wait(2000);
    cy.get(".table").within(() => {
      cy.contains("Owner");
      cy.contains("Emma Taylor");

      cy.get(":nth-child(2) > :nth-child(2) > #currentBalance")
        .clear()
        .type("24")
        .should("have.value", "$24");

      cy.get(":nth-child(2) > :nth-child(3) > .form-select").select(
        "Input Override"
      );

      cy.get(":nth-child(2) > :nth-child(4) > #incomeYield")
        .clear()
        .type("23")
        .should("have.value", "23");

      cy.get(":nth-child(2) > :nth-child(5) > .form-check > .radioButton2")
        .contains("Yes")
        .click();

      cy.get(":nth-child(2) > :nth-child(7) > .form-select").select("Cash");

      cy.get(":nth-child(2) > :nth-child(6) > .form-check > .radioButton2")
        .contains("Yes")
        .click();

      cy.get("tbody > :nth-child(2) > :nth-child(6)").within(() => {
        cy.get(".modalBtn").click();
      }); // Clicks the first button
    });

    //Regular Contributions Inner Card End
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    ).within(() => {
      cy.contains("Regular Contributions");
    });

    cy.get(".col-md-12 > .row > .mt-4").within(() => {
      cy.contains("Contribution");
      cy.get("#contribution").clear().type("100").should("have.value", "$100");

      cy.contains("Regular contributions p.a");
      cy.get("#regularContributions")
        .clear()
        .type("200")
        .should("have.value", "$200");

      cy.contains("Contribute from Year");
      cy.get(":nth-child(3) > .form-select").select("21");

      cy.contains("Contribute Up Until");
      cy.get(":nth-child(4) > .form-select").select("10");

      cy.contains("Indexation");
      cy.get(":nth-child(5) > .form-select").select("2.50%");
    });
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    ).within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    //Cash Footer

    cy.contains("Close").should("be.visible");
    cy.contains("Submit").should("be.visible").click();

    cy.get("#clientcf_cash").should("have.value", "$24");

    cy.get("#partnercf_cash").should("have.value", "$24");

    //Cash

    cy.wait(2000);
    cy.get(":nth-child(5) > .py-4").within(() => {
      cy.contains("Term Deposits");
      cy.get("img");
      cy.contains("Aiden Smith");
      cy.contains("Emma Taylor");
    });
    cy.get(
      ":nth-child(5) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0"
    ).click();
    cy.get(".modal-content").within(() => {
      cy.contains("Term Deposits");
      cy.get(".btn-close");
    });

    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");

      // cy.get(".css-v7duua").click();

      cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");
    });

    cy.wait(2000);
    cy.get(".table").within(() => {
      cy.contains("Owner");
      cy.contains("Aiden Smith");

      cy.contains("Current Balance").should("be.visible");
      cy.get("#currentBalance").clear().type("24").should("have.value", "$24");

      cy.contains("Investment Returns").should("be.visible");
      cy.get(":nth-child(3) > .form-select").select("Input Override");

      cy.contains("Income Yield");
      cy.get("#incomeYield").clear().type("23").should("have.value", "23");

      cy.contains("Reinvest income");
      cy.get(":nth-child(5) > .form-check > .radioButton2")
        .contains("Yes")
        .click();

      cy.contains("Risk Profile/SAA");
      cy.get(":nth-child(7) > .form-select").select("Cash");

      cy.contains("Regular Contributions");
      cy.get(":nth-child(6) > .form-check > .radioButton2")
        .contains("Yes")
        .click();

      cy.get("tbody > tr > :nth-child(6)").within(() => {
        cy.get(".modalBtn").click("");
      }); // Clicks the first button
    });

    //Regular Contributions Inner Card End
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    ).within(() => {
      cy.contains("Regular Contributions");
    });

    cy.get(".col-md-12 > .row > .mt-4").within(() => {
      cy.contains("Contribution");
      cy.get("#contribution").clear().type("100").should("have.value", "$100");

      cy.contains("Regular contributions p.a");
      cy.get("#regularContributions")
        .clear()
        .type("200")
        .should("have.value", "$200");

      cy.contains("Contribute from Year");
      cy.get(":nth-child(3) > .form-select").select("21");

      cy.contains("Contribute Up Until");
      cy.get(":nth-child(4) > .form-select").select("10");

      cy.contains("Indexation");
      cy.get(":nth-child(5) > .form-select").select("2.50%");
    });
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    ).within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    // Partner Section
    cy.get(".css-1lx7dxn").type("Emma Taylor{enter}");

    cy.contains("Emma Taylor").should("be.visible");

    cy.wait(2000);
    cy.get(".table").within(() => {
      cy.contains("Owner");
      cy.contains("Emma Taylor");

      cy.get(":nth-child(2) > :nth-child(2) > #currentBalance")
        .clear()
        .type("24")
        .should("have.value", "$24");

      cy.get(":nth-child(2) > :nth-child(3) > .form-select").select(
        "Input Override"
      );

      cy.get(":nth-child(2) > :nth-child(4) > #incomeYield")
        .clear()
        .type("23")
        .should("have.value", "23");

      cy.get(":nth-child(2) > :nth-child(5) > .form-check > .radioButton2")
        .contains("Yes")
        .click();

      cy.get(":nth-child(2) > :nth-child(7) > .form-select").select("Cash");

      cy.get(":nth-child(2) > :nth-child(6) > .form-check > .radioButton2")
        .contains("Yes")
        .click();

      cy.get("tbody > :nth-child(2) > :nth-child(6)").within(() => {
        cy.get(".modalBtn").click();
      }); // Clicks the first button
    });

    //Regular Contributions Inner Card End
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    ).within(() => {
      cy.contains("Regular Contributions");
    });

    cy.get(".col-md-12 > .row > .mt-4").within(() => {
      cy.contains("Contribution");
      cy.get("#contribution").clear().type("100").should("have.value", "$100");

      cy.contains("Regular contributions p.a");
      cy.get("#regularContributions")
        .clear()
        .type("200")
        .should("have.value", "$200");

      cy.contains("Contribute from Year");
      cy.get(":nth-child(3) > .form-select").select("21");

      cy.contains("Contribute Up Until");
      cy.get(":nth-child(4) > .form-select").select("10");

      cy.contains("Indexation");
      cy.get(":nth-child(5) > .form-select").select("2.50%");
    });
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    ).within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    //Cash Footer

    cy.contains("Close").should("be.visible");
    cy.contains("Submit").should("be.visible").click();

    cy.get("#clientcf_termDeposits").should("have.value", "$24");

    cy.get("#partnercf_termDeposits").should("have.value", "$24");

    //Investment Bonds

    cy.wait(2000);
    cy.get(":nth-child(6) > .py-4").within(() => {
      cy.contains("Investment Bonds");
      cy.get("img");
      cy.contains("Aiden Smith");
      cy.contains("Emma Taylor");
    });
    cy.get(
      ":nth-child(6) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0"
    ).click();
    cy.get(".modal-content").within(() => {
      cy.contains("Investment Bonds");
      cy.get(".btn-close");
    });

    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");

      // cy.get(".css-v7duua").click();

      cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");
    });

    cy.wait(2000);
    cy.get(".table").within(() => {
      cy.contains("Owner");
      cy.contains("Aiden Smith");

      cy.contains("Current Balance").should("be.visible");
      cy.get("#currentBalance").clear().type("24").should("have.value", "$24");

      cy.contains("Cost Base").should("be.visible");
      cy.get("#costBase").clear().type("77").should("have.value", "$77");

      cy.contains("Investment Returns").should("be.visible");
      cy.get(":nth-child(4) > .form-select").select("Input Override");

      cy.contains("Earnings Rate");
      cy.get("#earningsRate").clear().type("23").should("have.value", "23");

      cy.contains("Risk Profile/SAA");
      cy.get(":nth-child(7) > .form-select").select("Cash");

      cy.contains("Investment Fees");
      cy.get("#investmentFees").clear().type("23").should("have.value", "23");

      cy.contains("Cashout in Funds");
      cy.get(":nth-child(9) > .form-select").select("No");

      cy.contains("Regular Contributions");
      cy.get(".radioButton2").contains("Yes").click();
    });

    cy.get("tbody > tr > :nth-child(6)").within(() => {
      cy.get("#button-addon2").click();
    });

    //Regular Contributions Inner Card End
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    ).within(() => {
      cy.contains("Regular Contributions");
    });

    cy.get(".col-md-12 > .row > .mt-4").within(() => {
      cy.contains("Contribution");
      cy.get("#contribution").clear().type("100").should("have.value", "$100");

      cy.contains("Regular contributions p.a");
      cy.get("#regularContributions")
        .clear()
        .type("200")
        .should("have.value", "$200");

      cy.contains("Contribute from Year");
      cy.get(":nth-child(3) > .form-select").select("21");

      cy.contains("Contribute Up Until");
      cy.get(":nth-child(4) > .form-select").select("10");

      cy.contains("Indexation");
      cy.get(":nth-child(5) > .form-select").select("2.50%");
    });
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    ).within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    // Partner Section
    cy.get(".css-1lx7dxn").type("Emma Taylor{enter}");

    cy.contains("Emma Taylor").should("be.visible");

    cy.wait(2000);
    cy.get(".table").within(() => {
      cy.contains("Owner");
      cy.contains("Emma Taylor");

      cy.get(":nth-child(2) > :nth-child(2) > #currentBalance")
        .clear()
        .type("24")
        .should("have.value", "$24");

      cy.get(":nth-child(2) > :nth-child(3) > #costBase")
        .clear()
        .type("77")
        .should("have.value", "$77");

      cy.get(":nth-child(2) > :nth-child(4) > .form-select").select(
        "Input Override"
      );

      cy.get(":nth-child(2) > :nth-child(5) > #earningsRate")
        .clear()
        .type("23")
        .should("have.value", "23");

      cy.get(":nth-child(2) > :nth-child(7) > .form-select").select("Cash");

      cy.get(":nth-child(2) > :nth-child(8) > #investmentFees")
        .clear()
        .type("23")
        .should("have.value", "23");

      cy.get(":nth-child(2) > :nth-child(6) > .form-check > .radioButton2")
        .contains("Yes")
        .click();

      cy.get("tbody > :nth-child(2) > :nth-child(6)").within(() => {
        cy.get("#button-addon2").click();
      }); // Clicks the first button
    });

    //Regular Contributions Inner Card End
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    ).within(() => {
      cy.contains("Regular Contributions");
    });

    cy.get(".col-md-12 > .row > .mt-4").within(() => {
      cy.contains("Contribution");
      cy.get("#contribution").clear().type("100").should("have.value", "$100");

      cy.contains("Regular contributions p.a");
      cy.get("#regularContributions")
        .clear()
        .type("200")
        .should("have.value", "$200");

      cy.contains("Contribute from Year");
      cy.get(":nth-child(3) > .form-select").select("21");

      cy.contains("Contribute Up Until");
      cy.get(":nth-child(4) > .form-select").select("10");

      cy.contains("Indexation");
      cy.get(":nth-child(5) > .form-select").select("2.50%");
    });
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    ).within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    //Investment Bonds Footer

    cy.contains("Close").should("be.visible");
    cy.contains("Submit").should("be.visible").click();

    cy.get("#clientcf_investmentBonds").should("have.value", "$24");
    cy.get("#partnercf_investmentBonds").should("have.value", "$24");

    //Annuities

    cy.wait(2000);
    cy.get(":nth-child(12) > .py-4").within(() => {
      cy.contains("Annuities");
      cy.get("img");
      cy.contains("Aiden Smith");
      cy.contains("Emma Taylor");
    });
    cy.get(
      ":nth-child(12) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0"
    ).click();
    cy.get(".modal-content").within(() => {
      cy.contains("Annuities");
      cy.get(".btn-close");
    });

    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");

      cy.get(".css-v7duua").click();

      cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");
    });

    cy.wait(2000);
    cy.get(".table").within(() => {
      cy.contains("Owner");
      cy.contains("Aiden Smith");

      cy.contains("Original Investment Amount").should("be.visible");
      cy.get("#originalInvestmentAmount")
        .clear()
        .type("99")
        .should("have.value", "$99");

      cy.contains("Source of Funds").should("be.visible");
      cy.get(":nth-child(3) > .form-select").select("Super");

      cy.contains("Annuity Type").should("be.visible");
      cy.get(":nth-child(4) > .form-select").select("Life-Time");

      cy.contains("Is this a Reversionary Annuity");
      cy.get(":nth-child(5) > .form-check > .radioButton2")
        .contains("Yes")
        .click();

      cy.contains("Include From Year");
      cy.get(":nth-child(7) > .form-select").select(17);

      cy.contains("Term");
      cy.get(":nth-child(8) > .form-select").select("21");

      cy.contains("Years Until Maturity");
      cy.get(":nth-child(9) > .form-select").select("10");

      cy.contains("Annual Inflation Rate");
      cy.get(":nth-child(10) > .form-select").select("2.50%");

      cy.contains("Annual Payment");
      cy.get("#annualPayment").clear().type("99").should("have.value", "$99");

      cy.contains("RCV");
      cy.get("tbody > tr > :nth-child(6)").within(() => {
        cy.contains("Yes").click();
        cy.get("#button-addon2").click();
      });
    });

    //RCV
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    ).within(() => {
      cy.contains("RCV");
    });

    cy.get(".col-md-12 > .row > .mt-4").within(() => {
      cy.contains("Owner");
      cy.contains("Aiden Smith");
      cy.contains("RCV");
      cy.get("#RCV").clear().type("99");

      cy.contains("RCV Other");
      cy.get("#RCVOther");

      cy.contains("Communication at End of Term");
      cy.get("#communicationEndTerm")
        .clear()
        .type("99")
        .should("have.value", "$99");
    });
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    ).within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    //Deductible Amount
    cy.contains("Deductible Amount");
    cy.get("tbody > tr > :nth-child(12)").within(() => {
      cy.contains("Yes").click();
      cy.get("#button-addon2").click();
    });

    //Deductible Amount Card
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    ).within(() => {
      cy.contains("Deductible Amount");
    });

    cy.get(".col-md-12 > .row > .mt-4").within(() => {
      cy.contains("Owner");
      cy.contains("Aiden Smith");
      cy.contains("Other Deductible Amount");
      cy.get("#otherDeductibleAmount")
        .clear()
        .type("99")
        .should("have.value", "$99");

      cy.contains("Deductible Amount");
      cy.get("#deductibleAmount");
    });
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    ).within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    // Partner Section
    cy.get(".css-1lx7dxn").type("Emma Taylor{enter}");

    cy.contains("Emma Taylor").should("be.visible");

    cy.wait(2000);
    cy.get(".table").within(() => {
      cy.contains("Owner");
      cy.contains("Emma Taylor");

      cy.get("#originalInvestmentAmount")
        .clear()
        .type("99")
        .should("have.value", "$99");

      cy.contains("Source of Funds").should("be.visible");

      cy.contains("Annuity Type").should("be.visible");
      cy.get(":nth-child(4) > .form-select").select("Life-Time");

      cy.contains("Is this a Reversionary Annuity");
      cy.get(":nth-child(5) > .form-check > .radioButton2")
        .contains("Yes")
        .click();

      cy.contains("Include From Year");
      cy.get(":nth-child(7) > .form-select").select(17);

      cy.contains("Term");
      cy.get(":nth-child(8) > .form-select").select("21");

      cy.contains("Years Until Maturity");
      cy.get(":nth-child(9) > .form-select").select("10");

      cy.contains("Annual Inflation Rate");
      cy.get(":nth-child(10) > .form-select").select("2.50%");

      cy.contains("Annual Payment");
      cy.get("#annualPayment").clear().type("99").should("have.value", "$99");

      cy.contains("RCV");
      cy.get("tbody > tr > :nth-child(6)").within(() => {
        cy.contains("Yes").click();
        cy.get("#button-addon2").click();
      });
    });

    //Regular Contributions Inner Card End
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    ).within(() => {
      cy.contains("Regular Contributions");
    });

    cy.get(".col-md-12 > .row > .mt-4").within(() => {
      cy.contains("Contribution");
      cy.get("#contribution").clear().type("100").should("have.value", "$100");

      cy.contains("Regular contributions p.a");
      cy.get("#regularContributions")
        .clear()
        .type("200")
        .should("have.value", "$200");

      cy.contains("Contribute from Year");
      cy.get(":nth-child(3) > .form-select").select("21");

      cy.contains("Contribute Up Until");
      cy.get(":nth-child(4) > .form-select").select("10");

      cy.contains("Indexation");
      cy.get(":nth-child(5) > .form-select").select("2.50%");
    });
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    ).within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    //Annuities

    cy.get(".modal-footer")
      .first()
      .within(() => {
        cy.contains("Close");
        cy.contains("Submit").click();
      });

    cy.get("#clientcf_annuities").should("have.value", "$99");
  }
}
export default PartnerFinancialInvestments;
