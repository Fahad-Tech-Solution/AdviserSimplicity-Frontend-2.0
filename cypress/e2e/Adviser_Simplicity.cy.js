/// <reference types="cypress" />

import Input_details from "../e2e/SingleClient_Data/Input_details.cy"; 
import Childern_Details from "../e2e/SingleClient_Data/Childern_details.cy";
import Questions_section from "./Question's/Question_sections.cy";
import PersonalIncomeAndExpense from "./Personal Income And Expense/Cards.cy";
import PersonalAssetsAndDebt from "./Personal Assets And Debt/Cards.cy";
import FinancialInvestments from "./Financial Investments/Cards.cy";
import EstatePlanningAndProfessionalAdviser from "./Estate Planning and Professional Advisers/Cards.cy";
import PersonalInsurance from "./Personal Insurance/Cards.cy";
import BusinessEntities from "./Business Entities/Cards.cy";
import SMSF from "./SMSF/Cards.cy";
import InvestmentTrust from "./Investment Trust/Cards.cy";

describe("Adviser Simplicity", () => {
  const inputDetails = new Input_details(); 
  const childrenDetails = new Childern_Details();
  const questionsSection = new Questions_section();
  const personalIncomeExpense = new PersonalIncomeAndExpense();
  const personalassetsanddebt = new PersonalAssetsAndDebt();
  const financialInvestments = new FinancialInvestments();
  const adviser = new EstatePlanningAndProfessionalAdviser();
  const personalInsurance = new PersonalInsurance();
  const businessEntities = new BusinessEntities();
  const smsf = new SMSF(); 
  const investmentTrust = new InvestmentTrust();

  it.skip("Adding Single Client Detail's", () => {
    cy.visit("http://ec2-3-25-227-176.ap-southeast-2.compute.amazonaws.com/");

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
    inputDetails.enterSurname("User");
    inputDetails.enterGivenname("Quality Assurance");
    inputDetails.enterPreferredName("Admin");
    inputDetails.enterMiddleName("Admin");
    inputDetails.selectGender("Male");
    inputDetails.enterDOB("8/10/2004");
    inputDetails.selectMaritalStatus("Single");
    inputDetails.selectEmploymentStatus("Employee");
    inputDetails.enterOccupationID("Amet ut consectetur");
    inputDetails.enterPRAge("65");
    inputDetails.selectHealth("Good");
    inputDetails.enterSmoker("Yes");
    inputDetails.enterTax();
    inputDetails.enterphc();
    inputDetails.enterhelpdebt();
    inputDetails.enterHomeAddress("House NO 2-A , Punjab, Lahore");
    inputDetails.enterPostCode("99");
    inputDetails.enterCheckbox();
    inputDetails.typeMobilenumbr("+71 323 435 1223");
    inputDetails.typeHomePhome("+71 665 432 7896");
    inputDetails.typeWorkPhone("+71 009 877 099");
    inputDetails.enterEmail("Automation9490780@gmail.com");

    cy.contains("Submit");
    cy.get(".btn").click();
  });


  it.skip("Childern Detail's", () => {
    childrenDetails.fillDetails();
  });


  it.skip("Question's", () => {
    questionsSection.visitAndCheck();
  });


  it("Personal Income Expense Card's", () => {
    personalIncomeExpense.section();
  });


  it(" Personal Assets And Debt Card's", () => {
    personalassetsanddebt.section();
  });


  it("Financial Investments Card's", () => {
    financialInvestments.section();
  });


  it("Estate Planning And Professional Adviser Card's", () => {
    adviser.section();
  });


  it("Personal Insurance Card's", () => {
    personalInsurance.section();
  });


  it("Business Entities Card's", () => {
    businessEntities.section();
  });


  it("SMSF Card's", () => {
    smsf.section();
  });


  it.only("Investment Trust Card's", () => {
    investmentTrust.section();
  });

});
