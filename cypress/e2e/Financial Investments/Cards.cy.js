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
    

    //Bank Accounts

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

    cy.get('.css-d07bj1 > :nth-child(1)').click();
    
    cy.get('#react-select-3-listbox').select('Testing(001)');  
    cy.get('#react-select-3-option-0').click();

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
    
        cy.get(".css-1xc3v61-indicatorContainer").click();
    
        cy.get('#react-select-2-option-0').click();
    
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
  }
}

export default FinancialInvestments;
