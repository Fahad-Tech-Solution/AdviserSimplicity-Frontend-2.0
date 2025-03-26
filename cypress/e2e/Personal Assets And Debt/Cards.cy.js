class PersonalAssetsAndDebt {
  section() {
    cy.visit(Cypress.env("CashFlowUrl"));
    cy.get(
      ":nth-child(6) > :nth-child(7) > :nth-child(1) > div > button"
    ).click();
    cy.get("#popover > :nth-child(3)").click();
    cy.get(
      '[statusstep="24"] > .ant-steps-item-container > .ant-steps-item-icon > .ant-steps-icon > .rounded-circle'
    ).click();

    // // //Select Question's

    // cy.get(":nth-child(4) > .col-md-12 > .btn-outline").contains("Back");
    // cy.get(":nth-child(4) > .col-md-12 > .bgColor").contains("Next");
    // cy.get(".img-fluid").click();

    // cy.get(".modal-header").within(() => {
    //   cy.contains("Questions");
    //   cy.get(".btn-close").should("be.visible");
    // });
    // cy.wait(3000);
    // cy.get(".modal-body").within(() => {
    //   cy.get(":nth-child(1) > .d-flex > .border")
    //     .click()
    //     .within(() => {
    //       cy.contains("Family Home");
    //       cy.get("img");
    //     });
    //   cy.wait(3000);
    //   cy.get(":nth-child(2) > .d-flex > .border")
    //     .click()
    //     .within(() => {
    //       cy.contains("Cars");
    //       cy.get("img");
    //     });
    //   cy.wait(3000);
    //   cy.get(":nth-child(3) > .d-flex > .border")
    //     .click()
    //     .within(() => {
    //       cy.contains("Household");
    //       cy.get("img");
    //     });
    //   cy.wait(3000);
    //   cy.get(":nth-child(4) > .d-flex > .border")
    //     .click()
    //     .within(() => {
    //       cy.contains("Boat");
    //       cy.get("img");
    //     });
    //   cy.wait(3000);
    //   cy.get(":nth-child(5) > .d-flex > .border")
    //     .click()
    //     .within(() => {
    //       cy.contains("Caravan");
    //       cy.get("img");
    //     });
    //   cy.wait(3000);
    //   cy.get(":nth-child(6) > .d-flex > .border")
    //     .click()
    //     .within(() => {
    //       cy.contains("Other Assets");
    //       cy.get("img");
    //     });
    //   cy.wait(3000);
    //   cy.get(":nth-child(7) > .d-flex > .border")
    //     .click()
    //     .within(() => {
    //       cy.contains("Personal Debt");
    //       cy.get("img");
    //       cy.get('svg[viewBox="0 0 512 512"]').trigger("mouseover");
    //     });
    // });
    // cy.contains("Close").should("be.visible");
    // cy.get(".modal-footer > .bgColor").contains("Submit").click();

    // End Select Question's
    cy.wait(2000);

    //Own A Family Home

    cy.get(":nth-child(1) > .py-4").within(() => {
      cy.contains("Own a Family Home");
      cy.get("img");
      cy.contains("Market Value");
      cy.contains("Loan Balance");
    });
    cy.get(
      ":nth-child(1) > .py-4 > :nth-child(3) > .col-12 > .d-flex > .mb-0"
    ).click();
    cy.get(".modal-content").within(() => {
      cy.contains("Own a Family Home");
      cy.get(".btn-close");
    });

    cy.get(".table").within(() => {
      cy.contains("Address");
      cy.get("#address");

      cy.contains("Current Value –");
      cy.get("#currentValue")
        .should("be.visible")
        .clear()
        .type("77")
        .should("have.value", "$77");

      cy.contains("Cost base").should("be.visible");

      cy.get("#costBase")
        .should("be.visible")
        .clear()
        .type("77")
        .should("have.value", "$77");

      cy.contains("Client Ownership");
      cy.get("#clientOwnership")
        .should("be.visible")
        .clear()
        .type("77")
        .blur()
        .should("have.value", "77.00%");

      cy.contains("Partner Ownership");
      cy.get("#partnerOwnership")
        .should("be.visible")
        .clear()
        .type("77")
        .blur()
        .should("have.value", "77.00%");

      cy.contains("Loan Attached");
      cy.get(".tableYesLabel > span").click();
      cy.get("#button-addon2").click();
    });

    //Loan Attachment Inner Card
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    ).within(() => {
      cy.contains("Home Loan");
      //cy.get('[style="display: block;"] > .modal-dialog > .modal-content > .modal-header > .btn-close').should('be.visible')
    });

    cy.get(".mt-4 > .table-responsive > .table").within(() => {
      cy.contains("Lender").should("be.visible");
      cy.get('[style="width: 150px;"] > .form-select').select("Testing");

      cy.contains("Loan Balance").should("be.visible");
      cy.get("#loanBalance").clear().type("43").should("have.value", "$43");

      cy.contains("Loan Type").should("be.visible");
      cy.get(":nth-child(3) > .form-select").select("i/only");

      cy.contains("Repayments Amount").should("be.visible");
      cy.get("#repaymentsAmount")
        .clear()
        .type("543")
        .should("have.value", "$543");

      cy.contains("Frequency").should("be.visible");
      cy.get('[style="width: 200px;"] > .form-select').select("Weekly");

      cy.contains("Annual Repayments").should("be.visible");
      cy.get(":nth-child(6) > #annualRepayments")
        .clear()
        .type("543")
        .should("have.value", "$543");

      cy.contains("Interest Rate (p.a)").should("be.visible");
      cy.get("#interestRatePA")
        .should("be.visible")
        .clear()
        .type("77")
        .blur()
        .should("have.value", "77.00%");

      cy.wait(1000);
      cy.contains("Loan Term");
      cy.get('select[name="loanTerm"]').select("19").should("have.value", "19");

      cy.wait(1000);
      cy.contains("Loan Term Remaining");
      cy.get('select[name="loanTermRemaining"]')
        .select("12")
        .should("have.value", "12");
    });
    //Footer
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    ).within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });
    //Loan Attachment Inner Card End

    cy.contains("Loan Amount");
    cy.get("#loanAmount").should("not.have.value", "");

    cy.contains("Annual Repayments");
    cy.get("#annualRepayments").should("not.have.value", "");

    //Footer
    cy.contains("Close").should("be.visible");
    cy.contains("Submit").should("be.visible").click();

    cy.get("#clientfamilyHome").should("have.value", "$77");
    cy.get("#partnerfamilyHome").should("have.value", "$43");

    //Car Card
    cy.wait(1000);
    cy.get(":nth-child(2) > .py-4").within(() => {
      cy.contains("Car");
      cy.get("img");
      cy.contains("Aiden Smith");
      cy.contains("Emma Taylor");
      cy.get(
        "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
      ).click();
    });
    //Car Card Selection
    cy.contains("Car");

    cy.get(".css-d07bj1 > :nth-child(1)").click();

    cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");
    cy.contains("Owner");
    cy.get("tbody > tr > :nth-child(1)").contains("Aiden Smith");
    cy.contains("Model of Car");
    cy.get("#modelOfCar").clear().type("77").blur().should("have.value", "77");

    cy.contains("Current Value");
    cy.get("#currentValue")
      .clear()
      .type("77")
      .blur()
      .should("have.value", "$77");
    //Footer
    cy.contains("Close").should("be.visible");
    cy.get(".modal-footer > .bgColor")
      .contains("Submit")
      .should("be.visible")
      .click();

    cy.get("#clientfamilyHome").should("have.value", "$77");

    //Car Card
    cy.wait(1000);
    cy.get(":nth-child(2) > .py-4").within(() => {
      cy.contains("Car");
      cy.get("img");
      cy.contains("Aiden Smith");
      cy.contains("Emma Taylor");
      cy.get(
        "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
      ).click();
    });
    //Car Card Selection
    cy.contains("Car");

    cy.get(".css-d07bj1 > :nth-child(1)").click();
    cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");
    cy.contains("Owner");
    cy.get("tbody > tr > :nth-child(1)").contains("Aiden Smith");
    cy.contains("Model of Car");
    cy.get("#modelOfCar").clear().type("77").blur().should("have.value", "77");

    cy.contains("Current Value");
    cy.get("#currentValue")
      .clear()
      .type("77")
      .blur()
      .should("have.value", "$77");

    //Footer
    cy.contains("Close").should("be.visible");
    cy.get(".modal-footer > .bgColor")
      .contains("Submit")
      .should("be.visible")
      .click();

    cy.get("#clientcar").should("have.value", "$77");

    //House Hold
    cy.wait(1000);
    cy.get(":nth-child(3) > .py-4").within(() => {
      cy.contains("House hold");
      cy.get("img");
      cy.contains("Aiden Smith & Emma Taylor");
      cy.get(
        "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
      ).click();
    });
    //House hold Card Selection
    cy.contains("House hold");

    cy.get(".css-d07bj1 > :nth-child(1)").click();
    cy.get(".css-1lx7dxn").type("Aiden Smith + Emma Taylor{enter}");

    cy.contains("Owner");
    cy.get("tbody > tr > :nth-child(1)").contains("Aiden Smith + Emma Taylor");
    cy.contains("Current Value");
    cy.get("#currentValue").clear().type("98").blur();

    //Footer
    cy.contains("Close").should("be.visible");
    cy.get(".modal-footer > .bgColor")
      .contains("Submit")
      .should("be.visible")
      .click();

    cy.get("#jointhouseHold").should("have.value", "$98");

    //Boat;
    cy.wait(1000);
    cy.get(":nth-child(4) > .py-4").within(() => {
      cy.contains("Boat");
      cy.get("img");
      cy.contains("Aiden Smith & Emma Taylor");
      cy.get(
        "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
      )
        .click()
        .should("be.visible");
    });
    //Boat Card Selection
    cy.get(".modal-header").contains("Boat");
    cy.get(".btn-close").should("be.visible");

    cy.get(".css-d07bj1 > :nth-child(1)").click();
    cy.get(".css-1lx7dxn").type("Aiden Smith + Emma Taylor{enter}");

    cy.get(".mt-4").within(() => {
      cy.contains("Owner");
      cy.get("tbody > tr > :nth-child(1)");
      cy.contains("Aiden Smith + Emma Taylor");
      cy.contains("Current Value");
      cy.get("#currentValue").clear().type("45").blur();
    });

    //Boat Card Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#jointboat").should("have.value", "$45");

    //Caravan;
    cy.wait(1000);
    cy.get(":nth-child(5) > .py-4").within(() => {
      cy.contains("Caravan");
      cy.get("img");
      cy.contains("Aiden Smith & Emma Taylor");
      cy.get(
        "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
      )
        .click()
        .should("be.visible");
    });
    //Boat Card Selection
    cy.get(".modal-header").within(() => {
      cy.contains("Caravan");
      // cy.get(".btn-close").should("be.visible");
    });

    cy.get(".modal-body").within(() => {
      cy.contains("Owner");
      // cy.get(".css-1xc3v61-indicatorContainer").click();
    });

    cy.get(".css-d07bj1 > :nth-child(1)").click();
    cy.get(".css-1lx7dxn").type("Aiden Smith + Emma Taylor{enter}");
    //Select Admin
    // cy.get("#react-select-2-option-0").click();
    cy.get(".mt-4").within(() => {
      cy.contains("Owner");
      cy.get("tbody > tr > :nth-child(1)");
      cy.contains("Aiden Smith + Emma Taylor");

      cy.contains("Current Value");
      cy.get("#currentValue").clear().type("77").blur();
    });

    //Boat Card Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#jointcaravan").should("have.value", "$77");

    //Other Assets
    cy.wait(1000);
    cy.get(":nth-child(6) > .py-4").within(() => {
      cy.contains("Other Assets");
      cy.get("img");
      cy.contains("Aiden Smith");
      cy.get(
        "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
      )
        .click()
        .should("be.visible");
    });
    //Boat Card Selection
    cy.get(".modal-header").within(() => {
      cy.contains("Other Assets");
      cy.get(".btn-close").should("be.visible");
    });

    cy.get(".modal-body").within(() => {
      cy.contains("Owner");
    });

    cy.get(".css-d07bj1 > :nth-child(1)").click();
    cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");
    //Select Admin
    // cy.get("#react-select-6-option-0").click();
    cy.get(".mt-4").within(() => {
      cy.contains("Owner");
      cy.get("tbody > tr > :nth-child(1)");
      cy.contains("Aiden Smith");

      cy.contains("Description");
      cy.get("#description").clear().type("9895").blur();

      cy.contains("Current Value");
      cy.get("#currentValue").clear().type("9654").blur();
    });

    //Boat Card Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientotherAssets").should("have.value", "$9,654");

    cy.wait(1000);
    cy.get(":nth-child(7) > .py-4").within(() => {
      cy.contains("Personal Debt");
      cy.get("img");
      cy.contains("Credit Card");
    });

    cy.get(
      ":nth-child(7) > .py-4 > :nth-child(3) > .col-12 > .d-flex > .mb-0 > div"
    )
      .click()
      .should("be.visible");
    //Credit Card Selection
    cy.get(".modal-header").within(() => {
      cy.contains("Credit Card");
      cy.get(".btn-close").should("be.visible");
    });

    cy.get(".modal-body").within(() => {
      cy.contains("How many Credit Card does Aiden Smith have :");
      cy.get("#NumberOfMap").clear().type("1");
    });

    cy.get(".mt-4").within(() => {
      cy.contains("Lender").should("be.visible");
      cy.get("#LenderCurrent0").select("Testing");

      cy.contains("Loan Balance").should("be.visible");
      cy.get("#LoanBalance0").clear().type("43").should("have.value", "$43");

      cy.contains("Loan Type").should("be.visible");
      cy.get("#LoanType0").select("i/only");

      cy.contains("Repayments Amount").should("be.visible");

      Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
      });
      cy.get("#RepaymentsAmount0").clear().type("2");

      cy.get("#Frequency0").select("Weekly");

      cy.contains("Frequency").should("be.visible");
      cy.get("#Frequency0").select("Weekly");

      cy.contains("Annual Repayments").should("be.visible");
      cy.get("#AnnualRepayments0").should("have.value", "$104");

      cy.contains("Interest Rate (p.a)").should("be.visible");
      cy.get("#InterestRate0")
        .should("be.visible")
        .clear()
        .type("77")
        .blur()
        .should("have.value", "77.00%");

      cy.wait(1000);
      cy.contains("Loan Term");
      cy.get("#LoanTerm0").select("19").should("have.value", "19");

      cy.wait(1000);
      cy.contains("Loan Term Remaining");
      cy.get("#LoanTermRemaining0").select("12").should("have.value", "12");
    });

    //Boat Card Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get('[placeholder="Credit Card"]').should("have.value", "$104");

    cy.contains("Personal Loan");
    cy.get(":nth-child(5) > .col-12 > .d-flex > .mb-0 > div")
      .click()
      .should("be.visible");
    //Boat Card Selection
    cy.get(".modal-header").within(() => {
      cy.contains("Personal Loan");
      cy.get(".btn-close").should("be.visible");
    });

    cy.get(".modal-body").within(() => {
      cy.contains("How many Personal Loan does Aiden Smith have :");
      cy.get("#NumberOfMap").clear().type("1");
    });

    cy.get(".mt-4").within(() => {
      cy.contains("Lender").should("be.visible");
      cy.get("#LenderCurrent0").select("Testing");

      cy.contains("Loan Balance").should("be.visible");
      cy.get("#LoanBalance0").clear().type("43").should("have.value", "$43");

      cy.contains("Loan Type").should("be.visible");
      cy.get("#LoanType0").select("i/only");

      cy.contains("Repayments Amount").should("be.visible");

      Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
      });
      cy.get("#RepaymentsAmount0").clear().type("3");

      cy.get("#Frequency0").select("Weekly");

      cy.contains("Frequency").should("be.visible");
      cy.get("#Frequency0").select("Weekly");

      cy.contains("Annual Repayments").should("be.visible");
      cy.get("#AnnualRepayments0").should("have.value", "$156");

      cy.contains("Interest Rate (p.a)").should("be.visible");
      cy.get("#InterestRate0")
        .should("be.visible")
        .clear()
        .type("77")
        .blur()
        .should("have.value", "77.00%");

      cy.wait(1000);
      cy.contains("Loan Term");
      cy.get("#LoanTerm0").select("19").should("have.value", "19");

      cy.wait(1000);
      cy.contains("Loan Term Remaining");
      cy.get("#LoanTermRemaining0").select("12").should("have.value", "12");
    });

    //Boat Card Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });
    cy.get('[placeholder="Personal Loan"]').should("have.value", "$156");
  }
}

export default PersonalAssetsAndDebt;
