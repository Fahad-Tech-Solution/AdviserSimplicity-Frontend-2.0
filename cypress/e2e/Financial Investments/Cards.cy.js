class FinancialInvestments {
  section() {
    cy.visit("http://ec2-3-25-227-176.ap-southeast-2.compute.amazonaws.com/");
    cy.get(":nth-child(6) > :nth-child(7)").click();
    cy.get("#popover > :nth-child(3)").click();
    cy.get(
      '[statusstep="32"] > .ant-steps-item-container > .ant-steps-item-icon > .ant-steps-icon > .rounded-circle'
    ).click();

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
    // cy.get(".modal-body").within(() => {
    //   cy.wait(1000);
    //   cy.get(":nth-child(1) > .d-flex > .border")
    //     .click()
    //     .within(() => {
    //       cy.get("img").should("be.visible");
    //       cy.contains("Bank Accounts").should("be.visible");
    //     });

    //   cy.wait(1000);
    //   cy.get(":nth-child(2) > .d-flex > .border")
    //     .click()
    //     .within(() => {
    //       cy.get("img").should("be.visible");
    //       cy.contains("Term Deposits").should("be.visible");
    //     });

    //   cy.wait(1000);
    //   cy.get(":nth-child(3) > .d-flex > .border")
    //     .click()
    //     .within(() => {
    //       cy.get("img").should("be.visible");
    //       cy.contains("Australian Shares/ETFs").should("be.visible");
    //     });

    //   cy.wait(1000);
    //   cy.get(":nth-child(4) > .d-flex > .border")
    //     .click()
    //     .within(() => {
    //       cy.get("img").should("be.visible");
    //       cy.contains("Platform Investments").should("be.visible");
    //     });

    //   cy.wait(1000);
    //   cy.get(":nth-child(5) > .d-flex > .border")
    //     .click()
    //     .within(() => {
    //       cy.get("img").should("be.visible");
    //       cy.contains("Investment Bonds").should("be.visible");
    //     });

    //   cy.wait(1000);
    //   cy.get(":nth-child(6) > .d-flex > .border")
    //     .click()
    //     .within(() => {
    //       cy.get("img").should("be.visible");
    //       cy.contains("Superannuation").should("be.visible");
    //     });

    //   cy.wait(1000);
    //   cy.get(":nth-child(7) > .d-flex > .border")
    //     .click()
    //     .within(() => {
    //       cy.get("img").should("be.visible");
    //       cy.contains("Account Based Pensions").should("be.visible");
    //     });

    //   cy.wait(1000);
    //   cy.get(":nth-child(8) > .d-flex > .border")
    //     .click()
    //     .within(() => {
    //       cy.get("img").should("be.visible");
    //       cy.contains("Annuities").should("be.visible");
    //     });

    //   cy.wait(1000);
    //   cy.get(":nth-child(9) > .d-flex > .border")
    //     .click()
    //     .within(() => {
    //       cy.get("img").should("be.visible");
    //       cy.contains("Investment Properties ").should("be.visible");
    //     });

    //   cy.wait(1000);
    //   cy.get(":nth-child(10) > .d-flex > .border")
    //     .click()
    //     .within(() => {
    //       cy.get("img").should("be.visible");
    //       cy.contains("Investment Loans ").should("be.visible");
    //     });

    //   cy.wait(1000);
    //   cy.get(":nth-child(11) > .d-flex > .border")
    //     .click()
    //     .within(() => {
    //       cy.get("img").should("be.visible");
    //       cy.contains("Margin Loans").should("be.visible");
    //     });
    // });
    
    // //Footer
    // cy.get(".modal-footer").within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });
    
  }
}

export default FinancialInvestments;
