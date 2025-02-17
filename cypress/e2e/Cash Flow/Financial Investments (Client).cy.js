/// <reference types="cypress" />
class ClientFinancialInvestments {
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

    //     //Australian Shares

    //     cy.wait(2000);
    //     cy.get(":nth-child(1) > .py-4").within(() => {
    //       cy.contains("Australian Shares");
    //       cy.get("img");
    //       cy.contains("Aiden Smith");
    //       cy.contains("Emma Taylor");
    //     });
    //     cy.get(
    //       ":nth-child(1) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0"
    //     ).click();
    //     cy.get(".modal-content").within(() => {
    //       cy.contains("Australian Shares");
    //       cy.get(".btn-close");
    //     });

    //     cy.get(".col-md-12 > .d-flex").within(() => {
    //       cy.contains("Owner");

    //       cy.get(".css-v7duua").click();

    //       cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");
    //     });

    //     cy.wait(2000);
    //     cy.get(".table").within(() => {
    //       cy.contains("Owner");
    //       cy.contains("Aiden Smith");
    //       //  cy.get("#streetAddress")
    //       //    .invoke("val")
    //       //    .should((actualValue) => {
    //       //      expect(actualValue.trim()).to.equal("FTS");
    //       //    });

    //       cy.contains("Current Balance").should("be.visible");
    //       cy.get("#currentBalance").clear().type("24").should("have.value", "$24");

    //       cy.contains("Cost Base").should("be.visible");
    //       cy.get("#costBase").clear().type("77").should("have.value", "$77");

    //       cy.contains("Regular Contributions");
    //       cy.get(":nth-child(6) > .form-check > .radioButton2")
    //         .contains("Yes")
    //         .click();
    //       cy.contains("Risk Profile/SAA");
    //       cy.get(":nth-child(7) > .form-select").select("Cash");

    //       cy.contains("Cashout Funds");
    //       cy.get(":nth-child(8) > .form-select").should("have.value", "No");

    //       cy.contains("Investment Returns");
    //       cy.get(".input-group > .form-select").select("Input Override");
    //       cy.wait(1000);
    //       cy.get(".modalBtn").eq(0).click({ force: true }); // Clicks the first button
    //     });

    //     //Investment Returns Inner Card
    //     cy.get(
    //       '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    //     ).within(() => {
    //       cy.contains("Input Override");
    //       //cy.get('[style="display: block;"] > .modal-dialog > .modal-content > .modal-header > .btn-close').should('be.visible')
    //     });

    //     cy.get(".col-md-12 > .row > .mt-4").within(() => {
    //       cy.contains("Income Yield");
    //       cy.get("#incomeYield").clear().type("23").should("have.value", "23");
    //       //  Cypress.on("uncaught:exception", (err, runnable) => {
    //       //    return false; // Prevent Cypress from failing the test
    //       //  });

    //       cy.contains("Growth Rate");
    //       cy.get("#growthRate").clear().type("53").should("have.value", "53");
    //       cy.contains("Franking");
    //       cy.get("#franking").clear().type("66").should("have.value", "66");
    //     });
    //     //Investment Returns Footer
    //     cy.get(
    //       '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    //     ).within(() => {
    //       cy.contains("Close").should("be.visible");
    //       cy.contains("Submit").should("be.visible").click();
    //     });

    //     cy.wait(2000);
    //     cy.contains("Reinvest income");
    //     cy.get(":nth-child(5) > .form-check > .radioButton2")
    //       .contains("Yes")
    //       .click();

    //     //Regular Contributions
    //     cy.get("tbody > tr > :nth-child(6)").within(() => {
    //       cy.get("#button-addon2").click();
    //     });

    //     //Regular Contributions Inner Card End
    //     cy.get(
    //       '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    //     ).within(() => {
    //       cy.contains("Regular Contributions");
    //       //cy.get('[style="display: block;"] > .modal-dialog > .modal-content > .modal-header > .btn-close').should('be.visible')
    //     });

    //     cy.get(".col-md-12 > .row > .mt-4").within(() => {
    //       cy.contains("Contribution");
    //       cy.get("#contribution").clear().type("100").should("have.value", "$100");

    //       cy.contains("Regular contributions p.a");
    //       cy.get("#regularContributions")
    //         .clear()
    //         .type("200")
    //         .should("have.value", "$200");

    //       cy.contains("Contribute from Year");
    //       cy.get(":nth-child(3) > .form-select").select("21");

    //       cy.contains("Contribute Up Until");
    //       cy.get(":nth-child(4) > .form-select").select("10");

    //       cy.contains("Indexation");
    //       cy.get(":nth-child(5) > .form-select").select("2.50%");
    //     });
    //     cy.get(
    //       '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    //     ).within(() => {
    //       cy.contains("Close").should("be.visible");
    //       cy.contains("Submit").should("be.visible").click();
    //     });

    //     //Australian Shares Inner Footer

    //     cy.contains("Close").should("be.visible");
    //     cy.contains("Submit").should("be.visible").click();

    //     cy.get("#clientcf_AustralianShares").should("have.value", "$24");

    //  //Platform Investment

    //  cy.wait(2000);
    //  cy.get(":nth-child(2) > .py-4").within(() => {
    //    cy.contains("Platform Investment");
    //    cy.get("img");
    //    cy.contains("Aiden Smith");
    //    cy.contains("Emma Taylor");
    //  });
    //  cy.get(':nth-child(2) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0').click();
    //  cy.get(".modal-content").within(() => {
    //    cy.contains("Platform Investment");
    //    cy.get(".btn-close");
    //  });

    //  cy.get(".col-md-12 > .d-flex").within(() => {
    //    cy.contains("Owner");

    //    cy.get(".css-v7duua").click();

    //    cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");
    //  });

    //  cy.wait(2000);
    //  cy.get(".table").within(() => {
    //    cy.contains("Owner");
    //    cy.contains("Aiden Smith");
    //    //  cy.get("#streetAddress")
    //    //    .invoke("val")
    //    //    .should((actualValue) => {
    //    //      expect(actualValue.trim()).to.equal("FTS");
    //    //    });

    //    cy.contains("Current Balance").should("be.visible");
    //    cy.get("#currentBalance").clear().type("24").should("have.value", "$24");

    //    cy.contains("Cost Base").should("be.visible");
    //    cy.get("#costBase").clear().type("77").should("have.value", "$77");

    //    cy.contains("Regular Contributions");
    //    cy.get(":nth-child(6) > .form-check > .radioButton2")
    //      .contains("Yes")
    //      .click();
    //    cy.contains("Risk Profile/SAA");
    //    cy.get(":nth-child(7) > .form-select").select("Cash");

    //    cy.contains("Cashout Funds");
    //    cy.get(':nth-child(9) > .form-select').should("have.value", "No");

    //    cy.contains("Investment Returns");
    //    cy.get('.input-group > .form-select').select("Input Override");
    //    cy.wait(1000);
    //    cy.get(".modalBtn").eq(0).click({ force: true }); // Clicks the first button
    //  });

    //  //Investment Returns Inner Card
    //  cy.get(
    //    '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    //  ).within(() => {
    //    cy.contains("Input Override");
    //    //cy.get('[style="display: block;"] > .modal-dialog > .modal-content > .modal-header > .btn-close').should('be.visible')
    //  });

