class SMSF {
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

    //SMSF
    // cy.get(".pb-4 > :nth-child(1) > .QuestionIcon > .img-fluid").click();

    // cy.get(".modal-header").within(() => {
    //   cy.contains("Questions").should("be.visible");
    //   cy.get(".btn-close").should("be.visible");
    // });

    // //Body
    // cy.wait(1000);
    // cy.get(':nth-child(1) > .d-flex > .border')
    //   .click()
    //   .within(() => {
    //     cy.get("img").should("be.visible");
    //     cy.contains(
    //       "Does your SMSF have any Money invested in Term Deposits?"
    //     ).should("be.visible");
    //   });

    //   cy.wait(1000);
    // cy.get(':nth-child(2) > .d-flex > .border')
    //   .click()
    //   .within(() => {
    //     cy.get("img").should("be.visible");
    //     cy.contains(
    //       "Does your SMSF have any Money invested Australian Shares?"
    //     ).should("be.visible");
    //   });

    //   cy.wait(1000);
    // cy.get(':nth-child(3) > .d-flex > .border')
    //   .click()
    //   .within(() => {
    //     cy.get("img").should("be.visible");
    //     cy.contains(
    //       "Do you SMSF have any Money invested in Managed Funds or via a Platform?"
    //     ).should("be.visible");
    //   });

    //   cy.wait(1000);
    // cy.get(':nth-child(4) > .d-flex > .border')
    //   .click()
    //   .within(() => {
    //     cy.get("img").should("be.visible");
    //     cy.contains(
    //       "Does your SMSF have an Investment Loan (LOC) attached to any of its investments?"
    //     ).should("be.visible");
    //   });

    //   cy.wait(1000);
    // cy.get(':nth-child(5) > .d-flex > .border')
    //   .click()
    //   .within(() => {
    //     cy.get("img").should("be.visible");
    //     cy.contains(
    //       "Does your SMSF have any investment Properties?"
    //     ).should("be.visible");
    //   });

    //   cy.wait(1000);
    // cy.get(':nth-child(6) > .d-flex > .border')
    //   .click()
    //   .within(() => {
    //     cy.get("img").should("be.visible");
    //     cy.contains(
    //       "Does your SMSF have any money in Pension Phase?"
    //     ).should("be.visible");
    //   });

    //     cy.wait(1000);
    //   cy.get(':nth-child(7) > .d-flex > .border')
    //    .click()
    //    .within(() => {
    //      cy.get("img").should("be.visible");
    //      cy.contains(
    //        "Other Investment"
    //      ).should("be.visible");
    //      });

    cy.get(
      '[statusstep="64"] > .ant-steps-item-container > .ant-steps-item-icon > .ant-steps-icon > .rounded-circle'
    ).click();
    // //SMSF 1 Card
    // cy.wait(2000);
    // cy.get(":nth-child(1) > .py-4")
    //   .should("be.visible")
    //   .within(() => {
    //     cy.contains('QA Engr')
    //     cy.get("img");

    //     cy.get(
    //       "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
    //     ).click();

    //     //Cards
    //   });
    // //Header
    // cy.get(".modal-header");
    // cy.get(".btn-close").should("be.visible");
    // cy.get(".table").within(() => {
    //   //Card Slection :
    //   cy.contains("No#").should("be.visible");
    //   cy.get("tbody > tr > :nth-child(1)").contains("1").should("be.visible");

    //   cy.contains("Fund Name").should("be.visible");
    //   cy.get("#fundName").clear().type("QA Engr").should("be.visible");

    //   cy.contains("ABN").should("be.visible");
    //   cy.get("#ABN").clear().type("83").should("be.visible");

    //   cy.contains("Registered Office").should("be.visible");
    //   cy.get("#registeredOffice").clear().type("Testing").should("be.visible");

    //   cy.contains("Place Of Business").should("be.visible");
    //   cy.get("#placeOfBusiness")
    //     .clear()
    //     .type("Automation")
    //     .should("be.visible");

    //   cy.contains("Establishment Date").should("be.visible");
    //   cy.get("#establishmentDate").clear().type("21-2-1987");

    //   cy.contains("Trustee Type").should("be.visible");
    //   cy.get("#trusteeType").select("Individual");

    //   cy.contains("Trustee Name").should("be.visible");
    //   cy.get("#trusteeName").clear().type("QA Person");

    //   cy.contains("ACN").should("be.visible");
    //   cy.get("#ACN").clear().type("89");

    //   cy.contains("Name of Accountant").should("be.visible");
    //   cy.get("#nameOfAccountant").clear().type("Automation Engr");
    // });

    // cy.contains("Trustee Type").should("be.visible");
    // cy.get("#trusteeType").select("Corporate");

