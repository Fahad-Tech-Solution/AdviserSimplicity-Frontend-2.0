class PersonalIncomeAndExpense {
  section() {
    cy.visit(Cypress.env("CashFlowUrl"));
    cy.get(
      ":nth-child(6) > :nth-child(7) > :nth-child(1) > div > button"
    ).click();
    cy.get("#popover > :nth-child(3)").click();
    cy.get(
      '[statusstep="16"] > .ant-steps-item-container > .ant-steps-item-icon > .ant-steps-icon > .rounded-circle'
    ).click();

    //For Option Question Section
    // cy.get(".pb-4 > :nth-child(1) > .QuestionIcon > .img-fluid").click();

    // cy.get(".modal-header").contains("Questions").should("be.visible");
    // cy.get(".btn-close").should("be.visible");

    // //Select Questions:
    // cy.get(".modal-body").within(() => {
    //   cy.get(":nth-child(1) > .d-flex > .border")
    //     .wait(1000)
    //     .contains("Overseas Pensions")
    //     .click();
    //   cy.get("img").should("be.visible");

    //   cy.get(":nth-child(2) > .d-flex > .border")
    //     .wait(1000)
    //     .contains("Sole Trader Income")
    //     .click();
    //   cy.get("img").should("be.visible");

    //   cy.get(":nth-child(3) > .d-flex > .border")
    //     .wait(1000)
    //     .contains("Partnership Income")
    //     .click();
    //   cy.get("img").should("be.visible");

    //   cy.get(":nth-child(4) > .d-flex > .border")
    //     .wait(1000)
    //     .contains("Centrelink Payments/Benefits");
    //   cy.get('svg[viewBox="0 0 512 512"]').trigger("mouseover");

    //   cy.get("img").should("be.visible");
    //   cy.get('svg[stroke="currentColor"][fill="currentColor"]').click();

    //   cy.get(":nth-child(5) > .d-flex > .border")
    //     .wait(1000)
    //     .contains("Lifetime/Defined Benefit Super Pensions")
    //     .click();
    //   cy.get("img").should("be.visible");

    //   cy.get(":nth-child(6) > .d-flex > .border")
    //     .wait(1000)
    //     .contains("Employment Income")
    //     .click();
    //   cy.get("img").should("be.visible");
    // });

    // Test for the "Close" button
    // cy.get("button")
    //   .contains("Close")
    //   .should("be.visible")
    //   .and("not.be.disabled");
    // // Test for the "Submit" button
    // cy.get("button")
    //   .contains("Submit")
    //   .should("be.visible")
    //   .and("not.be.disabled")
    //   .click();

    cy.wait(2000);
    cy.get(":nth-child(1) > .py-4").within(() => {
      cy.contains("Employement Income");
      cy.get("img");

      cy.contains("Aiden Smith");
      cy.contains("Emma Taylor");

      cy.get(
        "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
      ).click();
    });

    //Employment Income Card

    cy.contains("Employement Income").should("be.visible");
    cy.get(".btn-close").should("be.visible");

    cy.contains("Owner");
    cy.get(".css-b62m3t-container");
    cy.get(".css-d07bj1 > :nth-child(1)").click();

    cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");
    //In Table
    cy.get("form > .row > :nth-child(3)").within(() => {
      cy.contains("Owner").should("be.visible");
      // Checking if 'Occupation' is visible and typing in the occupation field
      cy.contains("Occupation").should("be.visible");
      cy.get("#occupation").clear().type("Occupation").should("be.visible");
      // Checking if 'Employment Status' is visible and clicking the dropdown
      cy.contains("Employment Status").should("be.visible");
      cy.get("#employmentStatus").select("Full Time"); // Select "Full Time" option by text
      cy.contains("Name of Company");
      cy.get("#nameOfCompany").clear().type("Software Company");
      cy.contains("Start Date");
      cy.get("#startDate").clear().type("06/11/2024").should("exist");
      cy.contains("Hours Worked");
      cy.get("#hoursWorked").clear().type("65").should("be.visible");
      cy.contains("Salary Package");
      cy.get(".text-center > #button-addon2").click();
    });

    //Sallery Package Card :
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    ).contains("Salary Package");
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header > .btn-close'
    ).should("be.visible");
    //Inner Tabel
    cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
      () => {
        cy.contains("Salary Package");

        Cypress.on("uncaught:exception", (err, runnable) => {
          return false;
        });

        cy.get("#remunerationType").select("Gross Salary");

        cy.contains("Amount");
        cy.get("#amount").clear().type("54").should("be.visible");

        cy.contains("SG");
        cy.get("#SG").clear().type("32");

        cy.contains("Salary Sarifice Contributions");
        cy.get("#salarySacrificeContributions").clear().type("32");

        cy.contains("After Tax Contributions");
        cy.get("#afterTaxContributions").clear().type("446");

        cy.contains("Gross Salary");
        cy.get("#grossSalary").should("not.have.value", "");

        cy.contains("SGC");
        cy.get("#SGC").should("not.have.value", "");

        cy.contains("Submit").click();
      }
    );

    cy.contains("Salary Packaging");
    cy.get(
      ":nth-child(8) > .d-flex > .form-check > .radioButton2 > .tableYesLabel > span"
    )
      .contains("Yes")
      .click();

    cy.get(":nth-child(8) > .d-flex > #button-addon2").click();
    //Header
    cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
      () => {
        cy.contains("Salary Packaging");
      }
    );
    //Table Salary Packaging

    cy.get(".row > .mt-4 > .table-responsive > .table").within(() => {
      cy.contains("Employer FBT Status");
      cy.get("#employerFBTStatus").select(
        "Full FBT/Rebatable/Exempt (17K Cap)"
      );

      cy.contains("Credit Card/Mortgage Repayments");
      cy.get("#creditCardMortgageRepayments")
        .clear()
        .type("486543")
        .should("be.visible");

      cy.contains("Cost Base of Car");
      cy.get("#costBaseOfCar").clear().type("857").should("be.visible");

      cy.contains("FBT Paid By Employer");
      cy.get(
        ":nth-child(4) > .form-check > .radioButton2 > .tableYesLabel > span"
      ).click();

      cy.contains("Running Costs of Car");
      cy.get("#runningCostsOfCar").clear().type("8673").should("be.visible");
    });
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    ).within(() => {
      cy.contains("Submit").click();
      cy.contains("Close");
    });

    cy.contains("Leave entitlements");
    cy.get(
      ":nth-child(9) > .d-flex > .form-check > .radioButton2 > .tableYesLabel > span"
    ).click();
    cy.get(":nth-child(9) > .d-flex > #button-addon2").click();

    cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
      () => {
        cy.contains("Leave entitlements");

        cy.contains("Leave Type");
        cy.get("#annualLeave").should("not.have.value", "");
        cy.get("#sickLeave").should("not.have.value", "");
        cy.get("#longServiceLeave").should("not.have.value", "");

        cy.contains("Amount");
        cy.get("#annualLeaveAmount").clear().type("32445");
        cy.get("#sickLeaveAmount").clear().type("365245");
        cy.get("#longServiceLeaveAmount").clear().type("53245");

        cy.contains("Time");
        cy.get("#annualLeaveTime").select("Days");
        cy.get("#sickLeaveTime").select("Weeks");
        cy.get("#longServiceLeaveTime").select("Hours");

        cy.contains("Submit").click();
      }
    );

    cy.contains("Choice of Fund");
    cy.get(
      ":nth-child(10) > .d-flex > .form-check > .radioButton2 > .tableYesLabel > span"
    ).click();

    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientincomeFromOwnBusiness").should("have.value", "$54");

    // End Employement Income Card

    //Sole Trader
    cy.wait(2000);
    cy.get(":nth-child(2) > .py-4")
      .should("be.visible")
      .within(() => {
        cy.contains("Sole Trader");
        cy.get("img");
        cy.contains("Aiden Smith");
        cy.contains("Emma Taylor");

        cy.get(
          "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
        ).click();

        //Cards
      });
    //Header
    cy.get(".modal-header").contains("Sole Trader");
    cy.get(".btn-close").should("be.visible");
    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.wait(1000);
      cy.contains("Owner");
      // cy.get(".css-1xc3v61-indicatorContainer").click();
    });
    cy.get(".css-d07bj1 > :nth-child(1)").click();
    cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");
    //Card Slection :
    cy.contains("Owner").should("be.visible");
    cy.get("tbody > tr > :nth-child(1)").should("be.visible");

    cy.contains("Business Name").should("be.visible");
    cy.get("#businessName").clear().type("FTS").should("be.visible");

    cy.contains("ABN").should("be.visible");
    cy.get("#ABN").clear().type("64").should("be.visible");

    cy.contains("Business Address").should("be.visible");
    cy.get("#businessAddress").clear().type("Grow Work").should("be.visible");

    cy.contains("Net Business Income").should("be.visible");
    cy.get("#netBusinessIncome").clear().type("56745").should("be.visible");

    cy.contains("Goodwill/Business Valuation").should("be.visible");
    cy.get("#goodWill").clear().type("896");

    //Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });
    //InputBox;
    cy.get("#clientincomeFromSoleTrader").should("have.value", "$56,745"); // Ensure it's not empty

    //Partnership
    cy.wait(2000);
    cy.get(":nth-child(3) > .py-4").within(() => {
      cy.contains("Partnership");
      cy.get("img");
      cy.contains("Aiden Smith");
      cy.contains("Emma Taylor");
    });
    cy.get(":nth-child(3) > .py-4 > :nth-child(3) > .col-12 > .d-flex > .mb-0")
      .click()
      .should("be.visible");

    //Card Header
    cy.get(".modal-header").contains("Partnership");
    cy.get(".btn-close").should("be.visible");
    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");
    });
    cy.get(".css-d07bj1 > :nth-child(1)").click();
    cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");

    //Card Selection
    cy.contains("Owner").should("be.visible");
    // Assert the input field has a value and is disabled
    cy.get("tbody > tr > :nth-child(1)").should("be.visible");

    cy.contains("Business Name").should("be.visible");
    cy.get("#businessName").clear().type("FTS").should("be.visible");

    cy.contains("ABN").should("be.visible");
    cy.get("#ABN").clear().type("896").should("be.visible");

    cy.contains("Business Address").should("be.visible");
    cy.get("#businessAddress").clear().type("Grow Work").should("be.visible");

    cy.contains("Total Net Partnership income").should("be.visible");
    cy.get("#totalNetPartnershipIncome")
      .clear()
      .type("896")
      .should("be.visible");

    cy.contains("Share of Partnership %").should("be.visible");
    cy.get("#shareOfPartnership").clear().type("6").should("be.visible");

    cy.contains("Share").should("be.visible");
    cy.get("#share").should("not.have.value", "");

    cy.contains("Goodwill/Business Valuation").should("be.visible");
    cy.get("#goodWill").clear().type("896");

    //Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientincomeFromPartnership").should("have.value", "$54");

    //LifeTime Benefits
    cy.wait(2000);
    cy.get(":nth-child(5) > .py-4").within(() => {
      cy.contains("LifeTime Benefits");
      cy.get("img");
      cy.contains("Aiden Smith");
      cy.contains("Emma Taylor");
    });
    cy.get(":nth-child(5) > .py-4 > :nth-child(3) > .col-12 > .d-flex > .mb-0")
      .click()
      .should("be.visible");

    //Card Header
    cy.get(".modal-header").contains("LifeTime Benefits");
    cy.get(".btn-close").should("be.visible");
    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");
    });

    //LifeTime Benefits Card
    cy.contains("Owner").should("be.visible");
    cy.get(".css-d07bj1 > :nth-child(1)").click();

    cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");
    // Assert the input field has a value and is disabled
    cy.get("tbody > tr > :nth-child(1)").should("be.visible");

    cy.contains("Fund Name").should("be.visible");
    cy.get(
      ':nth-child(1) > [style="width: 220px;"] > .css-b62m3t-container > .css-znlc7t-control > .css-13n1d3b > .css-1lx7dxn'
    ).type("PSS{enter}");

    cy.contains("Regular Income per Fortnight").should("be.visible");

    cy.get("#regularIncomePerFortnight").clear().type("789");

    cy.contains("Regular Income p.a").should("be.visible");
    cy.get("#regularIncomePA").should("be.visible");

    cy.contains("Centrelink Deductible Amount").should("be.visible");
    cy.get("#centrelinkDeductibleAmount")
      .clear()
      .type("896")
      .should("be.visible");

    cy.contains("Is Pension Tax Fee").should("be.visible");
    cy.get(".radioButton2").contains("Yes").click();

    //Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientincomeFromSuperPayment").should("have.value", "$20,514");

    //Overseas Pension
    cy.wait(2000);
    cy.get(":nth-child(6) > .py-4").within(() => {
      cy.contains("Overseas Pension");
      cy.get("img");
      cy.contains("Aiden Smith");
      cy.contains("Emma Taylor");
    });
    cy.get(":nth-child(6) > .py-4 > :nth-child(3) > .col-12 > .d-flex > .mb-0")
      .click()
      .should("be.visible");

    //Card Header
    cy.get(".modal-header").contains("Overseas Pension");
    cy.get(".btn-close").should("be.visible");
    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");
    });
    cy.get(".css-d07bj1 > :nth-child(1)").click();
    cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");

    //Overseas Pension Card
    cy.contains("Owner").should("be.visible");
    // Assert the input field has a value and is disabled
    cy.get("tbody > tr > :nth-child(1)").should("be.visible");

    cy.contains("Country");
    cy.get("#country").clear().type("Pakistan");

    cy.contains("Regular Income p.a").should("be.visible");

    cy.get("#regularIncomePA").clear().type("789");

    //Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientincomeFromOverseasPension").should("have.value", "$789");

    //  //Clear drop down of Centerlink Payments

    //  cy.wait(2000);
    //  cy.get(":nth-child(4) > .py-4").within(() => {
    //    cy.contains("Centerlink Payments");
    //    cy.get("img");
    //    cy.contains("Aiden Smith");
    //    cy.contains("Emma Taylor");
    //  });
    //  cy.get(":nth-child(4) > .py-4 > :nth-child(3) > .col-12 > .d-flex > .mb-0")
    //    .click()
    //    .should("be.visible");

    //  //Card Header
    //  cy.get(".modal-header").contains("Centerlink Payments");
    //  cy.get(".btn-close").should("be.visible");
    //  cy.get(".col-md-12 > .d-flex").within(() => {
    //    cy.contains("Owner");
    //  });

    //  cy.get('[style="min-width: 25%;"] > .css-b62m3t-container > .css-14gfs0a-control > .css-d07bj1 > :nth-child(1)').click();

    //   //Footer
    //   cy.get(".modal-footer").within(() => {
    //    cy.contains("Close").should("be.visible");
    //    cy.contains("Submit").should("be.visible").click();
    //  });

    //Centerlink Payments
    cy.wait(2000);
    cy.get(":nth-child(4) > .py-4").within(() => {
      cy.contains("Centerlink Payments");
      cy.get("img");
      cy.contains("Aiden Smith");
      cy.contains("Emma Taylor");
    });
    cy.get(":nth-child(4) > .py-4 > :nth-child(3) > .col-12 > .d-flex > .mb-0")
      .click()
      .should("be.visible");

    //Card Header
    cy.get(".modal-header").contains("Centerlink Payments");
    cy.get(".btn-close").should("be.visible");
    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");
    });
    cy.get(
      '[style="min-width: 25%;"] > .css-b62m3t-container > .css-14gfs0a-control > .css-d07bj1 > :nth-child(1)'
    ).click();

    cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");

    //Card Selection

    cy.contains("Owner").should("be.visible");
    // Assert the input field has a value and is disabled
    cy.get("tbody > tr > :nth-child(1)").should("be.visible");

    cy.contains("CRN").should("be.visible");
    cy.get("#CRN").clear().type("65").should("be.visible");

    cy.contains("Payment Type").should("be.visible");

    cy.get(
      ":nth-child(1) > :nth-child(3) > .css-b62m3t-container > .css-14gfs0a-control > .css-d07bj1 > :nth-child(1)"
    )
      .first()
      .click();
    // cy.get(
    //   ":nth-child(3) > .css-b62m3t-container > .css-14gfs0a-control > .css-d07bj1 > :nth-child(1)"
    // ).click();
    cy.get(".css-1f8fajx > .css-1lx7dxn").type("Age Pension{enter}");
    //  cy.wait(1000);
    //  cy.get("#react-select-6-option-0").contains("Age Pension").click();

    cy.contains("Fortnightly Payment").should("be.visible");
    cy.get("#fortnightlyPayment").clear().type("987").should("be.visible");

    cy.contains("Annual Payment Amount").should("be.visible");
    cy.get("#annualPaymentAmount").clear().type("896").should("be.visible");

    cy.contains("Centrelink Cards Held").should("be.visible");
    cy.wait(1000);
    cy.get(
      ":nth-child(1) > :nth-child(6) > .css-b62m3t-container > .css-14gfs0a-control > .css-d07bj1 > :nth-child(1)"
    )
      .first()
      .click();
    cy.get(".css-1f8fajx > .css-1lx7dxn")

      .type("Low Income Card{enter}")
      .should("be.visible");

    //Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientincomeFromCentrelink").should("have.value", "$896");

    //LifeTime Benefits
    cy.wait(2000);
    cy.get(":nth-child(7) > .py-4").within(() => {
      cy.contains("Regular Living Expenses");
      cy.get("img");
      cy.contains("General Living");
      cy.contains("Retirement Living");
    });
    cy.get(":nth-child(7) > .py-4 > :nth-child(3) > .col-12 > .d-flex > .mb-0")
      .click()
      .should("be.visible");

    cy.get(".modal-content").within(() => {
      cy.contains("Total Expense");
      cy.contains("Household");
      cy.get(
        ".py-2 > .row > :nth-child(2) > #HouseholdTotalValue > .iconContainer > .img-fluid"
      ).click();

      cy.get(".collapse > .my-3 > .m-0 > .table-responsive > .table").within(
        () => {
          cy.contains("Expense Type");
          cy.contains("Amount");
          cy.contains("Frequency");
          cy.contains("Amount P.A");

          cy.contains("Rent");
          cy.get("#houseHoldRent").clear().type("100");
          cy.get("#houseHoldRentType").select("Fortnightly");
          cy.wait(2000);

          cy.contains("Gas");
          cy.get("#houseHoldGas").clear().type("30");
          cy.get("#houseHoldGasType").select("Monthly");

          cy.contains("Electricity");
          cy.get("#houseHoldElectricity").clear().type("90");
          cy.get("#houseHoldElectricityType").select("Weekly");

          cy.contains("Water Rates");
          cy.get("#houseHoldWaterRates").clear().type("190");
          cy.get("#houseHoldWaterRatesType").select("Six-Monthly");

          cy.contains("Council Rates");
          cy.get("#houseHoldCouncilRates").clear().type("50");
          cy.get("#houseHoldCouncilRatesType").select("Weekly");

          cy.contains("Phone");
          cy.get("#houseHoldPhone").clear().type("80");
          cy.get("#houseHoldPhoneType").select("Annually");

          cy.contains("Food");
          cy.get("#houseHoldFood").clear().type("100");
          cy.get("#houseHoldFoodType").select("Weekly");

          cy.contains("Internet");
          cy.get("#houseHoldInternet").clear().type("2000");
          cy.get("#houseHoldInternetType").select("Quarterly");

          cy.contains("Other");
          cy.get("#houseHoldOthers").clear().type("500");
          cy.get("#houseHoldOthersType").select("Annually");
        }
      );
      cy.contains("Personal");
      cy.get(
        ":nth-child(3) > .py-2 > .row > :nth-child(2) > .float-end > .iconContainer > .img-fluid"
      ).click();

      cy.get("form > :nth-child(3) > .my-3 > .m-0 > .table-responsive").within(
        () => {
          cy.contains("Expense Type");
          cy.contains("Amount");
          cy.contains("Frequency");
          cy.contains("Amount P.A");

          cy.contains("Clothing");
          cy.get("#personalClothing").clear().type("100");
          cy.get("#personalClothingType").select("Fortnightly");

          cy.contains("Cigarettes");
          cy.get("#personalCigarettes").clear().type("30");
          cy.get("#personalCigarettesType").select("Monthly");

          cy.contains("Alcohol");
          cy.get("#personalAlcohol").clear().type("90");
          cy.get("#personalAlcoholType").select("Weekly");

          cy.contains("Subscription Fees");
          cy.get("#personalSubscriptionFees").clear().type("190");
          cy.get("#personalSubscriptionFeesType").select("Six-Monthly");

          cy.contains("Memberships & Clubs");
          cy.get("#personalClubMemberships").clear().type("50");
          cy.get("#personalClubMembershipsType").select("Weekly");

          cy.contains("Holidays");
          cy.get("#personalHolidays").clear().type("80");
          cy.get("#personalHolidaysType").select("Annually");

          cy.contains("Dining Out");
          cy.get("#personalDiningOut").clear().type("100");
          cy.get("#personalDiningOutType").select("Weekly");

          cy.contains("Mobile Phone");
          cy.get("#personalMobilePhone").clear().type("2000");
          cy.get("#personalMobilePhoneType").select("Quarterly");

          cy.contains("Medical Expenses");
          cy.get("#personalMedicalExpenses").clear().type("500");
          cy.get("#personalMedicalExpensesType").select("Annually");

          cy.contains("Other");
          cy.get("#personalOthers").clear().type("500");
          cy.get("#personalOthersType").select("Annually");
        }
      );

      cy.get(":nth-child(4) > .fw-bold").click();
      cy.contains("Transport");

      cy.get(
        ":nth-child(4) > .my-3 > .m-0 > .table-responsive > .table"
      ).within(() => {
        cy.contains("Expense Type");
        cy.contains("Amount");
        cy.contains("Frequency");
        cy.contains("Amount P.A");

        cy.contains("Petrol");
        cy.get("#transportPetrol").clear().type("100");
        cy.get("#transportPetrolType").select("Fortnightly");

        cy.contains("Car Maintenance");
        cy.get("#transportCarRepair").clear().type("30");
        cy.get("#transportCarRepairType").select("Weekly");

        cy.contains("Car Registration");
        cy.get("#transportCarRegistration").clear().type("30");
        cy.get("#transportCarRegistrationType").select("Monthly");

        cy.contains("Public Transport");
        cy.get("#publicTransport").clear().type("90");
        cy.get("#publicTransportType").select("Weekly");

        cy.contains("Other");
        cy.get("#transportOthers").clear().type("190");
        cy.get("#transportOthersType").select("Six-Monthly");
      });

      cy.get(":nth-child(5) > .fw-bold").click();
      cy.contains("Insurance");

      cy.get(
        ":nth-child(5) > .justify-content-center > .m-0 > .table-responsive > .table"
      ).within(() => {
        cy.contains("Expense Type");
        cy.contains("Amount");
        cy.contains("Frequency");
        cy.contains("Amount P.A");

        cy.contains("Home And Contents");

        cy.get("#insuranceHomeContents").clear().type("50");
        cy.get("#insuranceHomeContentsType").select("Weekly");

        cy.contains("Car");

        cy.get("#insuranceCar").clear().type("190");
        cy.get("#insuranceCarType").select("Six-Monthly");

        cy.contains("Private Health");

        cy.get("#insurancePrivateHealth").clear().type("90");
        cy.get("#insurancePrivateHealthType").select("Weekly");

        cy.contains("Life/TPD/Trauma");
        cy.get("#insuranceLife").clear().type("30");
        cy.get("#insuranceLifeType").select("Weekly");

        cy.contains("Income Protection");
        cy.get("#insuranceIncomeProtection").clear().type("30");
        cy.get("#insuranceIncomeProtectionType").select("Monthly");

        cy.contains("Other");
        cy.get("#insuranceOthers").clear().type("100");
        cy.get("#insuranceOthersType").select("Fortnightly");
      });

      cy.get(":nth-child(5) > .fw-bold").contains("$12,180");
      cy.get(":nth-child(4) > .fw-bold").contains("$9,580");
      cy.get(":nth-child(3) > .fw-bold").contains("$24,900");
      cy.get(":nth-child(2) > .fw-bold").contains("$24,400");
      cy.get(":nth-child(1) > .fw-bold").contains("$71,060");

      cy.get(".modal-footer").within(() => {
        cy.contains("Close").should("be.visible");
        cy.contains("Submit").should("be.visible").click();
      });
    });

    cy.get("#clientincomeFromRegularLivingExpenses").should(
      "have.value",
      "$71,060"
    );
    cy.get("#retirementLivingExpense").clear().type("1000");
    cy.get(".inputDesign > .btn").click();
  }
}

export default PersonalIncomeAndExpense;
