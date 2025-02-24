/// <reference types="cypress" />
class PartnerInvestmentTrust {
    section() {
        cy.visit("http://ec2-54-66-20-19.ap-southeast-2.compute.amazonaws.com/");
    
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
    
      
    
    }
}
export default PartnerInvestmentTrust;