    // cy.get("#button-addon2").click();
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

    // cy.contains("Bare Trust").should("be.visible");
    // cy.get("tbody > tr > :nth-child(10)").within(() => {
    //   cy.get(".radioButton2").contains("Yes").click();
    //   cy.get("#button-addon2").click();
    // });

    // cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
    //   () => {
    //     cy.contains("Directors Of Bare Trust");
    //     cy.contains("How many directors does the bare trust have ?");
    //     cy.get("#NumberOfDirectors").clear().type("1");

    //     cy.get(
    //       ".px-4 > .col-md-12 > .row > .mt-4 > .table-responsive > .table"
    //     ).within(() => {
    //       cy.contains("No#");

    //       cy.contains("Bare Trustee Name");
    //       cy.get("#bareTrusteeName").clear().type("QA Person");

    //       cy.contains("ACN");
    //       cy.get(":nth-child(3) > #ACN").clear().type("324");

    //       cy.contains("Director 1 Name");
    //       cy.get('#directorName0').select("Automation Tester");
    //     });

    //     cy.get("form > .modal-footer").within(() => {
    //       cy.contains("Close").should("be.visible");
    //       cy.contains("Submit").should("be.visible").click();
    //     });
    //   }
    // );

    // //Footer

    // cy.contains("Close").should("be.visible");
    // cy.contains("Submit").should("be.visible").click();

    // //InputBox;
    // cy.get("#clientSMSFDetails").should("not.have.value", ""); // Ensure it's not empty

    //SMSF Bank Accounts

    // cy.get(":nth-child(4) > .py-4").within(() => {
    //   cy.contains("SMSF Bank Accounts");
    //   cy.get("img");
    //   cy.contains("Admin");
    //   cy.get(
    //     "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
    //   ).click();
    // });

    // cy.get(".modal-content").within(() => {
    //   cy.contains("SMSF Bank Accounts");
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
    //     cy.contains("Admin_SMSF Bank Accounts Detail");
    //     cy.contains("How many SMSF Bank Accounts Detail does Admin have :");
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

    // cy.get("#clientSMSFBank").should("not.have.value", "");

    // //SMSF Term Deposits
    // cy.get(":nth-child(5) > .py-4").within(() => {
    //   cy.contains("SMSF Term Deposits");
    //   cy.get("img");
    //   cy.contains("Admin");
    //   cy.get(
    //     "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
    //   ).click();
    // });

    // cy.get(".modal-content").within(() => {
    //   cy.contains("SMSF Term Deposits");
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
    //     cy.contains("Admin_SMSF Term Deposits Detail");
    //     cy.contains("How many SMSF Term Deposits Detail does Admin have :");
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

    // cy.contains('Close')
    // cy.get(".modal-footer > .bgColor")
    //   .contains("Submit")
    //   .should("be.visible")
    //   .click();

    // cy.get("#clientSMSFTermDeposits").should("not.have.value", "");

    //SMSF Australian Shares/ETFs

    //     cy.get(':nth-child(6) > .py-4').within(() => {
    //       cy.contains("SMSF Australian Shares/ETFs");
    //       cy.get("img");
    //       cy.contains("Admin");
    //       cy.get(
    //         "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
    //       ).click();
    //     });

    //     cy.get(".modal-content").within(() => {
    //       cy.contains("SMSF Australian Shares/ETFs");
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
    //         cy.contains("Admin_SMSF Australian Shares/ETFs Detail");
    //         cy.contains("How many SMSF Australian Shares/ETFs Detail does Admin have :");
    //         cy.get("#NumberOfMap").clear().type(1);
    //       }
    //     );
    //     //Inner Table
    //     cy.get(
    //       '[style="display: block;"] > .modal-dialog > .modal-content > .modal-body > form > :nth-child(1) > .col-md-12 > .row > .mt-4'
    //     ).within(() => {
    //       cy.contains("No#");
    //       cy.contains("1");

    //       cy.contains("ASX Code");
    //       cy.get('#ASXCode0').clear().type('BML.AX');
    // cy.wait(2000)
    //       cy.contains("Company Name");
    //       cy.get('#companyName0').should("not.have.value", "");

    //       cy.contains("Shares Price");
    //       cy.get('#sharePrice0').should("not.have.value", "");

    //       cy.contains("Number of Shares");
    //       cy.get('#shares0').clear().type("45");

    //       cy.contains("Cost base");
    //       cy.get('#costBase0').clear().type("$143");

    //       cy.contains("Current Balance");
    //       cy.get('#currentBalance0').should("not.have.value", "");
    //     });
    //     cy.get(
    //       '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    //     ).within(() => {
    //       cy.contains("Close").should("be.visible");
    //       cy.contains("Submit").should("be.visible").click();
    //     });
    //     cy.get("#clientCurrentBalance").should("not.have.value", "");

