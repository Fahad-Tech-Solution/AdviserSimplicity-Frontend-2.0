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

    //Header
    cy.get(".img-fluid").click();
    cy.contains("Personal Insurance").should("be.visible");
    cy.get(".btn-close").should("be.visible");

    cy.get(".modal-body").within(() => {
      cy.contains("How many Personal Insurance does Admin have");
      cy.get("#NumberOfMap").type("01");
    });

    cy.get(".table").within(() => {
      cy.contains("No#").should("be.visible");

      cy.contains("Life insured").should("be.visible");
      cy.get("#lifeInsured0")
        .should("exist")
        .should("be.visible")
        .select("Admin");

      cy.contains("Provider");
      cy.get("#provider0")
        .should("exist")
        .should("be.visible")

        .select("Testing Bank 1");

      cy.contains("Policy no").should("be.visible");
      cy.get("#policyNo0")
        .should("exist")
        .should("be.visible")
        .clear()
        .type("43");

      cy.contains("Owner").should("be.visible");
      cy.get("#owner0")
        .should("exist")
        .should("be.visible")

        .select("Admin");

      cy.contains("Start Date");
      cy.get("#startDate0").type(12 - 1 - 2021);
    });

    cy.contains("Sum Insured");
    cy.get("#button-addon2").click();

    //Admin_Sum Insured
    cy.contains("Admin_Sum Insured");
    cy.get(
      ":nth-child(5) > .modal-dialog > .modal-content > .modal-header > .btn-close"
    );

    cy.contains("How many Policies do Admin have :");
    cy.get(".row > .d-flex > div > #NumberOfMap").type("1");

    cy.get(".col-md-12 > .row > .mt-4 > .table-responsive > .table").within(
      () => {
        cy.contains("No#").should("be.visible");
        cy.get("tbody > tr > :nth-child(1)").should("be.visible");
        cy.contains("1").should("be.visible");

        cy.contains("Cover Type");
        cy.get("#coverType0").select("Life");

        cy.contains("Premiums");
        cy.get('[colspan="1"] > #premiums0').type("345");

        cy.contains("Frequency");
        cy.get("#frequency0").select("Smoker");
      }
    );
    cy.get(
      ":nth-child(5) > .modal-dialog > .modal-content > .modal-footer"
    ).within(() => {
      cy.contains("Close");
      cy.contains("Submit").click();
    });

    cy.contains("Premiums p.a");
    cy.get("tbody > tr > :nth-child(8)").within(() => {
      cy.get(".btn.bgColor.modalBtn.border-0.btn.btn-primary").click();
    });

    cy.contains("Cover Type").should("be.visible");
    cy.get("#coverType").select("Life");

    cy.contains("Premiums");
    cy.get("#premiums").type("2");

    cy.contains("Frequency").should("be.visible");
    cy.get("#frequency").select("6 Monthly");

    cy.contains("Total Cost p.a").should("be.visible");
    cy.get("#totalCost").should("not.have.value", "");

    cy.contains("Payee of Premiums").should("be.visible");
    cy.get("#payeeOfPremiums").select("Admin");

    cy.contains("Payment Method").should("be.visible");
    cy.get("#paymentMethod").select("Manual");

    cy.contains("Commission Rate").should("be.visible");
    cy.get("#commissionRate").type("4");

    cy.get(
      ":nth-child(5) > .modal-dialog > .modal-content > .modal-footer"
    ).within(() => {
      cy.contains("Close");
      cy.contains("Submit").click();
    });

    //Loading/Exclusion
    cy.contains("Loading/Exclusion");
    cy.get(":nth-child(9) > .d-flex > .form-check > .radioButton2")
      .contains("Yes")
      .click();
    cy.get("#loadingExclusionValue0").type(
      '"This Text is written for Automation Testing Purpose"'
    );

    //Beneficiary
    cy.contains("Beneficiary");
    cy.get(":nth-child(10) > .d-flex > .form-check > .radioButton2")
      .contains("Yes")
      .click();
    cy.get(".d-flex > #button-addon2").click();

    //Admin_Beneficiaries Card
    cy.contains("Admin_Beneficiaries");
    cy.get(
      ":nth-child(5) > .modal-dialog > .modal-content > .modal-header > .btn-close"
    );

    cy.contains("How many beneficiaries do Admin have :");
    cy.get(".row > .d-flex > div > #NumberOfMap").type("1");

    cy.get(".col-md-12 > .row > .mt-4 > .table-responsive > .table").within(
      () => {
        cy.contains("No#").should("be.visible");

        cy.contains("1").should("be.visible");

        cy.contains("Nomination Type").should("be.visible");
        cy.get("#nominationType0").select("Non-Binding");

        cy.contains("DOB").should("be.visible");
        cy.get("#DOB0").type("12-6-2012");

        cy.contains("Beneficiary Name").should("be.visible");
        cy.get("#beneficiaryName0").type("23");

        cy.contains("Relationship Status").should("be.visible");
        cy.get("#relationshipStatus0").select("Child");

        cy.contains("Share of Benefit").should("be.visible");
        cy.get("#shareBenefit0").type("23");
      }
    );

    cy.get(
      ":nth-child(5) > .modal-dialog > .modal-content > .modal-footer"
    ).within(() => {
      cy.contains("Close");
      cy.contains("Submit").click();
    });

    cy.contains("Close");
    cy.contains("Submit").click();

    cy.get(".py-4").within(() => {
      cy.contains("Life Insurance");
      cy.get("img");
      cy.contains("Admin");
      cy.get("#clientLife").should("not.have.value", "");
    });
  }
}
export default PersonalInsurance;