    //  cy.get(".col-md-12 > .row > .mt-4").within(() => {
    //    cy.contains("Income Yield");
    //    cy.get("#incomeYield").clear().type("23").should("have.value", "23");
    //    //  Cypress.on("uncaught:exception", (err, runnable) => {
    //    //    return false; // Prevent Cypress from failing the test
    //    //  });

    //    cy.contains("Growth Rate");
    //    cy.get("#growthRate").clear().type("53").should("have.value", "53");
    //    cy.contains("Franking");
    //    cy.get("#franking").clear().type("66").should("have.value", "66");
    //  });
    //  //Investment Returns Footer
    //  cy.get(
    //    '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    //  ).within(() => {
    //    cy.contains("Close").should("be.visible");
    //    cy.contains("Submit").should("be.visible").click();
    //  });

    //  cy.wait(2000);
    //  cy.contains("Reinvest income");
    //  cy.get(":nth-child(5) > .form-check > .radioButton2")
    //    .contains("Yes")
    //    .click();

    //  //Regular Contributions
    //  cy.get("tbody > tr > :nth-child(6)").within(() => {
    //    cy.get("#button-addon2").click();
    //  });

    //  //Regular Contributions Inner Card End
    //  cy.get(
    //    '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    //  ).within(() => {
    //    cy.contains("Regular Contributions");
    //    //cy.get('[style="display: block;"] > .modal-dialog > .modal-content > .modal-header > .btn-close').should('be.visible')
    //  });

    //  cy.get(".col-md-12 > .row > .mt-4").within(() => {
    //    cy.contains("Contribution");
    //    cy.get("#contribution").clear().type("100").should("have.value", "$100");

    //    cy.contains("Regular contributions p.a");
    //    cy.get("#regularContributions")
    //      .clear()
    //      .type("200")
    //      .should("have.value", "$200");

    //    cy.contains("Contribute from Year");
    //    cy.get(":nth-child(3) > .form-select").select("21");

    //    cy.contains("Contribute Up Until");
    //    cy.get(":nth-child(4) > .form-select").select("10");

    //    cy.contains("Indexation");
    //    cy.get(":nth-child(5) > .form-select").select("2.50%");
    //  });
    //  cy.get(
    //    '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    //  ).within(() => {
    //    cy.contains("Close").should("be.visible");
    //    cy.contains("Submit").should("be.visible").click();
    //  });

    //  //Australian Shares Inner Footer

    //  cy.contains("Close").should("be.visible");
    //  cy.contains("Submit").should("be.visible").click();

    //  cy.get('#clientcf_platformInvestment').should("have.value", "$24");

    //  //Other Investments

    //  cy.wait(2000);
    //  cy.get(':nth-child(3) > .py-4').within(() => {
    //    cy.contains("Other Investments");
    //    cy.get("img");
    //    cy.contains("Aiden Smith");
    //    cy.contains("Emma Taylor");
    //  });
    //  cy.get(':nth-child(3) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0').click();
    //  cy.get(".modal-content").within(() => {
    //    cy.contains("Other Investments");
    //    cy.get(".btn-close");
    //  });

    //  cy.get(".col-md-12 > .d-flex").within(() => {
    //    cy.contains("Owner");

    //    cy.get(".css-v7duua").click();

    //    cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");
    //  });

    //  cy.wait(2000);
    //  cy.get(".table").within(() => {
    //    cy.contains("Owner");
    //    cy.contains("Aiden Smith");
    //    //  cy.get("#streetAddress")
    //    //    .invoke("val")
    //    //    .should((actualValue) => {
    //    //      expect(actualValue.trim()).to.equal("FTS");
    //    //    });

    //    cy.contains("Current Balance").should("be.visible");
    //    cy.get("#currentBalance").clear().type("24").should("have.value", "$24");

    //    cy.contains("Cost Base").should("be.visible");
    //    cy.get("#costBase").clear().type("77").should("have.value", "$77");

    //    cy.contains("Regular Contributions");
    //    cy.get(":nth-child(6) > .form-check > .radioButton2")
    //      .contains("Yes")
    //      .click();
    //    cy.contains("Risk Profile/SAA");
    //    cy.get(":nth-child(7) > .form-select").select("Cash");

    //    cy.contains("Cashout Funds");
    //    cy.get(':nth-child(9) > .form-select').should("have.value", "No");

    //    cy.contains("Investment Returns");
    //    cy.get(".input-group > .form-select").select("Input Override");
    //    cy.wait(1000);
    //    cy.get(".modalBtn").eq(0).click({ force: true }); // Clicks the first button
    //  });

    //  //Investment Returns Inner Card
    //  cy.get(
    //    '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    //  ).within(() => {
    //    cy.contains("Input Override");
    //    //cy.get('[style="display: block;"] > .modal-dialog > .modal-content > .modal-header > .btn-close').should('be.visible')
    //  });

    //  cy.get(".col-md-12 > .row > .mt-4").within(() => {
    //    cy.contains("Income Yield");
    //    cy.get("#incomeYield").clear().type("23").should("have.value", "23");
    //    //  Cypress.on("uncaught:exception", (err, runnable) => {
    //    //    return false; // Prevent Cypress from failing the test
    //    //  });

    //    cy.contains("Growth Rate");
    //    cy.get("#growthRate").clear().type("53").should("have.value", "53");
    //    cy.contains("Franking");
    //    cy.get("#franking").clear().type("66").should("have.value", "66");
    //  });
    //  //Investment Returns Footer
    //  cy.get(
    //    '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    //  ).within(() => {
    //    cy.contains("Close").should("be.visible");
    //    cy.contains("Submit").should("be.visible").click();
    //  });

    //  cy.wait(2000);
    //  cy.contains("Reinvest income");
    //  cy.get(":nth-child(5) > .form-check > .radioButton2")
    //    .contains("Yes")
    //    .click();

    //  //Regular Contributions
    //  cy.get("tbody > tr > :nth-child(6)").within(() => {
    //    cy.get("#button-addon2").click();
    //  });

    //  //Regular Contributions Inner Card End
    //  cy.get(
    //    '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    //  ).within(() => {
    //    cy.contains("Regular Contributions");
    //    //cy.get('[style="display: block;"] > .modal-dialog > .modal-content > .modal-header > .btn-close').should('be.visible')
    //  });

    //  cy.get(".col-md-12 > .row > .mt-4").within(() => {
    //    cy.contains("Contribution");
    //    cy.get("#contribution").clear().type("100").should("have.value", "$100");

    //    cy.contains("Regular contributions p.a");
    //    cy.get("#regularContributions")
    //      .clear()
    //      .type("200")
    //      .should("have.value", "$200");

    //    cy.contains("Contribute from Year");
    //    cy.get(":nth-child(3) > .form-select").select("21");

    //    cy.contains("Contribute Up Until");
    //    cy.get(":nth-child(4) > .form-select").select("10");

    //    cy.contains("Indexation");
    //    cy.get(":nth-child(5) > .form-select").select("2.50%");
    //  });
    //  cy.get(
    //    '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    //  ).within(() => {
    //    cy.contains("Close").should("be.visible");
    //    cy.contains("Submit").should("be.visible").click();
    //  });

