class PersonalInsurance {
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

    //   Select Cards

    // //Header
    // cy.get(".img-fluid").click();
    // cy.contains("Personal Insurance").should("be.visible");
    // cy.get(".btn-close").should("be.visible");

    // cy.get(".modal-body").within(() => {
    //   cy.contains("How many Personal Insurance does Admin have");
    //   cy.get("#NumberOfMap").type("1");
    // });

    // //Footer
    // cy.get(".modal-footer").within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });
  }
}

export default PersonalInsurance;
