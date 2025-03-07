// e2e/Cash Flow/Cash Flow.cy.js
/// <reference types="cypress" />
import PartnerIncomeAndExpenses from "./Income & Expenses (Partner).cy.js";
import ClientIncomeAndExpenses from "./Income & Expenses (Client).cy.js";
import PartnerLifestyleAssetsandDebt from "./Lifestyle Assets & Debt (Partner).cy.js";
import ClientLifestyleAssetsandDebt from "./Lifestyle Assets & Debt (Client).cy.js";
import PartnerFinancialInvestments from "./Financial Investment (Partner).cy.js";
import ClientFinancialInvestments from "./Financial Investments (Client).cy.js";
import PartnerInvestmentTrust from "./Investment Trust (Partner).cy.js";
import ClientInvestmentTrust from "./Investment Trust (Client).cy.js";
import PartnerBusinessEntities from "./Business Entities (Partner).cy.js";
import ClientBusinessEntities from "./Business Entities (Client).cy.js";
import PartnerSMSF from "./SMSF (Partner).cy.js";
import ClientSMSF from "./SMSF (Client).cy.js";

import PersonalDetail from "./Personal Detail.cy.js";

describe("Adviser Simplicity", () => {
  const IncomeAndExpensesPartner = new PartnerIncomeAndExpenses();
  const IncomeAndExpenseClient = new ClientIncomeAndExpenses();
  const LifestyleAssetsandDebtPartner = new PartnerLifestyleAssetsandDebt();
  const LifestyleAssetsandDebtClient = new ClientLifestyleAssetsandDebt();
  const FinancialInvestmentsPartner = new PartnerFinancialInvestments();
  const FinancialInvestmentsClient = new ClientFinancialInvestments();
  const InvestmentTrustPartner = new PartnerInvestmentTrust();
  const InvestmentTrustClient = new ClientInvestmentTrust();
  const BusinessEntitiesPartner = new PartnerBusinessEntities();
  const BusinessEntitiesClient = new ClientBusinessEntities();
  const SMSFPartner = new PartnerSMSF();
  const SMSFClient = new ClientSMSF();
  const personalDetail = new PersonalDetail();

  it("Personal Detail", () => {
    personalDetail.section();
  });

  it("Income And Expenses With Partner ", () => {
    IncomeAndExpensesPartner.section();
  });

  it("Income And Expenses With Client ", () => {
    IncomeAndExpenseClient.section();
  });

  it("Lifestyle Assets and Debt With Partner", () => {
    LifestyleAssetsandDebtPartner.section();
  });

  it("Lifestyle Assets and Debt With Client", () => {
    LifestyleAssetsandDebtClient.section();
  });

  it("Financial Investments With Partner", () => {
    FinancialInvestmentsPartner.section();
  });

  it("Financial Investments With Client", () => {
    FinancialInvestmentsClient.section();
  });


  it("Business Entities With Partner", () => {
    BusinessEntitiesPartner.section();
  });

  it("Business Entities With Client", () => {
    BusinessEntitiesClient.section();
  });

  it("SMSF With Partner", () => {
    SMSFPartner.section();
  });

  it("SMSF With Client", () => {
    SMSFClient.section();
  });
 
  
  it.only("Investment Trust With Partner", () => {
    InvestmentTrustPartner.section();
  });

  it("Investment Trust With Client", () => {
    InvestmentTrustClient.section();
  });

});
