class FinancialInvestments {
  section() {
    cy.visit(Cypress.env("CashFlowUrl"));
    cy.get(
      ":nth-child(6) > :nth-child(7) > :nth-child(1) > div > button"
    ).click();
    cy.get("#popover > :nth-child(3)").click();
    cy.get(
      '[statusstep="32"] > .ant-steps-item-container > .ant-steps-item-icon > .ant-steps-icon > .rounded-circle'
    ).click();

    // cy.get(".img-fluid").click();

    // cy.get(":nth-child(4) > .col-md-12 > .btn-outline")
    //   .contains("Back")
    //   .should("be.visible");
    // cy.get(":nth-child(4) > .col-md-12 > .bgColor")
    //   .contains("Next")
    //   .should("be.visible");

    //   Select Cards

    // //Header
    // cy.get(".modal-header").within(() => {
    //   cy.contains("Questions").should("be.visible");
    //   cy.get(".btn-close").should("be.visible");
    // });

    // //Body
    // cy.get(".modal-body").within(() => {
    //   cy.wait(1000);
    //   cy.get(":nth-child(1) > .d-flex > .border")
    //     .click()
    //     .within(() => {
    //       cy.get("img").should("be.visible");
    //       cy.contains("Bank Accounts").should("be.visible");
    //     });

    //   cy.wait(1000);
    //   cy.get(":nth-child(2) > .d-flex > .border")
    //     .click()
    //     .within(() => {
    //       cy.get("img").should("be.visible");
    //       cy.contains("Term Deposits").should("be.visible");
    //     });

    //   cy.wait(1000);
    //   cy.get(":nth-child(3) > .d-flex > .border")
    //     .click()
    //     .within(() => {
    //       cy.get("img").should("be.visible");
    //       cy.contains("Australian Shares/ETFs").should("be.visible");
    //     });

    //   cy.wait(1000);
    //   cy.get(":nth-child(4) > .d-flex > .border")
    //     .click()
    //     .within(() => {
    //       cy.get("img").should("be.visible");
    //       cy.contains("Platform Investments").should("be.visible");
    //     });

    //   cy.wait(1000);
    //   cy.get(":nth-child(5) > .d-flex > .border")
    //     .click()
    //     .within(() => {
    //       cy.get("img").should("be.visible");
    //       cy.contains("Investment Bonds").should("be.visible");
    //     });

    //   cy.wait(1000);
    //   cy.get(":nth-child(6) > .d-flex > .border")
    //     .click()
    //     .within(() => {
    //       cy.get("img").should("be.visible");
    //       cy.contains("Superannuation").should("be.visible");
    //     });

    //   cy.wait(1000);
    //   cy.get(":nth-child(7) > .d-flex > .border")
    //     .click()
    //     .within(() => {
    //       cy.get("img").should("be.visible");
    //       cy.contains("Account Based Pensions").should("be.visible");
    //     });

    //   cy.wait(1000);
    //   cy.get(":nth-child(8) > .d-flex > .border")
    //     .click()
    //     .within(() => {
    //       cy.get("img").should("be.visible");
    //       cy.contains("Annuities").should("be.visible");
    //     });

    //   cy.wait(1000);
    //   cy.get(":nth-child(9) > .d-flex > .border")
    //     .click()
    //     .within(() => {
    //       cy.get("img").should("be.visible");
    //       cy.contains("Investment Properties ").should("be.visible");
    //     });

    //   cy.wait(1000);
    //   cy.get(":nth-child(10) > .d-flex > .border")
    //     .click()
    //     .within(() => {
    //       cy.get("img").should("be.visible");
    //       cy.contains("Investment Loans ").should("be.visible");
    //     });

    //   cy.wait(1000);
    //   cy.get(":nth-child(11) > .d-flex > .border")
    //     .click()
    //     .within(() => {
    //       cy.get("img").should("be.visible");
    //       cy.contains("Margin Loans").should("be.visible");
    //     });
    // });

    // //Footer
    // cy.get(".modal-footer").within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });

    // //Bank Accounts

    // cy.get(":nth-child(1) > .py-4").within(() => {
    //   cy.contains("Bank Accounts");
    //   cy.get("img");
    //   cy.contains("Aiden Smith");
    //   cy.contains("Emma Taylor");
    //   cy.get(
    //     "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
    //   ).click();
    // });

    // cy.get(".modal-content").within(() => {
    //   cy.contains("Bank Accounts");
    //   cy.get(".btn-close");
    //   cy.get(".table").within(() => {
    //     cy.contains("Owner");
    //     cy.get('[style="width: 50%;"]').contains("Aiden Smith");
    //     cy.contains("Current Balance");
    //   });
    // });

    // cy.get("#button-addon2").click();

    // cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
    //   () => {
    //     cy.contains("Aiden Smith_Bank Accounts Detail");
    //     cy.contains("How many Bank Accounts Detail does Aiden Smith have :");
    //     cy.get("#NumberOfMap").clear().type(1);
    //   }
    // );
    // //Inner Table
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-body > form > :nth-child(1) > .col-md-12 > .row > .mt-4'
    // ).within(() => {
    //   cy.contains("No#");
    //   cy.contains("1");

    //   cy.contains("Name of Institution");
    //   cy.get("#Institution0").select("Testing");

    //   cy.contains("Account number");
    //   cy.get("#accountNumber0").clear().type("3535");

    //   cy.contains("Current Balance");
    //   cy.get("#currentBalance0").clear().type("4536");
    // });
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    // ).within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });

    // cy.get("#clientCurrentBalance").should("have.value", "$4,536");
    // cy.contains("Close");
    // cy.get(".modal-footer > .bgColor")
    //   .contains("Submit")
    //   .should("be.visible")
    //   .click();

    // cy.get("#clientbankAccountFinance").should("not.have.value", "");

    // cy.wait(1000);

    // //Term Deposits
    // cy.get(":nth-child(2) > .py-4").within(() => {
    //   cy.contains("Term Deposits");
    //   cy.get("img");
    //   cy.contains("Aiden Smith");
    //   cy.contains("Emma Taylor");
    //   cy.get(
    //     "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
    //   ).click();
    // });

    // cy.get(".modal-content").within(() => {
    //   cy.contains("Term Deposits");
    //   cy.get(".btn-close");
    //   cy.get(".table").within(() => {
    //     cy.contains("Owner");
    //     cy.get('[style="width: 50%;"]').contains("Aiden Smith");
    //     cy.contains("Current Balance");
    //   });
    // });

    // cy.get("#button-addon2").click();

    // cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
    //   () => {
    //     cy.contains("Aiden Smith_Term Deposits Detail");
    //     cy.contains("How many Term Deposits Detail does Aiden Smith have :");
    //     cy.get("#NumberOfMap").clear().type(1);
    //   }
    // );
    // //Inner Table
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-body > form > :nth-child(1) > .col-md-12 > .row > .mt-4'
    // ).within(() => {
    //   cy.contains("No#");
    //   cy.contains("1");

    //   cy.contains("Name of Institution");
    //   cy.get("#Institution0").select("Testing");

    //   cy.contains("Account number");
    //   cy.get("#accountNumber0").clear().type("3535");

    //   cy.contains("Current Balance");
    //   cy.get("#currentBalance0").clear().type("4536");
    // });
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    // ).within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });
    // cy.get("#clientCurrentBalance").should("have.value", "$4,536");

    // cy.contains("Close");
    // cy.get(".modal-footer > .bgColor")
    //   .contains("Submit")
    //   .should("be.visible")
    //   .click();

    // cy.get("#clienttermDepositsFinance").should("not.have.value", "");

    // cy.wait(1000);

    // //Australian Shares/ETFs

    // cy.get(":nth-child(3) > .py-4").within(() => {
    //   cy.contains("Australian Shares/ETFs");
    //   cy.get("img");
    //   cy.contains("Aiden Smith")
    //   cy.contains("Emma Taylor");
    //   cy.get(
    //     "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
    //   ).click();
    // });

    // cy.get(".modal-content").within(() => {
    //   cy.contains("Australian Shares/ETFs");
    //   cy.get(".btn-close");
    //   cy.get(".table").within(() => {
    //     cy.contains("Owner");
    //     cy.get('[style="width: 50%;"]').contains("Aiden Smith");
    //     cy.contains("Current Balance");
    //   });
    // });

    // cy.get("#button-addon2").click();

    // cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
    //   () => {
    //     cy.contains("Aiden Smith_Australian Shares/ETFs Detail");
    //     cy.contains("How many Australian Shares/ETFs Detail does Aiden Smith have :");
    //     cy.get("#NumberOfMap").clear().type(1);
    //   }
    // );
    // //Inner Table
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-body > form > :nth-child(1) > .col-md-12 > .row > .mt-4'
    // ).within(() => {
    //   cy.contains("No#");
    //   cy.contains("1");

    //   cy.contains("ASX Code");
    //   cy.get("#ASXCode0").clear().type("BML.AX");
    //   cy.wait(2000);
    //   cy.contains("Company Name");
    //   cy.get("#companyName0").should("not.have.value", "");

    //   cy.contains("Shares Price");
    //   cy.get("#sharePrice0").should("not.have.value", "");

    //   cy.contains("Number of Shares");
    //   cy.get("#shares0").clear().type("45");

    //   cy.contains("Cost base");
    //   cy.get("#costBase0").clear().type("$143");

    //   cy.contains("Current Balance");
    //   cy.get("#currentBalance0").should("not.have.value", "");
    // });
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    // ).within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });
    // cy.get('#clientCurrentBalance').should('have.value', '$29');

    // cy.contains("Cost Base");
    // cy.get("#clientCostBaseTemp").should('have.value', '$143');

    // cy.contains("Close");
    // cy.get(".modal-footer > .bgColor")
    //   .contains("Submit")
    //   .should("be.visible")
    //   .click();

    // cy.wait(1000);

    // //Platform Investments
    // cy.get(":nth-child(4) > .py-4").within(() => {
    //   cy.contains("Platform Investments");
    //   cy.get("img");
    //   cy.contains("Aiden Smith");
    //   cy.contains("Emma Taylor");
    //   cy.get(
    //     "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
    //   ).click();
    // });

    // cy.get(".modal-content").within(() => {
    //   cy.contains("Platform Investments");
    //   cy.get(".btn-close");
    //   cy.get(".table").within(() => {
    //     cy.contains("Owner");
    //     cy.get('[style="width: 50%;"]').contains("Aiden Smith");
    //     cy.contains("Current Balance");
    //   });
    // });

    // cy.get("#button-addon2").click();

    // cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
    //   () => {
    //     cy.contains("Aiden Smith_Platform Investments Detail");
    //     cy.contains("How many Platforms does Aiden Smith have :");
    //     cy.get("#NumberOfMap").clear().type(1);
    //   }
    // );
    // //Inner Table
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-body > form > :nth-child(1) > .col-md-12 > .row > .mt-4'
    // ).within(() => {
    //   cy.contains("No#");
    //   cy.contains("1");

    //   cy.contains("Platform Name");
    //   cy.get("#platformName0").select("For Testing Purpose");

    //   cy.contains("Account Number");
    //   cy.get("#accountNumber0").clear().type("45");

    //   cy.contains("Portfolio Cost Base");
    //   cy.get("#totalPortfolioCost0").clear().type("$45");

    //   cy.contains("Annual Advice Service Fee");
    //   cy.get("#serviceFee0").clear().type("$3");
    //   cy.get("#serviceFeeType0").select("Weekly");

    //   cy.contains("Portfolio Value");
    //   cy.get("#button-addon2").click();
    // });

    // //Portfolio Value inner card
    // cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
    //   cy.contains("For Testing Purpose_Portfolio Value");
    //   cy.contains("How many Underlying Investments does Aiden Smith have :");
    //   cy.get("#NumberOfMap").clear().type(1);

    //   cy.contains("No#");
    //   cy.contains("1");

    //   cy.contains("Investment Option");
    //   cy.get(".css-1lx7dxn").type("Testing (001){enter}");
    // });

    // cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
    //   cy.contains("Investment Code");
    //   cy.get("#investmentCode0").should("have.value", "001");

    //   cy.contains("Investment Value");
    //   cy.get("#investmentValue0").clear().type("$22");

    //   cy.contains("Close");
    //   cy.contains("Submit").click();
    // });

    // cy.get("#portfolioValue0").should("not.have.value", "");

    // cy.get(".row.mt-2");

    // cy.get("#portfolioValue0").should("have.value", "$22");

    // //Footer

    // cy.get(".modal-footer")
    //   .filter(":visible")
    //   .within(() => {
    //     cy.contains("Close");
    //     cy.contains("Submit").click();
    //   });

    // cy.get("#clientCurrentBalance").should("have.value", "$156");

    // cy.contains("Cost Base");
    // cy.get("#clientCostBaseTemp").should("have.value", "$45");

    // //Main Card Footer
    // cy.get(".modal-footer button.btn.bgColor.modalBtn")
    //   .filter(":visible")
    //   .click();

    // cy.get("#clientmanagedFund").should("not.have.value", "");

    // // // End Platform Investments

    // cy.wait(1000);

    // //Investment Bond
    // cy.get(":nth-child(5) > .py-4").within(() => {
    //   cy.contains("Investment Bond");
    //   cy.get("img");
    //   cy.contains("Aiden Smith");
    //   cy.contains("Emma Taylor");
    //   cy.get(
    //     "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
    //   ).click();
    // });

    // cy.get(".modal-content").within(() => {
    //   cy.contains("Investment Bond");
    //   cy.get(".btn-close");
    //   cy.get(".table").within(() => {
    //     cy.contains("Owner");
    //     cy.get('[style="width: 50%;"]').contains("Aiden Smith");
    //     cy.contains("Current Balance");
    //   });
    // });

    // cy.get("#button-addon2").click();

    // cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
    //   () => {
    //     cy.contains("Aiden Smith_Investment Bond Detail");
    //     cy.contains("How many Platforms does Aiden Smith have :");
    //     cy.get("#NumberOfMap").clear().type(1);
    //   }
    // );
    // //Inner Table
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-body > form > :nth-child(1) > .col-md-12 > .row > .mt-4'
    // ).within(() => {
    //   cy.contains("No#");
    //   cy.contains("1");

    //   cy.contains("Platform Name");
    //   cy.get("#platformName0").select("Testing Purpose", { force: true });

    //   cy.contains("Account Number");
    //   cy.get("#accountNumber0").clear().type("45");

    //   cy.contains("Portfolio Cost Base");
    //   cy.get("#totalPortfolioCost0").clear().type("$45");

    //   cy.contains("Annual Advice Service Fee");
    //   cy.get("#serviceFee0").clear().type("$3");
    //   cy.get("#serviceFeeType0").select("Weekly");

    //   cy.contains("Portfolio Value");
    //   cy.get("#button-addon2").click();
    // });

    // //Portfolio Value inner card
    // cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
    //   cy.contains("Testing Purpose_Portfolio Value");
    //   cy.contains("How many Underlying Investments does Aiden Smith have :");
    //   cy.get("#NumberOfMap").clear().type(1);

    //   cy.contains("No#");
    //   cy.contains("1");

    //   cy.contains("Investment Option");
    //   cy.get(".css-1lx7dxn").type("Testing (0011){enter}");
    // });

    // cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
    //   cy.contains("Investment Code");
    //   cy.get("#investmentCode0").should("have.value", "0011");
    //   //cy.get("#investmentCode0").should("not.have.value", "");

    //   cy.contains("Investment Value");
    //   cy.get("#investmentValue0").clear().type("$22");

    //   cy.contains("Close");
    //   cy.contains("Submit").click();
    // });

    // cy.get("#portfolioValue0").should("have.value", "$22");

    // cy.get(".modal-footer button.btn.bgColor.modalBtn")
    //   .filter(":visible")
    //   .click();

    // cy.get("#clientCurrentBalance").should("have.value", "$156");
    // //Cost Base
    // cy.contains("Cost Base");
    // cy.get("#clientCostBaseTemp").clear().type("46");
    // cy.wait(1000);
    // cy.contains(
    //   "Total must be equal to the sum of all Cost Base filled in the popup. The sum is $45"
    // );

    // cy.get(".modal-footer")
    //   .filter(":visible")
    //   .within(() => {
    //     cy.contains("Close");
    //     cy.contains("Submit").click();
    //   });

    // // End Investment Bond

    // cy.wait(1000);

    // //Investment Properties
    // cy.get(":nth-child(9) > .py-4").within(() => {
    //   cy.contains("Investment Properties");
    //   cy.get("img");
    //   cy.contains("Total Market Value");
    //   cy.contains("Total Loans");

    //   cy.get(
    //     ".mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
    //   ).click({ multiple: true, force: true });
    // });
    // //Header
    // cy.get(".modal-header").within(() => {
    //   cy.contains("Investment Properties");
    //   cy.get(".btn-close");
    // });

    // cy.get(".modal-body").within(() => {
    //   cy.contains("How many Investment Properties does Aiden Smith have :");
    // });
    // cy.get("#NumberOfMap").clear().type("1");

    // cy.get(".table").within(() => {
    //   cy.contains("No#");
    //   cy.contains("1");

    //   cy.contains("Property Address");
    //   cy.get("#PropertyAddress0").clear().type("FTS ");

    //   cy.contains("Current Value - ");
    //   cy.get("#CurrentValue0").clear().type("$2,022");

    //   cy.contains("Cost base");
    //   cy.get("#CostBase0").clear().type("$567");

    //   cy.contains("Client Ownership");
    //   cy.get("#ClientOwnership0").clear().type("20.00%");

    //   cy.contains("Partner Ownership");
    //   cy.get("#PartnerOwnership0").should("have.value", "80.00%");

    //   cy.contains("Weekly Rental Income");
    //   cy.get("#weeklyRentalIncome0").clear().type("23");
    // });
    // // Loan Balance
    // cy.contains("Loan Balance");

    // cy.get("#button-addon2").click();
    // //Loan Balance Header
    // cy.get(":nth-child(5) > .modal-dialog > .modal-content").within(() => {
    //   cy.contains("Property Loan Details");
    //   cy.get(".btn-close");

    //   cy.contains("Lender");
    //   cy.get("#LenderCurrent0").select("Testing");

    //   cy.contains("Loan Balance");
    //   cy.get("#LoanBalance0").clear().type("$987").blur();

    //   cy.contains("Loan Type");
    //   cy.get("#LoanType0").select("i/only");

    //   cy.contains("Repayments Amount");
    //   cy.get("#RepaymentsAmount0").clear().type("$2022").blur();

    //   cy.contains("Frequency");
    //   cy.get("#Frequency0").select("Annually");

    //   cy.contains("Annual Repayments");
    //   cy.get("#AnnualRepayments0");

    //   cy.contains("Interest Rate (p.a)");
    //   cy.get("#InterestRate0").clear().type("22.00%").blur();

    //   cy.contains("Loan Term");
    //   cy.get("#LoanTerm0").select("Year 19");

    //   cy.contains("Loan Term Remaining");
    //   cy.get("#LoanTermRemaining0").select("Year 22");

    //   cy.contains("Deductible Loan Amount");
    //   cy.get("#DeductibleLoanAmount0").clear().type("33.00%").blur();

    //   cy.contains("Close");
    //   cy.contains("Submit").click();
    // });
    // cy.get("#propertyLoanBalance0").should("not.have.value", "");
    // //Expense Detail Card's
    // cy.get("tbody > tr > :nth-child(9)")
    //   .filter(":visible")
    //   .within(() => {
    //     cy.get("#button-addon2").click();
    //   });

    // cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
    //   () => {
    //     cy.contains("Expense Details");

    //     cy.contains("No#");
    //     cy.contains("1");

    //     cy.contains("Council Rates");
    //     cy.get("#councilRates0").clear().type("$3").blur();

    //     cy.contains("Water Rates");
    //     cy.get("#waterRates0").clear().type("$9").blur();

    //     cy.contains("Land tax");
    //     cy.get("#landTax0").clear().type("$98").blur();

    //     cy.contains("Insurance/Body Corporate");
    //     cy.get("#insuranceCorporate0").clear().type("$7").blur();

    //     cy.contains("Repairs and Maintenance");
    //     cy.get("#repairsMaintenance0").clear().type("$9").blur();

    //     cy.contains("All Other");
    //     cy.get("#allOther0").clear().type("$2").blur();

    //     cy.contains("Total Expenses");
    //     cy.get("#totalExpance0").should("not.have.value", "");

    //     cy.contains("Close");
    //     cy.contains("Submit").click();
    //   }
    // );
    // //Footer
    // cy.contains("Close").should("be.visible");
    // cy.contains("Submit").should("be.visible").click();

    // cy.contains("Total Market Value");
    // cy.get("#clientinvestmentPropertyDetails").should("not.have.value", "");
    // cy.contains("Total Loans");
    // cy.get("#partnerinvestmentPropertyDetails").should("not.have.value", "");

    // cy.wait(1000);

    //Investment Loan:
    cy.get(":nth-child(10) > .py-4").within(() => {
      cy.contains("Investment Loan");
      cy.get("img");
      cy.contains("Aiden Smith");
      cy.get(
        ".mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
      )
        .click()
        .should("be.visible");
    });
    //Investment Loan Card Header
    cy.get(".modal-header").within(() => {
      cy.contains("Investment Loan");
      cy.get(".btn-close").should("be.visible");
    });

    cy.get(".modal-body").within(() => {
      cy.contains("Owner").should("be.visible");
    });

    cy.get(".css-d07bj1 > :nth-child(1)").click();
    cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");

    //Investment Loan Card Section

    cy.get(".table").within(() => {
      cy.contains("Owner");
      cy.get("tbody > tr > :nth-child(1)");
      cy.contains("Aiden Smith");

      cy.contains("Lender");
      cy.get(":nth-child(2) > .form-select").select("Testing");

      cy.contains("Loan Balance");
      cy.get("#loanBalance").clear().type("$987").blur();

      cy.contains("Loan Type");
      cy.get(":nth-child(4) > .form-select").select("i/only");

      cy.contains("Repayments Amount");
      cy.get("#repaymentsAmount").clear().type("$222").blur();

      cy.contains("Frequency");
      cy.get(":nth-child(6) > .form-select").select("Weekly");

      cy.contains("Annual Repayments");
      cy.get(" #annualRepayments").clear().type("22").blur();
      cy.get("#serviceFeeType").select("Weekly");

      cy.contains("Interest Rate (p.a)");
      cy.get("#interestRate").clear().type("202").blur();

      cy.contains("Loan Term");
      cy.get(":nth-child(9) > .form-select").select("Year 19");

      cy.contains("Loan Term Remaining");
      cy.get(":nth-child(10) > .form-select").select("Year 22");

      cy.contains("Deductible Loan Amount");
      cy.get("#deductibleLoanAmount").clear().type("33.00%").blur();
    });

    //Investment Loan Card Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get('#clientmanagedFundsLOC').should("have.value", "$1,144");

    cy.wait(1000);

    //Margin Loan :
    cy.get(":nth-child(11) > .py-4").within(() => {
      cy.contains("Margin Loan");
      cy.get("img");
      cy.contains("Aiden Smith");
      cy.contains("Emma Taylor");
      cy.get(
        ".mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
      )
        .click()
        .should("be.visible");
    });
    //Margin Loan Card Header
    cy.get(".modal-header").within(() => {
      cy.contains("Margin Loan");
      cy.get(".btn-close").should("be.visible");
    });

  cy.get(".modal-body").within(() => {
      cy.contains("Owner").should("be.visible");
    });

    cy.get(".css-d07bj1 > :nth-child(1)").click();
    cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");

    //Margin Loan Card Section

    cy.get(".table").within(() => {
      cy.contains("Owner");
      cy.get("tbody > tr > :nth-child(1)");
      cy.contains("Aiden Smith");

      cy.contains("Lender");
      cy.get('[style="width: 15rem;"] > .form-select').select("Testing");

      cy.contains("Loan Balance");
      cy.get("#loanBalance").clear().type("$987").blur();

      cy.contains("Monthly Contribution");
      cy.get("#monthlyContribution").clear().type("$85").blur();

      cy.contains("Annual Loan Contributions");
      cy.get("#annualLoan").should("have.value", "$1,020");

      cy.contains("Loan Term");
      cy.get(":nth-child(7) > .form-select").select("Year 19");

      cy.contains("Interest Rate (p.a)");
      cy.get("#interestRate").clear().type("202").blur();

      cy.contains("Loan Term Remaining");
      cy.get(":nth-child(8) > .form-select").select("Year 22");

      cy.contains("Deductible Loan Amount");
      cy.get("#deductibleLoanAmount").clear().type("202").blur();
    });

    //Margin Loan Card Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    // cy.get('#clientmanagedFundsMarginLoan').should("have.value", "$1,020");

    // cy.wait(1000);

    // //Super Funds

    // cy.get(":nth-child(6) > .py-4").within(() => {
    //   cy.contains("Super Funds");
    //   cy.get("img");
    //   cy.contains("Admin");
    //   cy.get(
    //     "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
    //   ).click();
    // });

    // cy.get(".modal-content").within(() => {
    //   cy.contains("Super Funds");
    //   cy.get(".btn-close");
    //   cy.get(".table").within(() => {
    //     cy.contains("Owner");
    //     cy.get('[style="width: 50%;"]').contains("Admin");
    //     cy.contains("Current Balance");
    //   });
    // });

    // cy.get("#button-addon2").click();

    // cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
    //   () => {
    //     cy.contains("Admin_Super Funds Detail");
    //     cy.contains("How many Super Funds does Admin have :");
    //     cy.get("#NumberOfMap").clear().type(1);
    //   }
    // );
    // //Inner Table
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-body > form > :nth-child(1) > .col-md-12 > .row > .mt-4'
    // ).within(() => {
    //   cy.contains("No#");
    //   cy.contains("1");

    //   cy.contains("Fund Name");
    //   cy.get("#platformName0").select("Test");

    //   cy.contains("Member Number");
    //   cy.get("#memberNumber0").clear().type("3535");

    //   cy.contains("Annual Advice Service Fee");
    //   cy.get("#annualAdvice0").clear().type("4536");
    // });

    // // PlatForm inner card
    // cy.get("tbody > tr > :nth-child(4)").within(() => {
    //   cy.get("#button-addon2").click();
    // });

    // cy.contains("Test _Portfolio Value");
    // cy.contains("How many Underlying Investments does Admin have :");
    // cy.get(
    //   ":nth-child(7) > .modal-dialog > .modal-content > .modal-body > form > :nth-child(1) > .col-md-12 > .row > .d-flex > div > #NumberOfMap"
    // )
    //   .clear()
    //   .type(1);

    // cy.contains("No#");
    // cy.contains("1");

    // cy.contains("Investment Option");

    // //cy.get(".css-b62m3t-container").within(() => {
    // // cy.get('.css-d07bj1 > :nth-child(1)').click();

    // // cy.get(".css-1xc3v61-indicatorContainer").click();
    // // });
    // // cy.get("#react-select-3-option-0").click();

    // cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
    //   cy.contains("Investment Code");
    //   //cy.get("#investmentCode0").should("not.have.value", "");

    //   cy.contains("Investment Value");
    //   cy.get("#investmentValue0").clear().type("$22");

    //   cy.contains("Close");
    //   cy.contains("Submit").click();
    // });

    // cy.get("#portfolioValue0").should("not.have.value", "");

    // // Balance inner card
    // cy.get("tbody > tr > :nth-child(5)").within(() => {
    //   cy.get("#button-addon2").click();
    // });

    // cy.contains("Admin_Balance & Benefit Details");

    // cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
    //   cy.contains("No#");
    //   cy.contains("1");

    //   cy.contains("Portfolio Value");
    //   cy.get('[style="min-width: 8rem;"] > #portfolioValue0').should(
    //     "have.value",
    //     "$22"
    //   );

    //   cy.contains("Commencement Date");
    //   cy.get("#eligibleServiceDate0").clear().type("03/08/2024");

    //   cy.contains("Eligible Service Date");
    //   cy.get("#commencementDate0").clear().type("03/08/2024");

    //   cy.contains("Tax Free component");
    //   cy.get("#taxFreeComponent0").clear().type("$21");

    //   cy.contains("Taxable component");
    //   cy.get("#taxableComponent0").should("have.value", "$1");

    //   Cypress.on("uncaught:exception", (err, runnable) => {
    //     if (err.message.includes("replace")) {
    //       return false; // Prevent Cypress from failing the test
    //     }
    //   });

    //   cy.get("#restrictedNonPreserved0").clear().type("123");

    //   cy.contains("Unrestricted non preserved");
    //   cy.get("#unrestrictedNonPreserved0").clear().type("22");

    //   cy.contains("Preserved amount");
    //   cy.get("#preservedAmount0").should("have.value", "$-123");

    //   cy.get(".css-b62m3t-container").within(() => {
    //     // cy.get(".css-1xc3v61-indicatorContainer").click();
    //     //cy.get("#react-select-4-option-1").click();
    //   });

    //   cy.contains("Close");
    //   cy.contains("Submit").click();
    // });

    // cy.get("#balanceBenefitDetails0").should("not.have.value", "");

    // // Group Insurance Attached inner card
    // cy.contains("Group Insurance Attached");
    // cy.get(":nth-child(6) > .d-flex > .form-check > .radioButton2")
    //   .contains("Yes")
    //   .click();
    // cy.get(":nth-child(6) > .d-flex > #button-addon2").click();

    // cy.contains("Admin_Insurances");

    // cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
    //   cy.contains("Life Cover");
    //   cy.get("#lifeCover").clear().type("$21");

    //   cy.contains("TPD Cover");
    //   cy.get("#TPDCover").clear().type("$21");

    //   cy.contains("Cover type");
    //   cy.get("#coverType").select("Fixed");

    //   cy.contains("Cost p.a.");

    //   cy.get("#cost").clear().type("$21");

    //   cy.contains("Monthly Income Protection");
    //   cy.get("#monthlyIncome").clear().type("$21");

    //   cy.contains("Waiting Period");
    //   cy.get("#waitingPeriod").should("have.value", "30");

    //   cy.contains("Benefit Period");
    //   cy.get("#BenefitPeriod").should("have.value", "2 Years");

    //   cy.contains("Cover type");
    //   cy.get("#coverType2").select("Fixed");

    //   cy.contains("Cost p.a.");
    //   cy.get("#cost2").clear().type("$22");

    //   cy.contains("Close");
    //   cy.contains("Submit").click();
    // });

    // // Contributions inner card

    // cy.contains("Contributions");

    // cy.get(":nth-child(7) > .d-flex > .form-check > .radioButton2")
    //   .contains("Yes")
    //   .click();
    // cy.get(":nth-child(7) > .d-flex > #button-addon2").click();

    // cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
    //   cy.contains("Admin_Contributions");

    //   cy.contains("How many Contributions do Admin have ?");
    //   cy.get(".flex-shrink-0 > #NumberOfMap").clear().type(1);

    //   cy.contains("Starting From");
    //   cy.get('input[name="startingYear"]', { force: true })
    //     .filter(":visible")
    //     .clear()
    //     .type("2012");

    //   cy.contains("No#");
    //   cy.contains("1");

    //   cy.contains("Financial Years");
    //   cy.get(".pt-3").contains("2012/2013");

    //   Cypress.on("uncaught:exception", (err, runnable) => {
    //     // returning false here prevents Cypress from
    //     // failing the test
    //     return false;
    //   });

    //   cy.contains("No#");
    //   cy.contains("1");

    //   cy.contains("Financial Years");
    //   cy.contains("2012/2013");

    //   cy.contains("Employer Contributions");
    //   cy.get("#employerContributions0").clear().type("$2");

    //   cy.contains("Concessional (Include. Salary Sac)");
    //   cy.get("#concessional0").clear().type("$2");

    //   cy.contains("Total Concessional Contributions");
    //   cy.get("#totalConcessional0").should("have.value", "$4");

    //   cy.contains("Non-Concessional Contributions");
    //   cy.get("#nonConcessionalContributions0").clear().type("$2");

    //   cy.contains("Close");
    //   cy.contains("Submit").click();
    // });

    // //Nominated Beneficiaries

    // cy.get(":nth-child(8) > .d-flex > .form-check > .radioButton2")
    //   .contains("Yes")
    //   .click();

    // cy.get(":nth-child(8) > .d-flex > #button-addon2").click();

    // cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
    //   cy.contains("Admin_Beneficiaries");

    //   cy.contains("How many beneficiaries do Admin have :");

    //   cy.get("#NumberOfMap").clear().type("2"); // Types the number 123 into the input field

    //   cy.contains("No#");

    //   cy.contains("1");
    //   cy.contains("2");

    //   cy.contains("Nomination Type");
    //   cy.get("#nominationType0").select("Binding (Non-Lapsing)");

    //   Cypress.on("uncaught:exception", (err, runnable) => {
    //     // returning false here prevents Cypress from
    //     // failing the test
    //     return false;
    //   });

    //   cy.contains("DOB");
    //   cy.get("#DOB0").clear().type("21-2-1965");

    //   cy.contains("Beneficiary Name");
    //   cy.get("#beneficiaryName0").clear().type("32");

    //   cy.contains("Relationship Status");
    //   cy.get("#relationshipStatus0").select("Child");

    //   cy.contains("Share of Benefit");
    //   cy.get("#shareBenefit0").clear().type("2.00%");

    //   cy.contains("Share of Benefit must be 100%");

    //   cy.get("#nominationType1").select(
    //     "Legal Personal Representative (Your Estate)"
    //   );
    //   cy.get("#DOB1");
    //   cy.get("#beneficiaryName1");
    //   cy.get("#relationshipStatus1").contains("N/A");
    //   cy.get("#shareBenefit1");

    //   cy.contains("Close");
    //   cy.contains("Submit").click();
    // });

    //Super Fund Detail Card Close Section
    // cy.get(".modal-footer")
    //   .filter(":visible")
    //   .within(() => {
    //     cy.contains("Close");
    //     cy.contains("Submit").click();
    //   });

    // cy.get("#clientCurrentBalance").should("not.have.value", "");
    // cy.contains("Close");
    // cy.get(".modal-footer > .bgColor")
    //   .contains("Submit")
    //   .should("be.visible")
    //   .click();

    // cy.get("#clientsuperAnnuationIssues").should("not.have.value", "");

    // cy.wait(1000);

    // //Account Based Penion

    // cy.get(":nth-child(7) > .py-4").within(() => {
    //   cy.contains("Account Based Pension");
    //   cy.get("img");
    //   cy.contains("Admin");
    //   cy.get(
    //     "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
    //   ).click();
    // });

    // cy.get(".modal-content").within(() => {
    //   cy.contains("Account Based Pension");
    //   cy.get(".btn-close");
    //   cy.get(".table").within(() => {
    //     cy.contains("Owner");
    //     cy.get('[style="width: 50%;"]').contains("Admin");
    //     cy.contains("Current Balance");
    //   });
    // });

    // cy.get("#button-addon2").click();

    // cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
    //   () => {
    //     cy.contains("Admin_Account Based Pension Detail");
    //     cy.contains("How many Account Based Pension does Admin have :");
    //     cy.get("#NumberOfMap").clear().type(1);
    //   }
    // );
    // //Inner Table
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-body > form > :nth-child(1) > .col-md-12 > .row > .mt-4'
    // ).within(() => {
    //   cy.contains("No#");
    //   cy.contains("1");

    //   cy.contains("Fund Name");
    //   cy.get("#platformName0").select("Bank For Testing");

    //   cy.contains("Member Number");
    //   cy.get("#memberNumber0").clear().type("3535");

    //   cy.contains("Annual Advice Service Fee");
    //   cy.get("#annualAdvice0").clear().type("4536");
    // });

    // // PlatForm inner card
    // cy.get("tbody > tr > :nth-child(4)").within(() => {
    //   cy.get("#button-addon2").click();
    // });

    // cy.contains("Bank For Testing _Portfolio Value");
    // cy.contains("How many Underlying Investments does Admin have :");
    // cy.get(
    //   ":nth-child(7) > .modal-dialog > .modal-content > .modal-body > form > :nth-child(1) > .col-md-12 > .row > .d-flex > div > #NumberOfMap"
    // )
    //   .clear()
    //   .type(1);

    // cy.contains("No#");
    // cy.contains("1");

    // cy.contains("Investment Option");

    // //cy.get(".css-b62m3t-container").within(() => {
    // // cy.get('.css-d07bj1 > :nth-child(1)').click();

    // // cy.get(".css-1xc3v61-indicatorContainer").click();
    // // });
    // // cy.get("#react-select-3-option-0").click();

    // cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
    //   cy.contains("Investment Code");
    //   //cy.get("#investmentCode0").should("not.have.value", "");

    //   cy.contains("Investment Value");
    //   cy.get("#investmentValue0").clear().type("$22");

    //   cy.contains("Close");
    //   cy.contains("Submit").click();
    // });

    // cy.get("#portfolioValue0").should("not.have.value", "");

    // // Balance inner card
    // cy.get("tbody > tr > :nth-child(5)").within(() => {
    //   cy.get("#button-addon2").click();
    // });

    // cy.contains("Admin_Balance & Benefit Details");

    // cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
    //   cy.contains("No#");
    //   cy.contains("1");

    //   cy.contains("Portfolio Value");
    //   cy.get('[style="min-width: 90px;"] > #portfolioValue0').should(
    //     "have.value",
    //     "$22"
    //   );

    //   cy.contains("Commencement Date");
    //   cy.get("#eligibleServiceDate0").clear().type("03/08/2024");

    //   cy.contains("Eligible Service Date");
    //   cy.get("#commencementDate0").clear().type("03/08/2024");

    //   cy.contains("Tax Free %");
    //   cy.get("#taxFree0").clear().type("12.00%");

    //   Cypress.on("uncaught:exception", (err, runnable) => {
    //     if (err.message.includes("replace")) {
    //       return false; // Prevent Cypress from failing the test
    //     }

    //     cy.contains("Tax Free component");
    //     cy.get("#taxFreeComponent0", { timeout: 10000 }) // Waits up to 10 seconds
    //       .should("have.value", "$3");

    //     cy.contains("Taxable component");
    //     cy.get("#taxableComponent0").should("have.value", "$20");
    //   });

    //   cy.get("#restrictedNonPreserved0").clear().type("123");

    //   cy.contains("Preserved amount");
    //   cy.get("#preservedAmount0").clear().type("22");

    //   cy.contains("Unrestricted non preserved");
    //   cy.get("#unrestrictedNonPreserved0").should("have.value", "$-123");

    //   cy.get(".css-b62m3t-container").within(() => {
    //     // cy.get(".css-1xc3v61-indicatorContainer").click();
    //     //cy.get("#react-select-4-option-1").click();
    //   });

    //   cy.contains("Close");
    //   cy.contains("Submit").click();
    // });

    // cy.get("#balanceBenefitDetails0").should("not.have.value", "");

    // cy.wait(1000);

    // // Annual Pension Payment inner card
    // cy.contains("Annual Pension Payment");
    // cy.get("tbody > tr > :nth-child(6)").within(() => {
    //   cy.get("#button-addon2").click();
    // });

    // cy.contains("Admin_Annual Pension Payment");

    // cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
    //   cy.contains("No#");
    //   cy.contains("1");

    //   Cypress.on("uncaught:exception", (err, runnable) => {
    //     if (err.message.includes("replace")) {
    //       return false; // Prevent Cypress from failing the test
    //     }
    //   });

    //   cy.contains("Regular amount");

    //   cy.get("#regularAmount0").clear().type("22");

    //   cy.contains("Frequency");
    //   cy.get("#frequency0").select("Weekly");

    //   cy.contains("Total");
    //   cy.get("#total0").should("have.value", "$1,144");

    //   cy.contains("Close");
    //   cy.contains("Submit").click();
    // });

    // cy.get("#pensionPayment0").should("not.have.value", "");

    // //Nominated Beneficiaries

    // cy.get("tbody > tr > :nth-child(7)").contains("Yes").click();

    // cy.get(".d-flex > #button-addon2").click();

    // cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
    //   cy.contains("Admin_Beneficiaries");

    //   cy.contains("How many beneficiaries do Admin have :");

    //   cy.get("#NumberOfMap").clear().type("2"); // Types the number 123 into the input field

    //   cy.contains("No#");

    //   cy.contains("1");
    //   cy.contains("2");

    //   cy.contains("Nomination Type");
    //   cy.get("#nominationType0").select("Binding (Non-Lapsing)");

    //   Cypress.on("uncaught:exception", (err, runnable) => {
    //     // returning false here prevents Cypress from
    //     // failing the test
    //     return false;
    //   });

    //   cy.contains("DOB");
    //   cy.get("#DOB0").type("21-2-1965");

    //   cy.contains("Beneficiary Name");
    //   cy.get("#beneficiaryName0").type("32");

    //   cy.contains("Relationship Status");
    //   cy.get("#relationshipStatus0").select("Child");

    //   cy.contains("Share of Benefit");
    //   cy.get("#shareBenefit0").clear().type("2.00%");

    //   cy.contains("Share of Benefit must be 100%");

    //   cy.get("#nominationType1").select(
    //     "Legal Personal Representative (Your Estate)"
    //   );
    //   cy.get("#DOB1");
    //   cy.get("#beneficiaryName1");
    //   cy.get("#relationshipStatus1").contains("N/A");
    //   cy.get("#shareBenefit1");

    //   cy.contains("Close");
    //   cy.contains("Submit").click();
    // });

    // //Super Fund Detail Card Close Section
    // cy.get(".modal-footer")
    //   .filter(":visible")
    //   .within(() => {
    //     cy.contains("Close");
    //     cy.contains("Submit").click();
    //   });

    // cy.get("#clientCurrentBalance").should("not.have.value", "");
    // cy.contains("Close");
    // cy.get(".modal-footer > .bgColor")
    //   .contains("Submit")
    //   .should("be.visible")
    //   .click();

    // cy.get("#clientaccountBasedPensionIssues").should("not.have.value", "");

    //Annuities

    cy.get(":nth-child(8) > .py-4").within(() => {
      cy.contains("Annuities");
      cy.get("img");
      cy.contains("Aiden Smith");
      cy.contains("Emma Taylor");
      cy.get(
        "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
      ).click();
    });

    Cypress.on("uncaught:exception", (err, runnable) => {
      console.warn("Ignoring uncaught exception:", err.message);
      return false; // Prevents Cypress from failing the test
    });

    cy.get(".modal-content").within(() => {
      cy.contains("Annuities");
      cy.get(".btn-close");
      cy.get(".table").within(() => {
        cy.contains("Owner");
        cy.get(':nth-child(1) > [style="width: 50%;"]').contains("Aiden Smith");
        cy.contains("Current Balance");
      });
    });

    cy.get(":nth-child(1) > :nth-child(2) > .input-group").within(() => {
      cy.get("#button-addon2").click();
    });

    cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
      () => {
        cy.contains("Aiden Smith_Annuities Detail");
        cy.contains("How many Annuities does Aiden Smith have :");
        cy.get("#NumberOfMap").clear().type(1);
      }
    );
    //Inner Table
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-body > form > :nth-child(1) > .col-md-12 > .row > .mt-4'
    ).within(() => {
      cy.contains("No#");
      cy.contains("1");

      cy.contains("Product Provider");
      cy.get("#productProvider0").select("Testing Bank");

      cy.contains("Account Number");
      cy.get("#accountNumber0").clear().type("5000");

      cy.contains("Source of Funds");
      cy.get("#sourceFunds0").select("Super");

      cy.contains("Original Investment Amount");
      cy.get("#originalInvestmentAmount0").clear().type("$5000");

      cy.contains("Return of Capital Value");
      cy.get("#returnCapitalValue0").clear().type("$3535");

      cy.contains("Annuity Type");
      cy.get("#annuityType0").select("Fixed Term");

      cy.contains("Term");
      cy.get("#term0").select("Year 21");

      cy.contains("Years to Maturity");
      cy.get("#yearsMaturity0").select("Year 11");

      cy.contains("Annual Advice Service Fee");
      cy.get("#annualAdvice0").clear().type("4536");
    });

    cy.wait(1000);

    // Annual Pension Payment inner card
    cy.contains("Annual Annuity Payment");
    cy.get("tbody > tr > :nth-child(7)").within(() => {
      cy.get("#button-addon2").click();
    });

    cy.contains("Aiden Smith_Annual Pension Payment");

    cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
      cy.contains("No#");
      cy.contains("1");

      Cypress.on("uncaught:exception", (err, runnable) => {
        if (err.message.includes("replace")) {
          return false; // Prevent Cypress from failing the test
        }
      });

      cy.contains("Regular amount");

      cy.get("#regularAmount0").clear().type("22");

      cy.contains("Frequency");
      cy.get("#frequency0").select("Weekly");

      cy.contains("Total");
      cy.get("#total0").should("have.value", "$1,144");

      cy.contains("Close");
      cy.contains("Submit").click();
    });

    cy.get("#annualAnnuityPayment0").should("not.have.value", "");

    //Nominated Beneficiaries

    cy.get("tbody > tr > :nth-child(11)").contains("Yes").click();

    cy.get(".d-flex > #button-addon2").click();

    cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
      cy.contains("Aiden Smith_Beneficiaries");

      cy.contains("How many beneficiaries do Aiden Smith have :");

      cy.get("#NumberOfMap").clear().type("1"); // Types the number 123 into the input field

      cy.contains("No#");

      cy.contains("1");
      // cy.contains("2");

      cy.contains("Nomination Type");
      cy.get("#nominationType0").select("Non-Binding");

      Cypress.on("uncaught:exception", (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false;
      });

      cy.contains("DOB");
      cy.get("#DOB0").clear().type("21/03/2025");

      cy.contains("Beneficiary Name");
      cy.get("#beneficiaryName0").clear().type("32");

      cy.contains("Relationship Status");
      cy.get("#relationshipStatus0").select("Child");

      cy.contains("Share of Benefit");
      cy.get("#shareBenefit0").clear().type("2.00%");

      cy.contains("Share of Benefit must be 100%");

      //   cy.get("#nominationType1").select(
      //     "Legal Personal Representative (Your Estate)"
      //   );
      // //   cy.get("#DOB1");
      // //   cy.get("#beneficiaryName1");
      // //   cy.get("#relationshipStatus1").contains("N/A");
      // //   cy.get("#shareBenefit1");

      cy.contains("Close");
      cy.contains("Submit").click();
    });

    //Close Inner Card
    cy.get(".modal-footer")
      .filter(":visible")
      .within(() => {
        cy.contains("Close");
        cy.contains("Submit").click();
      });

    cy.get("#clientCurrentBalance").should("have.value", "$5,000");
    //Footer
    cy.get("#clientCurrentBalance").should("not.have.value", "");
    cy.contains("Close");
    cy.get(".modal-footer > .bgColor")
      .contains("Submit")
      .should("be.visible")
      .click();

    
  }
}

export default FinancialInvestments;
