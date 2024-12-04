class PersonalAssetsAndDebt {
    section() {
      cy.visit("http://ec2-3-25-227-176.ap-southeast-2.compute.amazonaws.com/");
      cy.get(":nth-child(6) > :nth-child(7)").click();
      cy.get("#popover > :nth-child(3)").click();
      cy.get(
        '[statusstep="24"] > .ant-steps-item-container > .ant-steps-item-icon > .ant-steps-icon > .rounded-circle'
      ).click();
  
  
  //Select Question's
  
      cy.get(":nth-child(4) > .col-md-12 > .btn-outline").contains("Back");
      cy.get(":nth-child(4) > .col-md-12 > .bgColor").contains("Next");
      cy.get(".img-fluid").click();
  
      cy.get(".modal-header").within(() => {
        cy.contains("Questions");
        cy.get(".btn-close").should("be.visible");
      });
      cy.wait(3000);
      cy.get(".modal-body").within(() => {
        cy.get(":nth-child(1) > .d-flex > .border")
          .click()
          .within(() => {
            cy.contains("Family Home");
            cy.get("img");
          });
        cy.wait(3000);
        cy.get(":nth-child(2) > .d-flex > .border")
          .click()
          .within(() => {
            cy.contains("Cars");
            cy.get("img");
          });
        cy.wait(3000);
        cy.get(":nth-child(3) > .d-flex > .border")
          .click()
          .within(() => {
            cy.contains("Household");
            cy.get("img");
          });
        cy.wait(3000);
        cy.get(":nth-child(4) > .d-flex > .border")
          .click()
          .within(() => {
            cy.contains("Boat");
            cy.get("img");
          });
        cy.wait(3000);
        cy.get(":nth-child(5) > .d-flex > .border")
          .click()
          .within(() => {
            cy.contains("Caravan");
            cy.get("img");
          });
        cy.wait(3000);
        cy.get(":nth-child(6) > .d-flex > .border")
          .click()
          .within(() => {
            cy.contains("Other Assets");
            cy.get("img");
          });
        cy.wait(3000);
        cy.get(":nth-child(7) > .d-flex > .border")
          .click()
          .within(() => {
            cy.contains("Personal Debt");
            cy.get("img");
    cy.get('svg[viewBox="0 0 512 512"]')
            .trigger("mouseover");
          });
      });
      cy.contains("Close").should("be.visible");
      cy.get(".modal-footer > .bgColor").contains("Submit").click();
  
   // End Select Question's
  
    
    }
  }
  
  export default PersonalAssetsAndDebt;
  