    //  //Other Investments Inner Footer

    //  cy.contains("Close").should("be.visible");
    //  cy.contains("Submit").should("be.visible").click();

    //  cy.get('#clientcf_otherInvestments').should("have.value", "$24");

    // //Investment Loans (LOC)

    // cy.wait(2000);
    // cy.get(":nth-child(7) > .py-4").within(() => {
    //   cy.contains("Investment Loans (LOC)");
    //   cy.get("img");
    //   cy.contains("Aiden Smith");
    //   cy.contains("Emma Taylor");
    // });
    // cy.get(
    //   ":nth-child(7) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0"
    // ).click();
    // cy.get(".modal-content").within(() => {
    //   cy.contains("Investment Loans (LOC)");
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
    //   //  cy.get("#streetAddress")
    //   //    .invoke("val")
    //   //    .should((actualValue) => {
    //   //      expect(actualValue.trim()).to.equal("FTS");
    //   //    });

    //   cy.contains("Current Loan Balance").should("be.visible");
    //   cy.get("#currentLoanBalance")
    //     .clear()
    //     .type("24")
    //     .should("have.value", "$24");
    //   cy.contains("Loan Type").should("be.visible");
    //   cy.get(":nth-child(3) > .form-select").select("i/only");

    //   cy.contains("Loan Term");
    //   cy.get(":nth-child(4) > .form-select").select("19");

    //   cy.contains("Initial Interest Rate (p.a.)");
    //   cy.get("#initialInterestRate").clear().type("20.00%");

    //   cy.contains("Deductible interest");
    //   cy.get("#deductibleInterest").clear().type("20.00%");

    //   cy.contains("Minimum Repayments (p.a)");
    //   cy.get("#minimumRepayments");

    //   cy.contains("Actual Annual Repayments");
    //   cy.get("#actualAnnualRepayments")
    //     .clear()
    //     .type("20")
    //     .should("have.value", "$20");

    //   cy.contains("Repay Loan in Year");
    //   cy.get(":nth-child(9) > .form-select").should("have.value", "No");
    // });

    // //Investment Loans (LOC) Inner Footer

    // cy.contains("Close").should("be.visible");
    // cy.contains("Submit").should("be.visible").click();

    // cy.get("#clientcf_investmentLoansLOC").should("have.value", "$20");

    // //Margin Loan

    // cy.wait(2000);
    // cy.get(":nth-child(8) > .py-4").within(() => {
    //   cy.contains("Margin Loan");
    //   cy.get("img");
    //   cy.contains("Aiden Smith");
    //   cy.contains("Emma Taylor");
    // });
    // cy.get(
    //   ":nth-child(8) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0"
    // ).click();
    // cy.get(".modal-content").within(() => {
    //   cy.contains("Margin Loan");
    //   cy.get(".btn-close");
    // });

    // cy.get(".col-md-12 > .d-flex").within(() => {
    //   cy.contains("Owner");

    //   cy.get(".css-v7duua").click();

    //   cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");
    // });

    // cy.wait(2000);
    // cy.get(".table").within(() => {
    //   cy.contains("Owner");
    //   cy.contains("Aiden Smith");
    //   //  cy.get("#streetAddress")
    //   //    .invoke("val")
    //   //    .should((actualValue) => {
    //   //      expect(actualValue.trim()).to.equal("FTS");
    //   //    });

    //   cy.contains("Current Loan Balance").should("be.visible");
    //   cy.get("#currentLoanBalance")
    //     .clear()
    //     .type("24")
    //     .should("have.value", "$24");

    //   cy.contains("Loan Term").should("be.visible");
    //   cy.get(":nth-child(3) > .form-select").select("19");

    //   cy.contains("Initial Interest Rate (p.a.)");
    //   cy.get("#initialInterestRate").clear().type("20.00%");
    //   cy.contains("Deductible interest");
    //   cy.get("#deductibleInterest").clear().type("20.00%");

    //   cy.contains("Repay Loan in Year");
    //   cy.get(":nth-child(7) > .form-select").should("have.value", "No");
    // });

    // cy.wait(2000);
    // cy.contains("Monthly Contributions");
    // cy.get(".radioButton2").contains("Yes").click();

    // //Regular Contributions
    // cy.get("tbody > tr > :nth-child(6)").within(() => {
    //   cy.get("#button-addon2").click();
    // });

    // //Regular Contributions Inner Card End
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    // ).within(() => {
    //   cy.contains("Monthly Contributions");
    //   //cy.get('[style="display: block;"] > .modal-dialog > .modal-content > .modal-header > .btn-close').should('be.visible')
    // });

    // cy.get(".col-md-12 > .row > .mt-4").within(() => {
    //   cy.contains("Contribution");
    //   cy.get("#contribution").clear().type("100").should("have.value", "$100");

    //   cy.contains("Regular contributions p.a");
    //   cy.get("#regularContributions")
    //     .clear()
    //     .type("200")
    //     .should("have.value", "$200");

    //   cy.contains("Contribute from Year");
    //   cy.get(":nth-child(3) > .form-select").select("21");

    //   cy.contains("Contribute Up Until");
    //   cy.get(":nth-child(4) > .form-select").select("10");

    //   cy.contains("Indexation");
    //   cy.get(":nth-child(5) > .form-select").select("2.50%");
    // });
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    // ).within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });

    // //mARGIN lOAN Inner Footer

    // cy.contains("Close").should("be.visible");
    // cy.contains("Submit").should("be.visible").click();

    // cy.get("#clientcf_marginLoan").should("have.value", "$24");

    //  //Cash

    // cy.wait(2000);
    // cy.get(':nth-child(4) > .py-4').within(() => {
    //   cy.contains("Cash");
    //   cy.get("img");
    //   cy.contains("Aiden Smith");
    //   cy.contains("Emma Taylor");
    // });
    // cy.get(':nth-child(4) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0').click();
    // cy.get(".modal-content").within(() => {
    //   cy.contains("Cash");
    //   cy.get(".btn-close");
    // });

    // cy.get(".col-md-12 > .d-flex").within(() => {
    //   cy.contains("Owner");

    //  // cy.get(".css-v7duua").click();

    //   cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");
    // });

    // cy.wait(2000);
    // cy.get(".table").within(() => {
    //   cy.contains("Owner");
    //   cy.contains("Aiden Smith");

    //   cy.contains("Current Balance").should("be.visible");
    //   cy.get('#currentBalance').clear().type("24").should("have.value", "$24");

    //   cy.contains("Investment Returns").should("be.visible");
    //   cy.get(':nth-child(3) > .form-select').select("Input Override");

    //   cy.contains("Income Yield");
    //   cy.get('#incomeYield').clear().type("23").should("have.value", "23");

    //   cy.contains("Reinvest income");
    //   cy.get(':nth-child(5) > .form-check > .radioButton2').contains("Yes").click();

    //   cy.contains("Risk Profile/SAA");
    //   cy.get(':nth-child(7) > .form-select').select("Cash");

    //   cy.contains("Regular Contributions");
    //   cy.get(':nth-child(6) > .form-check > .radioButton2').contains("Yes").click();

