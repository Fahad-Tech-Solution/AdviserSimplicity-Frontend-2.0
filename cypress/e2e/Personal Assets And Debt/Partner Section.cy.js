class PersonalAssetsAndDebtPartnerSection {
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

    //Partner section
    cy.get(".css-1lcv7hw").type("Emma Taylor{enter}");

    cy.contains("Emma Taylor").should("be.visible");

    cy.get(":nth-child(2) > :nth-child(2) > #modelOfCar").clear().type("2311");

    cy.get(":nth-child(2) > :nth-child(3) > #currentValue")
      .clear()
      .type("8879");
    //Footer
    cy.contains("Close").should("be.visible");
    cy.get(".modal-footer > .bgColor")
      .contains("Submit")
      .should("be.visible")
      .click();

    cy.get("#clientcar").should("have.value", "$77");
    cy.get("#partnercar").should("have.value", "$8,879");
  }
}

export default PersonalAssetsAndDebtPartnerSection;
