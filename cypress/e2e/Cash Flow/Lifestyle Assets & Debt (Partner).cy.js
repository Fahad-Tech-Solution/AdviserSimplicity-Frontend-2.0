// e2e/Cash Flow/Income & Expenses.cy.js
class PartnerLifestyleAssetsandDebt {
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

    //LifeStyle Assets and Debt Navbar Icon :
    cy.get(".mt-2 > .col-md-12").within(() => {
      cy.get(".bgColor").click();
    });

    //Own a Family Home
    cy.wait(2000);
    cy.get(":nth-child(1) > .py-4").within(() => {
      cy.contains("Own a Family Home");
      cy.get("img");
      cy.contains("Market Value");
      cy.contains("Loan Balance");
    });
    cy.get(
      ":nth-child(1) > .py-4 > .flex-column > .row > :nth-child(1) > .d-flex > .mb-0"
    ).click();
    cy.get(".modal-content").within(() => {
      cy.contains("Own a Family Home");
      cy.get(".btn-close");
    });

    cy.get(".table").within(() => {
      cy.contains("Street Address");
      cy.get("#address").should("have.value", "House NO 2-A , Punjab, Lahore");

      cy.contains("Current Value/Purchase Price").should("be.visible");
      cy.get("#currentValue").should("have.value", "$77");

      cy.contains("Client Ownership").should("be.visible");
      cy.get("#clientOwnership").should("have.value", "77.00%");

      cy.contains("Partner Ownership");
      cy.get("#partnerOwnership").should("have.value", "77.00%");
      cy.contains("Year Of Purchase");
      cy.get(":nth-child(5) > .form-select").should("have.value", "1");

      cy.contains("Expected Growth Rate");
      cy.get(":nth-child(8) > .form-select").should("have.value", "2.50%");
      cy.contains("Sell Property In Year");
      cy.get(":nth-child(9) > .form-select")
        .select("1")
        .should("have.value", "1");

      cy.contains("Total Cost Base");
      cy.get(".input-group").within(() => {
        cy.get("#button-addon2").click();
      });
    });

