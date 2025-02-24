class SMSF {
  section() {
    cy.visit("http://ec2-54-66-20-19.ap-southeast-2.compute.amazonaws.com/");
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
    //SMSF 1 Card
    cy.wait(2000);
    cy.get(":nth-child(1) > .py-4")
      .should("be.visible")
      .within(() => {
        cy.contains("QA Engr");
        cy.get("img");

        cy.get(
          "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
        ).click();

        //Cards
      });
    //Header
    cy.get(".modal-header");
    cy.get(".btn-close").should("be.visible");
    cy.get(".table").within(() => {
      //Card Slection :
      cy.contains("No#").should("be.visible");
      cy.get("tbody > tr > :nth-child(1)").contains("1").should("be.visible");

      cy.contains("Fund Name").should("be.visible");
      cy.get("#fundName").clear().type("QA Engr").should("be.visible");

      cy.contains("ABN").should("be.visible");
      cy.get("#ABN").clear().type("83").should("be.visible");

      cy.contains("Registered Office").should("be.visible");
      cy.get("#registeredOffice").clear().type("Testing").should("be.visible");

      cy.contains("Place Of Business").should("be.visible");
      cy.get("#placeOfBusiness")
        .clear()
        .type("Automation")
        .should("be.visible");

      cy.contains("Establishment Date").should("be.visible");
      cy.get("#establishmentDate").clear().type("21-2-1987");

      cy.contains("Trustee Type").should("be.visible");
      cy.get("#trusteeType").select("Individual");

      cy.contains("Trustee Name").should("be.visible");
      cy.get("#trusteeName").clear().type("QA Person");

      cy.contains("ACN").should("be.visible");
      cy.get("#ACN").clear().type("89");

      cy.contains("Name of Accountant").should("be.visible");
      cy.get("#nameOfAccountant").clear().type("Automation Engr");
    });

    cy.contains("Trustee Type").should("be.visible");
    cy.get("#trusteeType").select("Corporate");

    cy.get("#button-addon2").click();
    cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
      () => {
        cy.contains("Directors");

        cy.contains("How many directors does the Corporate Trustee have :");
        cy.get("#NumberOfDirectors").clear().type("1");

        cy.get(
          ".px-4 > .col-md-12 > .row > .mt-4 > .table-responsive > .table"
        ).within(() => {
          cy.contains("No#");
          cy.contains("1");

          cy.contains("Director Name");
          cy.get("#directorName0").clear().type("Automation Tester ");
        });
        cy.get("form > .modal-footer").within(() => {
          cy.contains("Close").should("be.visible");
          cy.contains("Submit").should("be.visible").click();
        });
      }
    );

    cy.contains("Bare Trust").should("be.visible");
    cy.get("tbody > tr > :nth-child(10)").within(() => {
      cy.get(".radioButton2").contains("Yes").click();
      cy.get("#button-addon2").click();
    });

    cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
      () => {
        cy.contains("Directors Of Bare Trust");
        cy.contains("How many directors does the bare trust have ?");
        cy.get("#NumberOfDirectors").clear().type("1");

        cy.get(
          ".px-4 > .col-md-12 > .row > .mt-4 > .table-responsive > .table"
        ).within(() => {
          cy.contains("No#");

          cy.contains("Bare Trustee Name");
          cy.get("#bareTrusteeName").clear().type("QA Person");

          cy.contains("ACN");
          cy.get(":nth-child(3) > #ACN").clear().type("324");

          cy.contains("Director 1 Name");
          cy.get("#directorName0").select("Automation Tester");
        });

        cy.get("form > .modal-footer").within(() => {
          cy.contains("Close").should("be.visible");
          cy.contains("Submit").should("be.visible").click();
        });
      }
    );

    //Footer

    cy.contains("Close").should("be.visible");
    cy.contains("Submit").should("be.visible").click();

    //InputBox;
    cy.get("#clientSMSFDetails").should("not.have.value", ""); // Ensure it's not empty

    //First Card End here

    //SMSF Accumulation Details:
    cy.get(":nth-child(2) > .py-4").within(() => {
      cy.contains("SMSF Accumulation Details");
      cy.get("img");
      cy.contains("Admin");
      cy.get(
        ".mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
      )
        .click()
        .should("be.visible");
    });
    //SMSF Investment Loan Card Header
    cy.get(".modal-header").within(() => {
      cy.contains("SMSF Accumulation Details");
      cy.get(".btn-close").should("be.visible");
    });

    cy.get(".modal-body").within(() => {
      cy.contains("Member's of SMSF QA Engr").should("be.visible");
    });

    cy.get(".css-1xc3v61-indicatorContainer").click();
    cy.get("#react-select-2-option-0").click();
    //SMSF Investment Loan Card Section

    cy.get(".table").within(() => {
      cy.contains("Member");
      cy.get("tbody > tr > :nth-child(1)");
      cy.contains("Admin");

      cy.contains("Accumulation Benefits");

      cy.contains("Contributions");
      cy.get(":nth-child(3) > .d-flex > .form-check > .radioButton2")
        .contains("Yes")
        .click();

      cy.contains("Nominated Beneficiaries");
      cy.get(":nth-child(4) > .d-flex > .form-check > .radioButton2")
        .contains("Yes")
        .click();
    });

    //Accumulation Benefits Inner Card

    cy.get(".mb-3").within(() => {
      cy.get("#button-addon2").click();
    });

    cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
      () => {
        cy.contains("Accumulations Benefits");

        cy.contains("Member");
        cy.contains("Admin");

        cy.contains("Commencement Date");
        cy.get("#commencementDate").clear().type("21-2-1965");

        cy.contains("Eligible Service Date");
        cy.get("#eligibleServiceDate").clear().type("3-12-1947");

        cy.contains("Tax Free component");
        cy.get("#taxFreeComponent").clear().type("$2");

        cy.contains("Current Balance");
        cy.get("#currentBalance").clear().type("$32");

        cy.contains("Taxable component");
        cy.get("#taxableComponent").should("not.have.value", "");

        cy.contains("Restricted non preserved");
        cy.get("#restrictedNonPreserved").clear().type("$2");

        cy.contains("Unrestricted non preserved");
        cy.get("#unRestrictedNonPreserved").clear().type("$3");

        cy.contains("Preserved amount");
        cy.get("#preservedAmount").should("not.have.value", "");

        cy.contains("Close");
        cy.contains("Submit").click();
      }
    );

    //Contributions Inner Card
    cy.get(":nth-child(3) > .d-flex > #button-addon2").click();

    cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
      () => {
        cy.contains("Contributions");

        cy.contains("How many financial years to Admin want to display?");
        cy.get(".flex-shrink-0 > #NumberOfMap").clear().type(1);
        cy.contains("Starting From");
        cy.get('input[name="startingYear"]', { force: true })
          .filter(":visible")
          .clear()
          .type("2012"); // Enter the desired date

        cy.contains("No#");
        cy.contains("1");

        cy.contains("Financial Years");
        cy.get(".pt-3").contains("2012/2013");

        Cypress.on("uncaught:exception", (err, runnable) => {
          // returning false here prevents Cypress from
          // failing the test
          return false;
        });

        cy.contains("Employer Contributions");
        cy.get("#employerContributions0").clear().type("$2");

        cy.contains("Concessional (Include. Salary Sac)");
        cy.get("#concessional0").clear().type("$32");

        cy.contains("Total Concessional Contributions");
        cy.get("#totalConcessional0").should("not.have.value", "");

        cy.contains("Non-Concessional Contributions");
        cy.get("#nonConcessionalContributions0").clear().type("$2");

        cy.contains("Close");
        cy.contains("Submit").click();
      }
    );

    //Nominated Beneficiaries Inner Card
    cy.get(":nth-child(4) > .d-flex > #button-addon2").click();

    cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
      () => {
        cy.contains("Beneficiaries");

        cy.contains("How many beneficiaries do Admin have :");
        cy.get("#NumberOfMap").clear().type("2");

        cy.contains("No#");
        cy.contains("1");
        cy.contains("2");

        cy.contains("Nomination Type");
        cy.get("#nominationType0").select("Binding (Non-Lapsing)");

        Cypress.on("uncaught:exception", (err, runnable) => {
          // returning false here prevents Cypress from
          // failing the test
          return false;
        });

        cy.contains("DOB");
        cy.get("#DOB0").clear().type("21-2-1965");

        cy.contains("Beneficiary Name");
        cy.get("#beneficiaryName0").clear().type("32");

        cy.contains("Relationship Status");
        cy.get("#relationshipStatus0").select("Child");

        cy.contains("Share of Benefit");
        cy.get("#shareBenefit0").clear().type("2.00%");

        cy.contains("Share of Benefit must be 100%");

        cy.get("#nominationType1").select(
          "Legal Personal Representative (Your Estate)"
        );
        cy.get("#DOB1");
        cy.get("#beneficiaryName1");
        cy.get("#relationshipStatus1").contains("N/A");
        cy.get("#shareBenefit1");

        cy.contains("Close");
        cy.contains("Submit").click();
      }
    );

    //SMSF Accumulation Details Card Footer

    cy.contains("Close");
    cy.get(".modal-footer > .bgColor").filter(":visible").click();

    cy.get("#clientSMSFAccumulationDetails").should("not.have.value", "");

    //SMSF Pension Phase
    cy.get(":nth-child(3) > .py-4").within(() => {
      cy.contains("SMSF Pension Phase");
      cy.get("img");
      cy.contains("Admin");
      cy.get(
        ".mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
      )
        .click()
        .should("be.visible");
    });
    //SMSF Investment Loan Card Header
    cy.get(".modal-header").within(() => {
      cy.contains("SMSF Pension Phase");
      cy.get(".btn-close").should("be.visible");
    });

    cy.get(".modal-body").within(() => {
      cy.contains("Member's of SMSF QA Engr").should("be.visible");
    });

    cy.get(".css-1xc3v61-indicatorContainer").click();
    cy.get("#react-select-3-option-0").click();
    //SMSF Investment Loan Card Section

    cy.get(".table").within(() => {
      cy.contains("Member");
      cy.get("tbody > tr > :nth-child(1)");
      cy.contains("Admin");

      cy.contains("Pension Benefits");
      cy.get("#button-addon2").click();
    });

    cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
      () => {
        cy.contains("Pension Benefits Details");
        cy.contains("How many Pension Benefits Details does Admin have :");
        cy.get("#NumberOfMap").clear().type("1");

        cy.contains("No#");
        cy.contains("1");

        cy.contains("Pension Payment");
        cy.get("#pensionPayment0").clear().type("345");

        cy.contains("Pension Type");
        cy.get("#pensionType0").select("TTR");
      }
    );

    cy.contains("Pension Benefits");
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-body > form > :nth-child(1) > :nth-child(2) > .row > .mt-4 > .table-responsive > .table > tbody > tr > :nth-child(2) > .mb-3'
    ).within(() => {
      cy.get("#button-addon2").click();
    });
    //Pension Benefits Card

    cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
      cy.contains("Pension Benefits");

      cy.contains("No#");
      cy.contains("1");

      cy.contains("Commencement Date");
      cy.get("#commencementDate0").clear().type("21-2-1965");

      cy.contains("Original Purchase Price");
      cy.get("#originalPurchaseDate0").clear().type("$3995");

      cy.contains("Eligible Service Date");
      cy.get("#eligibleServiceDate0").clear().type("1-5-2005");

      cy.contains("Tax Free");
      cy.get("#taxFree0").clear().type("3.00%");

      cy.contains("Current Balance");
      cy.get("#currentBalance0").clear().type("$3995");

      cy.contains("Tax Free component");
      cy.get("#taxFreeComponent0").should("not.have.value", "");

      cy.contains("Taxable component");
      cy.get("#taxableComponent0").should("not.have.value", "");

      cy.contains("Deductible amount");
      cy.get("#deductibleAmount0").clear().type("$987");

      cy.contains("Lumpsum Withdrawal Taken");
      cy.get("#LumpsumWithdrawalTaken0").clear().type("$345");

      cy.contains("Close");
      cy.contains("Submit").click();
    });

    cy.contains("Nominated Beneficiaries");
    cy.get(".tableYesLabel > span").contains("Yes").click();

    cy.get(".d-flex > #button-addon2").click();

    cy.get(":nth-child(8) > .modal-dialog > .modal-content").within(() => {
      cy.contains("Beneficiaries");

      cy.contains("How many beneficiaries do Admin have :");
      cy.get(".d-flex > div > #NumberOfMap").clear().type(2);

      cy.contains("No#");

      cy.contains("1");
      cy.contains("2");

      cy.contains("Nomination Type");
      cy.get("#nominationType0").select("Binding (Non-Lapsing)");

      Cypress.on("uncaught:exception", (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false;
      });

      cy.contains("DOB");
      cy.get("#DOB0").clear().type("21-2-1965");

      cy.contains("Beneficiary Name");
      cy.get("#beneficiaryName0").clear().type("32");

      cy.contains("Relationship Status");
      cy.get("#relationshipStatus0").select("Child");

      cy.contains("Share of Benefit");
      cy.get("#shareBenefit0").clear().type("2.00%");

      cy.contains("Share of Benefit must be 100%");

      cy.get("#nominationType1").select(
        "Legal Personal Representative (Your Estate)"
      );
      cy.get("#DOB1");
      cy.get("#beneficiaryName1");
      cy.get("#relationshipStatus1").contains("N/A");
      cy.get("#shareBenefit1");

      cy.contains("Close");
      cy.contains("Submit").click();
    });
    cy.contains("Close");
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer > .bgColor'
    )
      .filter(":visible")
      .click();

    cy.get("#pensionBenefitsTotal0").should("not.have.value", "");

    cy.get(".modal-content")
      .filter(":visible")
      .within(() => {
        cy.contains("Close").filter(":visible");
        cy.get(".modal-footer > .bgColor")
          .filter(":visible")
          .contains("Submit")
          .click();
      });

    cy.get("#clientSMSFPensionPhase").should("not.have.value", "");

    //SMSF Bank Accounts

    cy.get(":nth-child(4) > .py-4").within(() => {
      cy.contains("SMSF Bank Accounts");
      cy.get("img");
      cy.contains("Admin");
      cy.get(
        "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
      ).click();
    });

    cy.get(".modal-content").within(() => {
      cy.contains("SMSF Bank Accounts");
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
        cy.contains("Admin_SMSF Bank Accounts Detail");
        cy.contains("How many SMSF Bank Accounts Detail does Admin have :");
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
    cy.get("#clientCurrentBalance").should("not.have.value", "");
    cy.contains("Close");
    cy.get(".modal-footer > .bgColor")
      .contains("Submit")
      .should("be.visible")
      .click();

    cy.get("#clientSMSFBank").should("not.have.value", "");

    //SMSF Term Deposits
    cy.get(":nth-child(5) > .py-4").within(() => {
      cy.contains("SMSF Term Deposits");
      cy.get("img");
      cy.contains("Admin");
      cy.get(
        "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
      ).click();
    });

    cy.get(".modal-content").within(() => {
      cy.contains("SMSF Term Deposits");
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
        cy.contains("Admin_SMSF Term Deposits Detail");
        cy.contains("How many SMSF Term Deposits Detail does Admin have :");
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
    cy.get("#clientCurrentBalance").should("not.have.value", "");

    cy.contains("Close");
    cy.get(".modal-footer > .bgColor")
      .contains("Submit")
      .should("be.visible")
      .click();

    cy.get("#clientSMSFTermDeposits").should("not.have.value", "");

    //SMSF Australian Shares/ETFs

    cy.get(":nth-child(6) > .py-4").within(() => {
      cy.contains("SMSF Australian Shares/ETFs");
      cy.get("img");
      cy.contains("Admin");
      cy.get(
        "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
      ).click();
    });

    cy.get(".modal-content").within(() => {
      cy.contains("SMSF Australian Shares/ETFs");
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
        cy.contains("Admin_SMSF Australian Shares/ETFs Detail");
        cy.contains(
          "How many SMSF Australian Shares/ETFs Detail does Admin have :"
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
    cy.get("#clientCurrentBalance").should("not.have.value", "");

    cy.contains("Cost Base");
    cy.get("#clientCostBaseTemp").should("not.have.value", "");

    cy.contains("Close");
    cy.get(".modal-footer > .bgColor")
      .contains("Submit")
      .should("be.visible")
      .click();

    cy.get("#clientSMSFAustralianShares").should("not.have.value", "");

    //SMSF Platform Investments
    cy.get(":nth-child(7) > .py-4").within(() => {
      cy.contains("SMSF Platform Investments");
      cy.get("img");
      cy.contains("Admin");
      cy.get(
        "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
      ).click();
    });

    cy.get(".modal-content").within(() => {
      cy.contains("SMSF Platform Investments");
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
        cy.contains("Admin_SMSF Platform Investments Detail");
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

    cy.get(".css-1xc3v61-indicatorContainer").click();

    cy.get("#react-select-4-option-0").click();

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

    cy.get("#clientCurrentBalance").should("not.have.value", "");

    cy.contains("Cost Base");
    cy.get("#clientCostBaseTemp").should("not.have.value", "");

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

    // End SMSF Platform Investments

    //SMSF Investment Loan:
    cy.get(":nth-child(8) > .py-4").within(() => {
      cy.contains("SMSF Investment Loan");
      cy.get("img");
      cy.contains("Admin");
      cy.get(
        ".mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
      )
        .click()
        .should("be.visible");
    });
    //SMSF Investment Loan Card Header
    cy.get(".modal-header").within(() => {
      cy.contains("SMSF Investment Loan");
      cy.get(".btn-close").should("be.visible");
    });

    cy.get(".modal-body").within(() => {
      cy.contains("members").should("be.visible");
    });

    cy.get(".css-1xc3v61-indicatorContainer").click();
    cy.get("#react-select-2-option-0").click();
    //SMSF Investment Loan Card Section

    cy.get(".table").within(() => {
      cy.contains("members");
      cy.get("tbody > tr > :nth-child(1)");
      cy.contains("Admin");

      cy.contains("Lender");
      cy.get(":nth-child(2) > .form-select").select("Testing");

      cy.contains("Loan Balance");
      cy.get("#loanBalance").clear().type("$987").blur();

      cy.contains("Loan Type");
      cy.get(":nth-child(4) > .form-select").select("i/only");

      cy.contains("Repayments Amount");
      cy.get("#repaymentsAmount").clear().type("$2022").blur();

      cy.contains("Frequency");
      cy.get(":nth-child(6) > .form-select").select("Weekly");

      cy.contains("Annual Repayments");
      cy.get("#annualRepayments").clear().type("2022").blur();
      cy.get("#serviceFeeType").select("Weekly");

      cy.contains("Interest Rate (p.a)");
      cy.get("#interestRate").clear().type("2022").blur();

      cy.contains("Loan Term");
      cy.get(":nth-child(9) > .form-select").select("Year 19");

      cy.contains("Loan Term Remaining");
      cy.get(":nth-child(10) > .form-select").select("Year 22");

      cy.contains("Deductible Loan Amount");
      cy.get("#deductibleLoanAmount").clear().type("33.00%").blur();
    });

    //SMSF Investment Loan Card Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientSMSFInvestmentLoan").should("not.have.value", "");

    //Other Investments:
    cy.get(":nth-child(10) > .py-4").within(() => {
      cy.contains("Other Investments");
      cy.get("img");
      cy.contains("Admin");
      cy.get(
        ".mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
      )
        .click()
        .should("be.visible");
    });
    //Other Investments Card Header
    cy.get(".modal-header").within(() => {
      cy.contains("Other Investments");
      cy.get(".btn-close").should("be.visible");
    });

    //Other Investments Card Section

    cy.get(".table").within(() => {
      cy.contains("Name of Investment");
      cy.get("#investmentName").clear().type("Automation Tester").blur();

      cy.contains("Current Value");
      cy.get("#currentValue").clear().type("$345").blur();

      cy.contains("Cost Base");
      cy.get("#costBase").clear().type("$422").blur();
    });

    //Other Investments Card Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientSMSFOtherInvestment").should("not.have.value", "");

    //SMSF Investment Properties
    cy.get(":nth-child(9) > .py-4").within(() => {
      cy.contains("SMSF Investment Properties");
      cy.get("img");
      cy.contains("Total Market Value");
      cy.contains("Total Loans");

      cy.get(
        ".mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
      ).click({ multiple: true, force: true });
    });
    //Header
    cy.get(".modal-header").within(() => {
      cy.contains("SMSF Investment Properties");
      cy.get(".btn-close");
    });

    cy.get(".modal-body").within(() => {
      cy.contains("How many SMSF Investment Properties does Admin have :");
    });

    cy.get("#NumberOfMap").clear().type("1");

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
    cy.get(":nth-child(7) > .mb-3")
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
    cy.get("#clientSMSFInvestmentProperties").should("not.have.value", "");
    cy.contains("Total Loans");
    cy.get("#partnerSMSFInvestmentProperties").should("not.have.value", "");

    // Expense Section End HEre
  }
}

export default SMSF;
