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

    // cy.get(".pb-4 > :nth-child(1) > .QuestionIcon > .img-fluid").click();

    //   cy.get(".modal-header").within(() => {
    //    cy.contains("Questions").should("be.visible");
    //     cy.get(".btn-close").should("be.visible");
    // });

    //   cy.wait(1000);
    //   cy.get(":nth-child(1) > .d-flex > .customBorder")
    //    .click()
    //    .within(() => {
    //      cy.get("img").should("be.visible");
    //      cy.contains(
    //        "Are you Running a business a Company Structure (Pty Ltd)?"
    //      ).should("be.visible");
    //    });

    //  cy.wait(1000);
    //  cy.get(":nth-child(2) > .d-flex > .customBorder")
    //    .click()
    //    .within(() => {
    //      cy.get("img").should("be.visible");
    //      cy.contains("Are you Running a business via a Trusts?").should(
    //        "be.visible"
    //      );
    //    });

    // cy.get(".modal-footer").within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });

    cy.get(".py-4").within(() => {
      cy.contains("Business as Company Structure");
      cy.get("img");
      cy.contains("Admin");
      cy.get(
        "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
      ).click();
    });

    cy.get(".modal-content").within(() => {
      cy.contains("Business as Company Structure");
      cy.get(".btn-close");
      cy.get(".table").within(() => {
        cy.contains("Owner");
        cy.get('[style="width: 50%;"]').contains("Admin");
        cy.contains("Current Balance");
      });
    });

    cy.get("#button-addon2").click();

    cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
      () => {
        cy.contains("Admin_Business as Company Structure Detail");
        cy.contains(
          "How many Business as Company Structure Detail does Admin have :"
        );
        cy.get("#NumberOfMap").type(1);

        cy.get(
          ":nth-child(2) > .row > .mt-4 > .table-responsive > .table"
        ).within(() => {
          cy.contains("No#");
          cy.contains("1");

          cy.contains("Business Name");
          cy.get("#businessName0").type("3142");

          cy.contains("ABN/ACN");
          cy.get("#aBNACN0").type("3535");

          cy.contains("Business Address");
          cy.get("#businessAddress0").type("4536");

          cy.contains("Number of Directors");
          cy.get("#numberOfDirectors0").type("6475");

          cy.contains("Directorship");
          cy.get(".radioButton2").contains("Yes").click();

          cy.contains("Shareholding");
          cy.get("#shareholding0").type("21.00%");

          cy.contains("Dividend Received");
          cy.get("#dividendReceived0").type("$213");
        });
      }
    );

    cy.contains("Equity Position");
    cy.get(".mb-3").within(() => {
      cy.get("#equityPosition0");
      cy.get("#button-addon2").click();
    });
    cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
      cy.contains("Business as Trusts");
      cy.contains("How many Business as Trusts does have :");
      cy.get("#NumberOfMap").type("1");

      cy.get(".table-responsive .table").within(() => {
        cy.contains("No#");
        cy.contains("1");

        cy.contains("Business Name");
        cy.get("#businessName0").type("6475");

        cy.contains("ABN");
        cy.get("#aBN0").type("356");

        cy.contains("Business Address");
        cy.get("#businessAddress0").type("6475");

        cy.contains("Trustee Type");
        cy.get("#trusteeType0").select("Individual");
        cy.get("#trusteeType0").select("Corporate");

        cy.contains("Trustee Name");
        cy.get("#trusteeName0").type("7843");

        cy.contains("ACN");
        cy.get("#aNC0").type("5435");

        cy.contains("Business Ownership");
        cy.get("#businessOwnership0").type("5432");

        cy.contains("Distribution Received");
        cy.get("#distributionReceived0").type("6455");

        cy.contains("Business Valuation");
        cy.get("#businessValuation0").type("5356");
      });
    });

    cy.get(
      ":nth-child(7) > .modal-dialog > .modal-content > .modal-body > form > :nth-child(1) > .col-md-12 > .row > .mt-4 > .table-responsive > .table > tbody > tr > :nth-child(5)"
    ).within(() => {
      cy.get("#button-addon2").click();
    });
    //Director Card

    cy.get(":nth-child(9) > .modal-dialog > .modal-content").within(() => {
      cy.contains("Directors");
      cy.contains("How many directors does the Corporate Trustee have :");
      cy.get("#NumberOfDirectors").type("1");

      cy.get(
        ".px-4 > .col-md-12 > .row > .mt-4 > .table-responsive > .table"
      ).within(() => {
        cy.contains("No#");
        cy.contains("1");

        cy.contains("Director Name");
        cy.get("#directorName0").type("Automation Tester");
      });
      cy.contains("Close");
      cy.contains("Submit").click();
    });
    //CLose Equity Position
    cy.get(":nth-child(7) > .modal-dialog > .modal-content").within(() => {
      cy.contains("Close");
      cy.contains("Submit").click();
    });

    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer > .bgColor'
    )
      .contains("Submit")
      .click();

    cy.get(".modal-footer > .bgColor").contains("Submit").click();

    cy.get(".py-4").within(() => {
      cy.contains("Business as Company Structure");
      cy.get("img");
      cy.contains("Admin");
      cy.get("#clientBusinessAsCompanyStructure").should("not.have.value", "");
    });
  }
}

export default BusinessEntities;