    //   cy.get('tbody > tr > :nth-child(6)').within(() => {
    //   cy.get(".modalBtn").click("");
    //   }) // Clicks the first button
    // });

    // //Regular Contributions Inner Card End
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    // ).within(() => {
    //   cy.contains("Regular Contributions");

    // });

    // cy.get(".col-md-12 > .row > .mt-4").within(() => {
    //   cy.contains("Contribution");
    //   cy.get("#contribution").clear().type("100").should("have.value", "$100");

    //   cy.contains("Regular contributions p.a");
    //   cy.get("#regularContributions")
    //     .clear()
    //     .type("200")
    //     .should("have.value", "$200");

    //   cy.contains("Contribute from Year");
    //   cy.get(":nth-child(3) > .form-select").select("21");

    //   cy.contains("Contribute Up Until");
    //   cy.get(":nth-child(4) > .form-select").select("10");

    //   cy.contains("Indexation");
    //   cy.get(":nth-child(5) > .form-select").select("2.50%");
    // });
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    // ).within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });

    // //Cash Footer

    // cy.contains("Close").should("be.visible");
    // cy.contains("Submit").should("be.visible").click();

    // cy.get('#clientcf_cash').should("have.value", "$24");

    // //Term Deposits

    // cy.wait(2000);
    // cy.get(':nth-child(5) > .py-4').within(() => {
    //   cy.contains("Term Deposits");
    //   cy.get("img");
    //   cy.contains("Aiden Smith");
    //   cy.contains("Emma Taylor");
    // });
    // cy.get(':nth-child(5) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0').click();
    // cy.get(".modal-content").within(() => {
    //   cy.contains("Term Deposits");
    //   cy.get(".btn-close");
    // });

    // cy.get(".col-md-12 > .d-flex").within(() => {
    //   cy.contains("Owner");

    //  // cy.get(".css-v7duua").click();

    //   cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");
    // });

    // cy.wait(2000);
    // cy.get(".table").within(() => {
    //   cy.contains("Owner");
    //   cy.contains("Aiden Smith");

    //   cy.contains("Current Balance").should("be.visible");
    //   cy.get('#currentBalance').clear().type("24").should("have.value", "$24");

    //   cy.contains("Investment Returns").should("be.visible");
    //   cy.get(':nth-child(3) > .form-select').select("Input Override");

    //   cy.contains("Income Yield");
    //   cy.get('#incomeYield').clear().type("23").should("have.value", "23");

    //   cy.contains("Reinvest income");
    //   cy.get(':nth-child(5) > .form-check > .radioButton2').contains("Yes").click();

    //   cy.contains("Risk Profile/SAA");
    //   cy.get(':nth-child(7) > .form-select').select("Cash");

    //   cy.contains("Regular Contributions");
    //   cy.get(':nth-child(6) > .form-check > .radioButton2').contains("Yes").click();

    //   cy.get('tbody > tr > :nth-child(6)').within(() => {
    //   cy.get(".modalBtn").click("");
    //   })
    // });

    // //Regular Contributions Inner Card End
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    // ).within(() => {
    //   cy.contains("Regular Contributions");

    // });

    // cy.get(".col-md-12 > .row > .mt-4").within(() => {
    //   cy.contains("Contribution");
    //   cy.get("#contribution").clear().type("100").should("have.value", "$100");

    //   cy.contains("Regular contributions p.a");
    //   cy.get("#regularContributions")
    //     .clear()
    //     .type("200")
    //     .should("have.value", "$200");

    //   cy.contains("Contribute from Year");
    //   cy.get(":nth-child(3) > .form-select").select("21");

    //   cy.contains("Contribute Up Until");
    //   cy.get(":nth-child(4) > .form-select").select("10");

    //   cy.contains("Indexation");
    //   cy.get(":nth-child(5) > .form-select").select("2.50%");
    // });
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    // ).within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });

    // //Term Deposits Footer

    // cy.contains("Close").should("be.visible");
    // cy.contains("Submit").should("be.visible").click();

    // cy.get('#clientcf_termDeposits').should("have.value", "$24");

    //  //Investment Bonds

    //  cy.wait(2000);
    //  cy.get(':nth-child(6) > .py-4').within(() => {
    //    cy.contains("Investment Bonds");
    //    cy.get("img");
    //    cy.contains("Aiden Smith");
    //    cy.contains("Emma Taylor");
    //  });
    //  cy.get(':nth-child(6) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0').click();
    //  cy.get(".modal-content").within(() => {
    //    cy.contains("Investment Bonds");
    //    cy.get(".btn-close");
    //  });

    //  cy.get(".col-md-12 > .d-flex").within(() => {
    //    cy.contains("Owner");

    //   // cy.get(".css-v7duua").click();

    //    cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");
    //  });

    //  cy.wait(2000);
    //  cy.get(".table").within(() => {
    //    cy.contains("Owner");
    //    cy.contains("Aiden Smith");

    //    cy.contains("Current Balance").should("be.visible");
    //    cy.get('#currentBalance').clear().type("24").should("have.value", "$24");

    //    cy.contains("Cost Base").should("be.visible");
    //    cy.get('#costBase').clear().type("77").should("have.value", "$77");

    //    cy.contains("Investment Returns").should("be.visible");
    //    cy.get(':nth-child(4) > .form-select').select("Input Override");

    //    cy.contains("Earnings Rate");
    //    cy.get('#earningsRate').clear().type("23").should("have.value", "23");

    //    cy.contains("Risk Profile/SAA");
    //    cy.get(':nth-child(7) > .form-select').select("Cash");

    //    cy.contains("Investment Fees");
    //    cy.get('#investmentFees').clear().type("23").should("have.value", "23");

    //    cy.contains("Cashout in Funds")
    //    cy.get(':nth-child(9) > .form-select').select("No");

    //    cy.contains("Regular Contributions");
    //    cy.get('.radioButton2').contains("Yes").click();

    //  })

    //  cy.get('tbody > tr > :nth-child(6)').within(() => {
    //   cy.get('#button-addon2').click();
    //  })

    //  //Regular Contributions Inner Card End
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    // ).within(() => {
    //   cy.contains("Regular Contributions");

    // });

    // cy.get(".col-md-12 > .row > .mt-4").within(() => {
    //   cy.contains("Contribution");
    //   cy.get("#contribution").clear().type("100").should("have.value", "$100");

    //   cy.contains("Regular contributions p.a");
    //   cy.get("#regularContributions")
    //     .clear()
    //     .type("200")
    //     .should("have.value", "$200");

    //   cy.contains("Contribute from Year");
    //   cy.get(":nth-child(3) > .form-select").select("21");

    //   cy.contains("Contribute Up Until");
    //   cy.get(":nth-child(4) > .form-select").select("10");

    //   cy.contains("Indexation");
    //   cy.get(":nth-child(5) > .form-select").select("2.50%");
    // });
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    // ).within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });

    //  //Investment Bonds Footer

    //  cy.contains("Close").should("be.visible");
    //  cy.contains("Submit").should("be.visible").click();

    //  cy.get('#clientcf_investmentBonds').should("have.value", "$24");

    // //Super Fund

