// e2e/Cash Flow/Cash Flow.cy.js
/// <reference types="cypress" />
import PartnerIncomeAndExpenses from "./Income & Expenses (Partner).cy.js";
import ClientIncomeAndExpenses from "./Income & Expenses (Client).cy.js";
import ClientLifestyleAssetsandDebt from "./Lifestyle Assets & Debt (Client).cy.js";
import PartnerLifestyleAssetsandDebt from "./Lifestyle Assets & Debt (Partner).cy.js";
import PersonalDetail from "./Personal Detail.cy.js";

describe("Adviser Simplicity", () => {
  const IncomeAndExpensesPartner = new PartnerIncomeAndExpenses();
  const IncomeAndExpenseClient = new ClientIncomeAndExpenses();
  const LifestyleAssetsandDebtClient = new ClientLifestyleAssetsandDebt();
  const LifestyleAssetsandDebtPartner = new PartnerLifestyleAssetsandDebt();
  const personalDetail = new PersonalDetail();

  it.skip("Personal Detail", () => {
    personalDetail.section();
  });

  it.skip("Income And Expenses With Partner ", () => {
    IncomeAndExpensesPartner.section();
  });

  it.skip("Income And Expenses With Client ", () => {
    IncomeAndExpenseClient.section();
  });

  it("Lifestyle Assets and Debt With Partner", () => {
    LifestyleAssetsandDebtPartner.section();
  });

  it("Lifestyle Assets and Debt With Client", () => {
    LifestyleAssetsandDebtClient.section();
  });

 
});
