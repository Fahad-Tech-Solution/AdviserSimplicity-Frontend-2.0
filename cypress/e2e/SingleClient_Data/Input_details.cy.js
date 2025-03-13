class Input_details {
  // General method to select an option from dropdown
  // selectDropdown(selector, value) {
  //   cy.get(selector).select(value, { force: true }).should("be.visible");
  // }

  selectDropdown(selector, value) {
    // Escape the selector if necessary
    const escapedSelector = selector.replace(/\./g, "\\.");
    cy.get(escapedSelector).should("be.visible").select(value);
  }

  // General method to select an option from dropdown

  // General method to type text into input fields
  typeInput(selector, text) {
    cy.get(selector).should("be.visible").type(text, { force: true });
  }

  // Specific Methods for Different Fields
  selectTitle(title) {
    this.selectDropdown("#clientTitle", title);
  }

  enterSurname(dataOfSurname, surname) {
    this.typeInput(`#${dataOfSurname}Surname`, surname);
  }

  enterGivenname(givenname) {
    this.typeInput("#clientGivenName", givenname);
  }

  enterGivennameP(givenname) {
    this.typeInput("#partnerGivenName", givenname);
  }

  enterPreferredName(preferredName) {
    this.typeInput("#clientPreferredName", preferredName);
  }

  enterPreferredNameP(preferredName) {
    this.typeInput("#partnerPreferredName", preferredName);
  }

  enterMiddleName(middleName) {
    this.typeInput("#clientMiddleName", middleName);
  }

  enterMiddleNameP(middleName) {
    this.typeInput("#partnerMiddleName", middleName);
  }

  selectGender(gender) {
    this.selectDropdown("#clientGender", gender);
  }

  selectGenderP(gender) {
    this.selectDropdown("#partnerGender", gender);
  }

  enterDOB(dob) {
    cy.get("#clientDOB").should("be.visible").type(dob);
  }

  enterDOBP(dob) {
    cy.get("#partnerDOB").should("be.visible").type(dob);
  }

  selectMaritalStatus(maritalStatus) {
    this.selectDropdown("#client.clientMaritalStatus", maritalStatus);
  }

  selectMaritalStatusP(maritalStatus) {
    this.selectDropdown("#partnerMaritalStatus", maritalStatus);
  }

  selectEmploymentStatus(employmentstatus) {
    this.selectDropdown("#clientEmploymentStatus", employmentstatus);
  }

  selectEmploymentStatusP(employmentstatus) {
    this.selectDropdown("#partnerEmploymentStatus", employmentstatus);
  }

  enterOccupationID(occupation) {
    this.typeInput("#clientOccupationID", occupation);
  }

  enterOccupationIDP(occupation) {
    this.typeInput("#partnerOccupationID", occupation);
  }

  enterPRAge(plannedRetirementAge) {
    this.typeInput("#clientPlannedRetirementAge", plannedRetirementAge);
  }

  enterPRAgeP(plannedRetirementAge) {
    this.typeInput("#partnerPlannedRetirementAge", plannedRetirementAge);
  }

  selectHealth(health) {
    this.selectDropdown("#clientHealth", health);
  }

  selectHealthP(health) {
    this.selectDropdown("#partnerHealth", health);
  }

  // // For clicking radio buttons
  // clickRadioButton(selector, value) {
  //   cy.get(selector).contains(value).click({ force: true });
  // }

  // clickRadioButtonP(selector, value) {
  //   cy.get(selector).contains(value).click({ force: true });
  // }

  // enterSmoker(smoker) {
  //   this.clickRadioButton(
  //     ".col-md-8 > .row > :nth-child(30) > .form-check > .radiobutton",
  //     smoker
  //   );
  // }

  // enterSmokerP(smoker) {
  //   this.clickRadioButton(
  //     ".col-md-4 > .row > :nth-child(30) > .form-check > .radiobutton",
  //     smoker
  //   );
  // }

  // enterTax(tax) {
  //   this.clickRadioButton(
  //     ".col-md-8 > .row > :nth-child(32) > .form-check > .radiobutton",
  //     tax
  //   );
  // }

  // enterTaxP(tax) {
  //   this.clickRadioButton(
  //     ".col-md-4 > .row > :nth-child(32) > .form-check > .radiobutton",
  //     tax
  //   );
  // }

  // enterphc(phc) {
  //   this.clickRadioButton(
  //     ".col-md-8 > .row > :nth-child(34) > .form-check > .radiobutton",
  //     phc
  //   );
  // }

  // enterphc(phc) {
  //   this.clickRadioButtonP(
  //     ".col-md-4 > .row > :nth-child(34) > .form-check > .radiobutton",
  //     phc
  //   );
  // }

  // enterhelpdebt(Help) {
  //   this.clickRadioButton(
  //     ".col-md-4 > .row > :nth-child(34) > .form-check > .radiobutton > .label2 > span",
  //     Help
  //   );
  // }

  // enterhelpdebtP(Help) {
  //   this.clickRadioButton(
  //     ".col-md-4 > .row > :nth-child(36) > .form-check > .radiobutton > .label2 > span",
  //     Help
  //   );
  // }

  enterHomeAddress(homeAddress) {
    this.typeInput("#clientHomeAddress", homeAddress);
  }

  enterHomeAddressP(homeAddress) {
    this.typeInput("#partnerHomeAddress", homeAddress);
  }

  enterPostCode(postcode) {
    this.typeInput("#clientPostcode", postcode);
  }

  enterPostCodeP(postcode) {
    this.typeInput("#partnerPostcode", postcode);
  }

  enterCheckbox() {
    cy.get("#clientSameAsAbove").click({ force: true });
  }

  enterCheckboxP() {
    cy.get("#partnerSameAsClient").click({ force: true });
  }

  typeMobilenumbr(number) {
    this.typeInput("#clientMobile", number);
  }

  typeMobilenumbrP(number) {
    this.typeInput("#partnerMobile", number);
  }

  typeHomePhome(homephone) {
    this.typeInput("#clientHomePhone", homephone);
  }

  typeHomePhomeP(homephone) {
    this.typeInput("#partnerHomePhone", homephone);
  }

  typeWorkPhone(workphone) {
    this.typeInput("#clientWorkPhone", workphone);
  }

  typeWorkPhoneP(workphone) {
    this.typeInput("#partnerWorkPhone", workphone);
  }

  enterEmail(Email) {
    this.typeInput("#Email", Email);
  }
  enterEmailP(Email) {
    this.typeInput("#partnerEmail", Email);
  }
}

export default Input_details;
