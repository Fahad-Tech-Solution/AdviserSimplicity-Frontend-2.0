class Input_details {
  // General method to select an option from dropdown
  selectDropdown(selector, value) {
    cy.get(selector).select(value, { force: true }).should("be.visible");
  }

  // General method to type text into input fields
  typeInput(selector, text) {
    cy.get(selector).should("be.visible").type(text, { force: true });
  }

  // Specific Methods for Different Fields
  selectTitle(title) {
    this.selectDropdown("#clientTitle", title);
  }

  enterSurname(surname) {
    this.typeInput("#clientSurname", surname);
  }

  enterGivenname(givenname) {
    this.typeInput("#clientGivenName", givenname);
  }

  enterPreferredName(preferredName) {
    this.typeInput("#clientPreferredName", preferredName);
  }

  enterMiddleName(middleName) {
    this.typeInput("#clientMiddleName", middleName);
  }

  selectGender(gender) {
    this.selectDropdown("#clientGender", gender);
  }

  enterDOB(dob) {
    cy.get("#clientDOB").should("be.visible").type(dob);
  }

  selectMaritalStatus(maritalStatus) {
    this.selectDropdown(
      'select[name="client.clientMaritalStatus"]',
      maritalStatus
    );
  }

  selectEmploymentStatus(employmentstatus) {
    this.selectDropdown("#clientEmploymentStatus", employmentstatus);
  }

  enterOccupationID(occupation) {
    this.typeInput("#clientOccupationID", occupation);
  }

  enterPRAge(plannedRetirementAge) {
    this.typeInput("#clientPlannedRetirementAge", plannedRetirementAge);
  }

  selectHealth(health) {
    this.selectDropdown("#clientHealth", health);
  }

  // For clicking radio buttons
  clickRadioButton(selector, value) {
    cy.get(selector).contains(value).click({ force: true });
  }

  enterSmoker(smoker) {
    this.clickRadioButton(
      ".col-md-8 > .row > :nth-child(30) > .form-check > .radiobutton > .label2 > span",
      smoker
    );
  }

  enterTax() {
    this.clickRadioButton(
      ".col-md-8 > .row > :nth-child(32) > .form-check > .radiobutton > .label2 > span",
      "Yes"
    );
  }

  enterphc() {
    this.clickRadioButton(
      ".col-md-8 > .row > :nth-child(34) > .form-check > .radiobutton > .label1 > span",
      "No"
    );
  }

  enterhelpdebt() {
    this.clickRadioButton(
      ".col-md-8 > .row > :nth-child(36) > .form-check > .radiobutton > .label2 > span",
      "Yes"
    );
  }

  enterHomeAddress(homeAddress) {
    this.typeInput("#clientHomeAddress", homeAddress);
  }

  enterPostCode(postcode) {
    this.typeInput("#clientPostcode", postcode);
  }

  enterCheckbox() {
    cy.get("#clientSameAsAbove").click({ force: true });
  }

  typeMobilenumbr(number) {
    this.typeInput("#clientMobile", number);
  }

  typeHomePhome(homephone) {
    this.typeInput("#clientHomePhone", homephone);
  }

  typeWorkPhone(workphone) {
    this.typeInput("#clientWorkPhone", workphone);
  }

  enterEmail(Email) {
    this.typeInput("#Email", Email);
  }
}

export default Input_details;
