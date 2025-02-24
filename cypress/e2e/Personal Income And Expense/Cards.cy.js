class PersonalIncomeAndExpense {
  section() {
    cy.visit("http://ec2-54-66-20-19.ap-southeast-2.compute.amazonaws.com/");
    cy.get(":nth-child(6) > :nth-child(7)").click();
    cy.get("#popover > :nth-child(3)").click();
    cy.get(
      '[statusstep="16"] > .ant-steps-item-container > .ant-steps-item-icon > .ant-steps-icon > .rounded-circle'
    ).click();

    //For Option Question Section
    cy.get(".pb-4 > :nth-child(1) > .QuestionIcon > .img-fluid").click();

    cy.get(".modal-header").contains("Questions").should("be.visible");
    cy.get(".btn-close").should("be.visible");

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

    // // Test for the "Close" button
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

    // //Question Selection End Here

    // cy.wait(2000);
    // cy.get(":nth-child(1) > .py-4").within(() => {
    //   cy.contains("Employement Income");
    //   cy.get("img");

    //   cy.get(
    //     "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
    //   ).click(); // Or any other interaction you want
    // });

    // //Employment Income Card

    // cy.contains("Employement Income").should("be.visible");
    // cy.get(".btn-close").should("be.visible");

    // cy.contains("Owner");
    // cy.get(".css-b62m3t-container");
    // cy.get(".css-1xc3v61-indicatorContainer").click();
    // cy.get("#react-select-2-option-0").click();

    // //In Table
    // cy.get("form > .row > :nth-child(3)").within(() => {
    //   cy.contains("Owner").should("be.visible");
    //   // Checking if 'Occupation' is visible and typing in the occupation field
    //   cy.contains("Occupation").should("be.visible");
    //   cy.get("#occupation").clear().type("Occupation").should("be.visible");
    //   // Checking if 'Employment Status' is visible and clicking the dropdown
    //   cy.contains("Employment Status").should("be.visible");
    //   cy.get("#employmentStatus").select("Full Time"); // Select "Full Time" option by text
    //   cy.contains("Name of Company");
    //   cy.get("#nameOfCompany").clear().type("Software Company");
    //   cy.contains("Start Date");
    //   cy.get("#startDate").clear().type("06/11/2024").should("exist");
    //   cy.contains("Hours Worked");
    //   cy.get("#hoursWorked").clear().type("65").should("be.visible");
    //   cy.contains("Salary Package");
    //   cy.get(".text-center > #button-addon2").click();
    // });

    // //Sallery Package Card :
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    // ).contains("Salary Package");
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header > .btn-close'
    // ).should("be.visible");
    // //Inner Tabel
    // cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
    //   () => {
    //     cy.contains("Salary Package");

    //     Cypress.on("uncaught:exception", (err, runnable) => {
    //       return false;
    //     });

    //     cy.get("#remunerationType").select("Gross Salary");

    //     cy.contains("Amount");
    //     cy.get("#amount").clear().type("54").should("be.visible");

    //     cy.contains("SG");
    //     cy.get("#SG").clear().type("32");

    //     cy.contains("Salary Sarifice Contributions");
    //     cy.get("#salarySacrificeContributions").clear().type("32");

    //     cy.contains("After Tax Contributions");
    //     cy.get("#afterTaxContributions").clear().type("446");

    //     cy.contains("Gross Salary");
    //     cy.get("#grossSalary").should("not.have.value", "");

    //     cy.contains("SGC");
    //     cy.get("#SGC").should("not.have.value", "");

    //     cy.contains("Submit").click();
    //   }
    // );

    // cy.contains("Salary Packaging");
    // cy.get(
    //   ":nth-child(8) > .d-flex > .form-check > .radioButton2 > .tableYesLabel > span"
    // )
    //   .contains("Yes")
    //   .click();

    // cy.get(".d-flex > #button-addon2").click();
    // //Header
    // cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
    //   () => {
    //     cy.contains("Salary Packaging");
    //   }
    // );
    // //Table Salary Packaging

    // cy.get(".row > .mt-4 > .table-responsive > .table").within(() => {
    //   cy.contains("Employer FBT Status");
    //   cy.get("#employerFBTStatus").select(
    //     "Full FBT/Rebatable/Exempt (17K Cap)"
    //   );

    //   cy.contains("Credit Card/Mortgage Repayments");
    //   cy.get("#creditCardMortgageRepayments")
    //     .clear().type("486543")
    //     .should("be.visible");

    //   cy.contains("Cost Base of Car");
    //   cy.get("#costBaseOfCar").clear().type("857").should("be.visible");

    //   cy.contains("FBT Paid By Employer");
    //   cy.get(
    //     ":nth-child(4) > .form-check > .radioButton2 > .tableYesLabel > span"
    //   ).click();

    //   cy.contains("Running Costs of Car");
    //   cy.get("#runningCostsOfCar").clear().type("8673").should("be.visible");
    // });
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    // ).within(() => {
    //   cy.contains("Submit").click();
    //   cy.contains("Close");
    // });

    // cy.contains("Leave entitlements");
    // cy.get(
    //   ":nth-child(9) > .d-flex > .form-check > .radioButton2 > .tableYesLabel > span"
    // ).click();
    // cy.get(":nth-child(9) > .d-flex > #button-addon2").click();

    // cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
    //   () => {
    //     cy.contains("Leave entitlements");

    //     cy.contains("Leave Type");
    //     cy.get("#annualLeave").should("not.have.value", "");
    //     cy.get("#sickLeave").should("not.have.value", "");
    //     cy.get("#longServiceLeave").should("not.have.value", "");

    //     cy.contains("Amount");
    //     cy.get("#annualLeaveAmount").clear().type("32445");
    //     cy.get("#sickLeaveAmount").clear().type("365245");
    //     cy.get("#longServiceLeaveAmount").clear().type("53245");

    //     cy.contains("Time");
    //     cy.get("#annualLeaveTime").select("Days");
    //     cy.get("#sickLeaveTime").select("Weeks");
    //     cy.get("#longServiceLeaveTime").select("Hours");

    //     cy.contains("Submit").click();
    //   }
    // );

    // cy.contains("Choice of Fund");
    // cy.get(
    //   ":nth-child(10) > .d-flex > .form-check > .radioButton2 > .tableYesLabel > span"
    // ).click();

    // cy.get(".modal-footer").within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });

    // cy.get("#clientincomeFromOwnBusiness").should("not.have.value", "");

    // //Sole Trader
    // cy.wait(2000);
    // cy.get(":nth-child(2) > .py-4")
    //   .should("be.visible")
    //   .within(() => {
    //     cy.contains("Sole Trader");
    //     cy.get("img");

    //     cy.get(
    //       "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
    //     ).click();

    //     //Cards
    //   });
    // //Header
    // cy.get(".modal-header").contains("Sole Trader");
    // cy.get(".btn-close").should("be.visible");
    // cy.get(".col-md-12 > .d-flex").within(() => {

    //   cy.wait(1000)
    //   cy.contains("Owner");
    //   cy.get(".css-1xc3v61-indicatorContainer").click();
    // });
    // cy.get('#react-select-3-option-0').click();

    // cy.get(".css-1lcv7hw").should("be.visible");

    // //Card Slection :
    // cy.contains("Owner").should("be.visible");
    // cy.get("tbody > tr > :nth-child(1)").should("be.visible");

    // cy.contains("Business Name").should("be.visible");
    // cy.get("#businessName").clear().type("FTS").should("be.visible");

    // cy.contains("ABN").should("be.visible");
    // cy.get("#ABN").clear().type("64").should("be.visible");

    // cy.contains("Business Address").should("be.visible");
    // cy.get("#businessAddress").clear().type("Grow Work").should("be.visible");

    // cy.contains("Net Business Income").should("be.visible");
    // cy.get("#netBusinessIncome").clear().type("56745").should("be.visible");

    // cy.contains("Goodwill/Business Valuation").should("be.visible");
    // cy.get("#goodWill").clear().type("896");
    // //Footer
    // cy.get(".modal-footer").within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });
    // //nputBox;
    // cy.get("#clientincomeFromSoleTrader").should("not.have.value", ""); // Ensure it's not empty

    // //Partnership
    // cy.wait(2000);
    // cy.get(":nth-child(3) > .py-4").within(() => {
    //   cy.contains("Partnership");
    //   cy.get("img");
    // });
    // cy.get(":nth-child(3) > .py-4 > :nth-child(3) > .col-12 > .d-flex > .mb-0")
    //   .click()
    //   .should("be.visible");

    // //Card Header
    // cy.get(".modal-header").contains("Partnership");
    // cy.get(".btn-close").should("be.visible");
    // cy.get(".col-md-12 > .d-flex").within(() => {
    //   cy.contains("Owner");
    //   cy.get(".css-1xc3v61-indicatorContainer").click();
    // });
    // cy.get('#react-select-4-option-0').click();
    // cy.get(".css-1lcv7hw").should("be.visible");

    // //Card Selection
    // cy.contains("Owner").should("be.visible");
    // // Assert the input field has a value and is disabled
    // cy.get("tbody > tr > :nth-child(1)").should("be.visible");

    // cy.contains("Business Name").should("be.visible");
    // cy.get("#businessName").clear().type("FTS").should("be.visible");

    // cy.contains("ABN").should("be.visible");
    // cy.get("#ABN").clear().type("896").should("be.visible");

    // cy.contains("Business Address").should("be.visible");
    // cy.get("#businessAddress").clear().type("Grow Work").should("be.visible");

    // cy.contains("Total Net Partnership income").should("be.visible");
    // cy.get("#totalNetPartnershipIncome").clear().type("896").should("be.visible");

    // cy.contains("Share of Partnership %").should("be.visible");
    // cy.get("#shareOfPartnership").clear().type("6").should("be.visible");

    // cy.contains("Share").should("be.visible");
    // cy.get("#share").should("not.have.value", "");

    // cy.contains("Goodwill/Business Valuation").should("be.visible");
    // cy.get("#goodWill").clear().type("896");

    // //Footer
    // cy.get(".modal-footer").within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });

    // cy.get("#clientincomeFromPartnership").should("not.have.value", "");

    // //Centerlink Payments
    // cy.wait(2000);
    // cy.get(":nth-child(4) > .py-4").within(() => {
    //   cy.contains("Centerlink Payments");
    //   cy.get("img");
    // });
    // cy.get(":nth-child(4) > .py-4 > :nth-child(3) > .col-12 > .d-flex > .mb-0")
    //   .click()
    //   .should("be.visible");

    // //Card Header
    // cy.get(".modal-header").contains("Centerlink Payments");
    // cy.get(".btn-close").should("be.visible");
    // cy.get(".col-md-12 > .d-flex").within(() => {
    //   cy.contains("Owner");
    //   cy.get(".css-1xc3v61-indicatorContainer").click();
    // });
    // cy.get('#react-select-5-option-0').click();
    // cy.get(".css-1lcv7hw").should("be.visible");

    // //Card Selection
    // cy.contains("Owner").should("be.visible");
    // // Assert the input field has a value and is disabled
    // cy.get("tbody > tr > :nth-child(1)").should("be.visible");

    // cy.contains("CRN").should("be.visible");
    // cy.get("#CRN").clear().type("65").should("be.visible");

    // cy.contains("Payment Type").should("be.visible");
    // cy.get(
    //   ":nth-child(3) > .css-b62m3t-container > .css-1dq17ye-control > .css-d07bj1 > .css-1xc3v61-indicatorContainer"
    // ).click();

    // cy.get(".css-kva4ii-control > .css-1f8fajx > .css-1lx7dxn").clear().type(
    //   "Age Pension"
    // );
    // cy.wait(1000)
    // cy.get('#react-select-6-option-0').contains("Age Pension").click();

    // cy.contains("Fortnightly Payment").should("be.visible");
    // cy.get("#fortnightlyPayment").clear().type("987").should("be.visible");

    // cy.contains("Annual Payment Amount").should("be.visible");
    // cy.get("#annualPaymentAmount").clear().type("896").should("be.visible");

    // cy.contains("Centrelink Cards Held").should("be.visible");
    // cy.wait(1000)
    // cy.get(".css-1f8fajx > .css-1lx7dxn")
    //  .clear().type("Low Income Card")
    //   .should("be.visible");

    //   cy.get('#react-select-7-option-1').click();

    // //Footer
    // cy.get(".modal-footer").within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });

    // cy.get("#clientincomeFromCentrelink").should("not.have.value", "");

    // //Centerlink Payments
    // cy.wait(2000);
    // cy.get(":nth-child(5) > .py-4").within(() => {
    //   cy.contains("LifeTime Benefits");
    //   cy.get("img");
    // });
    // cy.get(":nth-child(5) > .py-4 > :nth-child(3) > .col-12 > .d-flex > .mb-0")
    //   .click()
    //   .should("be.visible");

    // //Card Header
    // cy.get(".modal-header").contains("LifeTime Benefits");
    // cy.get(".btn-close").should("be.visible");
    // cy.get(".col-md-12 > .d-flex").within(() => {
    //   cy.contains("Owner");
    //   cy.get(".css-1xc3v61-indicatorContainer").click();
    // });
    // cy.get('#react-select-8-option-0').click();
    // cy.get(".css-1lcv7hw").should("be.visible");

    // //LifeTime Benefits Card
    // cy.contains("Owner").should("be.visible");
    // // Assert the input field has a value and is disabled
    // cy.get("tbody > tr > :nth-child(1)").should("be.visible");

    // cy.contains("Fund Name").should("be.visible");
    // cy.get(".css-13n1d3b > .css-1lx7dxn").clear().type("PSS");
    // cy.get('#react-select-9-listbox').contains("PSS").click();

    // cy.contains("Regular Income per Fortnight").should("be.visible");

    // cy.get("#regularIncomePerFortnight").clear().type("789");

    // cy.contains("Regular Income p.a").should("be.visible");
    // cy.get("#regularIncomePA").should("be.visible");

    // cy.contains("Centrelink Deductible Amount").should("be.visible");
    // cy.get("#centrelinkDeductibleAmount").clear().type("896").should("be.visible");

    // cy.contains("Is Pension Tax Fee").should("be.visible");
    // cy.get(".radioButton2").contains("Yes").click();

    // //Footer
    // cy.get(".modal-footer").within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });

    // cy.get("#clientincomeFromSuperPayment").should("not.have.value", "");

    // //Overseas Pension
    // cy.wait(2000);
    // cy.get(":nth-child(5) > .py-4").within(() => {
    //   cy.contains("LifeTime Benefits");
    //   cy.get("img");
    // });
    // cy.get(":nth-child(6) > .py-4 > :nth-child(3) > .col-12 > .d-flex > .mb-0")
    //   .click()
    //   .should("be.visible");

    // //Card Header
    // cy.get(".modal-header").contains("Overseas Pension");
    // cy.get(".btn-close").should("be.visible");
    // cy.get(".col-md-12 > .d-flex").within(() => {
    //   cy.contains("Owner");
    //   cy.get(".css-1xc3v61-indicatorContainer").click();
    // });
    // cy.get('#react-select-10-option-0').click();
    // cy.get(".css-1lcv7hw").should("be.visible");

    // //LifeTime Benefits Card
    // cy.contains("Owner").should("be.visible");
    // // Assert the input field has a value and is disabled
    // cy.get("tbody > tr > :nth-child(1)").should("be.visible");

    // cy.contains("Country").should("be.visible");
    // cy.get("#country").clear().type("Pakistan");

    // cy.contains("Regular Income p.a").should("be.visible");

    // cy.get("#regularIncomePA").clear().type("789");

    // //Footer
    // cy.get(".modal-footer").within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });

    // cy.get("#clientincomeFromOverseasPension").should("not.have.value", "");

    // //Tast Card
    // cy.get("#retirementLivingExpense").clear().type("789");
    // cy.get(".inputDesign > .btn").click();
  }
}

export default PersonalIncomeAndExpense;