    // cy.wait(2000);
    // cy.get(":nth-child(10) > .py-4").within(() => {
    //   cy.contains("Super Fund");
    //   cy.get("img");
    //   cy.contains("Aiden Smith");
    //   cy.contains("Emma Taylor");
    // });
    // cy.get(
    //   ":nth-child(10) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0"
    // ).click();
    // cy.get(".modal-content").within(() => {
    //   cy.contains("Super Fund");
    //   cy.get(".btn-close");
    // });

    // cy.get(".col-md-12 > .d-flex").within(() => {
    //   cy.contains("Owner");

    //   cy.get(".css-v7duua").click();

    //   cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");
    // });

    // cy.wait(2000);
    // cy.get(".table").within(() => {
    //   cy.contains("Owner");
    //   cy.contains("Aiden Smith");

    //   cy.contains("Risk Profile").should("be.visible");
    //   cy.get(":nth-child(3) > .form-select").select("Growth");

    //   cy.contains("Investment Returns").should("be.visible");
    //   cy.get(".input-group > .form-select").select("Input Override");

    //   cy.contains("Investment Returns").should("be.visible");
    //   cy.get("#investmentFees").clear().type("23").should("have.value", "23");

    //   cy.contains("Investment Fees %");
    //   cy.get("#adviserServiceFee")
    //     .clear()
    //     .type("99")
    //     .should("have.value", "$99");

    // cy.contains("Balance & Components");
    // cy.get(":nth-child(2) > .input-group").within(() => {
    //   cy.get('button[type="button"]').click();
    // });
    // });

    // //Balance & Components Inner Card
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    // ).within(() => {
    //   cy.contains("Balance & Components");
    // });

    // cy.get(".col-md-12 > .row > .mt-4").within(() => {
    //   cy.contains("Fund");
    //   cy.contains("Current Balance");

    //   cy.contains("Current Balance");
    //   cy.get("#currentBalance").should("have.value", "$4,536");

    //   cy.contains("Tax-Free Component");
    //   cy.get("#taxFreeComponent").should("have.value", "$21");

    //   cy.contains("Pension Rollback (Year 1 Only)");
    //   cy.get("#pensionRollback").clear().type("21").should("have.value", "$21");

    //   cy.contains("Tax-Free Component of Pension");
    //   cy.get("#taxFreeComponentPension")
    //     .clear()
    //     .type("99")
    //     .should("have.value", "$99");

    //   cy.contains("Tax-Free Component");
    //   cy.get("#totalTaxFreeComponent");

    //   cy.contains("Taxable Component");
    //   cy.get("#taxableComponent");
    // });
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    // ).within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });

    // //Investment Returns
    // cy.contains("Investment Returns");
    // cy.get(".GInputSelect").within(() => {
    //   cy.get('button[type="button"]').click();
    // });

    // //Investment Returns Inner Card
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    // ).within(() => {
    //   cy.contains("Input Override");
    // });

    // cy.get(".col-md-12 > .row > .mt-4").within(() => {
    //   cy.contains("Income Yield");
    //   cy.get("#incomeYield").clear().type("23").should("have.value", "23");

    //   cy.contains("Growth Rate");
    //   cy.get("#growthRate").clear().type("53").should("have.value", "53");

    //   cy.contains("Franking");
    //   cy.get("#franking").clear().type("66").should("have.value", "66");
    // });
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    // ).within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });

    // //Insurance Premiums

    // cy.contains("Insurance Premiums");
    // cy.get("tbody > tr > :nth-child(7)").within(() => {
    //   cy.contains("Yes").click();
    //   cy.get("#button-addon2").click();
    // });

    // //Investment Returns Inner Card
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    // ).within(() => {
    //   cy.contains("Insurance Premiums");
    // });

    // cy.get(".col-md-12 > .row > .mt-4").within(() => {
    //   cy.contains("Fund");

    //   cy.contains("Insurance Premiums");
    //   cy.get("#insurancePremiums").should("have.value", "$85");

    //   cy.contains("Years to Include");
    //   cy.get(":nth-child(3) > .form-select").select("1");

    //   cy.contains("Indexation of Premiums");
    //   cy.get(":nth-child(4) > .form-select").select("2.50%");
    // });
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    // ).within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });

    // //Rollover Funds

    // cy.contains("Rollover Funds");
    // cy.get('tbody > tr > :nth-child(8)').within(() => {
    //   cy.contains("Yes").click();
    //   cy.get("#button-addon2").click();
    // });

    // //Rollover Funds Inner Card
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    // ).within(() => {
    //   cy.contains("Rollover Funds");
    // });

    // cy.get(".col-md-12 > .row > .mt-4").within(() => {
    //   cy.contains("Fund");
    //   cy.contains("Fund 1")
    //   cy.contains("Fund 2")

    //   cy.contains("Rollover Benefit to fund");
    //   cy.get(':nth-child(1) > :nth-child(2) > .form-select').select("SMSF")
    //   cy.get(':nth-child(2) > :nth-child(2) > .form-select').select("N/A")

    //   cy.contains("Rollover benefits in Year");
    //   cy.get(':nth-child(2) > :nth-child(3) > .form-select').select("21")
    //   cy.get(':nth-child(2) > :nth-child(3) > .form-select').select("19")

    // });
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    // ).within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });

    // //Concessional Contributions
    // cy.contains("Concessional Contributions");
    // cy.get("tbody > tr > :nth-child(9)").within(() => {
    //   cy.contains("Yes").click();
    //   cy.get("#button-addon2").click();
    // });

    // //Concessional Contributions
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    // ).within(() => {
    //   cy.contains("Concessional Contributions");
    // });

    // cy.get(".col-md-12 > .row > .mt-4").within(() => {
    //   cy.contains("Owner");
    //   cy.contains("Aiden Smith");

    //   cy.contains("Employer SG Contributions");
    //   cy.get(":nth-child(2) > .form-select").select("SGC");

    //   cy.contains("Personal/Salary Sacrifice");
    //   cy.get('[style="min-width: 10vw;"] > .input-group > .form-select').select(
    //     "Other"
    //   );

    //   cy.contains("Affordability amount (net p.a.) / Other Amount");
    //   cy.get("#affordabilityOtherAmount")
    //     .clear()
    //     .type("24")
    //     .should("have.value", "$24");

    //   cy.contains("Indexation of Other Amount");
    //   cy.get(":nth-child(5) > .form-select").select("2.50%");

    //   cy.contains("Contributions To Fund");
    //   cy.get(":nth-child(6) > .form-select").select("2");

    //   cy.contains("Year to Commence");
    //   cy.get(":nth-child(7) > .form-select").select("21");

    //   cy.contains("Years to Include");
    //   cy.get(":nth-child(8) > .form-select").select("1");

    //   cy.contains("Catch Up contribution (Year 1 only)");
    //   cy.get("#catchUpContribution")
    //     .clear()
    //     .type("24")
    //     .should("have.value", "$24");

    //   cy.contains("Contributions To Fund");
    //   cy.get(":nth-child(10) > .form-select").select("SMSF");

    //   cy.contains("Contribution Splitting");
    //   // cy.get('.radioButton2').contains("Yes")
    //   //   .check();

