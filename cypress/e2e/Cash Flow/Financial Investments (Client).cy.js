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


  //          //Investment Bonds

  //          cy.wait(2000);
  //          cy.get(':nth-child(6) > .py-4').within(() => {
  //            cy.contains("Investment Bonds");
  //            cy.get("img");
  //            cy.contains("Aiden Smith");
  //            cy.contains("Emma Taylor");
  //          });
  //          cy.get(':nth-child(6) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0').click();
  //          cy.get(".modal-content").within(() => {
  //            cy.contains("Investment Bonds");
  //            cy.get(".btn-close");
  //          });
   
  //          cy.get(".col-md-12 > .d-flex").within(() => {
  //            cy.contains("Owner");
   
  //           // cy.get(".css-v7duua").click();
   
  //            cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");
  //          });
   
  //          cy.wait(2000);
  //          cy.get(".table").within(() => {
  //            cy.contains("Owner");
  //            cy.contains("Aiden Smith");
           
   
  //            cy.contains("Current Balance").should("be.visible");
  //            cy.get('#currentBalance').clear().type("24").should("have.value", "$24");

  //            cy.contains("Cost Base").should("be.visible");
  //            cy.get('#costBase').clear().type("77").should("have.value", "$77");
   
  //            cy.contains("Investment Returns").should("be.visible");
  //            cy.get(':nth-child(4) > .form-select').select("Input Override");
   
  //            cy.contains("Earnings Rate");
  //            cy.get('#earningsRate').clear().type("23").should("have.value", "23");
   
  //            cy.contains("Risk Profile/SAA");
  //            cy.get(':nth-child(7) > .form-select').select("Cash");
   
             
  //            cy.contains("Investment Fees");
  //            cy.get('#investmentFees').clear().type("23").should("have.value", "23");

  //            cy.contains("Cashout in Funds")
  //            cy.get(':nth-child(9) > .form-select').select("No");
   
  //            cy.contains("Regular Contributions");
  //            cy.get('.radioButton2').contains("Yes").click();
             
  //          })
   
  //          //Investment Bonds Footer
   
  //          cy.contains("Close").should("be.visible");
  //          cy.contains("Submit").should("be.visible").click();
   
  //          cy.get('#clientcf_investmentBonds').should("have.value", "$24");
   }
}
export default ClientFinancialInvestments;
