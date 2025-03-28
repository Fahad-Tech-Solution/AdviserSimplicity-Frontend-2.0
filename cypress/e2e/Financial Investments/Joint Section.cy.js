class FinancialInvestmentsJoinSection {
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
    // //Partner Section
    // cy.wait(2000);

    // cy.get(':nth-child(2) > [style="width: 50%;"]').contains("Emma Taylor");
    // cy.get(":nth-child(2) > :nth-child(2) > .input-group").within(() => {
    //   cy.get("#button-addon2").click();
    // });

    // cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
    //   () => {
    //     cy.contains("Emma Taylor_Bank Accounts Detail");
    //     cy.contains("How many Bank Accounts Detail does Emma Taylor have :");
    //     cy.get("#NumberOfMap").clear().type("1");
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
    // cy.get("#partnerCurrentBalance").should("have.value", "$4,536");
    // //Join Section

    // cy.wait(2000);

    // cy.get(':nth-child(3) > [style="width: 50%;"]').contains(
    //   "Aiden Smith + Emma Taylor"
    // );
    // cy.get(":nth-child(3) > :nth-child(2) > .input-group").within(() => {
    //   cy.get("#button-addon2").click();
    // });

    // cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
    //   () => {
    //     cy.contains("Aiden Smith & Emma Taylor_Bank Accounts Detail");
    //     cy.contains(
    //       "How many Bank Accounts Detail does Aiden Smith & Emma Taylor have :"
    //     );
    //     cy.get("#NumberOfMap").clear().type("2");
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
    //   cy.get("#currentBalance0").clear().type("464");

    //   cy.contains("2");

    //   cy.contains("Name of Institution");
    //   cy.get("#Institution1").select("Financial Institutions");

    //   cy.contains("Account number");
    //   cy.get("#accountNumber1").clear().type("3535");

    //   cy.contains("Current Balance");
    //   cy.get("#currentBalance1").clear().type("464");
    // });
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    // ).within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });

    // cy.get("#jointCurrentBalance").should("have.value", "$928");

    // //Footer
    // cy.get("#clientCurrentBalance").should("not.have.value", "");
    // cy.contains("Close");
    // cy.get(".modal-footer > .bgColor")
    //   .contains("Submit")
    //   .should("be.visible")
    //   .click();

    // cy.get("#clientbankAccountFinance").should("have.value", "$5,000");
    // cy.get("#partnerbankAccountFinance").should("have.value", "$5,000");

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

    // //Partner Section

    // cy.contains("Emma Taylor");
    // cy.get(":nth-child(2) > :nth-child(2) > .input-group").within(() => {
    //   cy.get("#button-addon2").click();
    // });

    // cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
    //   () => {
    //     cy.contains("Emma Taylor_Term Deposits Detail");
    //     cy.contains("How many Term Deposits Detail does Emma Taylor have :");
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
    // cy.get("#partnerCurrentBalance").should("have.value", "$4,536");

    // //Join Section

    // //Partner Section

    // cy.contains("Aiden Smith + Emma Taylor");
    // cy.get(":nth-child(3) > :nth-child(2) > .input-group").within(() => {
    //   cy.get("#button-addon2").click();
    // });

    // cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
    //   () => {
    //     cy.contains("Aiden Smith & Emma Taylor_Term Deposits Detail");
    //     cy.contains(
    //       "How many Term Deposits Detail does Aiden Smith & Emma Taylor have :"
    //     );
    //     cy.get("#NumberOfMap").clear().type(2);
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
    //   cy.get("#currentBalance0").clear().type("464");

    //   cy.contains("2");

    //   cy.contains("Name of Institution");
    //   cy.get("#Institution1").select("Financial Institutions");

    //   cy.contains("Account number");
    //   cy.get("#accountNumber1").clear().type("3535");

    //   cy.contains("Current Balance");
    //   cy.get("#currentBalance1").clear().type("464");
    // });
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    // ).within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });
    // cy.get("#jointCurrentBalance").should("have.value", "$928");

    // //Footer

    // cy.contains("Close");
    // cy.get(".modal-footer > .bgColor")
    //   .contains("Submit")
    //   .should("be.visible")
    //   .click();

    // cy.get("#clienttermDepositsFinance").should("have.value", "$5,000");
    // cy.get("#partnertermDepositsFinance").should("have.value", "$5,000");

    // //Australian Shares/ETFs

    // cy.get(":nth-child(3) > .py-4").within(() => {
    //   cy.contains("Australian Shares/ETFs");
    //   cy.get("img");
    //   cy.contains("Aiden Smith");
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
    //     cy.contains(
    //       "How many Australian Shares/ETFs Detail does Aiden Smith have :"
    //     );
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
    //   cy.wait(3000);
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
    // cy.get("#clientCurrentBalance").should("have.value", "$29");

    // cy.contains("Cost Base");
    // cy.get("#clientCostBaseTemp").should("have.value", "$143");

    // //Partner Section
    // cy.contains("Emma Taylor");
   

    // cy.get(":nth-child(2) > :nth-child(2) > .input-group").within(() => {
    //   cy.get("#button-addon2").click();
    // });

    // cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
    //   () => {
    //     cy.contains("Emma Taylor_Australian Shares/ETFs Detail");
    //     cy.contains(
    //       "How many Australian Shares/ETFs Detail does Emma Taylor have :"
    //     );
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
    //   cy.wait(3000);
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
    // cy.get("#partnerCurrentBalance").should("have.value", "$29");

    // cy.contains("Cost Base");
    // cy.get("#clientCostBaseTemp").should("have.value", "$143");

    // //Join Section

    // cy.contains("Aiden Smith + Emma Taylor");

    // cy.get(":nth-child(3) > :nth-child(2) > .input-group").within(() => {
    //   cy.get("#button-addon2").click();
    // });

    // cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
    //   () => {
    //     cy.contains("Aiden Smith & Emma Taylor_Australian Shares/ETFs Detail");
    //     cy.contains(
    //       "How many Australian Shares/ETFs Detail does Aiden Smith & Emma Taylor have :"
    //     );
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
    //   cy.wait(3000);
    //   cy.contains("Company Name");
    //   cy.get("#companyName0").should("not.have.value", "");

    //   cy.contains("Shares Price");
    //   cy.get("#sharePrice0").should("not.have.value", "");

    //   cy.contains("Number of Shares");
    //   cy.get("#shares0").clear().type("70");

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
    // cy.get("#jointCurrentBalance").should("have.value", "$32");

    // cy.contains("Cost Base");
    // cy.get("#jointCostBaseTemp").should("have.value", "$143");

    // cy.contains("Close");
    // cy.get(".modal-footer > .bgColor")
    //   .contains("Submit")
    //   .should("be.visible")
    //   .click();

    // cy.get("#clientaustralianShareMarket").should("have.value", "$45");
    // cy.get("#partneraustralianShareMarket").should("have.value", "$45");

    // cy.wait(1000);



    //      //Platform Investments
    //      cy.get(":nth-child(4) > .py-4").within(() => {
    //       cy.contains("Platform Investments");
    //       cy.get("img");
    //       cy.contains("Aiden Smith");
    //       cy.contains("Emma Taylor");
    //       cy.get(
    //         "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
    //       ).click();
    //     });
    
    //     cy.get(".modal-content").within(() => {
    //       cy.contains("Platform Investments");
    //       cy.get(".btn-close");
    //       cy.get(".table").within(() => {
    //         cy.contains("Owner");
    //         cy.get('[style="width: 50%;"]').contains("Aiden Smith");
    //         cy.contains("Current Balance");
    //       });
    //     });
    
    //     cy.get("#button-addon2").click();
    
    //     cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
    //       () => {
    //         cy.contains("Aiden Smith_Platform Investments Detail");
    //         cy.contains("How many Platforms does Aiden Smith have :");
    //         cy.get("#NumberOfMap").clear().type(1);
    //       }
    //     );
    //     //Inner Table
    //     cy.get(
    //       '[style="display: block;"] > .modal-dialog > .modal-content > .modal-body > form > :nth-child(1) > .col-md-12 > .row > .mt-4'
    //     ).within(() => {
    //       cy.contains("No#");
    //       cy.contains("1");
    
    //       cy.contains("Platform Name");
    //       cy.get("#platformName0").select("For Testing Purpose");
    
    //       cy.contains("Account Number");
    //       cy.get("#accountNumber0").clear().type("45");
    
    //       cy.contains("Portfolio Cost Base");
    //       cy.get("#totalPortfolioCost0").clear().type("$45");
    
    //       cy.contains("Annual Advice Service Fee");
    //       cy.get("#serviceFee0").clear().type("$3");
    //       cy.get("#serviceFeeType0").select("Weekly");
    
    //       cy.contains("Portfolio Value");
    //       cy.get("#button-addon2").click();
    //     });
    
    //     //Portfolio Value inner card
    //     cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
    //       cy.contains("For Testing Purpose_Portfolio Value");
    //       cy.contains("How many Underlying Investments does Aiden Smith have :");
    //       cy.get("#NumberOfMap").clear().type(1);
    
    //       cy.contains("No#");
    //       cy.contains("1");
    
    //       cy.contains("Investment Option");
    //       cy.get('.css-1lx7dxn').type("Testing (001){enter}");
    //     });
    
       
    
    //     cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
    //       cy.contains("Investment Code");
    //       cy.get('#investmentCode0').should("have.value", "001");
          
    
    //       cy.contains("Investment Value");
    //       cy.get("#investmentValue0").clear().type("$22");
    
    //       cy.contains("Close");
    //       cy.contains("Submit").click();
    //     });
    
    //     cy.get("#portfolioValue0").should("not.have.value", "");
    
    //     cy.get(".row.mt-2");
    
    //     cy.get("#portfolioValue0").should("have.value", "$22");
    
    //     //Footer
    
    //     cy.get(".modal-footer")
    //       .filter(":visible")
    //       .within(() => {
    //         cy.contains("Close");
    //         cy.contains("Submit").click();
    //       });
    
    //     cy.get("#clientCurrentBalance").should("have.value", "$156");
    
    //     cy.contains("Cost Base");
    //     cy.get("#clientCostBaseTemp").should("have.value", "$45");
    
    
    
    
    
    // //Partner Section
    // cy.contains("Emma Taylor");
    // cy.get(':nth-child(2) > :nth-child(2) > .input-group').within(() => {
    
    //   cy.get("#button-addon2").click();
    // })
       
    
    //     cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
    //       () => {
    //         cy.contains("Emma Taylor_Platform Investments Detail");
    //         cy.contains("How many Platforms does Emma Taylor have :");
    //         cy.get("#NumberOfMap").clear().type(1);
    //       }
    //     );
    //     //Inner Table
    //     cy.get(
    //       '[style="display: block;"] > .modal-dialog > .modal-content > .modal-body > form > :nth-child(1) > .col-md-12 > .row > .mt-4'
    //     ).within(() => {
    //       cy.contains("No#");
    //       cy.contains("1");
    
    //       cy.contains("Platform Name");
    //       cy.get("#platformName0").select("For Testing Purpose");
    
    //       cy.contains("Account Number");
    //       cy.get("#accountNumber0").clear().type("45");
    
    //       cy.contains("Portfolio Cost Base");
    //       cy.get("#totalPortfolioCost0").clear().type("$45");
    
    //       cy.contains("Annual Advice Service Fee");
    //       cy.get("#serviceFee0").clear().type("$3");
    //       cy.get("#serviceFeeType0").select("Weekly");
    
    //       cy.contains("Portfolio Value");
    //       cy.get("#button-addon2").click();
    //     });
    
    //     //Portfolio Value inner card
    //     cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
    //       cy.contains("For Testing Purpose_Portfolio Value");
    //       cy.contains("How many Underlying Investments does Emma Taylor have :");
    //       cy.get("#NumberOfMap").clear().type(1);
    
    //       cy.contains("No#");
    //       cy.contains("1");
    
    //       cy.contains("Investment Option");
    //       cy.get('.css-1lx7dxn').type("Testing (001){enter}");
    //     });
    
       
    
    //     cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
    //       cy.contains("Investment Code");
    //       cy.get('#investmentCode0').should("have.value", "001");
    
       
    
      
    
    //       cy.contains("Investment Value");
    //       cy.get("#investmentValue0").clear().type("$22");
    
    //       cy.contains("Close");
    //       cy.contains("Submit").click();
    //     });
    
    //     cy.get("#portfolioValue0").should("not.have.value", "");
    
    //     cy.get(".row.mt-2");
    
    //     cy.get("#portfolioValue0").should("have.value", "$22");
    
    //     //Footer
    
    //     cy.get(".modal-footer")
    //       .filter(":visible")
    //       .within(() => {
    //         cy.contains("Close");
    //         cy.contains("Submit").click();
    //       });
    
    //       cy.get('#partnerCurrentBalance').should("have.value", "$156");
    
    //     cy.contains("Cost Base");
    //     cy.get('#partnerCostBaseTemp').should("have.value", "$45");






    //         //Join Section
    // cy.contains("Aiden Smith + Emma Taylor");
    // cy.get(':nth-child(3) > :nth-child(2) > .input-group').within(() => {
    
    //   cy.get("#button-addon2").click();
    // })
       
    
    //     cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
    //       () => {
    //         cy.contains("Aiden Smith & Emma Taylor_Platform Investments Detail");
    //         cy.contains("How many Platforms does Aiden Smith & Emma Taylor have :");
    //         cy.get("#NumberOfMap").clear().type(1);
    //       }
    //     );
    //     //Inner Table
    //     cy.get(
    //       '[style="display: block;"] > .modal-dialog > .modal-content > .modal-body > form > :nth-child(1) > .col-md-12 > .row > .mt-4'
    //     ).within(() => {
    //       cy.contains("No#");
    //       cy.contains("1");
    
    //       cy.contains("Platform Name");
    //       cy.get("#platformName0").select("For Testing Purpose");
    
    //       cy.contains("Account Number");
    //       cy.get("#accountNumber0").clear().type("45");
    
    //       cy.contains("Portfolio Cost Base");
    //       cy.get("#totalPortfolioCost0").clear().type("$45");
    
    //       cy.contains("Annual Advice Service Fee");
    //       cy.get("#serviceFee0").clear().type("$54");
    //       cy.get("#serviceFeeType0").select("Monthly");
    
    //       cy.contains("Portfolio Value");
    //       cy.get("#button-addon2").click();
    //     });
    
    //     //Portfolio Value inner card
    //     cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
    //       cy.contains("For Testing Purpose_Portfolio Value");
    //       cy.contains("How many Underlying Investments does Aiden Smith & Emma Taylor have :");
    //       cy.get("#NumberOfMap").clear().type(1);
    
    //       cy.contains("No#");
    //       cy.contains("1");
    //       cy.contains("Investment Option");
    //       cy.get('.css-1lx7dxn').type("Testing (001){enter}");
    //     });
    
       
    
    //     cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
    //       cy.contains("Investment Code");
    //       cy.get('#investmentCode0').should("have.value", "001");
          
    
    //       cy.contains("Investment Value");
    //       cy.get("#investmentValue0").clear().type("$22");
    
    //       cy.contains("Close");
    //       cy.contains("Submit").click();
    //     });
    
    //     cy.get("#portfolioValue0").should("not.have.value", "");
    
    //     cy.get(".row.mt-2");
    
    //     cy.get("#portfolioValue0").should("have.value", "$22");
    
    //     //Footer
    
    //     cy.get(".modal-footer")
    //       .filter(":visible")
    //       .within(() => {
    //         cy.contains("Close");
    //         cy.contains("Submit").click();
    //       });
    
    //       cy.get('#partnerCurrentBalance').should("have.value", "$156");
    
    //     cy.contains("Cost Base");
    //     cy.get('#partnerCostBaseTemp').should("have.value", "$45");
    
    //     //Main Card Footer
    //     cy.get(".modal-footer button.btn.bgColor.modalBtn")
    //       .filter(":visible")
    //       .click();
    
    //       cy.get('#clientmanagedFund').should("have.value", "$480");
    //       cy.get('#partnermanagedFund').should("have.value", "$480");














    //         //Investment Bond
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

    // //Partner Section
    // cy.contains("Emma Taylor");
    // cy.get(":nth-child(2) > :nth-child(2) > .input-group").within(() => {
    //   cy.get("#button-addon2").click();
    // });

    // cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
    //   () => {
    //     cy.contains("Emma Taylor_Investment Bond Detail");
    //     cy.contains("How many Platforms does Emma Taylor have :");
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
    //   cy.contains("How many Underlying Investments does Emma Taylor have :");
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

    // cy.get("#partnerCurrentBalance").should("have.value", "$156");
    // //Cost Base
    // cy.contains("Cost Base");
    // cy.get("#partnerCostBaseTemp").clear().type("46");
    // cy.wait(1000);
    // cy.get(':nth-child(2) > [style="width: 25%;"] > .invalid-feedback').within(
    //   () => {
    //     cy.contains(
    //       "Total must be equal to the sum of all Cost Base filled in the popup. The sum is $45"
    //     );
    //   }
    // );


    // //Joint Section

    //   //Partner Section
    //   cy.contains("Aiden Smith + Emma Taylor");
    //   cy.get(':nth-child(3) > :nth-child(2) > .input-group').within(() => {
    //     cy.get("#button-addon2").click();
    //   });
  
    //   cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
    //     () => {
    //       cy.contains("Aiden Smith & Emma Taylor_Investment Bond Detail");
    //       cy.contains("How many Platforms does Aiden Smith & Emma Taylor have :");
    //       cy.get("#NumberOfMap").clear().type(1);
    //     }
    //   );
    //   //Inner Table
    //   cy.get(
    //     '[style="display: block;"] > .modal-dialog > .modal-content > .modal-body > form > :nth-child(1) > .col-md-12 > .row > .mt-4'
    //   ).within(() => {
    //     cy.contains("No#");
    //     cy.contains("1");
  
    //     cy.contains("Platform Name");
    //     cy.get("#platformName0").select("Testing Purpose", { force: true });
  
    //     cy.contains("Account Number");
    //     cy.get("#accountNumber0").clear().type("45");
  
    //     cy.contains("Portfolio Cost Base");
    //     cy.get("#totalPortfolioCost0").clear().type("$45");
  
    //     cy.contains("Annual Advice Service Fee");
    //     cy.get("#serviceFee0").clear().type("$54");
    //     cy.get("#serviceFeeType0").select("Monthly");
  
    //     cy.contains("Portfolio Value");
    //     cy.get("#button-addon2").click();
    //   });
  
    //   //Portfolio Value inner card
    //   cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
    //     cy.contains("Testing Purpose_Portfolio Value");
    //     cy.contains("How many Underlying Investments does Aiden Smith & Emma Taylor have :");
    //     cy.get("#NumberOfMap").clear().type(1);
  
    //     cy.contains("No#");
    //     cy.contains("1");
  
    //     cy.contains("Investment Option");
    //     cy.get(".css-1lx7dxn").type("Testing (0011){enter}");
    //   });
  
    //   cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
    //     cy.contains("Investment Code");
    //     cy.get("#investmentCode0").should("have.value", "0011");
    //     //cy.get("#investmentCode0").should("not.have.value", "");
  
    //     cy.contains("Investment Value");
    //     cy.get("#investmentValue0").clear().type("$22");
  
    //     cy.contains("Close");
    //     cy.contains("Submit").click();
    //   });
  
    //   cy.get("#portfolioValue0").should("have.value", "$22");
  
    //   cy.get(".modal-footer button.btn.bgColor.modalBtn")
    //     .filter(":visible")
    //     .click();
  
    //     cy.get('#jointCurrentBalance').should("have.value", "$648");
    //   //Cost Base
    //   cy.contains("Cost Base");
    //   cy.get('#jointCostBaseTemp').clear().type("46");
    //   cy.wait(1000);
    //   cy.get(':nth-child(3) > [style="width: 25%;"] > .invalid-feedback').within(
    //     () => {
    //       cy.contains(
    //         "Total must be equal to the sum of all Cost Base filled in the popup. The sum is $45"
    //       );
    //     }
    //   );


    //   //Footer
    // cy.get(".modal-footer")
    //   .filter(":visible")
    //   .within(() => {
    //     cy.contains("Close");
    //     cy.contains("Submit").click();
    //   });

    //   cy.wait(1000);

    //   cy.get('#clientinvestmentBondFinance').should("have.value", "$480");
    //   cy.get('#partnerinvestmentBondFinance').should("have.value", "$480");



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
  
  
  
      //Partner Section
  
      // cy.get(".css-d07bj1 > :nth-child(1)").click();
      cy.get('.css-1lcv7hw').type("Emma Taylor{enter}");
  
      //Investment Loan Card Section
  
      cy.get(".table").within(() => {
        cy.contains("Owner");
        
        cy.contains("Emma Taylor");
  
        cy.contains("Lender");
        cy.get(':nth-child(2) > :nth-child(2) > .form-select').select("Testing");
  
        cy.contains("Loan Balance");
        cy.get(':nth-child(2) > :nth-child(3) > #loanBalance').clear().type("$983").blur();
  
        cy.contains("Loan Type");
        cy.get(':nth-child(2) > :nth-child(4) > .form-select').select("i/only");
  
        cy.contains("Repayments Amount");
        cy.get(':nth-child(2) > :nth-child(5) > #repaymentsAmount').clear().type("$567").blur();
  
        cy.contains("Frequency");
        cy.get(':nth-child(2) > :nth-child(6) > .form-select').select("Weekly");
  
        cy.contains("Annual Repayments");
        cy.get(':nth-child(2) > :nth-child(7) > .mb-3 > #annualRepayments').clear().type("22").blur();
        cy.get(':nth-child(2) > :nth-child(7) > .mb-3 > #serviceFeeType').select("Weekly");
  
        cy.contains("Interest Rate (p.a)");
        cy.get(':nth-child(2) > :nth-child(8) > #interestRate').clear().type("52").blur();
  
        cy.contains("Loan Term");
        cy.get(':nth-child(2) > :nth-child(9) > .form-select').select("Year 30");
  
        cy.contains("Loan Term Remaining");
        cy.get(':nth-child(2) > :nth-child(10) > .form-select').select("Year 10");
  
        cy.contains("Deductible Loan Amount");
        cy.get(':nth-child(2) > :nth-child(11) > #deductibleLoanAmount').clear().type("33.00%").blur();
      });


      //Joint Section


        //Partner Section
  
      // cy.get(".css-d07bj1 > :nth-child(1)").click();
      cy.get('.css-1lcv7hw').type("Aiden Smith + Emma Taylor{enter}");
     cy.contains("Aiden Smith + Emma Taylor");
  
      //Investment Loan Card Section
  
      cy.get(".table").within(() => {
        cy.contains("Owner");
        
        cy.contains("Emma Taylor");
  
        cy.contains("Lender");
        cy.get(':nth-child(3) > :nth-child(2) > .form-select').select("Testing");
  
        cy.contains("Loan Balance");
        cy.get(':nth-child(3) > :nth-child(3) > #loanBalance').clear().type("$44").blur();
  
        cy.contains("Loan Type");
        cy.get(':nth-child(3) > :nth-child(4) > .form-select').select("P&I");
  
        cy.contains("Repayments Amount");
        cy.get(':nth-child(3) > :nth-child(5) > #repaymentsAmount').clear().type("$992").blur();
  
        cy.contains("Frequency");
        cy.get(':nth-child(3) > :nth-child(6) > .form-select').select("Weekly");
  
        cy.contains("Annual Repayments");
        cy.get(':nth-child(3) > :nth-child(7) > .mb-3 > #annualRepayments').clear().type("10").blur();
        cy.get(':nth-child(3) > :nth-child(7) > .mb-3 > #serviceFeeType').select("Weekly");
  
        cy.contains("Interest Rate (p.a)");
        cy.get(':nth-child(3) > :nth-child(8) > #interestRate').clear().type("65").blur();
  
        cy.contains("Loan Term");
        cy.get(':nth-child(3) > :nth-child(9) > .form-select').select("Year 29");
  
        cy.contains("Loan Term Remaining");
        cy.get(':nth-child(3) > :nth-child(10) > .form-select').select("Year 15");
  
        cy.contains("Deductible Loan Amount");
        cy.get(':nth-child(3) > :nth-child(11) > #deductibleLoanAmount').clear().type("60.00%").blur();
      });
  
      //Investment Loan Card Footer
      cy.get(".modal-footer").within(() => {
        cy.contains("Close").should("be.visible");
        cy.contains("Submit").should("be.visible").click();
      });
  
      cy.get('#clientmanagedFundsLOC').should("have.value", "$1,404");
      cy.get('#partnermanagedFundsLOC').should("have.value", "$1,404");






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

      //Partner Section

      // cy.get(".css-d07bj1 > :nth-child(1)").click();
      cy.get('.css-1lcv7hw').type("Emma Taylor{enter}");
  
      //Margin Loan Card Section
  
      cy.get(".table").within(() => {
        cy.contains("Owner");
   
        cy.contains("Emma Taylor");
  
        cy.contains("Lender");
        cy.get(':nth-child(2) > [style="width: 15rem;"] > .form-select').select("Testing");
  
        cy.contains("Loan Balance");
        cy.get(':nth-child(2) > :nth-child(3) > #loanBalance').clear().type("$987").blur();
  
        cy.contains("Monthly Contribution");
        cy.get(':nth-child(2) > :nth-child(4) > #monthlyContribution').clear().type("$85").blur();
  
        cy.contains("Annual Loan Contributions");
        cy.get(':nth-child(2) > :nth-child(5) > #annualLoan').should("have.value", "$1,020");
  
        cy.contains("Interest Rate (p.a)");
        cy.get(':nth-child(2) > :nth-child(6) > #interestRate').clear().type("202").blur();

        cy.contains("Loan Term");
        cy.get(':nth-child(2) > :nth-child(7) > .form-select').select("Year 29");
  
       
  
        cy.contains("Loan Term Remaining");
        cy.get(':nth-child(2) > :nth-child(8) > .form-select').select("Year 12");
  
        cy.contains("Deductible Loan Amount");
        cy.get(':nth-child(2) > :nth-child(9) > #deductibleLoanAmount').clear().type("202").blur();
      });

      //Joint Section
      //Partner Section

      // cy.get(".css-d07bj1 > :nth-child(1)").click();
      cy.get('.css-1lcv7hw').type("Aiden Smith + Emma Taylor{enter}");
  
      //Margin Loan Card Section
  
      cy.get(".table").within(() => {
        cy.contains("Owner");
   
        cy.contains("Aiden Smith + Emma Taylor");
  
        cy.contains("Lender");
        cy.get(':nth-child(3) > [style="width: 15rem;"] > .form-select').select("Testing");
  
        cy.contains("Loan Balance");
        cy.get(':nth-child(3) > :nth-child(3) > #loanBalance').clear().type("$987").blur();
  
        cy.contains("Monthly Contribution");
        cy.get(':nth-child(3) > :nth-child(4) > #monthlyContribution').clear().type("$85").blur();
  
        cy.contains("Annual Loan Contributions");
        cy.get(':nth-child(3) > :nth-child(5) > #annualLoan').should("have.value", "$1,020");
  
        cy.contains("Interest Rate (p.a)");
        cy.get(':nth-child(3) > :nth-child(6) > #interestRate').clear().type("988").blur();

        cy.contains("Loan Term");
        cy.get(':nth-child(3) > :nth-child(7) > .form-select').select("Year 9");
  
       
  
        cy.contains("Loan Term Remaining");
        cy.get(':nth-child(3) > :nth-child(8) > .form-select').select("Year 6");
  
        cy.contains("Deductible Loan Amount");
        cy.get(':nth-child(3) > :nth-child(9) > #deductibleLoanAmount').clear().type("754").blur();
      });







  
      //Margin Loan Card Footer
      cy.get(".modal-footer").within(() => {
        cy.contains("Close").should("be.visible");
        cy.contains("Submit").should("be.visible").click();
      });
  
      cy.get('#clientmanagedFundsMarginLoan').should("have.value", "$1,530");
      cy.get('#partnermanagedFundsMarginLoan').should("have.value", "$1,530");
  }
}

export default FinancialInvestmentsJoinSection;
