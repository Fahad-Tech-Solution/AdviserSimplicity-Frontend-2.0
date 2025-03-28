/// <reference types="cypress" />

import Input_details from "../e2e/SingleClient_Data/Input_details.cy";
import Childern_Details from "../e2e/SingleClient_Data/Childern_details.cy";
import Questions_section from ".//Question's/Question_Sections.cy.js";
import PersonalIncomeAndExpense from "./Personal Income And Expense/Client Sectioncy.js";
import PersonalIncomeAndExpensePartnerSection from "./Personal Income And Expense/Partner Section.cy.js";
import PersonalAssetsAndDebt from "./Personal Assets And Debt/Cards.cy";
import PersonalAssetsAndDebtPartnerSection from "./Personal Assets And Debt/Partner Section.cy.js";
import FinancialInvestments from "./Financial Investments/Client Section.cy.js";
import FinancialInvestmentsPartnerSection from "./Financial Investments/Partner Section.cy.js";
import FinancialInvestmentsJoinSection from "./Financial Investments/Joint Section.cy.js";
import EstatePlanningAndProfessionalAdviser from "./Estate Planning and Professional Advisers/Cards.cy";
import PersonalInsurance from "./Personal Insurance/Cards.cy";
import BusinessEntities from "./Business Entities/Cards.cy";
import SMSF from "./SMSF/Cards.cy";
import InvestmentTrust from "./Investment Trust/Cards.cy";
//import CashFlow from './Cash Flow/Cash Flow.cy.js';

