// e2e/Cash Flow/Cash Flow.cy.js
/// <reference types="cypress" />
import IncomeAndExpenses from "./Income & Expenses.cy.js";
import PersonalDetail from "./Personal Detail.cy.js";

describe("Adviser Simplicity", () => {
  const incomeAndExpenses = new IncomeAndExpenses();
  const personalDetail = new PersonalDetail();

  it("Personal Detail", () => {
    personalDetail.section();
  });

  it.only("Income And Expense ", () => {
    incomeAndExpenses.section();
  });
});
