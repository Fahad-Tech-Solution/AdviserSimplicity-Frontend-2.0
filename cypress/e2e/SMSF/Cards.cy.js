class SMSF {
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

    //SMSF
    // cy.get(".pb-4 > :nth-child(1) > .QuestionIcon > .img-fluid").click();

    // cy.get(".modal-header").within(() => {
    //   cy.contains("Questions").should("be.visible");
    //   cy.get(".btn-close").should("be.visible");
    // });

    // //Body
    // cy.wait(1000);
    // cy.get(':nth-child(1) > .d-flex > .border')
    //   .click()
    //   .within(() => {
    //     cy.get("img").should("be.visible");
    //     cy.contains(
    //       "Does your SMSF have any Money invested in Term Deposits?"
    //     ).should("be.visible");
    //   });

    //   cy.wait(1000);
    // cy.get(':nth-child(2) > .d-flex > .border')
    //   .click()
    //   .within(() => {
    //     cy.get("img").should("be.visible");
    //     cy.contains(
    //       "Does your SMSF have any Money invested Australian Shares?"
    //     ).should("be.visible");
    //   });

    //   cy.wait(1000);
    // cy.get(':nth-child(3) > .d-flex > .border')
    //   .click()
    //   .within(() => {
    //     cy.get("img").should("be.visible");
    //     cy.contains(
    //       "Do you SMSF have any Money invested in Managed Funds or via a Platform?"
    //     ).should("be.visible");
    //   });

    //   cy.wait(1000);
    // cy.get(':nth-child(4) > .d-flex > .border')
    //   .click()
    //   .within(() => {
    //     cy.get("img").should("be.visible");
    //     cy.contains(
    //       "Does your SMSF have an Investment Loan (LOC) attached to any of its investments?"
    //     ).should("be.visible");
    //   });

    //   cy.wait(1000);
    // cy.get(':nth-child(5) > .d-flex > .border')
    //   .click()
    //   .within(() => {
    //     cy.get("img").should("be.visible");
    //     cy.contains(
    //       "Does your SMSF have any investment Properties?"
    //     ).should("be.visible");
    //   });

    //   cy.wait(1000);
    // cy.get(':nth-child(6) > .d-flex > .border')
    //   .click()
    //   .within(() => {
    //     cy.get("img").should("be.visible");
    //     cy.contains(
    //       "Does your SMSF have any money in Pension Phase?"
    //     ).should("be.visible");
    //   });

    //     cy.wait(1000);
    //   cy.get(':nth-child(7) > .d-flex > .border')
    //    .click()
    //    .within(() => {
    //      cy.get("img").should("be.visible");
    //      cy.contains(
    //        "Other Investment"
    //      ).should("be.visible");
    //      });

    cy.get(
      '[statusstep="64"] > .ant-steps-item-container > .ant-steps-item-icon > .ant-steps-icon > .rounded-circle'
    ).click();
    //Sole Trader
    cy.wait(2000);
    cy.get(":nth-child(1) > .py-4")
      .should("be.visible")
      .within(() => {
        cy.get("img");

        cy.get(
          "label.mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
        ).click();

        //Cards
      });
    //Header
    cy.get(".modal-header");
    cy.get(".btn-close").should("be.visible");
    cy.get(".table").within(() => {
      //Card Slection :
      cy.contains("No#").should("be.visible");
      cy.get("tbody > tr > :nth-child(1)").contains("1").should("be.visible");

      cy.contains("Fund Name").should("be.visible");
      cy.get("#fundName").clear().type("QA Engr").should("be.visible");

      cy.contains("ABN").should("be.visible");
      cy.get("#ABN").clear().type("83").should("be.visible");

      cy.contains("Registered Office").should("be.visible");
      cy.get("#registeredOffice").clear().type("Testing").should("be.visible");

      cy.contains("Place Of Business").should("be.visible");
      cy.get("#placeOfBusiness")
        .clear()
        .type("Automation")
        .should("be.visible");

      cy.contains("Establishment Date").should("be.visible");
      cy.get("#establishmentDate").clear().type("21-2-1987");

      cy.contains("Trustee Type").should("be.visible");
      cy.get("#trusteeType").select("Individual");

      cy.contains("Trustee Name").should("be.visible");
      cy.get("#trusteeName").clear().type("QA Person");

      cy.contains("ACN").should("be.visible");
      cy.get("#ACN").clear().type("89");

      cy.contains("Name of Accountant").should("be.visible");
      cy.get("#nameOfAccountant").clear().type("Automation Engr");
    });

    cy.contains("Trustee Type").should("be.visible");
    cy.get("#trusteeType").select("Corporate");

    cy.get("#button-addon2").click();
    cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
      () => {
        cy.contains("Directors");

        cy.contains("How many directors does the Corporate Trustee have :");
        cy.get("#NumberOfDirectors").type("1");

        cy.get(
          ".px-4 > .col-md-12 > .row > .mt-4 > .table-responsive > .table"
        ).within(() => {
          cy.contains("No#");
          cy.contains("1");

          cy.contains("Director Name");
          cy.get("#directorName0").type("Automation Tester ");
        });
        cy.get("form > .modal-footer").within(() => {
          cy.contains("Close").should("be.visible");
          cy.contains("Submit").should("be.visible").click();
        });
      }
    );

    cy.contains("Bare Trust").should("be.visible");
    cy.get("tbody > tr > :nth-child(10)").within(() => {
      cy.get(".radioButton2").contains("Yes").click();
      cy.get("#button-addon2").click();
    });

    cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
      () => {
        cy.contains("Directors Of Bare Trust");
        cy.contains("How many directors does the bare trust have ?");
        cy.get("#NumberOfDirectors").type("1");

        cy.get(
          ".px-4 > .col-md-12 > .row > .mt-4 > .table-responsive > .table"
        ).within(() => {
          cy.contains("No#");

          cy.contains("Bare Trustee Name");
          cy.get("#bareTrusteeName").type("QA Person");

          cy.contains("ACN");
          cy.get(":nth-child(3) > #ACN").type("324");

          cy.contains("Director 1 Name");
          cy.get("#directorName0").select("Automation Tester");
        });

        cy.get("form > .modal-footer").within(() => {
          cy.contains("Close").should("be.visible");
          cy.contains("Submit").should("be.visible").click();
        });
      }
    );

    //Footer

    cy.contains("Close").should("be.visible");
    cy.contains("Submit").should("be.visible").click();

    //nputBox;
    cy.get("#clientSMSFDetails").should("not.have.value", ""); // Ensure it's not empty
  }
}

export default SMSF;
