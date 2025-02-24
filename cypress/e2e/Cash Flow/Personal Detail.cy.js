/// <reference types="cypress" />

class PersonalDetail {
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

    //Navbar
    cy.get('[style="padding: 10px 0px 0px;"] > .row > .col-md-12').within(
      () => {
        cy.get(".ant-steps-item-processing > .ant-steps-item-container").within(
          () => {
            // cy.get("img");
            cy.contains("Personal Details").click();
          }
        );
        cy.contains("Income & Expenses").should("be.visible");
        cy.contains("Lifestyle Assets & Debt").should("be.visible");
        cy.contains("Financial Investments").should("be.visible");
        cy.contains("Business Entities").should("be.visible");
        cy.contains("SMSF").should("be.visible");
        cy.contains("Investment Trust").should("be.visible");
      }
    );

    //Client Personal Details

    //Label
    cy.get(".centerDiv > .form-label").should("be.visible");

    cy.contains("Name").should("be.visible");
    cy.get("#client\\.name").should("have.value", "Aiden Smith");

    cy.contains("Date of Birth").should("be.visible");
    cy.get("#client\\.dob").should("have.value", "08/10/2004");

    cy.contains("Age").should("be.visible");
    cy.get("#client\\.age").should("have.value", "20");

    cy.contains("Marital Status").should("be.visible");
    cy.get("#client\\.maritalStatus").select("Married");

    cy.contains("Sex").should("be.visible");
    cy.get("#client\\.sender").select("Female");

    cy.contains("Private Health Cover").should("be.visible");
    cy.get(":nth-child(14) > .PersonalDetailsForm").contains("Yes").click();

    cy.contains("Retirement Year").should("be.visible");
    cy.get("#client\\.retirementYear").select("Year 17");

    cy.contains("Planned Retirement age").should("be.visible");
    cy.get("#client\\.plannedRetirementAge").should("have.value", "30");

    cy.contains("Preservation age").should("be.visible");
    cy.get("#client\\.preservationAge");

    cy.wait(2000);

    //Partner Personal Details
    //Label
    cy.get(".col-md-4 > .row > .LargeSheet > .centerDiv > .form-label").should(
      "be.visible"
    );

    cy.contains("Name").should("be.visible");
    cy.get("#partner\\.name").clear().type("Emma Taylor");

    cy.contains("Date of Birth").should("be.visible");
    cy.get("#partner\\.dob").clear().type("01/06/2000");

    cy.get("#partner\\.name").click();

    cy.contains("Age").should("be.visible");
    cy.get("#partner\\.age").should("have.value", "24");

    cy.contains("Marital Status").should("be.visible");
    // Select the option "Partnered" from the dropdown
    cy.get("select#partner\\.maritalStatus").select("Partnered");

    cy.contains("Sex").should("be.visible");
    cy.get("select#partner\\.sender").select("Female");

    cy.contains("Private Health Cover").should("be.visible");
    cy.get(
      '.col-md-4 > .row > :nth-child(14) > .PersonalDetailsForm > [style="width: 15rem;"] > .form-check > .radioButton2'
    )
      .contains("Yes")
      .click();

    cy.contains("Retirement Year").should("be.visible");
    cy.get("select#partner\\.retirementYear").select("Year 4");

    cy.contains("Planned Retirement age").should("be.visible");
    cy.get("#partner\\.plannedRetirementAge").should("have.value", "29");

    cy.contains("Preservation age").should("be.visible");
    cy.get("#partner\\.preservationAge");

    //Next Button
    cy.get(".btn").contains("Next").click();
  }
}

export default PersonalDetail;