    //   cy.get(".tableYesLabel").click();
    //   cy.get("tr > :nth-child(11) > .d-flex").within(() => {
    //     cy.get("#button-addon2").click();
    //   });
    // });

    // //Contribution Splitting Inner Card

    // cy.contains("Contribution Splitting");

    // cy.get(
    //   ":nth-child(7) > .modal-dialog > .modal-content > .modal-body > form > :nth-child(1) > .col-md-12 > .row > .mt-4"
    // ).within(() => {
    //   cy.contains("Owner");
    //   cy.contains("Aiden Smith");

    //   cy.contains("Contribution Splitting");
    //   cy.get("#contributionSplitting")
    //     .clear()
    //     .type("24")
    //     .should("have.value", "$24");

    //   cy.contains("Year to Commence");
    //   cy.get('select[name="yearToCommence"]').select("1");

    //   cy.contains("Years to Include");
    //   cy.get(":nth-child(4) > .form-select").select("21");

    //   cy.contains("Contributions To Fund");
    //   cy.get('select[name="contributionsToFund"]').select("SMSF");
    // });
    // cy.get(".modal-footer .btn-secondary").should("be.visible"); // Close button

    // cy.get(".modal-footer .modalBtn").filter(":visible").first().click();

    // //Personal/Salary Sacrifice inner card
    // cy.get('[style="min-width: 10vw;"]').within(() => {
    //   cy.get(".btn.bgColor.modalBtn").click();
    // });
    // cy.contains("Other Percentage Amount").should("be.visible");

    // cy.contains("Other Percentage Amount");
    // cy.get("#otherPercentageAmount")
    //   .clear()
    //   .type("44")
    //   .should("have.value", "44");

    // cy.get(".modal-footer .btn-secondary").filter(":visible").first();

    // cy.get(".modal-footer .modalBtn").filter(":visible").first().click();

    // //Concessional Contributions Closing
    // cy.contains("Close");
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer > .bgColor'
    // )
    //   .contains("Submit")

    //   .click();

    // //Non Concessional Contributions
    // cy.contains("Non Concessional Contributions");
    // cy.get("tbody > tr > :nth-child(10)").within(() => {
    //   cy.contains("Yes").click();
    //   cy.get("#button-addon2").click();
    // });

    // //Non Concessional Contributions
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    // ).within(() => {
    //   cy.contains("Non Concessional Contributions");
    // });

    // cy.get(".col-md-12 > .row > .mt-4").within(() => {
    //   cy.contains("Owner");
    //   cy.contains("Aiden Smith");

    //   cy.contains("Lumpsum Non-Concessional (Year 1 only)");
    //   cy.get("#lumpsumNonConcessionalYearOne").clear().type("34");

    //   cy.contains("Contributions To Fund");
    //   cy.get('select[name="contributionsToFund"]').select("SMSF");

    //   cy.contains("Regular Non-Concessional");
    //   cy.get("#regularNonConcessional")
    //     .clear()
    //     .type("24")
    //     .should("have.value", "$24");

    //   cy.contains("Year to Commence");
    //   cy.get(":nth-child(6) > .form-select").select("7");

    //   cy.contains("Years to Include");
    //   cy.get(":nth-child(7) > .form-select").select("2");

    //   cy.contains("Contributions To Fund");
    //   cy.get(":nth-child(8) > .form-select").select("SMSF");

    //   cy.contains("Government Co-contribution to");
    //   cy.get(":nth-child(9) > .form-select").select("1");

    //   cy.contains("Lumpsum Non-Concessional");
    //   // cy.get('.radioButton2').contains("Yes")
    //   //   .check();

    //   cy.get(":nth-child(4) > .form-check > .radioButton2")
    //     .contains("Yes")
    //     .click();
    //   cy.get("tr > :nth-child(4) > .d-flex").within(() => {
    //     cy.get("#button-addon2").first().click();
    //   });
    // });

    // //Lumpsum Non-Concessional Inner Card

    // cy.contains("Lumpsum Non - Concessional");

    // cy.get(
    //   ":nth-child(7) > .modal-dialog > .modal-content > .modal-body > form > :nth-child(1) > .col-md-12 > .row > .mt-4"
    // ).within(() => {
    //   cy.contains("Owner");
    //   cy.contains("Aiden Smith");

    //   cy.contains("Contributions To Fund");
    //   cy.get(":nth-child(2) > .form-select").select("1");

    //   cy.contains("Year");
    //   cy.get('select[name="year"]').select("1");

    //   cy.contains("Amount");
    //   cy.get("#amount").clear().type("24").should("have.value", "$24");
    // });
    // cy.get(".modal-footer .btn-secondary").should("be.visible"); // Close button

    // cy.get(".modal-footer .modalBtn").filter(":visible").first().click();

    // //Lumpsum Non-Concessional ENded

    // //Downsizer contribution
    // cy.contains("Downsizer contribution");

    // cy.get(
    //   ":nth-child(2) > .row > .mt-4 > .table-responsive > .table > tbody > tr > :nth-child(10)"
    // ).within(() => {
    //   cy.contains("Yes").click();
    //   cy.get("#button-addon2").first().click();
    // });

    // cy.contains("Downsizer contribution");

    // cy.get(
    //   ":nth-child(7) > .modal-dialog > .modal-content > .modal-body > form > :nth-child(1) > .col-md-12 > .row > .mt-4"
    // ).within(() => {
    //   cy.contains("Owner");
    //   cy.contains("Aiden Smith");

    //   cy.contains("Downsizer contribution (Year 1 only)");
    //   cy.get("#downSizerContribution")
    //     .clear()
    //     .type("24")
    //     .should("have.value", "$24");

    //   cy.contains("Contributions To Fund");
    //   cy.get('select[name="contributionsToFund"]').select("1");
    // });
    // cy.get(".modal-footer .btn-secondary").should("be.visible"); // Close button

    // cy.get(".modal-footer .modalBtn").filter(":visible").first().click();

    // //Apply Spouse Contribution
    // cy.contains("Apply Spouse Contribution");

    // cy.get(
    //   ":nth-child(2) > .row > .mt-4 > .table-responsive > .table > tbody > tr > :nth-child(11)"
    // ).within(() => {
    //   cy.contains("Yes").click();
    //   cy.get("#button-addon2").first().click();
    // });

    // cy.contains("Apply Spouse Contribution");

    // cy.get(
    //   ":nth-child(7) > .modal-dialog > .modal-content > .modal-body > form > :nth-child(1) > .col-md-12 > .row > .mt-4"
    // ).within(() => {
    //   cy.contains("Owner");
    //   cy.contains("Aiden Smith");

    //   cy.contains("Year to Commence");
    //   cy.get('select[name="yearToCommence"]').select("5");

    //   cy.contains("Years to Include");
    //   cy.get('select[name="yearToCommence"]').select("10");
    // });
    // cy.get(".modal-footer .btn-secondary").should("be.visible"); // Close button

    // cy.get(".modal-footer .modalBtn").filter(":visible").first().click();

    // //	Withdrawals

    // cy.contains("Withdrawals");

