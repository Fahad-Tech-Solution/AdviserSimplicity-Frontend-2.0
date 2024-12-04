class BusinessEntities {
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

    //Business Entities
    cy.get(".pb-4 > :nth-child(1) > .QuestionIcon > .img-fluid").click();

    cy.get(".modal-header").within(() => {
      cy.contains("Questions").should("be.visible");
      cy.get(".btn-close").should("be.visible");
    });

    //Body
    cy.wait(1000);
    cy.get(":nth-child(1) > .d-flex > .customBorder")
      .click()
      .within(() => {
        cy.get("img").should("be.visible");
        cy.contains(
          "Are you Running a business a Company Structure (Pty Ltd)?"
        ).should("be.visible");
      });

    cy.wait(1000);
    cy.get(":nth-child(2) > .d-flex > .customBorder")
      .click()
      .within(() => {
        cy.get("img").should("be.visible");
        cy.contains("Are you Running a business via a Trusts?").should(
          "be.visible"
        );
      });

    //Footer;
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });
  }
}

export default BusinessEntities;