    //     cy.contains('Cost Base')
    //     cy.get('#clientCostBaseTemp').should("not.have.value", "")

    //     cy.contains("Close");
    //     cy.get(".modal-footer > .bgColor")
    //       .contains("Submit")
    //       .should("be.visible")
    //       .click();

    //       cy.get('#clientSMSFAustralianShares').should("not.have.value", "");

    // //SMSF Platform Investments
    // cy.get(':nth-child(7) > .py-4').within(() => {
    //   cy.contains("SMSF Platform Investments");
    //   cy.get("img");
    //   cy.contains("Admin");
    //   cy.get(
    //     "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
    //   ).click();
    // });

    // cy.get(".modal-content").within(() => {
    //   cy.contains("SMSF Platform Investments");
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
    //     cy.contains("Admin_SMSF Platform Investments Detail");
    //     cy.contains(
    //       "How many Platforms does Admin have :"
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

    //   cy.contains("Platform Name");
    //   cy.get('#platformName0').select("For Testing Purpose");
   
    //   cy.contains("Account Number");
    //   cy.get('#accountNumber0').clear().type("45")

    

    //   cy.contains("Portfolio Cost Base");
    //   cy.get('#totalPortfolioCost0').clear().type("$45");

     
     
    // });

    // cy.contains("Annual Advice Service Fee");
    // cy.get('#serviceFee0').clear().type("$3")
    // cy.get('#serviceFeeType0').select('Weekly');

    // cy.contains("Portfolio Value");
    // cy.get("#button-addon2").click();
    // // cy.get("#sharePrice0").should("not.have.value", "");


    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    // ).within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });
    // cy.get("#clientCurrentBalance").should("not.have.value", "");

    // cy.contains("Cost Base");
    // cy.get("#clientCostBaseTemp").should("not.have.value", "");

    // cy.contains("Close");
    // cy.get(".modal-footer > .bgColor")
    //   .contains("Submit")
    //   .should("be.visible")
    //   .click();

    // cy.get("#clientSMSFAustralianShares").should("not.have.value", "");

    //Not Completed Becauseof some error in Actual Project 

 //SMSF Investment Loan:
 cy.get(':nth-child(8) > .py-4').within(() => {
  cy.contains("SMSF Investment Loan");
  cy.get("img");
  cy.contains("Admin");
  cy.get(
    ".mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
  )
    .click()
    .should("be.visible");
});
//Will Card Header
cy.get(".modal-header").within(() => {
  cy.contains("SMSF Investment Loan");
  cy.get(".btn-close").should("be.visible");
});

cy.get(".modal-body").within(() => {
  cy.contains("members").should("be.visible");
});

cy.get(".css-1xc3v61-indicatorContainer").click();
cy.get("#react-select-2-option-0").click();
//Will Card Section

cy.get(".table").within(() => {
  cy.contains("No#");
  cy.get("tbody > tr > :nth-child(1)");
  cy.contains("Admin");

  cy.contains("Year set up");
  cy.get("#yearSetUp").clear().type("2022").blur();

  cy.get(":nth-child(3) > .form-check > .radioButton2")
    .contains("Yes")
    .click();

  cy.contains("Enduring Guardianship").should("be.visible");
  cy.get(":nth-child(5) > .form-check > .radioButton2")
    .contains("Yes")
    .click();

  cy.contains("Testamentary Trust").should("be.visible");
  cy.get(":nth-child(6) > .form-check > .radioButton2")
    .contains("Yes")
    .click();
});

cy.contains("Executor").should("be.visible");
cy.get(".d-flex > .btn").click();
cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
  () => {
    cy.contains("Executor");

    cy.contains("Description");
    cy.get(".col-md-12 > .form-control").type(
      "This Text is written for Automation Testing Purpose"
    );

    cy.contains("Close");
    cy.contains("Submit").click();
  }
);

cy.contains("Any specific estate planning requirements/needs?").should(
  "be.visible"
);
cy.get(":nth-child(7) > .form-check > .radioButton2")
  .contains("Yes")
  .click();
cy.get("#button-addon2").click();

cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
  () => {
    cy.contains("Estate Planning");

    cy.contains("Description");
    cy.get(".col-md-12 > .form-control").type(
      "This Text is written for Automation Testing Purpose"
    );

    cy.contains("Close");
    cy.contains("Submit").click();
  }
);

//Wills Card Footer

cy.contains("Close").should("be.visible");
cy.contains("Submit").should("be.visible").click();

cy.get("#clientwill").should("not.have.value", "");

     

   
      
     
   
  }
}

export default SMSF;
