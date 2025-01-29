// e2e/Cash Flow/Income & Expenses.cy.js
class ClientIncomeAndExpenses {
  section() {
    cy.visit("http://ec2-3-25-227-176.ap-southeast-2.compute.amazonaws.com/");

    cy.get("img").click();
    cy.get(
      ".mx-0 > .Custom_Accordion > .accordion-item > .accordion-header > .accordion-button"
    ).click();
    cy.get(
      ":nth-child(6) > :nth-child(7) > :nth-child(1) > div > button"
    ).click();
    cy.contains("Edit").click();
    cy.wait(2000);
    cy.get(
      "li.m-0.p-0 > .Custom_Accordion > .accordion-item > .accordion-header > .accordion-button"
    ).click();
    cy.get("#cashFlow").click();

    cy.get(":nth-child(6) > .accordion-header > .accordion-button").click();
    cy.get(
      ":nth-child(6) > .accordion-collapse > .accordion-body > :nth-child(1) > :nth-child(1) > :nth-child(3) > .mt-4 > .table-responsive > .table > tbody > tr > :nth-child(6) > .ant-dropdown-trigger"
    ).click();
    cy.get(".ant-dropdown-menu").within(() => {
      cy.contains("Edit").click();
    });
    cy.wait(3000);

    cy.get(".btn").click();

    // //Overseas Pension
    // cy.wait(2000);
    // cy.get(":nth-child(1) > .py-4").within(() => {
    //   cy.contains("Overseas Pensions");
    //   cy.contains("Aiden Smith");
    //   cy.get("img");
    // });
    // cy.get(
    //   ":nth-child(1) > .py-4 > .flex-column > .row > .col-12 > .d-flex > .mb-0"
    // )
    //   .click()
    //   .should("be.visible");

    // //Card Header

    // //Use only for remove partner When Run code with Client only
    // cy.get(":nth-child(2) > .css-v7duua").click();

    // cy.get(".modal-header").contains("Overseas Pensions");
    // cy.get(".btn-close").should("be.visible");
    // cy.get(".col-md-12 > .d-flex").within(() => {
    //   cy.contains("Owner");
    //   cy.get(".css-9jq23d").contains("Aiden Smith");
    // });

    // cy.get(".table").within(() => {
    //   cy.contains("Owner").should("be.visible");

    //   cy.contains("Aiden Smith").should("be.visible");

    //   cy.contains("Other Taxable Income").should("be.visible");
    //   cy.get("#otherTaxableIncome").should("have.value", "$789");

    //   cy.contains("Include From Year").should("be.visible");
    //   cy.get(":nth-child(3) > .form-select").should("have.value", "1");

    //   cy.contains("Up Until Year").should("be.visible");
    //   cy.get(":nth-child(4) > .form-select").should("have.value", "30");

    //   cy.contains("Indexation").should("be.visible");
    //   cy.get(":nth-child(5) > .form-select").should("have.value", "2.50%");
    // });

    // //Overseas Pension Footer
    // cy.get(".modal-footer").within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });

    // cy.get("#clientcf_incomeFromOverseas").should("have.value", "$789");

    // //Sole Trader Income
    // cy.wait(2000);
    // cy.get(":nth-child(2) > .py-4").within(() => {
    //   cy.contains("Sole Trader Income");
    //   cy.contains("Aiden Smith");
    //   cy.get("img");
    // });
    // cy.get(
    //   ":nth-child(2) > .py-4 > .flex-column > .row > .col-12 > .d-flex > .mb-0"
    // )
    //   .click()
    //   .should("be.visible");

    // //Card Header
    // //Use only for remove partner When Run code with Client only
    // cy.get(":nth-child(2) > .css-v7duua").click();
    // cy.get(".modal-header").contains("Sole Trader Income");
    // cy.get(".btn-close").should("be.visible");
    // cy.get(".col-md-12 > .d-flex").within(() => {
    //   cy.contains("Owner");
    //   cy.get(".css-9jq23d").contains("Aiden Smith");
    // });

    // cy.get(".table").within(() => {
    //   cy.contains("Owner").should("be.visible");

    //   cy.contains("Aiden Smith").should("be.visible");

    //   cy.contains("Net Business Income").should("be.visible");
    //   cy.get("#netBusinessIncome").should("have.value", "$56,745");

    //   cy.contains("Include From Year").should("be.visible");
    //   cy.get(":nth-child(3) > .form-select").should("have.value", "1");

    //   cy.contains("Up Until Year").should("be.visible");
    //   cy.get(":nth-child(4) > .form-select").should("have.value", "30");

    //   cy.contains("Indexation").should("be.visible");
    //   cy.get(":nth-child(5) > .form-select").should("have.value", "2.50%");
    // });

    // //Sole Trader Income Footer
    // cy.get(".modal-footer").within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });

    // cy.get("#clientcf_incomeFromSoleTrade").should("have.value", "$56,745");

    // //PartnerShip Income

    // cy.wait(2000);
    // cy.get(":nth-child(3) > .py-4").within(() => {
    //   cy.contains("Partnership Income");
    //   cy.contains("Aiden Smith");
    //   cy.get("img");
    // });
    // cy.get(
    //   ":nth-child(3) > .py-4 > .flex-column > .row > .col-12 > .d-flex > .mb-0"
    // )
    //   .click()
    //   .should("be.visible");

    // //Card Header

    // //Use only for remove partner When Run code with Client only
    // cy.get(":nth-child(2) > .css-v7duua").click();
    // cy.get(".modal-header").contains("Partnership Income");
    // cy.get(".btn-close").should("be.visible");
    // cy.get(".col-md-12 > .d-flex").within(() => {
    //   cy.contains("Owner");
    //   cy.get(".css-9jq23d").contains("Aiden Smith");
    // });

    // cy.get(".table").within(() => {
    //   cy.contains("Owner").should("be.visible");

    //   cy.contains("Aiden Smith").should("be.visible");

    //   cy.contains("Net Business Income").should("be.visible");
    //   cy.get("#netBusinessIncome").should("have.value", "$896");

    //   cy.contains("Include From Year").should("be.visible");
    //   cy.get(":nth-child(3) > .form-select").should("have.value", "1");

    //   cy.contains("Up Until Year").should("be.visible");
    //   cy.get(":nth-child(4) > .form-select").should("have.value", "30");

    //   cy.contains("Indexation").should("be.visible");
    //   cy.get(":nth-child(5) > .form-select").should("have.value", "2.50%");
    // });

    // //PartnerShip Income Footer
    // cy.get(".modal-footer").within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });

    // cy.get("#clientcf_incomeFromPartnership").should("have.value", "$896");

    // //Centrelink Payments/Benefits
    // cy.wait(2000);
    // cy.get(":nth-child(4) > .py-4").within(() => {
    //   cy.contains("Centrelink Payments/Benefits");
    //   cy.contains("Aiden Smith");
    //   cy.get("img");
    // });
    // cy.get(
    //   ":nth-child(4) > .py-4 > .flex-column > .row > .col-12 > .d-flex > .mb-0"
    // )
    //   .click()
    //   .should("be.visible");

    // //Card Header
    // // Use only for remove partner When Run code with Client only
    // cy.get(":nth-child(2) > .css-v7duua").click();
    // cy.get(".modal-header").contains("Centrelink Payments/Benefits");
    // cy.get(".btn-close").should("be.visible");
    // cy.get(".col-md-12 > .d-flex").within(() => {
    //   cy.contains("Owner");
    //   cy.get(".css-9jq23d").contains("Aiden Smith");
    // });

    // cy.get(".table").within(() => {
    //   cy.contains("Owner").should("be.visible");

    //   cy.contains("Aiden Smith").should("be.visible");

    //   cy.contains("Centrelink Payment").should("be.visible");
    //   cy.get(
    //     "tr > :nth-child(2) > .css-b62m3t-container > .css-14gfs0a-control > .css-1lcv7hw > .css-1p3m7a8-multiValue > .css-9jq23d"
    //   )
    //     .contains("Age Pension")
    //     .should("be.visible");

    //   cy.contains("Include From Year").should("be.visible");
    //   cy.get(".form-select").should("have.value", "1");

    //   cy.contains("Allow Carer Allowance").should("be.visible");
    //   cy.get(
    //     ":nth-child(4) > .css-b62m3t-container > .css-14gfs0a-control > .css-1lcv7hw > .css-1p3m7a8-multiValue > .css-9jq23d"
    //   )
    //     .contains("Age Pension")
    //     .should("be.visible");

    //   cy.contains("Is Client Renting").should("be.visible");
    //   cy.get(
    //     ":nth-child(5) > .css-b62m3t-container > .css-14gfs0a-control > .css-1lcv7hw > .css-1p3m7a8-multiValue > .css-9jq23d"
    //   )
    //     .contains("Age Pension")
    //     .should("be.visible");

    //   cy.contains("Apply Separated By illness").should("be.visible");
    //   cy.get(".radioButton2").contains("No").click();
    // });

    // // Centrelink Payments/Benefits Footer
    // cy.get(".modal-footer").within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });

    // cy.get("#clientcf_incomeFromCentrelink").should("have.value", "Year 1");

    // //Lifetime Benefits
    // cy.wait(2000);
    // cy.get(":nth-child(3) > .py-4").within(() => {
    //   cy.contains("Partnership Income");
    //   cy.contains("Aiden Smith");
    //   cy.get("img");
    // });
    // cy.get(
    //   ":nth-child(5) > .py-4 > .flex-column > .row > .col-12 > .d-flex > .mb-0"
    // )
    //   .click()
    //   .should("be.visible");

    // //Card Header
    // // Use only for remove partner When Run code with Client only
    // cy.get(":nth-child(2) > .css-v7duua").click();
    // cy.get(".modal-header").contains("Lifetime Benefits");
    // cy.get(".btn-close").should("be.visible");
    // cy.get(".col-md-12 > .d-flex").within(() => {
    //   cy.contains("Owner");
    //   cy.get(".css-9jq23d").contains("Aiden Smith");
    // });

    // cy.get(".table").within(() => {
    //   cy.contains("Owner").should("be.visible");

    //   cy.contains("Aiden Smith").should("be.visible");

    //   cy.contains("Lifetime Pension Income").should("be.visible");
    //   cy.get("#lifetimePensionIncome").should("have.value", "$20,514");

    //   cy.contains("Include From Year").should("be.visible");
    //   cy.get(":nth-child(3) > .form-select").should("have.value", "1");

    //   cy.contains("Up Until Year").should("be.visible");
    //   cy.get(":nth-child(4) > .form-select").should("have.value", "30");

    //   cy.contains("Indexation").should("be.visible");
    //   cy.get(":nth-child(5) > .form-select").should("have.value", "2.50%");

    //   cy.contains("Tax-Free").should("be.visible");
    //   cy.get(".radioButton2").contains("Yes").click();

    //   cy.contains("Centrelink Deductible Amount").should("be.visible");
    //   cy.get("#centrelinkDeductibleAmount").should("have.value", "$896");
    // });

    // // Lifetime Benefits Footer
    // cy.get(".modal-footer").within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });

    // cy.get("#clientcf_incomeFromLifeTimePension").should(
    //   "have.value",
    //   "$20,514"
    // );

    // //Employment Income
    // cy.wait(2000);
    // cy.get(":nth-child(6) > .py-4").within(() => {
    //   cy.contains("Employment Income");
    //   cy.get("img");

    //   cy.get(
    //     "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
    //   ).click(); // Or any other interaction you want
    // });

    // //Employment Income Card

    // cy.contains("Employment Income").should("be.visible");
    // cy.get(".btn-close").should("be.visible");

    // //Remove Partner
    // cy.get(":nth-child(2) > .css-v7duua").click();
    // cy.contains("Aiden Smith");

    // //In Table
    // cy.get(".table-responsive").within(() => {
    //   cy.contains("Owner").should("be.visible");
    //   cy.contains("Aiden Smith").should("be.visible");

    //   cy.contains("Salary Income").should("be.visible");
    //   cy.get("#salaryIncome").should("have.value", "$54");

    //   cy.contains("Include From Year").should("be.visible");
    //   cy.get(":nth-child(3) > .form-select").should("have.value", "1");

    //   cy.contains("Up Until Year");
    //   cy.get(":nth-child(4) > .form-select").should("have.value", "30");
    //   cy.contains("Indexation");
    //   cy.get(":nth-child(5) > .form-select").should("have.value", "2.50%");
    // });

    // //Sallery Package Card :
    // cy.get("thead > tr > :nth-child(6)").contains("Reduced Salary Income");
    // cy.get(":nth-child(6) > .form-check > .radioButton2")
    //   .contains("Yes")
    //   .click();
    // cy.get("tbody > tr > :nth-child(6)").within(() => {
    //   cy.get("#button-addon2").click();
    // });

    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header > .btn-close'
    // ).should("be.visible");
    // //Inner Tabel
    // cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
    //   () => {
    //     cy.contains("Reduced Salary Income");

    //     Cypress.on("uncaught:exception", (err, runnable) => {
    //       return false;
    //     });

    //     cy.contains("Owner");
    //     cy.contains("Aiden Smith");

    //     cy.contains("Reduced Salary Income");
    //     cy.get("#reducedSalaryIncome").clear().type("54").should("be.visible");

    //     cy.contains("Include From Year");
    //     cy.get("#includeFromYear").should("have.value", "1");

    //     cy.contains("Up Until Year");
    //     cy.get("#upUntilYear").should("have.value", "30");

    //     cy.contains("Submit").click();
    //   }
    // );

    // cy.contains("Salary Packaging");
    // cy.get(":nth-child(7) > .form-check > .radioButton2")
    //   .contains("Yes")
    //   .click();

    // cy.get("tbody > tr > :nth-child(7)").within(() => {
    //   cy.get(".d-flex > #button-addon2").click();
    // });

    // //Header
    // cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
    //   () => {
    //     cy.contains("Salary Packaging Car");
    //   }
    // );
    // //Table Salary Packaging

    // cy.get(
    //   ":nth-child(1) > :nth-child(1) > .row > .mt-4 > .table-responsive"
    // ).within(() => {
    //   cy.contains("Owner");

    //   cy.contains("Aiden Smith");

    //   cy.contains("Employer FBT Status");
    //   cy.get("#employerFBTStatus").select(
    //     "Full FBT/Rebatable/Exempt (17K Cap)"
    //   );

    //   cy.contains("Cost Base Of Car");
    //   cy.get("#costBaseOfCar").clear().type("486543").should("be.visible");

    //   cy.contains("FBT Paid By Employer");
    //   cy.get(".d-flex > .form-check > .radioButton2").contains("Yes").click();

    //   cy.contains("Include From Year");
    //   cy.get("#includeFromYear").should("have.value", "1");

    //   cy.contains("Up Until Year");
    //   cy.get("#upUntilYear").should("have.value", "30");

    //   cy.contains("Indexation");
    //   cy.get("#indexation").should("have.value", "2.50%");
    // });
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    // ).within(() => {
    //   cy.contains("Submit").click();
    //   cy.contains("Close");
    // });

    // cy.contains("Salary Packaging (Other)");
    // cy.get(":nth-child(8) > .form-check > .radioButton2")
    //   .contains("Yes")
    //   .click();
    // cy.get("tbody > tr > :nth-child(8)").within(() => {});
    // cy.get(":nth-child(8) > .d-flex > #button-addon2").click();

    // cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
    //   () => {
    //     cy.contains("Salary Packaging (Other)");

    //     cy.contains("Owner");
    //     cy.contains("Aiden Smith");

    //     cy.contains("Salary Packaging (Other)");
    //     cy.get("#salaryPackagingOther").select(
    //       "Full FBT/Rebatable/Exempt (17K Cap)"
    //     );

    //     cy.contains("GST Status");
    //     cy.get("#GSTStatus").should("have.value", "Without GST");

    //     cy.contains("Include From Year");
    //     cy.get("#includeFromYear").should("have.value", "1");

    //     cy.contains("Up Until Year");
    //     cy.get("#upUntilYear").should("have.value", "30");

    //     cy.contains("Submit").click();
    //   }
    // );

    // cy.contains("Close").should("be.visible");
    // cy.contains("Submit").should("be.visible").click();

    // cy.get("#clientcf_employmentIncome").should("not.have.value", "");

    // //Regular Living Expenses
    // cy.wait(2000);
    // cy.get(":nth-child(7) > .py-4").within(() => {
    //   cy.contains("Regular Living Expenses");
    //   cy.contains("Regular Living Expenses");
    //   cy.get("img");
    // });
    // cy.get(
    //   ":nth-child(7) > .py-4 > .flex-column > .row > .col-12 > .d-flex > .mb-0"
    // )
    //   .click()
    //   .should("be.visible");

    // //Card Header

    // cy.get(".modal-header").contains("Regular Living Expenses");
    // cy.get(".btn-close").should("be.visible");

    // cy.get(".table").within(() => {
    //   cy.contains("Owner").should("be.visible");

    //   cy.contains("Aiden Smith").should("be.visible");

    //   cy.contains("Expenses").should("be.visible");
    //   cy.get(":nth-child(2) > .form-select").select("Living Expenses");

    //   cy.contains("Amount").should("be.visible");
    //   cy.get("#amount").clear().type("$20514");

    //   cy.contains("Include From Year").should("be.visible");
    //   cy.get(":nth-child(4) > .form-select").should("have.value", "1");

    //   cy.contains("Up Until Year").should("be.visible");
    //   cy.get(":nth-child(5) > .form-select").should("have.value", "30");

    //   cy.contains("Indexation").should("be.visible");
    //   cy.get(":nth-child(6) > .form-select").should("have.value", "2.50%");
    // });

    // // Lifetime Benefits Footer
    // cy.get(".modal-footer").within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });

    // cy.get("#clientcf_incomeFromRegularLivingExpense").should(
    //   "have.value",
    //   "$20,514"
    // );

    // //Business Income
    // cy.wait(2000);
    // cy.get(':nth-child(7) > .py-4').within(() => {
    //   cy.contains("Business Income");
    //   cy.contains("Aiden Smith");
    //   cy.get("img");
    // });
    // cy.get(':nth-child(7) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0')
    //   .click()
    //   .should("be.visible");

    // //Card Header
    // //Use only for remove partner When Run code with Client only

    // cy.get(".modal-header").contains("Business Income");
    // cy.get(".btn-close").should("be.visible");
    // cy.get(".col-md-12 > .d-flex").within(() => {
    //   cy.contains("Owner");
    //  // cy.get(':nth-child(2) > .css-v7duua').click();
    //   cy.get('.css-1lx7dxn').type("Aiden Smith{enter}")
    // });

    // cy.get(".table").within(() => {
    //   cy.contains("Owner").should("be.visible");

    //   cy.contains("Aiden Smith").should("be.visible");

    //   cy.contains("Lifetime Pension Income").should("be.visible");
    //   cy.get('#lifetimePensionIncome').clear().type("100")

    //   cy.contains("Include From Year").should("be.visible");
    //   cy.get(':nth-child(3) > .form-select').should("have.value", "1");

    //   cy.contains("Up Until Year").should("be.visible");
    //   cy.get(':nth-child(4) > .form-select').should("have.value", "30");

    //   cy.contains("Indexation").should("be.visible");
    //  cy.get(':nth-child(5) > .form-select').should("have.value", "2.50%");
    // });

    // //Business Income Footer
    // cy.get(".modal-footer").within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });

    // cy.get('#clientcf_incomeFromBusiness').should("have.value", "$100");

    // //Other Non-Taxable
    // cy.wait(2000);
    // cy.get(':nth-child(8) > .py-4').within(() => {
    //   cy.contains("Other Non-Taxable");
    //   cy.contains("Aiden Smith");
    //   cy.get("img");
    // });
    // cy.get(':nth-child(8) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0')
    //   .click()
    //   .should("be.visible");

    // //Card Header
    // //Use only for remove partner When Run code with Client only

    // cy.get(".modal-header").contains("Other Non-Taxable");
    // cy.get(".btn-close").should("be.visible");
    //Remove Partner
    // cy.get(".col-md-12 > .d-flex").within(() => {
    //   cy.contains("Owner");
    //   cy.get(':nth-child(2) > .css-v7duua').click();
    //   cy.get('.css-1lx7dxn').type("Aiden Smith{enter}")
    // });

    // cy.get(".table").within(() => {
    //   cy.contains("Owner").should("be.visible");

    //   cy.contains("Aiden Smith").should("be.visible");

    //   cy.contains("Other None Taxable Income").should("be.visible");
    //   cy.get('#otherNoneTaxableIncome').clear().type("100")

    //   cy.contains("Include From Year").should("be.visible");
    //   cy.get(':nth-child(3) > .form-select').should("have.value", "1");

    //   cy.contains("Up Until Year").should("be.visible");
    //   cy.get(':nth-child(4) > .form-select').should("have.value", "30");

    //   cy.contains("Indexation").should("be.visible");
    //   cy.get(':nth-child(5) > .form-select').should("have.value", "2.50%");
    // });

    // //Other Non-Taxable Footer
    // cy.get(".modal-footer").within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });

    // cy.get('#clientcf_incomeFromOtherNonTaxable').should("have.value", "$100");

    //Education Expenses

    cy.wait(2000);
    cy.get(":nth-child(10) > .py-4").within(() => {
      cy.contains("Education Expenses");
      cy.contains("Education Expenses");

      cy.get("img");
    });

    cy.get(
      ":nth-child(10) > .py-4 > .flex-column > .row > .col-12 > .d-flex > .mb-0"
    )
      .click()
      .should("be.visible");

    cy.get(".modal-header").contains("Education Expenses");

    cy.contains("How many children do you have :");
    cy.get("#numberOfChildren").clear().type("1");

    cy.get(".table").within(() => {
      cy.contains("No#").should("be.visible");

      cy.contains("1").should("be.visible");

      cy.contains("Name");
      cy.get("#Name0").type("Aiden Smith");

      cy.contains("Dob").should("be.visible");
      cy.get("#DOB0").clear().type("10/1/2012");

      cy.contains("Age");
      cy.get("#age0").should("have.value", "13");

      cy.contains("Child Support Received ($)");
      cy.get("#childSupportReceived0").clear().type("1986");

      cy.contains("Paid or Received");
      cy.get("#paidOrReceived0").select("Paid").should("have.value", "Paid");

      cy.contains("Primary");
      cy.get("#primary0").clear().type("19").should("have.value", "$19");

      cy.contains("Secondary").should("be.visible");
      cy.get("#secondary0").clear().type("400").should("have.value", "$400");

      cy.contains("Uni ($)");
      cy.get("#uni0").clear().type("2341");

      cy.contains("Course Years");
      cy.get("#courseYears0").select("10").should("have.value", "10");

      cy.contains("Indexation");
      cy.get("#indexation0").select("2.50%").should("have.value", "2.50%");
    });

    //Education Expenses Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientcf_incomeFromEducation").should("have.value", "$1,986");
  }
}
export default ClientIncomeAndExpenses;
