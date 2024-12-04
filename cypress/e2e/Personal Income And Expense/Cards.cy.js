// describe("Personal Income and Expense", () => {

//   it("should login with valid credentials", () => {
//     cy.visit("http://ec2-3-25-227-176.ap-southeast-2.compute.amazonaws.com/");

//     cy.get(":nth-child(6) > :nth-child(7)").click();
//     cy.get("#popover > :nth-child(3)").click();
//     cy.get('[statusstep="16"] > .ant-steps-item-container > .ant-steps-item-icon > .ant-steps-icon > .rounded-circle').click();

//   });
// });

// File: cypress/support/login.js

// File: cypress/e2e/Personal_Income_And_Expense/Sections/Sections.cy.js

class PersonalIncomeAndExpense {
  section() {
    cy.visit("http://ec2-3-25-227-176.ap-southeast-2.compute.amazonaws.com/");
    cy.get(":nth-child(6) > :nth-child(7)").click();
    cy.get("#popover > :nth-child(3)").click();
    cy.get(
      '[statusstep="16"] > .ant-steps-item-container > .ant-steps-item-icon > .ant-steps-icon > .rounded-circle'
    ).click();

    //For Option Question Section
    cy.get(".pb-4 > :nth-child(1) > .QuestionIcon > .img-fluid").click();

    cy.get(".modal-header").contains("Questions").should("be.visible");
    cy.get(".btn-close").should("be.visible");

    //Select Questions:
    cy.get(".modal-body").within(() => {
      cy.get(":nth-child(1) > .d-flex > .border").wait(1000)
        .contains("Overseas Pensions")
        .click();
      cy.get("img").should("be.visible");

      cy.get(":nth-child(2) > .d-flex > .border").wait(1000)
        .contains("Sole Trader Income")
        .click();
      cy.get("img").should("be.visible");

      cy.get(":nth-child(3) > .d-flex > .border").wait(1000)
        .contains("Partnership Income")
        .click();
      cy.get("img").should("be.visible");

      cy.get(":nth-child(4) > .d-flex > .border").wait(1000)
      .contains(
        "Centrelink Payments/Benefits"
      )
      cy.get('svg[viewBox="0 0 512 512"]')
            .trigger("mouseover");

      cy.get("img").should("be.visible");
      cy.get('svg[stroke="currentColor"][fill="currentColor"]').click();

      cy.get(":nth-child(5) > .d-flex > .border").wait(1000)
        .contains("Lifetime/Defined Benefit Super Pensions")
        .click();
      cy.get("img").should("be.visible");

      cy.get(":nth-child(6) > .d-flex > .border").wait(1000)
        .contains("Employment Income")
        .click();
        cy.get("img").should("be.visible");
    });

    // // Test for the "Close" button
    cy.get("button")
      .contains("Close")
      .should("be.visible")
      .and("not.be.disabled");
    // Test for the "Submit" button
    cy.get("button")
      .contains("Submit")
      .should("be.visible")
      .and("not.be.disabled")
      .click();










    // cy.get(":nth-child(1) > .py-4").contains("Employement Income");
    // cy.get(":nth-child(1) > .py-4 > .QuestionIcon > .img-fluid").should(
    //   "be.visible"
    // );

    // cy.get(
    //   ":nth-child(1) > .py-4 > :nth-child(3) > .col-12 > .d-flex > .mb-0"
    // ).click();

    // //Employment Income Card
    // cy.get(".modal-header").contains("Employement Income").should("be.visible");
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
    //   cy.get("#occupation").type("Occupation").should("be.visible");

    //   // Checking if 'Employment Status' is visible and clicking the dropdown
    //   cy.contains("Employment Status").should("be.visible");

    //   cy.get("#employmentStatus").select("Full Time"); // Select "Full Time" option by text

    //   cy.contains("Name of Company");
    //   cy.get("#nameOfCompany").type("Software Company");

    //   cy.contains("Start Date");
    //   cy.get("#startDate").type("06/11/2024").should("exist");

    //   cy.contains("Hours Worked");
    //   cy.get("#hoursWorked").type("65").should("be.visible");

    //   cy.contains("Salary Package");
    //   cy.get(".text-center > #button-addon2").click();

    //   //Sallery Package Card :
    //   // cy.get('[style="display: block;"] > .modal-dialog > .modal-content').contains('Salary Package')
    //   // cy.get('[style="display: block;"] > .modal-dialog > .modal-content > .modal-header > .btn-close').should('be.visible')

    //     cy.contains('lable','Remuneration Type')
    //     cy.get('#remunerationType').select('Gross Salary').should('be.visible')
    //     cy.contains('Amount')
    //     cy.get('#amount').type('54').should('be.visible')
    //     cy.contains('SG')
    //     cy.get('#SG').type('32')
    //     cy.contains('Gross Salary')
    //     cy.get('#grossSalary').should('not.have.value', '').and('match', /^\d+(\.\d+)?$/);
    //     cy.contains('SGC').
    //     cy.contains('Salary Sarifice Contributions')
    //     cy.contains('After Tax Contributions')

    //   cy.contains("Salary Packaging");
    //   cy.get(':nth-child(8) > .d-flex > .form-check > .radioButton2 > .tableNoLabel > span')
    //     .contains("No")
    //     .click();

    //   cy.contains("Leave entitlements");
    //   cy.get(':nth-child(9) > .d-flex > .form-check > .radioButton2 > .tableNoLabel > span')
    //     .contains("No")
    //     .click();

    //   cy.contains("Choice of Fund");
    //   cy.get(':nth-child(10) > .d-flex > .form-check > .radioButton2 > .tableNoLabel > span')
    //     .contains("No")
    //     .click();
    // });
    // cy.get('.modal-footer').within(()=>{
    //   cy.contains('Submit').should('be.visible').click();

    // });



    //Sole Trader

    cy.get(":nth-child(2) > .py-4")
      .should("be.visible")
      .within(() => {
        cy.contains("Sole Trader");
        cy.get("img");

        cy.get(
          "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
        ).click();

        //Cards
      });
    //Header
    cy.get(".modal-header").contains("Sole Trader");
    cy.get(".btn-close").should("be.visible");
    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");

      cy.get(".css-1xc3v61-indicatorContainer").click();
    });
    cy.get("#react-select-2-option-0").click();

    cy.get(".css-1lcv7hw").should("be.visible");

    //Card Slection :
    cy.contains("Owner").should("be.visible");
    cy.get("tbody > tr > :nth-child(1)").should("be.visible");

    cy.contains("Business Name").should("be.visible");
    cy.get("#businessName").type("FTS").should("be.visible");

    cy.contains("ABN").should("be.visible");
    cy.get("#ABN").type("64").should("be.visible");

    cy.contains("Business Address").should("be.visible");
    cy.get("#businessAddress").type("Grow Work").should("be.visible");

    cy.contains("Net Business Income").should("be.visible");
    cy.get("#netBusinessIncome").type("56745").should("be.visible");

    cy.contains("Goodwill/Business Valuation").should("be.visible");
    cy.get("#goodWill").type("896");
    //Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });
    //nputBox;
    cy.get("#clientincomeFromSoleTrader").should("not.have.value", ""); // Ensure it's not empty

    //Partnership

    cy.get(":nth-child(3) > .py-4").within(() => {
      cy.contains("Partnership");
      cy.get("img");
    });
    cy.get(":nth-child(3) > .py-4 > :nth-child(3) > .col-12 > .d-flex > .mb-0")
      .click()
      .should("be.visible");

    //Card Header
    cy.get(".modal-header").contains("Partnership");
    cy.get(".btn-close").should("be.visible");
    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");
      cy.get(".css-1xc3v61-indicatorContainer").click();
    });
    cy.get('#react-select-3-option-0').click();
    cy.get(".css-1lcv7hw").should("be.visible");

    //Card Selection
    cy.contains("Owner").should("be.visible");
    // Assert the input field has a value and is disabled
    cy.get("tbody > tr > :nth-child(1)").should("be.visible");

    cy.contains("Business Name").should("be.visible");
    cy.get("#businessName").type("FTS").should("be.visible");

    cy.contains("ABN").should("be.visible");
    cy.get("#ABN").type("896").should("be.visible");

    cy.contains("Business Address").should("be.visible");
    cy.get("#businessAddress").type("Grow Work").should("be.visible");

    cy.contains("Total Net Partnership income").should("be.visible");
    cy.get("#totalNetPartnershipIncome").type("896").should("be.visible");

    cy.contains("Share of Partnership %").should("be.visible");
    cy.get("#shareOfPartnership").type("6").should("be.visible");

    cy.contains("Share").should("be.visible");
    cy.get("#share").should("not.have.value", "");

    cy.contains("Goodwill/Business Valuation").should("be.visible");
    cy.get("#goodWill").type("896");

    //Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientincomeFromPartnership").should("not.have.value", "");

    //Centerlink Payments

    cy.get(":nth-child(4) > .py-4").within(() => {
      cy.contains("Centerlink Payments");
      cy.get("img");
    });
    cy.get(":nth-child(4) > .py-4 > :nth-child(3) > .col-12 > .d-flex > .mb-0")
      .click()
      .should("be.visible");

    //Card Header
    cy.get(".modal-header").contains("Centerlink Payments");
    cy.get(".btn-close").should("be.visible");
    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");
      cy.get(".css-1xc3v61-indicatorContainer").click();
    });
    cy.get('#react-select-4-option-0').click();
    cy.get(".css-1lcv7hw").should("be.visible");

    //Card Selection
    cy.contains("Owner").should("be.visible");
    // Assert the input field has a value and is disabled
    cy.get("tbody > tr > :nth-child(1)").should("be.visible");

    cy.contains("CRN").should("be.visible");
    cy.get("#CRN").type("65").should("be.visible");

    cy.contains("Payment Type").should("be.visible");
    cy.get(
      ":nth-child(3) > .css-b62m3t-container > .css-1dq17ye-control > .css-d07bj1 > .css-1xc3v61-indicatorContainer"
    ).click();

    cy.get(".css-kva4ii-control > .css-1f8fajx > .css-1lx7dxn").type(
      "Age Pension"
    );
    cy.get('#react-select-5-option-0').contains("Age Pension").click();

    cy.contains("Fortnightly Payment").should("be.visible");
    cy.get("#fortnightlyPayment").type("987").should("be.visible");

    cy.contains("Annual Payment Amount").should("be.visible");
    cy.get("#annualPaymentAmount").type("896").should("be.visible");

    cy.contains("Centrelink Cards Held").should("be.visible");
    cy.get(".css-1f8fajx > .css-1lx7dxn")
      .type("Low Income Card")
      .should("be.visible");
      cy.get('#react-select-6-option-1').click();

    //Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientincomeFromCentrelink").should("not.have.value", "");

    //Centerlink Payments

    cy.get(":nth-child(5) > .py-4").within(() => {
      cy.contains("LifeTime Benefits");
      cy.get("img");
    });
    cy.get(":nth-child(5) > .py-4 > :nth-child(3) > .col-12 > .d-flex > .mb-0")
      .click()
      .should("be.visible");

    //Card Header
    cy.get(".modal-header").contains("LifeTime Benefits");
    cy.get(".btn-close").should("be.visible");
    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");
      cy.get(".css-1xc3v61-indicatorContainer").click();
    });
    cy.get('#react-select-7-option-0').click();
    cy.get(".css-1lcv7hw").should("be.visible");

    //LifeTime Benefits Card
    cy.contains("Owner").should("be.visible");
    // Assert the input field has a value and is disabled
    cy.get("tbody > tr > :nth-child(1)").should("be.visible");

    cy.contains("Fund Name").should("be.visible");
    cy.get(".css-13n1d3b > .css-1lx7dxn").type("PSS");
    cy.get('#react-select-8-option-1').contains("PSS").click();

    cy.contains("Regular Income per Fortnight").should("be.visible");

    cy.get("#regularIncomePerFortnight").type("789");

    cy.contains("Regular Income p.a").should("be.visible");
    cy.get("#regularIncomePA").should("be.visible");

    cy.contains("Centrelink Deductible Amount").should("be.visible");
    cy.get("#centrelinkDeductibleAmount").type("896").should("be.visible");

    cy.contains("Is Pension Tax Fee").should("be.visible");
    cy.get(".radioButton2").contains("Yes").click();

    //Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientincomeFromSuperPayment").should("not.have.value", "");

    //Overseas Pension

    cy.get(":nth-child(5) > .py-4").within(() => {
      cy.contains("LifeTime Benefits");
      cy.get("img");
    });
    cy.get(":nth-child(6) > .py-4 > :nth-child(3) > .col-12 > .d-flex > .mb-0")
      .click()
      .should("be.visible");

    //Card Header
    cy.get(".modal-header").contains("Overseas Pension");
    cy.get(".btn-close").should("be.visible");
    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");
      cy.get(".css-1xc3v61-indicatorContainer").click();
    });
    cy.get('#react-select-9-option-0').click();
    cy.get(".css-1lcv7hw").should("be.visible");

    //LifeTime Benefits Card
    cy.contains("Owner").should("be.visible");
    // Assert the input field has a value and is disabled
    cy.get("tbody > tr > :nth-child(1)").should("be.visible");

    cy.contains("Country").should("be.visible");
    cy.get("#country").type("Pakistan");

    cy.contains("Regular Income p.a").should("be.visible");

    cy.get("#regularIncomePA").type("789");

    //Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientincomeFromOverseasPension").should("not.have.value", "");
  }
}

export default PersonalIncomeAndExpense;
