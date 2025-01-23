// e2e/Cash Flow/Cash Flow.cy.js
/// <reference types="cypress" />
import PartnerIncomeAndExpenses from "./Income & Expenses (Partner).cy.js";
import ClientIncomeAndExpenses from "./Income & Expenses (Client).cy.js"
import PersonalDetail from "./Personal Detail.cy.js";

describe("Adviser Simplicity", () => {
  const IncomeAndExpensesPartner = new PartnerIncomeAndExpenses();
  const IncomeAndExpenseClient = new ClientIncomeAndExpenses();
  const personalDetail = new PersonalDetail();

  it.skip("Personal Detail", () => {
    personalDetail.section();
  });

  it("Income And Expenses With Partner ", () => {
    IncomeAndExpensesPartner.section();
  });

  it("Income And Expenses With Client ", () => {
    IncomeAndExpenseClient.section();
  });
});
