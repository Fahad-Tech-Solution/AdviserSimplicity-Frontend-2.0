/// <reference types="cypress" />
class ClientBusinessEntities {
  section() {
    cy.visit("http://ec2-3-25-227-176.ap-southeast-2.compute.amazonaws.com/");

    cy.get("img").click();
    cy.get(
      ".mx-0 > .Custom_Accordion > .accordion-item > .accordion-header > .accordion-button"
    ).click();
    cy.get(
      ":nth-child(6) > :nth-child(7) > :nth-child(1) > div > button"
    ).click();
    cy.contains("Edit").click();
    cy.wait(2000);
    cy.get(
      "li.m-0.p-0 > .Custom_Accordion > .accordion-item > .accordion-header > .accordion-button"
    ).click();
    cy.get("#cashFlow").click();

    cy.get(":nth-child(6) > .accordion-header > .accordion-button").click();
    cy.get(
      ":nth-child(6) > .accordion-collapse > .accordion-body > :nth-child(1) > :nth-child(1) > :nth-child(3) > .mt-4 > .table-responsive > .table > tbody > tr > :nth-child(6) > .ant-dropdown-trigger"
    ).click();
    cy.get(".ant-dropdown-menu").within(() => {
      cy.contains("Edit").click();
    });
    cy.wait(3000);

    cy.get(".btn").click();

    cy.wait(2000);

    //Income & Expenses
    cy.get(".bgColor").click();

    cy.wait(2000);

    //Lifestyle Assets & Debt
    cy.get(".bgColor").click();

    cy.wait(2000);

    //Financial Investment
    cy.get(".bgColor").click();

    // //Dividend Income

    // cy.get(":nth-child(1) > .py-4").within(() => {
    //   cy.contains("Dividend Income");
    //   cy.get("img");
    //   cy.contains("Aiden Smith");
    //   cy.contains("Emma Taylor");
    // });
    // cy.get(
    //   ":nth-child(1) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0"
    // ).click();
    // cy.get(".modal-content").within(() => {
    //   cy.contains("Dividend Income");
    //   cy.get(".btn-close");
    // });

    // cy.get(".col-md-12 > .d-flex").within(() => {
    //   cy.contains("Owner");

    //   cy.get(".css-v7duua").click();

    //   cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");
    // });

    // cy.get(".modal-content").within(() => {
    //   cy.contains("Dividend Income");
    //   cy.get(".btn-close");
    //   cy.get(".table").within(() => {
    //     cy.contains("Owner");
    //     cy.get("tbody > tr > :nth-child(1)").contains("Aiden Smith");
    //     cy.contains("Dividend Income");
    //   });
    // });

    // cy.get(":nth-child(2) > .input-group").within(() => {
    //   cy.get("#button-addon2").click();
    // });

    // cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
    //   () => {
    //     cy.contains("Dividend Income");
    //   }
    // );
    // //Dividend Income
    // cy.get(".col-md-12 > .row > .mt-4").within(() => {
    //   cy.contains("Dividend Income");
    //   cy.get("tr > :nth-child(1) > #dividendIncome").should(
    //     "have.value",
    //     "$213"
    //   );

    //   cy.contains("Franking");
    //   cy.get("#franking").clear().type("3535");

    //   cy.contains("Include From Year");
    //   cy.get(":nth-child(3) > .form-select").select("12");

    //   cy.contains("Up Until Year");
    //   cy.get(":nth-child(4) > .form-select").select("3");

    //   cy.contains("Take As Cash From Until Year");
    //   cy.get(":nth-child(5) > .form-select").select("3");

    //   cy.contains("Indexation");
    //   cy.get(":nth-child(6) > .form-select").select("10.00%");
    // });
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    // ).within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });

    // cy.get("#dividendIncome").should("have.value", "$213");

    // //Asset Value of Company

    // cy.contains("Asset Value of Company");

    // cy.get(":nth-child(3) > .input-group").within(() => {
    //   cy.get("#button-addon2").click();
    // });

    // cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
    //   () => {
    //     cy.contains("Asset Value of Company");
    //   }
    // );
    // //Dividend Income
    // cy.get(".col-md-12 > .row > .mt-4").within(() => {
    //   cy.contains("Asset Value of Company");
    //   cy.get("#assetValue").should("have.value", "$5,356");

    //   cy.contains("Include From Year");
    //   cy.get(":nth-child(2) > .form-select").select("12");

    //   cy.contains("Up Until Year");
    //   cy.get(":nth-child(3) > .form-select").select("3");

    //   cy.contains("Expected Growth Rate");
    //   cy.get("#expectedGrowthRate").clear().type("3535");
    // });
    // cy.get(
    //   '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    // ).within(() => {
    //   cy.contains("Close").should("be.visible");
    //   cy.contains("Submit").should("be.visible").click();
    // });
    // cy.get("#assetValueOfCompany").should("not.have.value", "$213");

    // cy.contains("Close");
    // cy.get(".modal-footer > .bgColor")
    //   .contains("Submit")
    //   .should("be.visible")
    //   .click();

    // cy.get("#clientcf_DividendIncome").should("have.value", "$213");

    //cy.wait(1000);

// //Business as Trusts


//     cy.get(":nth-child(2) > .py-4").within(() => {
//       cy.contains("Business as Trusts");
//       cy.get("img");
//       cy.contains("Aiden Smith");
//       cy.contains("Emma Taylor");
//     });
//     cy.get(
//       ":nth-child(2) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0"
//     ).click();
//     cy.get(".modal-content").within(() => {
//       cy.contains("Business as Trusts");
//       cy.get(".btn-close");
//     });

//     cy.get(".col-md-12 > .d-flex").within(() => {
//       cy.contains("Owner");

//       cy.get(".css-v7duua").click();

//       cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");
//     });

//     cy.get(".modal-content").within(() => {
//       cy.contains("Net Trust Distribution");
//       cy.get(".btn-close");
//       cy.get(".table").within(() => {
//         cy.contains("Owner");
//         cy.get("tbody > tr > :nth-child(1)").contains("Aiden Smith");
//         cy.contains("Net Trust Distribution");
//       });
//     });

//     cy.get(":nth-child(2) > .input-group").within(() => {
//       cy.get("#button-addon2").click();
//     });

//     cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
//       () => {
//         cy.contains("Net Trust Distribution");
//       }
//     );
//     //Dividend Income
//     cy.get(".col-md-12 > .row > .mt-4").within(() => {
//       cy.contains("Net Trust Distribution");
//       cy.get('#assetValue').should(
//         "have.value",
//         "$6,455"
//       );

     

//       cy.contains("Include From Year");
//       cy.get(':nth-child(2) > .form-select').select("12");

//       cy.contains("Up Until Year");
//       cy.get(':nth-child(3) > .form-select').select("3");

//       cy.contains("Take As Cash From Until Year");
//       cy.get(':nth-child(4) > .form-select').select("3");

//       cy.contains("Indexation");
//       cy.get(':nth-child(5) > .form-select').select("10.00%");
//     });
//     cy.get(
//       '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
//     ).within(() => {
//       cy.contains("Close").should("be.visible");
//       cy.contains("Submit").should("be.visible").click();
//     });

//     cy.get('#netTrustDistribution').should("have.value", "$6,455");

//     //Asset Value of Company

//     cy.contains("Asset Value of Business Trust");

//     cy.get(":nth-child(3) > .input-group").within(() => {
//       cy.get("#button-addon2").click();
//     });

//     cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
//       () => {
//         cy.contains("Asset Value of Business Trust");
//       }
//     );
//     //Dividend Income
//     cy.get(".col-md-12 > .row > .mt-4").within(() => {
//       cy.contains("Asset Value of Business Trust");
//       cy.get('#assetValue').should("have.value", "$5,356");

//       cy.contains("Include From Year");
//       cy.get(":nth-child(2) > .form-select").select("12");

//       cy.contains("Up Until Year");
//       cy.get(":nth-child(3) > .form-select").select("3");

//       cy.contains("Expected Growth Rate");
//       cy.get("#expectedGrowthRate").clear().type("3535");
//     });
//     cy.get(
//       '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
//     ).within(() => {
//       cy.contains("Close").should("be.visible");
//       cy.contains("Submit").should("be.visible").click();
//     });
//     cy.get('#assetValueOfBusinessTrust').should("have.value", "$5,356");

//     cy.contains("Close");
//     cy.get(".modal-footer > .bgColor")
//       .contains("Submit")
//       .should("be.visible")
//       .click();

//       cy.get('#assetValueOfBusinessTrust').should("have.value", "$5,356");



      //Bucket Company 

      //Business as Trusts


    cy.get(":nth-child(3) > .py-4").within(() => {
      cy.contains("Bucket Company");
      cy.get("img");
      cy.contains("Aiden Smith");
      cy.contains("Emma Taylor");
    });
    cy.get(
      ":nth-child(3) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0"
    ).click();
    cy.get(".modal-content").within(() => {
      cy.contains("Bucket Company");
      cy.get(".btn-close");
    });

    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");

      cy.get(".css-v7duua").click();

      cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");
    });

    cy.get(".modal-content").within(() => {
      cy.contains("Net Trust Distribution");
      cy.get(".btn-close");
      cy.get(".table").within(() => {
        cy.contains("Owner");
        cy.get("tbody > tr > :nth-child(1)").contains("Aiden Smith");
        cy.contains("Net Trust Distribution");
      });
    });

    cy.get(":nth-child(2) > .input-group").within(() => {
      cy.get("#button-addon2").click();
    });

    cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
      () => {
        cy.contains("Net Trust Distribution");
      }
    );
    //Dividend Income
    cy.get(".col-md-12 > .row > .mt-4").within(() => {

      cy.contains("Opening Value")
      cy.get('#openingValue').clear().type("3535");

      cy.contains("Net Trust Distribution");
      cy.get('#assetValue').should(
        "have.value",
        "$6,455"
      );

     

      cy.contains("Include From Year");
      cy.get(':nth-child(3) > .form-select').select("12");

      cy.contains("Up Until Year");
      cy.get(':nth-child(4) > .form-select').select("3");

    
      cy.contains("Indexation");
      cy.get(':nth-child(5) > .form-select').select("10.00%");

      cy.contains("Expected Growth Rate");
      cy.get('#expectedGrowthRate').clear().type("2.00%");

    });
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    ).within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get('#netTrustDistribution').should("have.value", "$6,455");

    //Asset Value of Company

    cy.contains("Dividend Income");

    cy.get(":nth-child(3) > .input-group").within(() => {
      cy.get("#button-addon2").click();
    });

    cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
      () => {
        cy.contains("Dividend Income");
      }
    );
    //Dividend Income
    cy.get(".col-md-12 > .row > .mt-4").within(() => {
      cy.contains("Dividend Income");
      cy.get('tr > :nth-child(1) > #dividendIncome').clear().type("213")

      cy.contains("Franking");
      cy.get('#franking').clear().type("2.00%");

      cy.contains("Include From Year");
      cy.get(':nth-child(3) > .form-select').select("23")

      cy.contains("Up Until Year");
      cy.get(':nth-child(4) > .form-select').select("21")

      cy.contains("Indexation")
      cy.get(':nth-child(5) > .form-select').select("2.00%");


      cy.contains("Client % of Dividend")
      cy.get('#clientOfDividend').clear().type("22.00%");


      cy.contains("Partner % of Dividend")
      cy.get('#partnerOfDividend').clear().type("20.00%");
    });
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    ).within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });
    cy.get('#dividendIncome').should("have.value", "$213");

    cy.contains("Close");
    cy.get(".modal-footer > .bgColor")
      .contains("Submit")
      .should("be.visible")
      .click();

      cy.get('#clientcf_BucketCompany').should("have.value", "$6,455");
  }
}
export default ClientBusinessEntities;
