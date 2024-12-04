class EstatePlanningAndProfessionalAdviser {
  section() {
    cy.visit("http://ec2-3-25-227-176.ap-southeast-2.compute.amazonaws.com/");
    cy.get(":nth-child(6) > :nth-child(7)").click();
    cy.get("#popover > :nth-child(3)").click();

    cy.get(
      '[statusstep="40"] > .ant-steps-item-container > .ant-steps-item-icon > .ant-steps-icon > .rounded-circle'
    ).click();
    cy.contains("Estate Planning & Professional Advisers");

    cy.get(".img-fluid").click();

    cy.get(":nth-child(4) > .col-md-12 > .btn-outline")
      .contains("Back")
      .should("be.visible");
    cy.get(":nth-child(4) > .col-md-12 > .bgColor")
      .contains("Next")
      .should("be.visible");

    //   Select Cards

    // //Header
    // cy.get(".modal-header").within(() => {
    //   cy.contains("Questions").should("be.visible");
    //   cy.get(".btn-close").should("be.visible");
    // });

    // //Body
    // cy.wait(1000);
    // cy.get(":nth-child(1) > .d-flex > .border")
    //   .click()
    //   .within(() => {
    //     cy.get("img").should("be.visible");
    //     cy.contains("Do you have a Will?").should("be.visible");

    //     cy.get('svg[viewBox="0 0 512 512"]') // Select the SVG element
    //       .trigger("mouseover");
    //   });

    // cy.wait(1000);
    // cy.get(":nth-child(2) > .d-flex > .border")
    //   .click()
    //   .within(() => {
    //     cy.get("img").should("be.visible");
    //     cy.contains("Do you have a Power of Attorney in place?").should(
    //       "be.visible"
    //     );
    //     cy.get('svg[viewBox="0 0 512 512"]') // Select the SVG element
    //       .trigger("mouseover");
    //   });

    // cy.wait(1000);
    // cy.get(":nth-child(3) > .d-flex > .border")
    //   .click()
    //   .within(() => {
    //     cy.get("img").should("be.visible");
    //     cy.contains("Do you have any Professional Advisers").should(
    //       "be.visible"
    //     );
    //   });

    // //Footer
    // cy.get(".modal-footer").within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });

    
  }
}

export default EstatePlanningAndProfessionalAdviser;
