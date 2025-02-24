// e2e/Cash Flow/Income & Expenses.cy.js
class PartnerIncomeAndExpenses {
  section() {
    cy.visit("http://ec2-54-66-20-19.ap-southeast-2.compute.amazonaws.com/");

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

    //Overseas Pension
    cy.wait(2000);
    cy.get(":nth-child(1) > .py-4").within(() => {
      cy.contains("Overseas Pensions");
      cy.contains("Aiden Smith");
      cy.get("img");
    });
    cy.get(
      ":nth-child(1) > .py-4 > .flex-column > .row > .col-12 > .d-flex > .mb-0"
    )
      .click()
      .should("be.visible");

    //Card Header

    cy.get(".modal-header").contains("Overseas Pensions");
    cy.get(".btn-close").should("be.visible");
    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");
      cy.get(".css-9jq23d").contains("Aiden Smith");
    });

    cy.get(".table").within(() => {
      cy.contains("Owner").should("be.visible");

      cy.contains("Aiden Smith").should("be.visible");

      cy.contains("Other Taxable Income").should("be.visible");
      cy.get("#otherTaxableIncome").should("have.value", "$789");

      cy.contains("Include From Year").should("be.visible");
      cy.get(":nth-child(3) > .form-select").should("have.value", "1");

      cy.contains("Up Until Year").should("be.visible");
      cy.get(":nth-child(4) > .form-select").should("have.value", "30");

      cy.contains("Indexation").should("be.visible");
      cy.get(":nth-child(5) > .form-select").should("have.value", "2.50%");
    });

    cy.wait(2000);
    //PartnerShip Section :
    //cy.get(":nth-child(2) > .css-v7duua").click();

    cy.get(".css-1lcv7hw").type("Emma Taylor{enter}");

    cy.get(".table").within(() => {
      cy.get(":nth-child(2) > :nth-child(1) > th").contains("Emma Taylor");

      cy.get(":nth-child(2) > :nth-child(2) > #otherTaxableIncome")
        .clear()
        .type("$789")
        .should("have.value", "$789");
      cy.get(":nth-child(2) > :nth-child(3) > .form-select")
        .select("1")
        .should("have.value", "1");
      cy.get(":nth-child(2) > :nth-child(4) > .form-select")
        .select("30")
        .should("have.value", "30");
      cy.get(":nth-child(2) > :nth-child(5) > .form-select")
        .select("2.50%")
        .should("have.value", "2.50%");
    });

    //Overseas Pension Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientcf_incomeFromOverseas").should("have.value", "$789");
    cy.get("#partnercf_incomeFromOverseas").should("have.value", "$789");

    //Sole Trader Income
    cy.wait(2000);
    cy.get(":nth-child(2) > .py-4").within(() => {
      cy.contains("Sole Trader Income");
      cy.contains("Aiden Smith");
      cy.get("img");
    });
    cy.get(
      ":nth-child(2) > .py-4 > .flex-column > .row > .col-12 > .d-flex > .mb-0"
    )
      .click()
      .should("be.visible");

    //Card Header

    cy.get(".modal-header").contains("Sole Trader Income");
    cy.get(".btn-close");
    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");
      cy.get(".css-9jq23d").contains("Aiden Smith");
    });

    cy.get(".table").within(() => {
      cy.contains("Owner").should("be.visible");

      cy.contains("Aiden Smith").should("be.visible");

      cy.contains("Net Business Income").should("be.visible");
      cy.get("#netBusinessIncome").should("have.value", "$56,745");

      cy.contains("Include From Year").should("be.visible");
      cy.get(":nth-child(3) > .form-select").should("have.value", "1");

      cy.contains("Up Until Year").should("be.visible");
      cy.get(":nth-child(4) > .form-select").should("have.value", "30");

      cy.contains("Indexation").should("be.visible");
      cy.get(":nth-child(5) > .form-select").should("have.value", "2.50%");
    });

    cy.wait(2000);
    //PartnerShip Section :
    //use to remove partner
    // cy.get(":nth-child(2) > .css-v7duua").click();
    cy.get(".css-1lcv7hw").type("Emma Taylor{enter}");

    cy.get(".table").within(() => {
      cy.get(":nth-child(2) > :nth-child(1) > th").contains("Emma Taylor");

      cy.get(":nth-child(2) > :nth-child(2) > #netBusinessIncome")

        .clear()
        .type("$789")
        .should("have.value", "$789");
      cy.get(":nth-child(2) > :nth-child(3) > .form-select")
        .select("1")
        .should("have.value", "1");
      cy.get(":nth-child(2) > :nth-child(4) > .form-select")
        .select("30")
        .should("have.value", "30");
      cy.get(":nth-child(2) > :nth-child(5) > .form-select")
        .select("2.50%")
        .should("have.value", "2.50%");
    });

    //Sole Trader Income Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientcf_incomeFromSoleTrade").should("have.value", "$56,745");
    cy.get("#partnercf_incomeFromSoleTrade").should("have.value", "$789");

    //PartnerShip Income

    cy.wait(2000);
    cy.get(":nth-child(3) > .py-4").within(() => {
      cy.contains("Partnership Income");
      cy.contains("Aiden Smith");
      cy.get("img");
    });
    cy.get(
      ":nth-child(3) > .py-4 > .flex-column > .row > .col-12 > .d-flex > .mb-0"
    )
      .click()
      .should("be.visible");

    //Card Header

    //
    cy.get(".modal-header").contains("Partnership Income");
    cy.get(".btn-close").should("be.visible");
    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");
      cy.get(".css-9jq23d").contains("Aiden Smith");
    });

    cy.get(".table").within(() => {
      cy.contains("Owner").should("be.visible");

      cy.contains("Aiden Smith").should("be.visible");

      cy.contains("Net Business Income").should("be.visible");
      cy.get("#netBusinessIncome").should("have.value", "$896");

      cy.contains("Include From Year").should("be.visible");
      cy.get(":nth-child(3) > .form-select").should("have.value", "1");

      cy.contains("Up Until Year").should("be.visible");
      cy.get(":nth-child(4) > .form-select").should("have.value", "30");

      cy.contains("Indexation").should("be.visible");
      cy.get(":nth-child(5) > .form-select").should("have.value", "2.50%");
    });

    cy.wait(2000);
    //PartnerShip Section :
    //use to remove partner
    // cy.get(":nth-child(2) > .css-v7duua").click();
    cy.get(".css-1lcv7hw").type("Emma Taylor{enter}");

    cy.get(".table").within(() => {
      cy.get(":nth-child(2) > :nth-child(1) > th").contains("Emma Taylor");

      cy.get(":nth-child(2) > :nth-child(2) > #netBusinessIncome")

        .clear()
        .type("$789")
        .should("have.value", "$789");
      cy.get(":nth-child(2) > :nth-child(3) > .form-select")
        .select("1")
        .should("have.value", "1");
      cy.get(":nth-child(2) > :nth-child(4) > .form-select")
        .select("30")
        .should("have.value", "30");
      cy.get(":nth-child(2) > :nth-child(5) > .form-select")
        .select("2.50%")
        .should("have.value", "2.50%");
    });

    //PartnerShip Income Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientcf_incomeFromPartnership").should("have.value", "$896");
    cy.get("#partnercf_incomeFromPartnership").should("have.value", "$789");

    //Centrelink Payments/Benefits
    cy.wait(2000);
    cy.get(":nth-child(4) > .py-4").within(() => {
      cy.contains("Centrelink Payments/Benefits");
      cy.contains("Aiden Smith");
      cy.get("img");
    });
    cy.get(
      ":nth-child(4) > .py-4 > .flex-column > .row > .col-12 > .d-flex > .mb-0"
    )
      .click()
      .should("be.visible");

    //Card Header
    // Use only for remove partner When Run code with Client only
    //cy.get(":nth-child(2) > .css-v7duua").click();
    cy.get(".modal-header").contains("Centrelink Payments/Benefits");
    cy.get(".btn-close").should("be.visible");
    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");
      cy.get(".css-9jq23d").contains("Aiden Smith");
    });

    cy.get(".table").within(() => {
      cy.contains("Owner").should("be.visible");

      cy.contains("Aiden Smith").should("be.visible");

      cy.contains("Centrelink Payment").should("be.visible");
      cy.get(
        "tr > :nth-child(2) > .css-b62m3t-container > .css-14gfs0a-control > .css-1lcv7hw > .css-1p3m7a8-multiValue > .css-9jq23d"
      )
        .contains("Age Pension")
        .should("be.visible");

      cy.contains("Include From Year").should("be.visible");
      cy.get(".form-select").should("have.value", "1");

      cy.contains("Allow Carer Allowance").should("be.visible");
      cy.get(
        ":nth-child(4) > .css-b62m3t-container > .css-14gfs0a-control > .css-1lcv7hw > .css-1p3m7a8-multiValue > .css-9jq23d"
      )
        .contains("Age Pension")
        .should("be.visible");

      cy.contains("Is Client Renting").should("be.visible");
      cy.get(
        ":nth-child(5) > .css-b62m3t-container > .css-14gfs0a-control > .css-1lcv7hw > .css-1p3m7a8-multiValue > .css-9jq23d"
      )
        .contains("Age Pension")
        .should("be.visible");

      cy.contains("Apply Separated By illness").should("be.visible");
      cy.get(".radioButton2").contains("No").click();
    });

    //PartnerShip Section :

    cy.wait(2000);
    //use to remove partner

    cy.get(".css-1lcv7hw").first().type("Emma Taylor{enter}"); // Selects the first matching element

    cy.get("tbody > :nth-child(2) > :nth-child(2)").within(() => {
      cy.get(".css-1lx7dxn input").first().type("Age Pension{enter}");
    });

    cy.get(":nth-child(2) > :nth-child(3) > .form-select").select("1");
    //Allow Carer Allowance

    cy.get(
      ":nth-child(2) > :nth-child(4) > .css-b62m3t-container > .css-14gfs0a-control > .css-1lcv7hw"
    )
      .first()
      .type("Disability Pension{enter}");
    //	Is Client Renting
    cy.get(
      ":nth-child(2) > :nth-child(5) > .css-b62m3t-container > .css-14gfs0a-control > .css-d07bj1 > :nth-child(1)"
    ).type("Age Pension{enter}");

    cy.get(":nth-child(2) > :nth-child(6) > .form-check > .radioButton2")
      .contains("Yes")
      .click();

    // Centrelink Payments/Benefits Footerf
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientcf_incomeFromCentrelink").should("have.value", "Year 1");
    cy.get("#partnercf_incomeFromCentrelink").should("have.value", "Year 1");

    //Lifetime Benefits
    cy.wait(2000);
    cy.get(":nth-child(3) > .py-4").within(() => {
      cy.contains("Partnership Income");
      cy.contains("Aiden Smith");
      cy.get("img");
    });
    cy.get(
      ":nth-child(5) > .py-4 > .flex-column > .row > .col-12 > .d-flex > .mb-0"
    )
      .click()
      .should("be.visible");

    //Card Header
    cy.get(".modal-header").contains("Lifetime Benefits");
    cy.get(".btn-close").should("be.visible");
    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");
      cy.get(".css-9jq23d").contains("Aiden Smith");
    });

    cy.get(".table").within(() => {
      cy.contains("Owner").should("be.visible");

      cy.contains("Aiden Smith").should("be.visible");

      cy.contains("Lifetime Pension Income").should("be.visible");
      cy.get("#lifetimePensionIncome").should("have.value", "$20,514");

      cy.contains("Include From Year").should("be.visible");
      cy.get(":nth-child(3) > .form-select").should("have.value", "1");

      cy.contains("Up Until Year").should("be.visible");
      cy.get(":nth-child(4) > .form-select").should("have.value", "30");

      cy.contains("Indexation").should("be.visible");
      cy.get(":nth-child(5) > .form-select").should("have.value", "2.50%");

      cy.contains("Tax-Free").should("be.visible");
      cy.get(".radioButton2").contains("Yes").click();

      cy.contains("Centrelink Deductible Amount").should("be.visible");
      cy.get("#centrelinkDeductibleAmount").should("have.value", "$896");
    });

    cy.wait(2000);

    //PartnerShip Section :
    //use to remove partner
    // cy.get(":nth-child(2) > .css-v7duua").click();
    cy.get(".css-1lcv7hw").type("Emma Taylor{enter}");

    cy.get(".table").within(() => {
      cy.get(":nth-child(2) > :nth-child(1) > th").contains("Emma Taylor");

      cy.get(":nth-child(2) > :nth-child(2) > #lifetimePensionIncome")

        .clear()
        .type("$789")
        .should("have.value", "$789");
      cy.get(":nth-child(2) > :nth-child(3) > .form-select")
        .select("1")
        .should("have.value", "1");
      cy.get(":nth-child(2) > :nth-child(4) > .form-select")
        .select("30")
        .should("have.value", "30");
      cy.get(":nth-child(2) > :nth-child(5) > .form-select")
        .select("2.50%")
        .should("have.value", "2.50%");

      cy.get(":nth-child(2) > :nth-child(6) > .form-check > .radioButton2")
        .contains("Yes")
        .click();
      cy.get(":nth-child(2) > :nth-child(7) > #centrelinkDeductibleAmount")
        .clear()
        .type("9.50%");
    });
    // Lifetime Benefits Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientcf_incomeFromLifeTimePension").should(
      "have.value",
      "$20,514"
    );

    cy.get("#partnercf_incomeFromLifeTimePension").should("have.value", "$789");

    //Employment Income
    cy.wait(2000);
    cy.get(":nth-child(6) > .py-4").within(() => {
      cy.contains("Employment Income");
      cy.get("img");

      cy.get(
        "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
      ).click(); // Or any other interaction you want
    });

    //Employment Income Card

    cy.contains("Employment Income").should("be.visible");
    cy.get(".btn-close").should("be.visible");

    //Use to remove Partner :
    //cy.get(":nth-child(2) > .css-v7duua").click();
    cy.contains("Aiden Smith");

    //In Table
    cy.get(".table-responsive").within(() => {
      cy.contains("Owner").should("be.visible");
      cy.contains("Aiden Smith").should("be.visible");

      cy.contains("Salary Income").should("be.visible");
      cy.get("#salaryIncome").should("have.value", "$54");

      cy.contains("Include From Year").should("be.visible");
      cy.get(":nth-child(3) > .form-select").should("have.value", "1");

      cy.contains("Up Until Year");
      cy.get(":nth-child(4) > .form-select").should("have.value", "30");
      cy.contains("Indexation");
      cy.get(":nth-child(5) > .form-select").should("have.value", "2.50%");
    });

    //	Reduced Salary Income Card :
    cy.get("thead > tr > :nth-child(6)").contains("Reduced Salary Income");

    cy.get("tbody > :nth-child(1) > :nth-child(6)").within(() => {
      cy.contains("Yes").click();
      cy.get("#button-addon2").click();
    });
    // cy.get(":nth-child(6) > .form-check > .radioButton2")
    //   .contains("Yes")
    //   .click();
    // cy.get("tbody > tr > :nth-child(6)").within(() => {

    // });

    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header > .btn-close'
    ).should("be.visible");
    //Inner Tabel
    cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
      () => {
        cy.contains("Reduced Salary Income");

        Cypress.on("uncaught:exception", (err, runnable) => {
          return false;
        });

        cy.contains("Owner");
        cy.contains("Aiden Smith");

        cy.contains("Reduced Salary Income");
        cy.get("#reducedSalaryIncome").clear().type("54").should("be.visible");

        cy.contains("Include From Year");
        cy.get("#includeFromYear").should("have.value", "1");

        cy.contains("Up Until Year");
        cy.get("#upUntilYear").should("have.value", "30");

        cy.contains("Submit").click();
      }
    );

    //Salary Packaging

    cy.contains("Salary Packaging");

    cy.get("tbody > :nth-child(1) > :nth-child(7)").within(() => {
      cy.contains("Yes").click();

      cy.get(".d-flex > #button-addon2").click();
    });
    // cy.get(":nth-child(7) > .form-check > .radioButton2")
    //   .contains("Yes")
    //   .click();

    // cy.get("tbody > tr > :nth-child(7)").within(() => {

    // });

    //Header
    cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
      () => {
        cy.contains("Salary Packaging Car");
      }
    );
    //Table Salary Packaging Card

    cy.get(
      ":nth-child(1) > :nth-child(1) > .row > .mt-4 > .table-responsive"
    ).within(() => {
      cy.contains("Owner");

      cy.contains("Aiden Smith");

      cy.contains("Employer FBT Status");
      cy.get("#employerFBTStatus").select(
        "Full FBT/Rebatable/Exempt (17K Cap)"
      );

      cy.contains("Cost Base Of Car");
      cy.get("#costBaseOfCar").clear().type("486543").should("be.visible");

      cy.contains("FBT Paid By Employer");
      cy.get(".d-flex > .form-check > .radioButton2").contains("Yes").click();

      cy.contains("Running Costs of Car Packaged");
      cy.get("#runningCostsOfCarPackaged")
        .clear()
        .type("789")
        .should("be.visible");

      cy.contains("Include From Year");
      cy.get("#includeFromYear").should("have.value", "1");

      cy.contains("Up Until Year");
      cy.get("#upUntilYear").should("have.value", "30");

      cy.contains("Indexation");
      cy.get("#indexation").should("have.value", "2.50%");
    });
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    ).within(() => {
      cy.contains("Submit").click();
      cy.contains("Close");
    });

    //Salary Packaging (Other) Card :
    cy.contains("Salary Packaging (Other)");

    // cy.get("tbody > :nth-child(1) > :nth-child(8)").within(() => {
    //   cy.contains("Yes").click()
    //   cy.get(":nth-child(8) > .d-flex > #button-addon2").click();
    // });
    // // cy.get(":nth-child(8) > .form-check > .radioButton2")

    // // cy.get("tbody > tr > :nth-child(8)").within(() => {});

    cy.get(":nth-child(1) > :nth-child(8) > .form-check > .radioButton2")
      .contains("Yes")
      .click();
    // cy.get('tbody > :nth-child(1) > :nth-child(8)').within(() => {
    //   cy.get(':nth-child(8) > .d-flex > #button-addon2').click();
    // })
    cy.get(":nth-child(1) > :nth-child(8) > .d-flex > #button-addon2").click();

    cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
      () => {
        cy.contains("Salary Packaging (Other)");

        cy.contains("Owner");
        cy.contains("Aiden Smith");

        cy.contains("Salary Packaging (Other)");
        cy.get("#salaryPackagingOther").select(
          "Full FBT/Rebatable/Exempt (17K Cap)"
        );

        cy.contains("GST Status");
        cy.get("#GSTStatus").should("have.value", "Without GST");

        cy.contains("Include From Year");
        cy.get("#includeFromYear").should("have.value", "1");

        cy.contains("Up Until Year");
        cy.get("#upUntilYear").should("have.value", "30");

        cy.contains("Submit").click();
      }
    );

    cy.wait(2000);

    //PartnerShip Section :

    //use to remove partner

    cy.get(".css-1lcv7hw").type("Emma Taylor{enter}");

    cy.contains("Emma Taylor");

    cy.get(":nth-child(2) > :nth-child(2) > #salaryIncome")
      .clear()
      .type("$789")
      .should("have.value", "$789");

    cy.get(":nth-child(2) > :nth-child(3) > .form-select")
      .select("4")
      .should("have.value", "4");

    cy.get(":nth-child(2) > :nth-child(4) > .form-select")
      .select("9")
      .should("have.value", "9");

    cy.get(":nth-child(2) > :nth-child(5) > .form-select")
      .select("8.50%")
      .should("have.value", "8.50%");

    //	Partner Reduced Salary Income Card :

    cy.get(":nth-child(2) > :nth-child(6) > .form-check > .radioButton2")
      .contains("Yes")
      .click();
    cy.get("tbody > :nth-child(2) > :nth-child(6) > .d-flex").within(() => {});
    cy.get(":nth-child(2) > :nth-child(6) > .d-flex > #button-addon2").click();

    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header > .btn-close'
    ).should("be.visible");
    //Inner Tabel
    cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
      () => {
        cy.contains("Reduced Salary Income");

        Cypress.on("uncaught:exception", (err, runnable) => {
          return false;
        });

        cy.contains("Owner");
        cy.contains("Emma Taylor");

        cy.contains("Reduced Salary Income");
        cy.get("#reducedSalaryIncome").clear().type("54").should("be.visible");

        cy.contains("Include From Year");
        cy.get("#includeFromYear").should("have.value", "1");

        cy.contains("Up Until Year");
        cy.get("#upUntilYear").should("have.value", "30");

        cy.contains("Submit").click();
      }
    );

    //Salary Packaging

    cy.get(":nth-child(2) > :nth-child(7) > .form-check > .radioButton2")
      .contains("Yes")
      .click();

    cy.get(":nth-child(2) > :nth-child(7) > .d-flex > #button-addon2").click();

    //Header
    cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
      () => {
        cy.contains("Salary Packaging Car");
      }
    );
    //Table Salary Packaging Card

    cy.get(
      ":nth-child(1) > :nth-child(1) > .row > .mt-4 > .table-responsive"
    ).within(() => {
      cy.contains("Owner");

      cy.contains("Emma Taylor");

      cy.contains("Employer FBT Status");
      cy.get("#employerFBTStatus").select(
        "Full FBT/Rebatable/Exempt (17K Cap)"
      );

      cy.contains("Cost Base Of Car");
      cy.get("#costBaseOfCar").clear().type("486543").should("be.visible");

      cy.contains("FBT Paid By Employer");
      cy.get(".d-flex > .form-check > .radioButton2").contains("Yes").click();

      cy.contains("Running Costs of Car Packaged");
      cy.get("#runningCostsOfCarPackaged")
        .clear()
        .type("789")
        .should("be.visible");

      cy.contains("Include From Year");
      cy.get("#includeFromYear").should("have.value", "1");

      cy.contains("Up Until Year");
      cy.get("#upUntilYear").should("have.value", "30");

      cy.contains("Indexation");
      cy.get("#indexation").should("have.value", "2.50%");
    });
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    ).within(() => {
      cy.contains("Submit").click();
      cy.contains("Close");
    });

    //Partner Salary Packaging (Other) Card :

    cy.get(":nth-child(2) > :nth-child(8) > .form-check > .radioButton2")
      .contains("Yes")
      .click();

    cy.get(":nth-child(2) > :nth-child(8) > .d-flex > #button-addon2").click();

    cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
      () => {
        cy.contains("Salary Packaging (Other)");

        cy.contains("Owner");
        cy.contains("Emma Taylor");

        cy.contains("Salary Packaging (Other)");
        cy.get("#salaryPackagingOther").select(
          "Full FBT/Rebatable/Exempt (17K Cap)"
        );

        cy.contains("GST Status");
        cy.get("#GSTStatus").should("have.value", "Without GST");

        cy.contains("Include From Year");
        cy.get("#includeFromYear").should("have.value", "1");

        cy.contains("Up Until Year");
        cy.get("#upUntilYear").should("have.value", "30");

        cy.contains("Submit").click();
      }
    );

    cy.contains("Close").should("be.visible");
    cy.contains("Submit").should("be.visible").click();

    cy.get("#clientcf_employmentIncome").should("have.value", "$54");
    cy.get("#partnercf_employmentIncome").should("have.value", "$789");

    //Regular Living Expenses
    cy.wait(2000);
    cy.get(":nth-child(9) > .py-4").within(() => {
      cy.contains("Regular Living Expenses");
      cy.contains("Regular Living Expenses");
      cy.get("img");
    });
    cy.get(
      ":nth-child(9) > .py-4 > .flex-column > .row > .col-12 > .d-flex > .mb-0"
    )
      .click()
      .should("be.visible");

    //Card Header
    cy.get(".modal-header").contains("Regular Living Expenses");
    cy.get(".btn-close").should("be.visible");

    cy.get(".table").within(() => {
      cy.contains("Owner").should("be.visible");

      cy.contains("Aiden Smith").should("be.visible");

      cy.contains("Expenses").should("be.visible");
      cy.get(":nth-child(2) > .form-select").select("Living Expenses");

      cy.contains("Amount").should("be.visible");
      cy.get("#amount").clear().type("$20514");

      cy.contains("Include From Year").should("be.visible");
      cy.get(":nth-child(4) > .form-select").should("have.value", "1");

      cy.contains("Up Until Year").should("be.visible");
      cy.get(":nth-child(5) > .form-select").should("have.value", "30");

      cy.contains("Indexation").should("be.visible");
      cy.get(":nth-child(6) > .form-select").should("have.value", "2.50%");
    });

    // Regular Living Expenses Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientcf_incomeFromRegularLivingExpense").should(
      "have.value",
      "$20,514"
    );

    //Business Income
    cy.wait(2000);
    cy.get(":nth-child(7) > .py-4").within(() => {
      cy.contains("Business Income");
      cy.contains("Aiden Smith");
      cy.get("img");
    });
    cy.get(
      ":nth-child(7) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0"
    )
      .click()
      .should("be.visible");

    //Card Header
    //Use only for remove partner When Run code with Client only

    cy.get(".modal-header").contains("Business Income");
    cy.get(".btn-close").should("be.visible");
    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");
      // cy.get(":nth-child(2) > .css-v7duua").click();
      cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");
    });

    cy.get(".table").within(() => {
      cy.contains("Owner").should("be.visible");

      cy.contains("Aiden Smith").should("be.visible");

      cy.contains("Lifetime Pension Income");
      cy.get("#lifetimePensionIncome").clear().type("100");

      cy.contains("Include From Year").should("be.visible");
      cy.get(":nth-child(3) > .form-select").should("have.value", "1");

      cy.contains("Up Until Year").should("be.visible");
      cy.get(":nth-child(4) > .form-select").should("have.value", "30");

      cy.contains("Indexation").should("be.visible");
      cy.get(":nth-child(5) > .form-select").should("have.value", "2.50%");
    });

    cy.wait(2000);

    //PartnerShip Section :

    //use to remove partner

    cy.get(".css-1lcv7hw").type("Emma Taylor{enter}");

    cy.contains("Emma Taylor");

    cy.get(":nth-child(2) > :nth-child(2) > #lifetimePensionIncome")
      .clear()
      .type("$789")
      .should("have.value", "$789");

    cy.get(":nth-child(2) > :nth-child(3) > .form-select").should(
      "have.value",
      "1"
    );

    cy.get(":nth-child(2) > :nth-child(4) > .form-select").should(
      "have.value",
      "30"
    );

    cy.get(":nth-child(2) > :nth-child(5) > .form-select").should(
      "have.value",
      "2.50%"
    );

    //Business Income Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientcf_incomeFromBusiness").should("have.value", "$100");
    cy.get("#partnercf_incomeFromBusiness").should("have.value", "$789");

    //Other Non-Taxable
    cy.wait(2000);
    cy.get(":nth-child(8) > .py-4").within(() => {
      cy.contains("Other Non-Taxable");
      cy.contains("Aiden Smith");
      cy.get("img");
    });
    cy.get(
      ":nth-child(8) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0"
    )
      .click()
      .should("be.visible");

    //Card Header
    //Use only for remove partner When Run code with Client only

    cy.get(".modal-header").contains("Other Non-Taxable");
    cy.get(".btn-close").should("be.visible");
    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");
      // cy.get(":nth-child(2) > .css-v7duua").click();
      cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");
    });
    cy.wait(2000);
    cy.get(".table").within(() => {
      cy.contains("Owner");

      cy.contains("Aiden Smith").should("be.visible");

      cy.contains("Other None Taxable Income");
      cy.get("#otherNoneTaxableIncome").clear().type("909");

      cy.contains("Include From Year").should("be.visible");
      cy.get(":nth-child(3) > .form-select").should("have.value", "1");

      cy.contains("Up Until Year").should("be.visible");
      cy.get(":nth-child(4) > .form-select").should("have.value", "30");

      cy.contains("Indexation").should("be.visible");
      cy.get(":nth-child(5) > .form-select").should("have.value", "2.50%");
    });

    cy.wait(2000);
    //PartnerShip Section :

    //use to remove partner

    cy.get(".css-1lcv7hw").type("Emma Taylor{enter}");

    cy.contains("Emma Taylor");

    cy.get(":nth-child(2) > :nth-child(2) > #otherNoneTaxableIncome")
      .clear()
      .type("$789")
      .should("have.value", "$789");

    cy.get(":nth-child(2) > :nth-child(3) > .form-select").should(
      "have.value",
      "1"
    );

    cy.get(":nth-child(2) > :nth-child(4) > .form-select").should(
      "have.value",
      "30"
    );

    cy.get(":nth-child(2) > :nth-child(5) > .form-select").should(
      "have.value",
      "2.50%"
    );

    //Other Non-Taxable Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientcf_incomeFromOtherNonTaxable").should("have.value", "$909");
    cy.get("#partnercf_incomeFromOtherNonTaxable").should("have.value", "$789");
  }
}
export default PartnerIncomeAndExpenses;
