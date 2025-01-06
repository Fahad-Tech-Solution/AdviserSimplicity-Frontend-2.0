class InvestmentTrust {
  section() {
    cy.visit("http://ec2-3-25-227-176.ap-southeast-2.compute.amazonaws.com/");
    cy.get(":nth-child(6) > :nth-child(7)").click();
    cy.get("#popover > :nth-child(3)").click();

    cy.get(
      '[statusstep="40"] > .ant-steps-item-container > .ant-steps-item-icon > .ant-steps-icon > .rounded-circle'
    ).click();

    cy.get(
      ".ant-steps-item-wait > .ant-steps-item-container > .ant-steps-item-icon > .ant-steps-icon > .rounded-circle"
    ).click();
    cy.contains("Personal Insurance");
    cy.get(":nth-child(4) > .col-md-12 > .bgColor")
      .contains("Next")
      .should("be.visible")
      .click();

    cy.get(
      '[statusstep="72"] > .ant-steps-item-container > .ant-steps-item-icon > .ant-steps-icon'
    ).click();

    //Investment Trust
    // cy.get(".pb-4 > :nth-child(1) > .QuestionIcon > .img-fluid").click();

    // cy.get(".modal-header").within(() => {
    //   cy.contains("Questions").should("be.visible");
    //   cy.get(".btn-close").should("be.visible");
    // });

    // //Body
    // cy.wait(1000);
    // cy.get(":nth-child(1) > .d-flex > .border")
    //   .click()
    //   .within(() => {
    //     cy.get("img").should("be.visible");
    //     cy.contains(
    //       "Does your Family Trust have any Money invested in Term Deposits?"
    //     ).should("be.visible");
    //   });

    // cy.wait(1000);
    // cy.get(":nth-child(2) > .d-flex > .border")
    //   .click()
    //   .within(() => {
    //     cy.get("img").should("be.visible");
    //     cy.contains(
    //       "Does your Family Trust have any Money invested Australian Shares?"
    //     ).should("be.visible");
    //   });

    // cy.wait(1000);
    // cy.get(":nth-child(3) > .d-flex > .border")
    //   .click()
    //   .within(() => {
    //     cy.get("img").should("be.visible");
    //     cy.contains(
    //       "Does your Family Trust have any Money invested in Managed Funds or via a Platform?"
    //     ).should("be.visible");
    //   });

    // cy.wait(1000);
    // cy.get(":nth-child(4) > .d-flex > .border")
    //   .click()
    //   .within(() => {
    //     cy.get("img").should("be.visible");
    //     cy.contains(
    //       "Does your Family Trust have any Investment Loan (LOC) attached to any of its investments?"
    //     ).should("be.visible");
    //   });

    // cy.wait(1000);
    // cy.get(":nth-child(5) > .d-flex > .border")
    //   .click()
    //   .within(() => {
    //     cy.get("img").should("be.visible");
    //     cy.contains(
    //       "Does your Family Trust have any investment Properties?"
    //     ).should("be.visible");
    //   });

    // cy.wait(1000);
    // cy.get(":nth-child(6) > .d-flex > .border")
    //   .click()
    //   .within(() => {
    //     cy.get("img").should("be.visible");
    //     cy.contains("Other Family Investments").should("be.visible");
    //   });

    // //Footer;
    // cy.get(".modal-footer").within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });

    //Family Details:
    // cy.get(":nth-child(1) > .py-4").within(() => {
    //   // cy.contains("Family Details");
    //   cy.get("img");
    //   cy.contains("Total Fund Value");
    //   cy.get(
    //     ".mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
    //   )
    //     .click()
    //     .should("be.visible");
    // });
    // //Family Details Card Header
    // cy.get(".modal-header").within(() => {
    //   cy.contains("Family Details");
    //   cy.get(".btn-close").should("be.visible");
    // });

    // //Family Details Card Section

    // cy.get(".table").within(() => {
    //   cy.contains("No#");
    //   cy.get("tbody > tr > :nth-child(1)").contains("1");

    //   cy.contains("Trust Name");
    //   cy.get("#trustName").clear().type("Automation Tester").blur();

    //   cy.contains("Trust Type");
    //   cy.get("#trustType").select("Other");

    //   cy.contains("ABN");
    //   cy.get("#ABN").clear().type("345").blur();

    //   cy.contains("Registered Office");
    //   cy.get("#registeredOffice").clear().type("987").blur();

    //   cy.contains("Place Of Business");
    //   cy.get("#placeOfBusiness").clear().type("875").blur();

    //   cy.contains("Establishment Date");
    //   cy.get("#establishmentDate").clear().type("12-10-1998").blur();

    //   cy.contains("Trustee Type");
    //   cy.get("#trusteeType").select("Individual");

    //   cy.contains("Trustee Name");
    //   cy.get("#trusteeName").clear().type("345").blur();

    //   cy.contains("ACN");
    //   cy.get("#ACN").clear().type("422").blur();

    //   cy.contains("Name of Accountant");
    //   cy.get("#nameOfAccountant").clear().type("987").blur();
    // });

    // //Directors Card
    // cy.contains("Trustee Type").should("be.visible");
    // cy.get("#trusteeType").select("Corporate");
    // cy.get(".mb-3").within(() => {
    //   cy.get("#button-addon2").click();
    // });

    // cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
    //   () => {
    //     cy.contains("Directors");

    //     cy.contains("How many directors does the Corporate Trustee have :");
    //     cy.get("#NumberOfDirectors").clear().type("1");

    //     cy.get(
    //       ".px-4 > .col-md-12 > .row > .mt-4 > .table-responsive > .table"
    //     ).within(() => {
    //       cy.contains("No#");
    //       cy.contains("1");

    //       cy.contains("Director Name");
    //       cy.get("#directorName0").clear().type("Automation Tester ");
    //     });
    //     cy.get("form > .modal-footer").within(() => {
    //       cy.contains("Close").should("be.visible");
    //       cy.contains("Submit").should("be.visible").click();
    //     });
    //   }
    // );

    // //Footer
    // cy.contains("Close").should("be.visible");
    // cy.get(".modal-footer > .bgColor").filter(":visible").click();

    // cy.get("#clientfamilyDetails").should("not.have.value", "");

    // //Family Trust Bank Accounts

    // cy.get(":nth-child(2) > .py-4").within(() => {
    //   cy.contains("Family Trust Bank Accounts");
    //   cy.get("img");
    //   cy.contains("Admin");
    //   cy.get(
    //     "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
    //   ).click();
    // });

    // cy.get(".modal-content").within(() => {
    //   cy.contains("Family Trust Bank Accounts");
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
    //     cy.contains("Admin_Family Trust Bank Accounts Detail");
    //     cy.contains(
    //       "How many Family Trust Bank Accounts Detail does Admin have :"
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
    // cy.get("#clientCurrentBalance").should("not.have.value", "");
    // cy.contains("Close");
    // cy.get(".modal-footer > .bgColor")
    //   .contains("Submit")
    //   .should("be.visible")
    //   .click();

    // cy.get("#clientfamilyBank").should("not.have.value", "");

    // //Family Trust Term Deposits
    // cy.get(":nth-child(3) > .py-4").within(() => {
    //   cy.contains("Family Trust Term Deposits");
    //   cy.get("img");
    //   cy.contains("Admin");
    //   cy.get(
    //     "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
    //   ).click();
    // });

    // cy.get(".modal-content").within(() => {
    //   cy.contains("Family Trust Term Deposits");
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
    //     cy.contains("Admin_Family Trust Term Deposits Detail");
    //     cy.contains(
    //       "How many Family Trust Term Deposits Detail does Admin have :"
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
    // cy.get("#clientCurrentBalance").should("not.have.value", "");

    // cy.contains("Close");
    // cy.get(".modal-footer > .bgColor")
    //   .contains("Submit")
    //   .should("be.visible")
    //   .click();

    // cy.get("#clientfamilyTermDeposit").should("not.have.value", "");

    // //Family Trust Australian Shares/ETFs
    // cy.get(":nth-child(4) > .py-4").within(() => {
    //   cy.contains("Family Trust Australian Shares/ETFs");
    //   cy.get("img");
    //   cy.contains("Admin");
    //   cy.get(
    //     "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
    //   ).click();
    // });

    // cy.get(".modal-content").within(() => {
    //   cy.contains("Family Trust Australian Shares/ETFs");
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
    //     cy.contains("Admin_Family Trust Australian Shares/ETFs Detail");
    //     cy.contains(
    //       "How many Family Trust Australian Shares/ETFs Detail does Admin have :"
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
    //   cy.get('#ASXCode0').clear().type("BML.AX");
    //   cy.wait(1000);

    //   cy.contains("Company Name");
    //   cy.get('#companyName0').should("not.have.value", "");

    //   cy.contains("Shares Price");
    //   cy.get('#sharePrice0').should("not.have.value", "");

    //   cy.contains("Number of Shares");
    //   cy.get('#shares0').clear().type("4522");

    //   cy.contains("Cost base");
    //   cy.get('#costBase0').clear().type("9878");

    //   cy.contains("Current Balance");
    //   cy.get('#currentBalance0').should("not.have.value", "");
    // });
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    // ).within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });
    // cy.get("#clientCurrentBalance").should("not.have.value", "");

    // cy.contains("Close");
    // cy.get(".modal-footer > .bgColor")
    //   .contains("Submit")
    //   .should("be.visible")
    //   .click();

    // cy.get('#clientfamilyAustralianShare').should("not.have.value", "");

//     //Family Trust Platform Investments
//     cy.get(":nth-child(5) > .py-4").within(() => {
//       cy.contains("Family Trust Platform Investments");
//       cy.get("img");
//       cy.contains("Admin");
//       cy.get(
//         "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
//       ).click();
//     });

//     cy.get(".modal-content").within(() => {
//       cy.contains("Family Trust Platform Investments");
//       cy.get(".btn-close");
//       cy.get(".table").within(() => {
//         cy.contains("Owner");
//         cy.get('[style="width: 50%;"]').contains("Admin");
//         cy.contains("Current Balance");
//       });
//     });

//     cy.get("#button-addon2").click();

//     cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
//       () => {
//         cy.contains("Admin_Family Trust Platform Investments Detail");
//         cy.contains("How many Platforms does Admin have :");
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
//       cy.wait(1000);

//       cy.contains("Account Number");
//       cy.get("#accountNumber0").clear().type("9878");

//       cy.contains("Portfolio Cost Base");
//       cy.get("#totalPortfolioCost0").clear().type("4522");

//       cy.contains("Annual Advice Service Fee");
//       cy.get("#serviceFee0").clear().type("9878");
//       cy.get("#serviceFeeType0").select("Weekly");

//       cy.contains("Portfolio Value");
//       cy.get("#portfolioValue0");

//       cy.get("#button-addon2").click();
//     });
//     //Inner Card :

//     cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
//       cy.contains("For Testing Purpose_Portfolio Value");
//       cy.contains("How many Underlying Investments does Admin have :");
//       cy.get("#NumberOfMap").clear().type(1);
//     });
//     //Inner Table
//     cy.get(
//       ":nth-child(7) > .modal-dialog > .modal-content > .modal-body > form > :nth-child(1) > .col-md-12 > .row > .mt-4 > .table-responsive"
//     ).within(() => {
//       cy.contains("No#");
//       cy.contains("1");

      

//       cy.contains("Investment Code");
//       cy.get("#investmentCode0");

//       cy.contains("Investment Value");
//       cy.get("#investmentValue0").clear().type("4522");
//     });

//     cy.contains("Investment Option");
//     // cy.get(".css-1lx7dxn").type("Testing (001)");
//     // cy.get("#react-select-2-option-0").click();

//     cy.get(
//       ":nth-child(7) > .modal-dialog > .modal-content > .modal-footer"
//     ).within(() => {
//       cy.contains("Close").should("be.visible");
//       cy.contains("Submit").should("be.visible").click();
//     });

// //Portfolio Value
//     cy.get('#portfolioValue0').should("not.have.value", "");

//     //Close Inner Card : 
//     cy.get('[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer > .bgColor').contains("Submit").click();


//     cy.get("#clientCurrentBalance").should("not.have.value", "");

//     cy.contains("Close");
//     cy.get(".modal-footer > .bgColor")
//       .contains("Submit")
//       .should("be.visible")
//       .click();

//       cy.get('#clientfamilyMangedFunds').should("not.have.value", "");


   // Family Details:
    cy.get(":nth-child(8) > .py-4").within(() => {
      // cy.contains("Family Details");
      cy.get("img");
      cy.contains("Other Family Investments");
      cy.get(
        ".mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
      )
        .click()
        .should("be.visible");
    });
    //Family Details Card Header
    cy.get(".modal-header").within(() => {
      cy.contains("Other Family Investments");
      cy.get(".btn-close").should("be.visible");
    });

    //Family Details Card Section

    cy.get(".table").within(() => {
      cy.contains("Name of Investment");
      cy.get('#investmentName').clear().type("Automation Tester").blur();


      cy.contains("Current Value");
      cy.get('#currentValue').clear().type("987").blur();

      cy.contains("Cost Base");
      cy.get('#costBase').clear().type("345").blur();


    });

    
    //Footer
    cy.contains("Close").should("be.visible");
    cy.get(".modal-footer > .bgColor").filter(":visible").click();

    cy.get("#clientfamilyDetails").should("not.have.value", "");
  }
}

export default InvestmentTrust;