    //Loan Attachment Inner Card
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    ).within(() => {
      cy.contains("Total Cost Base");
      //cy.get('[style="display: block;"] > .modal-dialog > .modal-content > .modal-header > .btn-close').should('be.visible')
    });

    cy.get(".mt-4 > .table-responsive > .table").within(() => {
      cy.contains("Stamp Duty");
      cy.get('[style="width: 150px;"] > .form-select')
        .select("Manual")
        .should("have.value", "Manual");

      cy.get("#stampDutyCalculation").clear().type("170");
      cy.contains("Other Purchase Costs");
      cy.get("#otherPurchaseCosts").clear().type("100");
      cy.contains("Cost Base (Existing)");
      cy.get("#otherPurchaseCosts").should("have.value", "$100");

      cy.contains("Total Cost Base");
      cy.get(":nth-child(5) > #totalCostBase");
    });
    //Footer
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer'
    ).within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });
    //Loan Attachment Inner Card End

    cy.wait(2000);

    cy.get("#totalCostBase").should("not.have.value", "");

    cy.contains("Loan Balance");

    cy.get("tbody > tr > :nth-child(7)").within(() => {
      cy.get(".radioButton2").contains("Yes").click();
      cy.get("#button-addon2").click();
    });

    //Loan Balance Inner Card
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-header'
    ).within(() => {
      cy.contains("Home Loan");
      //cy.get('[style="display: block;"] > .modal-dialog > .modal-content > .modal-header > .btn-close').should('be.visible')
    });

    cy.get(".mt-4").within(() => {
      cy.contains("Loan Type");
      cy.get(":nth-child(2) > .form-select").should("have.value", "i/only");

      cy.contains("Loan Term");
      cy.get(":nth-child(3) > .form-select").should("have.value", "19");

      cy.contains("Interest Rate (p.a)");
      cy.get("#initialInterestRatePA").should("have.value", "77.00%");

      cy.contains("Minimum Repayments (p.a)");
      cy.get("#minimumRepaymentsPA");

      cy.contains("Actual Annual Repayments");
      cy.get("#actualAnnualRepayments").should("have.value", "$543");

      cy.contains("Repay Loan in Year");
      cy.get(":nth-child(7) > .form-select")
        .select("1")
        .should("have.value", "1");

      cy.contains("Loan Balance");
      cy.get(":nth-child(1) > .input-group").within(() => {
        cy.get("#button-addon2").click();
      });
    });

    //Loan Attachment Inner Card Loan Balance

    cy.get(
      ":nth-child(7) > .modal-dialog > .modal-content > .modal-header"
    ).within(() => {
      cy.contains("Loan Balance");
      //cy.get('[style="display: block;"] > .modal-dialog > .modal-content > .modal-header > .btn-close').should('be.visible')
    });

    cy.get(
      ":nth-child(7) > .modal-dialog > .modal-content > .modal-body > form > :nth-child(2) > .col-md-12 > .row > .mt-4 > .table-responsive > .table"
    ).within(() => {
      cy.contains("Loan to Value Ratio (LVR)");
      cy.get("#LVR").clear().type("170");
      cy.contains("Loan Amount");
      cy.get("#loanAmount").should("have.value", "$43");

      cy.contains("Loan Balance");
      cy.get(":nth-child(3) > #loanBalance");

      cy.contains("Client %Ownership");
      cy.get(":nth-child(4) > #clientOwnership");

      cy.contains("Partner %Ownership");
      cy.get(":nth-child(5) > #partnerOwnership");
    });
    //Loan Balance Inner Footer
    cy.get(
      ":nth-child(7) > .modal-dialog > .modal-content > .modal-footer"
    ).within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    //Home Loan Footer
    cy.contains("Close");
    cy.get(
      '[style="display: block;"] > .modal-dialog > .modal-content > .modal-footer > .bgColor'
    )
      .contains("Submit")
      .click(); // Clicks even if hidden

    cy.get("#totalCostBase").should("have.value", "$77");

    //Own a Family Home Footer
    cy.contains("Close").should("be.visible");
    cy.contains("Submit").should("be.visible").click();

    cy.get('[placeholder="Market Value"]').should("have.value", "$77");

    //Car
    cy.wait(2000);
    cy.get(":nth-child(2) > .py-4").within(() => {
      cy.contains("Car");
      cy.contains("Aiden Smith");
      cy.get("img");
    });
    cy.get(
      ":nth-child(2) > .py-4 > .flex-column > .row > .col-12 > .d-flex > .mb-0"
    )
      .click()
      .should("be.visible");

    //Card Header
    //Use only for remove partner When Run code with Client only
    //cy.get(":nth-child(2) > .css-v7duua").click();
    cy.get(".css-1lcv7hw").type("Aiden Smith{enter}");

    cy.get(".modal-header").contains("Car");
    cy.get(".btn-close").should("be.visible");
    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");
      cy.get(".css-9jq23d").contains("Aiden Smith");
    });

    cy.get(".table").within(() => {
      cy.contains("Owner").should("be.visible");

      cy.contains("Aiden Smith").should("be.visible");

      cy.contains("Current Value").should("be.visible");
      cy.get("#currentValue").clear().type("100");

      cy.contains("Sell In Year").should("be.visible");
      cy.get(":nth-child(3) > .form-select").should("have.value", "No");

      cy.contains("New Purchase").should("be.visible");
      cy.get("#newPurchase").clear().type("100");

      cy.contains("Purchase In Year").should("be.visible");
      cy.get(":nth-child(5) > .form-select").should("have.value", "30");

      cy.contains("Indexation").should("be.visible");
      cy.get(":nth-child(6) > .form-select").should("have.value", "2.50%");
    });

    //PartnerShip Section :
    //cy.get(":nth-child(2) > .css-v7duua").click();

    cy.get(".css-1lcv7hw").type("Emma Taylor{enter}");

    cy.get(".table").within(() => {
      cy.get(":nth-child(2) > :nth-child(1) > th").contains("Emma Taylor");

      cy.get(":nth-child(2) > :nth-child(2) > #currentValue")
        .clear()
        .type("100");

      cy.get(":nth-child(2) > :nth-child(3) > .form-select").should(
        "have.value",
        "No"
      );

      cy.get(":nth-child(2) > :nth-child(4) > #newPurchase")
        .clear()
        .type("100");

      cy.get(":nth-child(2) > :nth-child(5) > .form-select")
        .select("30")
        .should("have.value", "30");

      cy.get(":nth-child(2) > :nth-child(6) > .form-select")
        .select("2.50%")
        .should("have.value", "2.50%");
    });

    //Car Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientcf_car").should("have.value", "$100");
    cy.get("#partnercf_car").should("have.value", "$100");

    //Boat
    cy.wait(2000);
    cy.get(":nth-child(3) > .py-4").within(() => {
      cy.contains("Boat");
      cy.contains("Boat");
      cy.get("img");
    });
    cy.get(
      ":nth-child(3) > .py-4 > .flex-column > .row > .col-12 > .d-flex > .mb-0"
    )
      .click()
      .should("be.visible");

    //Card Header

    cy.get(".modal-header").contains("Boat");
    cy.get(".btn-close").should("be.visible");
    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");
      cy.get(".css-9jq23d").contains("Aiden Smith + Emma Taylor");
    });

    cy.get(".table").within(() => {
      cy.contains("Owner").should("be.visible");

      cy.contains("Aiden Smith + Emma Taylor").should("be.visible");

      cy.contains("Current Value").should("be.visible");
      cy.get("#currentValue").should("have.value", "$11");

      cy.contains("Sell In Year").should("be.visible");
      cy.get(":nth-child(3) > .form-select").should("have.value", "17");

      cy.contains("New Purchase").should("be.visible");
      cy.get("#newPurchase").should("have.value", "$1");

      cy.contains("Purchase In Year").should("be.visible");
      cy.get(":nth-child(5) > .form-select").should("have.value", "17");

      cy.contains("Indexation").should("be.visible");
      cy.get(":nth-child(6) > .form-select").should("have.value", "3.00%");
    });

    //Boat Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientcf_boat").should("have.value", "$11");

    //Caravan
    cy.wait(2000);
    cy.get(":nth-child(4) > .py-4").within(() => {
      cy.contains("Caravan");
      cy.contains("Caravan");
      cy.get("img");
    });
    cy.get(
      ":nth-child(4) > .py-4 > .flex-column > .row > .col-12 > .d-flex > .mb-0"
    )
      .click()
      .should("be.visible");

    //Caravan Card Header

    cy.get(".modal-header").contains("Caravan");
    cy.get(".btn-close").should("be.visible");
    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");
      cy.get(".css-9jq23d").contains("Aiden Smith + Emma Taylor");
    });

    cy.get(".table").within(() => {
      cy.contains("Owner").should("be.visible");

      cy.contains("Aiden Smith + Emma Taylor").should("be.visible");

      cy.contains("Current Value").should("be.visible");
      cy.get("#currentValue").clear().type("11").should("have.value", "$11");

      cy.contains("Sell In Year").should("be.visible");
      cy.get(":nth-child(3) > .form-select")
        .select("17")
        .should("have.value", "17");

      cy.contains("New Purchase").should("be.visible");
      cy.get("#newPurchase").clear().type("14").should("have.value", "$14");

      cy.contains("Purchase In Year").should("be.visible");
      cy.get(":nth-child(5) > .form-select")
        .select("17")
        .should("have.value", "17");

      cy.contains("Indexation").should("be.visible");
      cy.get(":nth-child(6) > .form-select")
        .select("3.00%")
        .should("have.value", "3.00%");
    });

    //Caravan Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientcf_caravan").should("have.value", "$11");

    //Other Assets
    cy.wait(2000);
    cy.get(":nth-child(5) > .py-4").within(() => {
      cy.contains("Other Assets");
      cy.contains("Aiden Smith");
      cy.contains("Emma Taylor");
      cy.get("img");
    });
    cy.get(
      ":nth-child(5) > .py-4 > .flex-column > :nth-child(2) > .col-12 > .d-flex > .mb-0"
    )
      .click()
      .should("be.visible");

    //Other Assets Card Header
    //Use only for remove partner When Run code with Client only

    //cy.get(":nth-child(2) > .css-v7duua").click();

    cy.get(".modal-header").contains("Other Assets");
    cy.get(".btn-close").should("be.visible");
    cy.get(".col-md-12 > .d-flex").within(() => {
      cy.contains("Owner");
      //For Remove Client

      cy.get(".css-1lx7dxn").type("Aiden Smith{enter}");
    });

    cy.get(".table").within(() => {
      cy.contains("Owner").should("be.visible");

      cy.contains("Aiden Smith").should("be.visible");

      cy.contains("Current Value").should("be.visible");
      cy.get("#currentValue").clear().type("100");

      cy.contains("Sell In Year").should("be.visible");
      cy.get(":nth-child(3) > .form-select").should("have.value", "No");

      cy.contains("New Purchase").should("be.visible");
      cy.get("#newPurchase").clear().type("100");

      cy.contains("Purchase In Year").should("be.visible");
      cy.get(":nth-child(5) > .form-select").should("have.value", "30");

      cy.contains("Indexation").should("be.visible");
      cy.get(":nth-child(6) > .form-select").should("have.value", "2.50%");
    });

    //PartnerShip Section :

    cy.get(".css-1lx7dxn").type("Emma Taylor{enter}");

    cy.get(".table").within(() => {
      cy.contains("Emma Taylor").should("be.visible");
      cy.get(":nth-child(2) > :nth-child(2) > #currentValue")
        .clear()
        .type("989");

      cy.get(":nth-child(2) > :nth-child(3) > .form-select").should(
        "have.value",
        "No"
      );

      cy.get(":nth-child(2) > :nth-child(4) > #newPurchase")
        .clear()
        .type("100");

      cy.get(":nth-child(2) > :nth-child(5) > .form-select").should(
        "have.value",
        "30"
      );

      cy.get(":nth-child(2) > :nth-child(6) > .form-select").should(
        "have.value",
        "2.50%"
      );
    });

    //Other Assets Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientcf_otherAssets").should("have.value", "$100");
    cy.get("#partnercf_otherAssets").should("have.value", "$989");

    //Other Assets Personal Loans
    cy.wait(2000);
    cy.get(":nth-child(6) > .py-4").within(() => {
      cy.contains("Personal Debt");
      cy.contains("Personal Loans");
      cy.contains("Credit Card");
      cy.get("img");
    });
    cy.get(
      ":nth-child(6) > .py-4 > .flex-column > .row > :nth-child(1) > .d-flex > .mb-0"
    )
      .click()
      .should("be.visible");

    cy.get(".modal-header").contains("Personal Loans");

    cy.contains("How many Personal Loans does Aiden Smith have:");
    cy.get("#NumberOfMap").clear().type("1");

    cy.get(".table").within(() => {
      cy.contains("No#").should("be.visible");

      cy.contains("1").should("be.visible");

      cy.contains("Year of Loan");
      cy.get("#YearLoan0").select("1").should("have.value", "1");

      cy.contains("Year of Loan").should("be.visible");
      cy.get("#CurrentLoanBalance0")
        .clear()
        .type("109")
        .should("have.value", "$109");

      cy.contains("Loan Type");
      cy.get("#LoanType0").select("i/only").should("have.value", "i/only");

      cy.contains("Loan Term");
      cy.get("#LoanTerm0").select("19").should("have.value", "19");

      cy.contains("Initial Interest Rate (p.a.)").should("be.visible");
      cy.get("#InterestRate0").clear().type("4.00%");
      cy.contains("Minimum Repayments (p.a)").should("be.visible");
      cy.get("#MinimumRepayments0");

      cy.contains("Actual Annual Repayments").should("be.visible");
      cy.get("#ActualAnnualRepayments0")
        .clear()
        .type("90")
        .should("have.value", "$90");

      cy.contains("Repay Loan in Year");
      cy.get("#RepayLoanInYear0").select("No").should("have.value", "No");
    });

    //Other Assets Personal Loans Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientcf_personalDebt").should("have.value", "$109");

    //Personal Debt Credit Card

    cy.get(":nth-child(3) > .d-flex > .mb-0").click().should("be.visible");

    cy.get(".modal-header").contains("Credit Card");

    cy.contains("How many Credit Card does Aiden Smith have:");
    cy.get("#NumberOfMap").clear().type("1");

    cy.get(".table").within(() => {
      cy.contains("No#").should("be.visible");

      cy.contains("1").should("be.visible");

      cy.contains("Year of Loan");
      cy.get("#YearLoan0").select("1").should("have.value", "1");

      cy.contains("Year of Loan").should("be.visible");
      cy.get("#CurrentLoanBalance0")
        .clear()
        .type("97")
        .should("have.value", "$97");

      cy.contains("Loan Type");
      cy.get("#LoanType0").select("i/only").should("have.value", "i/only");

      cy.contains("Loan Term");
      cy.get("#LoanTerm0").select("19").should("have.value", "19");

      cy.contains("Initial Interest Rate (p.a.)").should("be.visible");
      cy.get("#InterestRate0").clear().type("4.00%");
      cy.contains("Minimum Repayments (p.a)").should("be.visible");
      cy.get("#MinimumRepayments0");

      cy.contains("Actual Annual Repayments").should("be.visible");
      cy.get("#ActualAnnualRepayments0")
        .clear()
        .type("90")
        .should("have.value", "$90");

      cy.contains("Repay Loan in Year");
      cy.get("#RepayLoanInYear0").select("No").should("have.value", "No");
    });

    //Personal Debt Credit Card Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    cy.get("#clientcf_creditCard").should("have.value", "$97");
  }
}

export default PartnerLifestyleAssetsandDebt;