describe("Adviser Simplicity", () => {
  const inputDetails = new Input_details();
  const childrenDetails = new Childern_Details();
  const questionsSection = new Questions_section();
  const personalIncomeExpense = new PersonalIncomeAndExpense();
  const personalIncomeExpensePartnerSection =
    new PersonalIncomeAndExpensePartnerSection();
  const personalassetsanddebt = new PersonalAssetsAndDebt();
  const personalassetsanddebtPartnerSection =
    new PersonalAssetsAndDebtPartnerSection();
  const financialInvestments = new FinancialInvestments();
  const financialInvestmentsPartnerSection =
    new FinancialInvestmentsPartnerSection();
  const financialInvestmentsJoinSection = new FinancialInvestmentsJoinSection();
  const adviser = new EstatePlanningAndProfessionalAdviser();
  const personalInsurance = new PersonalInsurance();
  const businessEntities = new BusinessEntities();
  const smsf = new SMSF();
  const investmentTrust = new InvestmentTrust();
  //const cashFlow = new CashFlow();

  it.skip("Adding Single Client Detail's", () => {
    cy.visit(Cypress.env("CashFlowUrl"));

    cy.get("img").click();
    cy.get(
      ".mx-0 > .Custom_Accordion > .accordion-item > .accordion-header > .accordion-button"
    ).click();
    cy.get("#Client").click();
    cy.get(".px-5 > img").click();

    const labels = [
      "Title",
      "Surname",
      "Given Name",
      "Middle Name",
      "Preferred Name",
      "Gender",
      "Date of Birth",
      "Age",
      "Marital Status",
      "Employment Status",
      "Occupation",
      "Planned Retirement Age",
      "Health",
      "Smoker",
      "Tax Resident",
      "Private Health Cover",
      "HELPS Debt",
      "Home Address",
      "Postcode/Suburb",
      "Same as home address",
      "Mobile Number",
      "Home Phone",
      "Work Phone",
      "Email",
    ];

    labels.forEach((label) => {
      cy.contains("label", label).should("be.visible");
    });

    inputDetails.selectTitle("Mr");
    let dataOf = "client";
    inputDetails.enterSurname(dataOf, "User client");

    inputDetails.enterPreferredName("Aiden Smith");
    inputDetails.enterMiddleName("Admin");
    inputDetails.selectGender("Male");

    inputDetails.selectMaritalStatus("Partnered");
    inputDetails.selectEmploymentStatus("Employee");
    inputDetails.enterOccupationID("Amet ut consectetur");
    inputDetails.enterPRAge("65");
    inputDetails.selectHealth("Good");
    inputDetails.enterDOB("8/10/2004");
    // inputDetails.enterSmoker('Yes');  // ✅ Call method from page object
    // inputDetails.enterTax();
    // inputDetails.enterphc();
    // inputDetails.enterhelpdebt();
    inputDetails.enterHomeAddress("House NO 2-A , Punjab, Lahore");
    inputDetails.enterPostCode("99");
    inputDetails.enterCheckbox();
    inputDetails.typeMobilenumbr("+71 323 435 1223");
    inputDetails.typeHomePhome("+71 665 432 7896");
    inputDetails.typeWorkPhone("+71 009 877 099");
    inputDetails.enterEmail("Automation9490785440@gmail.com");

    inputDetails.enterGivenname("Quality Assurance");

    // inputDetails.selectTitle("Mr");
    dataOf = "partner";
    inputDetails.enterSurname(dataOf, "User Partner");
    inputDetails.enterGivennameP("Quality Assurance");
    inputDetails.enterPreferredNameP("Emma Tayler");
    inputDetails.enterMiddleNameP("Admin");
    inputDetails.selectGenderP("Male");

    inputDetails.selectMaritalStatusP("Partnered");
    inputDetails.selectEmploymentStatusP("Employee");
    inputDetails.enterOccupationIDP("Amet ut consectetur");
    inputDetails.enterPRAgeP("65");
    inputDetails.selectHealthP("Good");
    inputDetails.enterDOBP("8/10/2004");
    // inputDetails.enterSmokerP("Yes");
    // inputDetails.enterTaxP();
    // inputDetails.enterphcP();
    // inputDetails.enterhelpdebtP();
    inputDetails.enterHomeAddressP("House NO 2-A , Punjab, Lahore");
    inputDetails.enterPostCodeP("99");
    inputDetails.enterPostCodeP("99");
    inputDetails.enterCheckboxP();
    inputDetails.typeMobilenumbrP("+71 323 435 1223");
    inputDetails.typeHomePhomeP("+71 665 432 7896");
    inputDetails.typeWorkPhoneP("+71 009 877 099");
    inputDetails.enterEmailP("Automation9490785440@gmail.com");

    // cy.contains("Submit");
    // cy.get(".btn").click();
  });

  it.skip("Childern Detail's", () => {
    childrenDetails.fillDetails();
  });

  it.skip("Question's", () => {
    questionsSection.visitAndCheck();
  });

  it("Personal Income Expense Partner Section", () => {
    personalIncomeExpensePartnerSection.section();
  });

  it("Personal Income Expense Client Section", () => {
    personalIncomeExpense.section();
  });

  it("Personal Assets And Debt Partner Section", () => {
    personalassetsanddebtPartnerSection.section();
  });

  it("Personal Assets And Debt Card's", () => {
    personalassetsanddebt.section();
  });

  it.only("Financial Investments Card's", () => {
    financialInvestments.section();
  });

  it.only("Financial Investments Partner Section", () => {
    financialInvestmentsPartnerSection.section();
  });

  it.only("Financial Investments Join Section", () => {
    financialInvestmentsJoinSection.section();
  });

  it.skip("Estate Planning And Professional Adviser Card's", () => {
    adviser.section();
  });

  it.skip("Personal Insurance Card's", () => {
    personalInsurance.section();
  });

  it.skip("Business Entities Card's", () => {
    businessEntities.section();
  });

  it.skip("SMSF Card's", () => {
    smsf.section();
  });

  it.skip("Investment Trust Card's", () => {
    investmentTrust.section();
  });

  //CashFlow

  //   it('Cash Flow', () => {
  //     cashFlow.section();
  // });
});