    // cy.get(
    //   ":nth-child(2) > .row > .mt-4 > .table-responsive > .table > tbody > tr > :nth-child(11)"
    // ).within(() => {
    //   cy.contains("Yes").click();
    //   cy.get("#button-addon2").first().click();
    // });

    // cy.contains("Apply Spouse Contribution");

    // cy.get(
    //   ":nth-child(7) > .modal-dialog > .modal-content > .modal-body > form > :nth-child(1) > .col-md-12 > .row > .mt-4"
    // ).within(() => {
    //   cy.contains("Owner");
    //   cy.contains("Aiden Smith");

    //   cy.contains("Year to Commence");
    //   cy.get('select[name="yearToCommence"]').select("5");

    //   cy.contains("Years to Include");
    //   cy.get('select[name="yearToCommence"]').select("10");
    // });
    // cy.get(".modal-footer .btn-secondary").should("be.visible"); // Close button

    // cy.get(".modal-footer .modalBtn").filter(":visible").first().click();
    // //Concessional Contributions Closing
    // cy.contains("Close");
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer > .bgColor'
    // )
    //   .contains("Submit")

    //   .click();

    // cy.contains("Withdrawals");
    // cy.get("tbody > tr > :nth-child(11)")
    //   .first()
    //   .within(() => {
    //     cy.contains("Yes").click();
    //     cy.get("#button-addon2").first().click();
    //   });

    // cy.contains("Withdrawals");

    // cy.get(".col-md-12 > .row > .mt-4 > .table-responsive > .table").within(
    //   () => {
    //     cy.contains("Owner");
    //     cy.contains("Aiden Smith");

    //     cy.contains("Contributions To Fund");
    //     cy.get('select[name="contributionsToFund"]').select("1"); // Select option with visible text "1"

    //     cy.contains("Year");
    //     cy.get('select[name="year"]').select("5");

    //     cy.contains("Amount");
    //     cy.get("#amount").clear().type("24");
    //   }
    // );
    // cy.get(".modal-footer .btn-secondary").should("be.visible"); // Close button

    // cy.get(".modal-footer .modalBtn").filter(":visible").first().click();

    // //Super Fund Fotter

    // cy.get(".modal-footer")
    //   .first()
    //   .within(() => {
    //     cy.contains("Close");
    //     cy.contains("Submit").click();
    //   });

    // cy.get("#clientcf_superFund").should("have.value", "$99");

    //Account Based Pension

    cy.wait(2000);
    cy.get(":nth-child(11) > .py-4").within(() => {
      cy.contains("Account Based Pension");
      cy.get("img");
      cy.contains("Aiden Smith");
      cy.contains("Emma Taylor");
    });
    cy.get(
      ":nth-child(11) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0"
    ).click();
    cy.get(".modal-content").within(() => {
      cy.contains("Account Based Pension");
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

      cy.contains("Year to Commence").should("be.visible");
      cy.get(":nth-child(3) > .form-select").select("Growth");

      cy.contains("Risk Profile").should("be.visible");
      cy.get(":nth-child(4) > .form-select").select("Growth");

      cy.contains("Investment Fees %").should("be.visible");
      cy.get("#investmentFees").clear().type(2);

      cy.contains("Adviser Service Fee ($)");
      cy.get("#adviserServiceFee")
        .clear()
        .type("99")
        .should("have.value", "$99");

      cy.contains("Balance & Rollover Amount");
      cy.get(":nth-child(2) > .input-group").within(() => {
        cy.get('button[type="button"]').click();
      });
    });

