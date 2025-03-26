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

    //Australian Shares/ETFs

    cy.get(":nth-child(3) > .py-4").within(() => {
      cy.contains("Australian Shares/ETFs");
      cy.get("img");
      cy.contains("Aiden Smith");
      cy.contains("Emma Taylor");
      cy.get(
        "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
      ).click();
    });

    cy.get(".modal-content").within(() => {
      cy.contains("Australian Shares/ETFs");
      cy.get(".btn-close");
      cy.get(".table").within(() => {
        cy.contains("Owner");
        cy.get('[style="width: 50%;"]').contains("Aiden Smith");
        cy.contains("Current Balance");
      });
    });

    cy.get("#button-addon2").click();

    cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
      () => {
        cy.contains("Aiden Smith_Australian Shares/ETFs Detail");
        cy.contains(
          "How many Australian Shares/ETFs Detail does Aiden Smith have :"
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
      cy.wait(3000);
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
    cy.get("#clientCurrentBalance").should("have.value", "$29");

    cy.contains("Cost Base");
    cy.get("#clientCostBaseTemp").should("have.value", "$143");

    //Partner Section
    cy.contains("Emma Taylor");
   

    cy.get(":nth-child(2) > :nth-child(2) > .input-group").within(() => {
      cy.get("#button-addon2").click();
    });

    cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
      () => {
        cy.contains("Emma Taylor_Australian Shares/ETFs Detail");
        cy.contains(
          "How many Australian Shares/ETFs Detail does Emma Taylor have :"
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
      cy.wait(3000);
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
    cy.get("#partnerCurrentBalance").should("have.value", "$29");

    cy.contains("Cost Base");
    cy.get("#clientCostBaseTemp").should("have.value", "$143");

    //Join Section

    cy.contains("Aiden Smith + Emma Taylor");

    cy.get(":nth-child(3) > :nth-child(2) > .input-group").within(() => {
      cy.get("#button-addon2").click();
    });

    cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
      () => {
        cy.contains("Aiden Smith & Emma Taylor_Australian Shares/ETFs Detail");
        cy.contains(
          "How many Australian Shares/ETFs Detail does Aiden Smith & Emma Taylor have :"
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
      cy.wait(3000);
      cy.contains("Company Name");
      cy.get("#companyName0").should("not.have.value", "");

      cy.contains("Shares Price");
      cy.get("#sharePrice0").should("not.have.value", "");

      cy.contains("Number of Shares");
      cy.get("#shares0").clear().type("70");

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
    cy.get("#jointCurrentBalance").should("have.value", "$32");

    cy.contains("Cost Base");
    cy.get("#jointCostBaseTemp").should("have.value", "$143");

    cy.contains("Close");
    cy.get(".modal-footer > .bgColor")
      .contains("Submit")
      .should("be.visible")
      .click();

    cy.get("#clientaustralianShareMarket").should("have.value", "$45");
    cy.get("#partneraustralianShareMarket").should("have.value", "$45");

    cy.wait(1000);
  }
}

export default FinancialInvestmentsJoinSection;
