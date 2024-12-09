class EstatePlanningAndProfessionalAdviser {
  section() {
    cy.visit("http://ec2-3-25-227-176.ap-southeast-2.compute.amazonaws.com/");
    cy.get(":nth-child(6) > :nth-child(7)").click();
    cy.get("#popover > :nth-child(3)").click();

    cy.get(
      '[statusstep="40"] > .ant-steps-item-container > .ant-steps-item-icon > .ant-steps-icon > .rounded-circle'
    ).click();
    cy.contains("Estate Planning & Professional Advisers");

    //Select Question Section Start Here
    // cy.get(".img-fluid").click();

    // cy.get(":nth-child(4) > .col-md-12 > .btn-outline")
    //   .contains("Back")
    //   .should("be.visible");
    // cy.get(":nth-child(4) > .col-md-12 > .bgColor")
    //   .contains("Next")
    //   .should("be.visible");

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

    //Select Question Section End Here


    //Wills : 

    cy.get(':nth-child(1) > .py-4').within(()=>{
cy.contains('Wills')
cy.get('img')
cy.contains('Admin')
cy.get('.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer').click()
.should("be.visible");
    })
//Will Card Header
    cy.get(".modal-header").within(() => {
      cy.contains("Wills");
      cy.get(".btn-close").should("be.visible");
    });

    cy.get(".modal-body").within(() => {
      cy.contains("Owner");
      cy.get(".css-1xc3v61-indicatorContainer").click();
    });
    //Will Card Section
    cy.get('#react-select-2-option-0').click();
    cy.get('.table').within(() => {
      cy.contains("No#");
      cy.get("tbody > tr > :nth-child(1)");
      cy.contains("Admin");

      cy.contains("Year set up");
      cy.get('#yearSetUp').clear().type("2022").blur();

      cy.get(':nth-child(3) > .form-check > .radioButton2').contains('Yes').click()
    });

    //Boat Card Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      //cy.contains("Submit").should("be.visible").click();
    });
  }
}

export default EstatePlanningAndProfessionalAdviser;