    //Balance & Rollover Amount
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    ).within(() => {
      cy.contains("Balance & Rollover Amount");
    });

    cy.get(".col-md-12 > .row > .mt-4").within(() => {
      cy.contains("Owner");
      cy.contains("Aiden Smith");
      cy.contains("Pension Type");
      cy.get(":nth-child(2) > .form-select").select("TTR");

      cy.contains("Commence Pension in Year");
      cy.get('select[name="commencePensionYear"]').select("5");

      cy.contains("Total Superannuation Benefits");
      cy.get("#totalSuperAnnuationBenefits");

      cy.contains("Nominated Rollover amount");
      // cy.get('[style="min-width: 10vw;"] > .form-select').click().select("Partial");
      // cy.wait(2000)
      // cy.get("#nominatedRolloverAmount").clear().type(34);

      cy.contains("Tax-free Component");
      cy.get("#taxFreeComponent")
        .clear()
        .type("99")
        .should("have.value", "$99");

      cy.contains("Apply Deeming");
      cy.get(
        ":nth-child(4) > .form-check > .radioButton2 > .tableYesLabel > span"
      ).click();
      cy.get("#button-addon2").click();
    });

    //Apply Deeming inner card
    cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
      cy.contains("Apply Deeming");

      cy.contains("Purchase Price (Less Commut)");
      cy.get("#purchasePrice").clear().type("12");

      cy.contains("Centrelink Relevant Number");
      cy.get("#centreLinkRelevantNumber").clear().type("7");

      cy.contains("Close");
      cy.contains("Submit").click();
    });

    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    )
      .first()
      .within(() => {
        cy.contains("Close").should("be.visible");
        cy.contains("Submit").should("be.visible").click();
      });

    cy.contains("Investment Returns");
    cy.get(".GInputSelect").within(() => {
      cy.get('button[type="button"]').click();
    });

    //Investment Returns Inner Card
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    ).within(() => {
      cy.contains("Input Override");
    });

    cy.get(".col-md-12 > .row > .mt-4").within(() => {
      cy.contains("Income Yield");
      cy.get("#incomeYield").clear().type("23").should("have.value", "23");

      cy.contains("Growth Rate");
      cy.get("#growthRate").clear().type("53").should("have.value", "53");

      cy.contains("Franking");
      cy.get("#franking").clear().type("66").should("have.value", "66");
    });
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    ).within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.contains("Pension Payments");
    cy.get(":nth-child(8) > .input-group").within(() => {
      cy.get('button[type="button"]').click();
    });

    //Investment Returns Inner Card
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    ).within(() => {
      cy.contains("Pension Payments");
    });

    cy.get(".col-md-12 > .row > .mt-4").within(() => {
      cy.contains("Owner");
      cy.contains("Aiden Smith");

      cy.contains("Nominated Pension Amount");
      cy.get(":nth-child(2) > .form-select").select("Maximum");

      cy.contains("Reversionary Pension Option");
      cy.get(":nth-child(3) > .form-check > .radioButton2")
        .contains("Yes")
        .click();

      cy.contains("Other Amount");
      cy.get("#otherAmount").clear().type("66").should("have.value", "$66");

      cy.contains("Indexation of Pension");
      cy.get(":nth-child(5) > .form-select").select("2.50%");
      cy.contains("Preservation Age");
      cy.get("#preservationAge");

      cy.contains("Preservation Age in Year");
      cy.get("#preservationAgeYear");

      cy.contains("Minimum Pension");
      cy.get("#minimumPension");

      cy.contains("Maximum TTR Pension");
      cy.get("#maximumTTRPension");
    });
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    ).within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.wait(2000);

    //New Pension Rollover
    cy.contains("New Pension Rollover");

    cy.get("tbody > tr > :nth-child(9)").within(() => {
      cy.contains("Yes").click();
      cy.get("#button-addon2").first().click();
    });

    cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
      () => {
        cy.contains("New Pension Rollover");

        cy.get(".col-md-12 > .row > .mt-4 > .table-responsive").within(() => {
          cy.contains("Owner");
          cy.contains("Aiden Smith");

          cy.contains("Commence Pension in year");
          cy.get(":nth-child(2) > .form-select").select("18");

          cy.contains("Current Pension Details");
          cy.get("#currentPensionDetails");

          cy.contains("Total Superannuation Benefits");
          cy.get("#totalSuperannuationBenefits");

          cy.contains("Nominated Rollover Amount");
          cy.get("#nominatedRolloverAmount")
            .clear()
            .type("99")
            .should("have.value", "$99");

          cy.contains("Reversionary Pension Option");
          cy.get(":nth-child(6) > .form-check > .radioButton2")
            .contains("Yes")
            .click();

          cy.contains("Nominated Pension Amount");
          cy.get(":nth-child(7) > .form-select").select("Minimum");

          cy.contains("Other Amount");
          cy.get("#otherAmount").clear().type("99").should("have.value", "$99");

          cy.contains("Indexation of Pension");
          cy.get(":nth-child(9) > .form-select").select("2.50%");

          cy.contains("Pension Funding");
          cy.get("#pensionFunding").clear().type("3.00%");

          cy.contains("Apply from Year");
          cy.get(":nth-child(11) > .form-select").select("21");

          cy.contains("Minimum Pension");
          cy.get("#minimumPension");

          cy.contains("Maximum Pension");
          cy.get("#maximumPension");
        });
        cy.get("div.modal-footer").contains("Close");
        cy.get("div.modal-footer").contains("Submit").click();
      }
    );

    cy.wait(2000);

    //Withdrawals
    cy.contains("Withdrawals");

    cy.get("tbody > tr > :nth-child(10)").within(() => {
      cy.contains("Yes").click();
      cy.get("#button-addon2").first().click();
    });

    cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
      () => {
        cy.contains("Withdrawals");

        cy.get(".col-md-12 > .row > .mt-4 > .table-responsive").within(() => {
          cy.contains("Owner");
          cy.contains("Aiden Smith");

          cy.contains("Contributions To Fund");
          cy.get(":nth-child(2) > .form-select").select("SMSF");

          cy.contains("Year");
          cy.get('select[name="year"]').select("Year 10");

          cy.contains("Amount");

          cy.get("#amount").clear().type("43");
        });
        cy.get("div.modal-footer").contains("Close");
        cy.get("div.modal-footer").contains("Submit").click();
      }
    );

    //Account Base Pension

    cy.get(".modal-footer")
      .first()
      .within(() => {
        cy.contains("Close");
        cy.contains("Submit").click();
      });

    cy.get("#clientcf_accountBasedPension").should("have.value", "$99");

    //     //Annuities

    //     cy.wait(2000);
    //     cy.get(":nth-child(12) > .py-4").within(() => {
    //       cy.contains("Annuities");
    //       cy.get("img");
    //       cy.contains("Aiden Smith");
    //       cy.contains("Emma Taylor");
    //     });
    //     cy.get(
    //       ":nth-child(12) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0"
    //     ).click();
    //     cy.get(".modal-content").within(() => {
    //       cy.contains("Annuities");
    //       cy.get(".btn-close");
    //     });

    //     cy.get(".col-md-12 > .d-flex").within(() => {
    //       cy.contains("Owner");

    //       cy.get(".css-v7duua").click();

    //       cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");
    //     });

    //     cy.wait(2000);
    //     cy.get(".table").within(() => {
    //       cy.contains("Owner");
    //       cy.contains("Aiden Smith");

    //       cy.contains("Original Investment Amount").should("be.visible");
    //       cy.get("#originalInvestmentAmount")
    //         .clear()
    //         .type("99")
    //         .should("have.value", "$99");

    //       cy.contains("Source of Funds").should("be.visible");
    //       cy.get(":nth-child(3) > .form-select").select("Super");

    //       cy.contains("Annuity Type").should("be.visible");
    //       cy.get(":nth-child(4) > .form-select").select("Life-Time");

    //       cy.contains("Is this a Reversionary Annuity");
    //       cy.get(":nth-child(5) > .form-check > .radioButton2")
    //         .contains("Yes")
    //         .click();

    //       cy.contains("Include From Year");
    //       cy.get(":nth-child(7) > .form-select").select(17);

    //       cy.contains("Term");
    //       cy.get(":nth-child(8) > .form-select").select("21");

    //       cy.contains("Years Until Maturity");
    //       cy.get(":nth-child(9) > .form-select").select("10");

    //       cy.contains("Annual Inflation Rate");
    //       cy.get(":nth-child(10) > .form-select").select("2.50%");

    //       cy.contains("Annual Payment");
    //       cy.get("#annualPayment").clear().type("99").should("have.value", "$99");

    //       cy.contains("RCV");
    //       cy.get("tbody > tr > :nth-child(6)").within(() => {
    //         cy.contains("Yes").click();
    //         cy.get("#button-addon2").click();
    //       });
    //     });

    //     //RCV
    //     cy.get(
    //       '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    //     ).within(() => {
    //       cy.contains("RCV");
    //     });

    //     cy.get(".col-md-12 > .row > .mt-4").within(() => {
    //       cy.contains("Owner");
    //       cy.contains("Aiden Smith");
    //       cy.contains("RCV");
    //       cy.get("#RCV").clear().type("99");

    //       cy.contains("RCV Other");
    //       cy.get("#RCVOther");

    //       cy.contains("Communication at End of Term");
    //       cy.get("#communicationEndTerm")
    //         .clear()
    //         .type("99")
    //         .should("have.value", "$99");
    //     });
    //     cy.get(
    //       '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    //     ).within(() => {
    //       cy.contains("Close").should("be.visible");
    //       cy.contains("Submit").should("be.visible").click();
    //     });

    // //Deductible Amount
    //     cy.contains("Deductible Amount");
    //     cy.get('tbody > tr > :nth-child(12)') .within(() => {
    //       cy.contains("Yes").click();
    //       cy.get("#button-addon2").click();
    //       });

    //      //Deductible Amount Card
    //      cy.get(
    //       '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    //     ).within(() => {
    //       cy.contains("Deductible Amount");
    //     });

    //     cy.get(".col-md-12 > .row > .mt-4").within(() => {
    //       cy.contains("Owner");
    //       cy.contains("Aiden Smith");
    //       cy.contains("Other Deductible Amount");
    //       cy.get('#otherDeductibleAmount').clear().type("99").should("have.value", "$99");

    //       cy.contains("Deductible Amount")
    //       cy.get('#deductibleAmount')

    //     });
    //     cy.get(
    //         '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    //       ).within(() => {
    //         cy.contains("Close").should("be.visible");
    //         cy.contains("Submit").should("be.visible").click();
    //       });

    // //Annuities

    //       cy.get(".modal-footer")
    //       .first()
    //       .within(() => {
    //         cy.contains("Close");
    //         cy.contains("Submit").click();
    //       });

    //       cy.get('#clientcf_annuities').should("have.value", "$99");
  }
}
export default ClientFinancialInvestments;
