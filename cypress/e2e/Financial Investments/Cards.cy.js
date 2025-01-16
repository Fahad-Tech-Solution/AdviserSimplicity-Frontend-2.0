class FinancialInvestments {
  section() {
    cy.visit("http://ec2-3-25-227-176.ap-southeast-2.compute.amazonaws.com/");
    cy.get(":nth-child(6) > :nth-child(7)").click();
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

   // Bank Accounts

      cy.get(':nth-child(1) > .py-4').within(() => {
        cy.contains("Bank Accounts");
        cy.get("img");
        cy.contains("Admin");
        cy.get(
          "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
        ).click();
      });

      cy.get(".modal-content").within(() => {
        cy.contains("Bank Accounts");
        cy.get(".btn-close");
        cy.get(".table").within(() => {
          cy.contains("Owner");
          cy.get('[style="width: 50%;"]').contains("Admin");
          cy.contains("Current Balance");
        });
      });

      cy.get("#button-addon2").click();

      cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
        () => {
          cy.contains("Admin_Bank Accounts Detail");
          cy.contains("How many Bank Accounts Detail does Admin have :");
          cy.get("#NumberOfMap").clear().type(1);
        }
      );
      //Inner Table
      cy.get(
        '[style="display: block;"] > .modal-dialog > .modal-content > .modal-body > form > :nth-child(1) > .col-md-12 > .row > .mt-4'
      ).within(() => {
        cy.contains("No#");
        cy.contains("1");

        cy.contains("Name of Institution");
        cy.get("#Institution0").select("Testing");

        cy.contains("Account number");
        cy.get("#accountNumber0").clear().type("3535");

        cy.contains("Current Balance");
        cy.get("#currentBalance0").clear().type("4536");
      });
      cy.get(
        '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
      ).within(() => {
        cy.contains("Close").should("be.visible");
        cy.contains("Submit").should("be.visible").click();
      });

      cy.get('#clientCurrentBalance').should("not.have.value", "");
      cy.contains("Close");
      cy.get(".modal-footer > .bgColor")
        .contains("Submit")
        .should("be.visible")
        .click();

        cy.get('#clientbankAccountFinance').should("not.have.value", "");

        //Term Deposits
        cy.get(':nth-child(2) > .py-4').within(() => {
        cy.contains("Term Deposits");
        cy.get("img");
        cy.contains("Admin");
        cy.get(
          "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
        ).click();
      });

      cy.get(".modal-content").within(() => {
        cy.contains("Term Deposits");
        cy.get(".btn-close");
        cy.get(".table").within(() => {
          cy.contains("Owner");
          cy.get('[style="width: 50%;"]').contains("Admin");
          cy.contains("Current Balance");
        });
      });

      cy.get("#button-addon2").click();

      cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
        () => {
          cy.contains("Admin_Term Deposits Detail");
          cy.contains("How many Term Deposits Detail does Admin have :");
          cy.get("#NumberOfMap").clear().type(1);
        }
      );
      //Inner Table
      cy.get(
        '[style="display: block;"] > .modal-dialog > .modal-content > .modal-body > form > :nth-child(1) > .col-md-12 > .row > .mt-4'
      ).within(() => {
        cy.contains("No#");
        cy.contains("1");

        cy.contains("Name of Institution");
        cy.get("#Institution0").select("Testing");

        cy.contains("Account number");
        cy.get("#accountNumber0").clear().type("3535");

        cy.contains("Current Balance");
        cy.get("#currentBalance0").clear().type("4536");
      });
      cy.get(
        '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
      ).within(() => {
        cy.contains("Close").should("be.visible");
        cy.contains("Submit").should("be.visible").click();
      });
      cy.get('#clientCurrentBalance').should("not.have.value", "");

      cy.contains("Close");
      cy.get(".modal-footer > .bgColor")
        .contains("Submit")
        .should("be.visible")
        .click();

        cy.get('#clienttermDepositsFinance').should("not.have.value", "");

         //Australian Shares/ETFs

         cy.get(':nth-child(3) > .py-4').within(() => {
        cy.contains("Australian Shares/ETFs");
        cy.get("img");
        cy.contains("Admin");
        cy.get(
          "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
        ).click();
      });

      cy.get(".modal-content").within(() => {
        cy.contains("Australian Shares/ETFs");
        cy.get(".btn-close");
        cy.get(".table").within(() => {
          cy.contains("Owner");
          cy.get('[style="width: 50%;"]').contains("Admin");
          cy.contains("Current Balance");
        });
      });

      cy.get("#button-addon2").click();

      cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
        () => {
          cy.contains("Admin_Australian Shares/ETFs Detail");
          cy.contains(
            "How many Australian Shares/ETFs Detail does Admin have :"
          );
          cy.get("#NumberOfMap").clear().type(1);
        }
      );
      //Inner Table
      cy.get(
        '[style="display: block;"] > .modal-dialog > .modal-content > .modal-body > form > :nth-child(1) > .col-md-12 > .row > .mt-4'
      ).within(() => {
        cy.contains("No#");
        cy.contains("1");

        cy.contains("ASX Code");
        cy.get("#ASXCode0").clear().type("BML.AX");
        cy.wait(2000);
        cy.contains("Company Name");
        cy.get("#companyName0").should("not.have.value", "");

        cy.contains("Shares Price");
        cy.get("#sharePrice0").should("not.have.value", "");

        cy.contains("Number of Shares");
        cy.get("#shares0").clear().type("45");

        cy.contains("Cost base");
        cy.get("#costBase0").clear().type("$143");

        cy.contains("Current Balance");
        cy.get("#currentBalance0").should("not.have.value", "");
      });
      cy.get(
        '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
      ).within(() => {
        cy.contains("Close").should("be.visible");
        cy.contains("Submit").should("be.visible").click();
      });
      cy.get('#clientCurrentBalance').should("not.have.value", "");

      cy.contains("Cost Base");
      cy.get("#clientCostBaseTemp").should("not.have.value", "");

      cy.contains("Close");
      cy.get(".modal-footer > .bgColor")
        .contains("Submit")
        .should("be.visible")
        .click();

        cy.get('#clientaustralianShareMarket').should("not.have.value", "");

       //Platform Investments
       cy.get(':nth-child(4) > .py-4').within(() => {
        cy.contains("Platform Investments");
        cy.get("img");
        cy.contains("Admin");
        cy.get(
          "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
        ).click();
      });

      cy.get(".modal-content").within(() => {
        cy.contains("Platform Investments");
        cy.get(".btn-close");
        cy.get(".table").within(() => {
          cy.contains("Owner");
          cy.get('[style="width: 50%;"]').contains("Admin");
          cy.contains("Current Balance");
        });
      });

      cy.get("#button-addon2").click();

      cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
        () => {
          cy.contains("Admin_Platform Investments Detail");
          cy.contains("How many Platforms does Admin have :");
          cy.get("#NumberOfMap").clear().type(1);
        }
      );
      //Inner Table
      cy.get(
        '[style="display: block;"] > .modal-dialog > .modal-content > .modal-body > form > :nth-child(1) > .col-md-12 > .row > .mt-4'
      ).within(() => {
        cy.contains("No#");
        cy.contains("1");

        cy.contains("Platform Name");
        cy.get("#platformName0").select("For Testing Purpose");

        cy.contains("Account Number");
        cy.get("#accountNumber0").clear().type("45");

        cy.contains("Portfolio Cost Base");
        cy.get("#totalPortfolioCost0").clear().type("$45");

        cy.contains("Annual Advice Service Fee");
        cy.get("#serviceFee0").clear().type("$3");
        cy.get("#serviceFeeType0").select("Weekly");

        cy.contains("Portfolio Value");
        cy.get("#button-addon2").click();
      });

      //Portfolio Value inner card
      cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
        cy.contains("For Testing Purpose_Portfolio Value");
        cy.contains("How many Underlying Investments does Admin have :");
        cy.get("#NumberOfMap").clear().type(1);

        cy.contains("No#");
        cy.contains("1");

        cy.contains("Investment Option");
      });

      //We use Third party select library to select the dropdown so every time when run the code this class will be change

      //cy.get('.css-d07bj1 > :nth-child(1)').click();
      //cy.get('#react-select-3-listbox').select('Testing(001)');
    // cy.get('#react-select-3-option-0').click();

      cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
        cy.contains("Investment Code");
        cy.get("#investmentCode0").should("not.have.value", "");

        cy.contains("Investment Value");
        cy.get("#investmentValue0").clear().type("$22");

        cy.contains("Close");
        cy.contains("Submit").click();
      });

      // cy.get("#sharePrice0").should("not.have.value", "");

      cy.get("#portfolioValue0").should("not.have.value", "");

      cy.get(".row.mt-2");

      cy.get('#portfolioValue0').should("not.have.value", "");

      cy.get(".modal-footer")
        .filter(":visible")
        .within(() => {
          cy.contains("Close");
          cy.contains("Submit").click();
        });

         cy.contains("Cost Base");
      cy.get("#clientCostBaseTemp").should("not.have.value", "");

      cy.get(".modal-footer button.btn.bgColor.modalBtn")
        .filter(":visible")
        .click();

        cy.get('#clientmanagedFund').should("not.have.value", "");

      // End Platform Investments

          //Investment Bond
          cy.get(':nth-child(5) > .py-4').within(() => {
            cy.contains("Investment Bond");
            cy.get("img");
            cy.contains("Admin");
            cy.get(
              "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
            ).click();
          });

          cy.get(".modal-content").within(() => {
            cy.contains("Investment Bond");
            cy.get(".btn-close");
            cy.get(".table").within(() => {
              cy.contains("Owner");
              cy.get('[style="width: 50%;"]').contains("Admin");
              cy.contains("Current Balance");
            });
          });

          cy.get("#button-addon2").click();

          cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
            () => {
              cy.contains("Admin_Investment Bond Detail");
              cy.contains("How many Platforms does Admin have :");
              cy.get("#NumberOfMap").clear().type(1);
            }
          );
          //Inner Table
          cy.get(
            '[style="display: block;"] > .modal-dialog > .modal-content > .modal-body > form > :nth-child(1) > .col-md-12 > .row > .mt-4'
          ).within(() => {
            cy.contains("No#");
            cy.contains("1");

            cy.contains("Platform Name");
            cy.get('#platformName0').select('Testing Purpose', { force: true });

            cy.contains("Account Number");
            cy.get("#accountNumber0").clear().type("45");

            cy.contains("Portfolio Cost Base");
            cy.get("#totalPortfolioCost0").clear().type("$45");

            cy.contains("Annual Advice Service Fee");
            cy.get("#serviceFee0").clear().type("$3");
            cy.get("#serviceFeeType0").select("Weekly");

            cy.contains("Portfolio Value");
            cy.get("#button-addon2").click();
          });

          //Portfolio Value inner card
          cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
            cy.contains("Testing Purpose_Portfolio Value");
            cy.contains("How many Underlying Investments does Admin have :");
            cy.get("#NumberOfMap").clear().type(1);

            cy.contains("No#");
            cy.contains("1");

            cy.contains("Investment Option");
          });
      //We use Third party select library to select the dropdown so every time when run the code this class will be change
          //cy.get(".css-1xc3v61-indicatorContainer").click();

         // cy.get('#react-select-2-option-0').click();

          cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
            cy.contains("Investment Code");
            cy.get("#investmentCode0").should("not.have.value", "");

            cy.contains("Investment Value");
            cy.get("#investmentValue0").clear().type("$22");

            cy.contains("Close");
            cy.contains("Submit").click();
          });

          cy.get("#portfolioValue0").should("not.have.value", "");

          cy.get(".modal-footer button.btn.bgColor.modalBtn")
            .filter(":visible")
            .click();

          cy.get("#clientCurrentBalance").should("not.have.value", "");
          //Cost Base
          cy.contains("Cost Base");
          cy.get("#clientCostBaseTemp").clear().type("556");
          cy.wait(1000);
          cy.contains(
            "Total must be equal to the sum of all Cost Base filled in the popup. The sum is $45"
          );

          cy.get(".modal-footer")
            .filter(":visible")
            .within(() => {
              cy.contains("Close");
              cy.contains("Submit").click();
            });

          // End Investment Bond

        //Investment Properties
        cy.get(':nth-child(9) > .py-4').within(() => {
      cy.contains("Investment Properties");
      cy.get("img");
      cy.contains("Total Market Value");
      cy.contains("Total Loans");

      cy.get(
        ".mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
      ).click({ multiple: true, force: true });
    });
    //Header
    cy.get(".modal-header").within(() => {
      cy.contains("Investment Properties");
      cy.get(".btn-close");
    });

    cy.get(".modal-body").within(() => {
      cy.contains("How many Investment Properties does Admin have :");
     
    });
    cy.get('#NumberOfMap')
    .type("1");
 

    cy.get(".table").within(() => {
      cy.contains("No#");
      cy.contains("1");

      cy.contains("Property Address");
      cy.get("#PropertyAddress0").clear().type("FTS ");

      cy.contains("Current Value - ");
      cy.get("#CurrentValue0").clear().type("$24");

      cy.contains("Cost base");
      cy.get("#CostBase0").clear().type("$567");

      cy.contains("Weekly Rental Income");
      cy.get("#weeklyRentalIncome0").clear().type("23");
    });
    // Loan Balance
    cy.contains("Loan Balance");

    cy.get("#button-addon2").click();
    //Loan Balance Header
    cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
      () => {
        cy.contains("Property Loan Details");
        cy.get(".btn-close");

        cy.contains("Lender");
        cy.get("#LenderCurrent0").select("Testing");

        cy.contains("Loan Balance");
        cy.get("#LoanBalance0").clear().type("$987").blur();

        cy.contains("Loan Type");
        cy.get("#LoanType0").select("i/only");

        cy.contains("Repayments Amount");
        cy.get("#RepaymentsAmount0").clear().type("$2022").blur();

        cy.contains("Frequency");
        cy.get("#Frequency0").select("Weekly");

        cy.contains("Annual Repayments");
        cy.get("#AnnualRepayments0");

        cy.contains("Interest Rate (p.a)");
        cy.get("#InterestRate0").clear().type("22.00%").blur();

        cy.contains("Loan Term");
        cy.get("#LoanTerm0").select("Year 19");

        cy.contains("Loan Term Remaining");
        cy.get("#LoanTermRemaining0").select("Year 22");

        cy.contains("Deductible Loan Amount");
        cy.get("#DeductibleLoanAmount0").clear().type("33.00%").blur();

        cy.contains("Close");
        cy.contains("Submit").click();
      }
    );
    cy.get("#propertyLoanBalance0").should("not.have.value", "");
    //Expense Detail Card's
    cy.get('tbody > tr > :nth-child(9)')
      .filter(":visible")
      .within(() => {
        cy.get("#button-addon2").click();
      });

    cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
      () => {
        cy.contains("Expense Details");

        cy.contains("No#");
        cy.contains("1");

        cy.contains("Council Rates");
        cy.get("#councilRates0").clear().type("$3").blur();

        cy.contains("Water Rates");
        cy.get("#waterRates0").clear().type("$9").blur();

        cy.contains("Land tax");
        cy.get("#landTax0").clear().type("$98").blur();

        cy.contains("Insurance/Body Corporate");
        cy.get("#insuranceCorporate0").clear().type("$7").blur();

        cy.contains("Repairs and Maintenance");
        cy.get("#repairsMaintenance0").clear().type("$9").blur();

        cy.contains("All Other");
        cy.get("#allOther0").clear().type("$2").blur();

        cy.contains("Total Expenses");
        cy.get("#totalExpance0").should("not.have.value", "");

        cy.contains("Close");
        cy.contains("Submit").click();
      }
    );
    //Footer
    cy.contains("Close").should("be.visible");
    cy.contains("Submit").should("be.visible").click();

    cy.contains("Total Market Value");
    cy.get('#clientinvestmentPropertyDetails').should("not.have.value", "");
    cy.contains("Total Loans");
    cy.get('#partnerinvestmentPropertyDetails').should("not.have.value", "");

    //Investment Loan:
    cy.get(':nth-child(10) > .py-4').within(() => {
      cy.contains("Investment Loan");
      cy.get("img");
      cy.contains("Admin");
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

    cy.get(".css-1xc3v61-indicatorContainer").click();
    cy.get("#react-select-2-option-0").click();

    //Investment Loan Card Section

    cy.get(".table").within(() => {
      cy.contains("Owner");
      cy.get("tbody > tr > :nth-child(1)");
      cy.contains("Admin");

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

    //Investment LoanCard Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get('#clientmanagedFundsLOC').should("not.have.value", "");

    //Margin Loan :
    cy.get(":nth-child(11) > .py-4").within(() => {
      cy.contains("Margin Loan");
      cy.get("img");
      cy.contains("Admin");
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

    cy.get(".css-1xc3v61-indicatorContainer").click();
    cy.get("#react-select-2-option-0").click();

    //Margin Loan Card Section

    cy.get(".table").within(() => {
      cy.contains("Owner");
      cy.get("tbody > tr > :nth-child(1)");
      cy.contains("Admin");

      cy.contains("Lender");
      cy.get('[style="width: 15rem;"] > .form-select').select("Testing");

      cy.contains("Loan Balance");
      cy.get("#loanBalance").clear().type("$987").blur();

      cy.contains("Monthly Contribution");
      cy.get("#monthlyContribution").clear().type("$987").blur();

      cy.contains("Annual Loan Contributions");
      cy.get("#annualLoan").should("not.have.value", "");

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

    cy.get("#clientmanagedFundsMarginLoan").should("not.have.value", "");

    //Super Funds

    cy.get(":nth-child(6) > .py-4").within(() => {
      cy.contains("Super Funds");
      cy.get("img");
      cy.contains("Admin");
      cy.get(
        "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
      ).click();
    });

    cy.get(".modal-content").within(() => {
      cy.contains("Super Funds");
      cy.get(".btn-close");
      cy.get(".table").within(() => {
        cy.contains("Owner");
        cy.get('[style="width: 50%;"]').contains("Admin");
        cy.contains("Current Balance");
      });
    });

    cy.get("#button-addon2").click();

    cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
      () => {
        cy.contains("Admin_Super Funds Detail");
        cy.contains("How many Super Funds does Admin have :");
        cy.get("#NumberOfMap").clear().type(1);
      }
    );
    //Inner Table
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-body > form > :nth-child(1) > .col-md-12 > .row > .mt-4'
    ).within(() => {
      cy.contains("No#");
      cy.contains("1");

      cy.contains("Fund Name");
      cy.get("#platformName0").select("Test");

      cy.contains("Member Number");
      cy.get("#memberNumber0").clear().type("3535");

      cy.contains("Annual Advice Service Fee");
      cy.get("#annualAdvice0").clear().type("4536");
    });

    // PlatForm inner card
    cy.get("tbody > tr > :nth-child(4)").within(() => {
      cy.get("#button-addon2").click();
    });

    cy.contains("Test _Portfolio Value");
    cy.contains("How many Underlying Investments does Admin have :");
    cy.get(
      ":nth-child(7) > .modal-dialog > .modal-content > .modal-body > form > :nth-child(1) > .col-md-12 > .row > .d-flex > div > #NumberOfMap"
    )
      .clear()
      .type(1);

    cy.contains("No#");
    cy.contains("1");

    cy.contains("Investment Option");

    //cy.get(".css-b62m3t-container").within(() => {
    // cy.get('.css-d07bj1 > :nth-child(1)').click();

    // cy.get(".css-1xc3v61-indicatorContainer").click();
    // });
    // cy.get("#react-select-3-option-0").click();

    cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
      cy.contains("Investment Code");
      cy.get("#investmentCode0").should("not.have.value", "");

      cy.contains("Investment Value");
      cy.get("#investmentValue0").clear().type("$22");

      cy.contains("Close");
      cy.contains("Submit").click();
    });

    cy.get("#portfolioValue0").should("not.have.value", "");

    // Balance inner card
    cy.get("tbody > tr > :nth-child(5)").within(() => {
      cy.get("#button-addon2").click();
    });

    cy.contains("Admin_Balance & Benefit Details");

    cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
      cy.contains("No#");
      cy.contains("1");

      cy.contains("Portfolio Value");
      cy.get('[style="min-width: 8rem;"] > #portfolioValue0').should(
        "have.value",
        "$22"
      );

      cy.contains("Commencement Date");
      cy.get("#eligibleServiceDate0").clear().type("03/08/2024");

      cy.contains("Eligible Service Date");
      cy.get("#commencementDate0").clear().type("03/08/2024");

      cy.contains("Tax Free component");
      cy.get("#taxFreeComponent0").clear().type("$21");

      cy.contains("Taxable component");
      cy.get("#taxableComponent0").should("have.value", "$1");

      cy.contains("Restricted non preserved");
      cy.get("#restrictedNonPreserved0").clear().type("$22");

      cy.contains("Unrestricted non preserved");
      cy.get("#unrestrictedNonPreserved0").clear().type("$22");

      cy.contains("Preserved amount");
      cy.get("#preservedAmount0").should("have.value", "$-22");

      cy.get(".css-b62m3t-container").within(() => {
        // cy.get(".css-1xc3v61-indicatorContainer").click();
        //cy.get("#react-select-4-option-1").click();
      });

      cy.contains("Close");
      cy.contains("Submit").click();
    });

    cy.get("#balanceBenefitDetails0").should("not.have.value", "");

    // Group Insurance Attached inner card
    cy.contains("Group Insurance Attached");
    cy.get(":nth-child(6) > .d-flex > .form-check > .radioButton2")
      .contains("Yes")
      .click();
    cy.get(":nth-child(6) > .d-flex > #button-addon2").click();

    cy.contains("Admin_Insurances");

    cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
      cy.contains("Life Cover");
      cy.get("#lifeCover").clear().type("$21");

      cy.contains("TPD Cover");
      cy.get("#TPDCover").clear().type("$21");

      cy.contains("Cover type");
      cy.get("#coverType").select("Fixed");

      cy.contains("Cost p.a.");

      cy.get("#cost").clear().type("$21");

      cy.contains("Monthly Income Protection");
      cy.get("#monthlyIncome").clear().type("$21");

      cy.contains("Waiting Period");
      cy.get("#waitingPeriod").should("have.value", "30");

      cy.contains("Benefit Period");
      cy.get("#BenefitPeriod").should("have.value", "2 Years");

      cy.contains("Cover type");
      cy.get("#coverType2").select("Fixed");

      cy.contains("Cost p.a.");
      cy.get("#cost2").clear().type("$22");

      cy.contains("Close");
      cy.contains("Submit").click();
    });

    // Contributions inner card

    cy.contains("Contributions");

    cy.get(":nth-child(7) > .d-flex > .form-check > .radioButton2")
      .contains("Yes")
      .click();
    cy.get(":nth-child(7) > .d-flex > #button-addon2").click();

    cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
      cy.contains("Admin_Contributions");

      cy.contains("How many Contributions do Admin have ?");
      cy.get(".flex-shrink-0 > #NumberOfMap").clear().type(1);

      cy.contains("Starting From");
      cy.get('input[name="startingYear"]', { force: true })
        .filter(":visible")
        .clear()
        .type("2012");

      cy.contains("No#");
      cy.contains("1");

      cy.contains("Financial Years");
      cy.get(".pt-3").contains("2012/2013");

      Cypress.on("uncaught:exception", (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false;
      });

      cy.contains("No#");
      cy.contains("1");

      cy.contains("Financial Years");
      cy.contains("2012/2013");

      cy.contains("Employer Contributions");
      cy.get("#employerContributions0").clear().type("$2");

      cy.contains("Concessional (Include. Salary Sac)");
      cy.get("#concessional0").clear().type("$2");

      cy.contains("Total Concessional Contributions");
      cy.get("#totalConcessional0").should("have.value", "$4");

      cy.contains("Non-Concessional Contributions");
      cy.get("#nonConcessionalContributions0").clear().type("$2");

      cy.contains("Close");
      cy.contains("Submit").click();
    });

    // Nominated Beneficiaries

    // cy.get(":nth-child(8) > .d-flex > .form-check > .radioButton2")
    //   .contains("Yes")
    //   .click();

    // cy.get(":nth-child(8) > .d-flex > #button-addon2").click();

    // cy.get(':nth-child(7) > .modal-dialog > .modal-content').within(() => {
    //   cy.contains("Admin_Beneficiaries");

    //   cy.contains("How many beneficiaries do Admin have :");

    //   cy.get(':nth-child(7) > .modal-dialog > .modal-content > .modal-body > form > :nth-child(1) > .col-md-12 > .row > .d-flex > div > #NumberOfMap').clear().type('1')
    // })
   

    //Super Fund Detail Card Close Section
    cy.get(".modal-footer")
      .filter(":visible")
      .within(() => {
        cy.contains("Close");
        cy.contains("Submit").click();
      });

    cy.get("#clientCurrentBalance").should("not.have.value", "");
    cy.contains("Close");
    cy.get(".modal-footer > .bgColor")
      .contains("Submit")
      .should("be.visible")
      .click();

    cy.get("#clientsuperAnnuationIssues").should("not.have.value", "");
  }
}

export default FinancialInvestments;
