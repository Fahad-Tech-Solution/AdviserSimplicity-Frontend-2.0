class EstatePlanningAndProfessionalAdviser {
  section() {
    cy.visit("http://ec2-54-66-20-19.ap-southeast-2.compute.amazonaws.com/");
    cy.get(":nth-child(6) > :nth-child(7)").click();
    cy.get("#popover > :nth-child(3)").click();

    cy.get(
      '[statusstep="40"] > .ant-steps-item-container > .ant-steps-item-icon > .ant-steps-icon > .rounded-circle'
    ).click();
    cy.contains("Estate Planning & Professional Advisers");

    //Select Question Section Start Here
    cy.get(".img-fluid").click();

    cy.get(":nth-child(4) > .col-md-12 > .btn-outline")
      .contains("Back")
      .should("be.visible");
    cy.get(":nth-child(4) > .col-md-12 > .bgColor")
      .contains("Next")
      .should("be.visible");

    //Select Cards

    //Header
    cy.get(".modal-header").within(() => {
      cy.contains("Questions").should("be.visible");
      cy.get(".btn-close").should("be.visible");
    });

    //Body
    cy.wait(1000);
    cy.get(":nth-child(1) > .d-flex > .border")
      .click()
      .within(() => {
        cy.get("img").should("be.visible");
        cy.contains("Do you have a Will?").should("be.visible");

        cy.get('svg[viewBox="0 0 512 512"]') // Select the SVG element
          .trigger("mouseover");
      });

    cy.wait(1000);
    cy.get(":nth-child(2) > .d-flex > .border")
      .click()
      .within(() => {
        cy.get("img").should("be.visible");
        cy.contains("Do you have a Power of Attorney in place?").should(
          "be.visible"
        );
        cy.get('svg[viewBox="0 0 512 512"]') // Select the SVG element
          .trigger("mouseover");
      });

    cy.wait(1000);
    cy.get(":nth-child(3) > .d-flex > .border")
      .click()
      .within(() => {
        cy.get("img").should("be.visible");
        cy.contains("Do you have any Professional Advisers").should(
          "be.visible"
        );
      });

    //Footer
    cy.get(".modal-footer").within(() => {
      cy.contains("Close").should("be.visible");
      cy.contains("Submit").should("be.visible").click();
    });

    //Select Question Section End Here

    //Wills:
    cy.get(":nth-child(1) > .py-4").within(() => {
      cy.contains("Wills");
      cy.get("img");
      cy.contains("Admin");
      cy.get(
        ".mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
      )
        .click()
        .should("be.visible");
    });
    //Will Card Header
    cy.get(".modal-header").within(() => {
      cy.contains("Wills");
      cy.get(".btn-close").should("be.visible");
    });

    cy.get(".modal-body").within(() => {
      cy.contains("Owner").should("be.visible");
    });

    cy.get(".css-1xc3v61-indicatorContainer").click();
    cy.get("#react-select-2-option-0").click();
    //Will Card Section

    cy.get(".table").within(() => {
      cy.contains("No#");
      cy.get("tbody > tr > :nth-child(1)");
      cy.contains("Admin");

      cy.contains("Year set up");
      cy.get("#yearSetUp").clear().type("2022").blur();

      cy.get(":nth-child(3) > .form-check > .radioButton2")
        .contains("Yes")
        .click();

      cy.contains("Enduring Guardianship").should("be.visible");
      cy.get(":nth-child(5) > .form-check > .radioButton2")
        .contains("Yes")
        .click();

      cy.contains("Testamentary Trust").should("be.visible");
      cy.get(":nth-child(6) > .form-check > .radioButton2")
        .contains("Yes")
        .click();
    });

    cy.contains("Executor").should("be.visible");
    cy.get(".d-flex > .btn").click();
    cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
      () => {
        cy.contains("Executor");

        cy.contains("Description");
        cy.get(".col-md-12 > .form-control").type(
          "This Text is written for Automation Testing Purpose"
        );

        cy.contains("Close");
        cy.contains("Submit").click();
      }
    );

    cy.contains("Any specific estate planning requirements/needs?").should(
      "be.visible"
    );
    cy.get(":nth-child(7) > .form-check > .radioButton2")
      .contains("Yes")
      .click();
    cy.get("#button-addon2").click();

    cy.get('[style="display: block;"] > .modal-dialog > .modal-content').within(
      () => {
        cy.contains("Estate Planning");

        cy.contains("Description");
        cy.get(".col-md-12 > .form-control").type(
          "This Text is written for Automation Testing Purpose"
        );

        cy.contains("Close");
        cy.contains("Submit").click();
      }
    );

    //Wills Card Footer

    cy.contains("Close").should("be.visible");
    cy.contains("Submit").should("be.visible").click();

    cy.get("#clientwill").should("not.have.value", "");

    //Power OF Attorneys

    cy.get(":nth-child(2) > .py-4").within(() => {
      cy.contains("Power of Attorneys");
      cy.get("img");
      cy.contains("Admin");
      cy.get(
        ".mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
      )
        .click()
        .should("be.visible");
    });
    //Power OF Attorneys Card Header
    cy.get(".modal-header").within(() => {
      cy.contains("Power of Attorneys");
      cy.get(".btn-close").should("be.visible");
    });

    cy.get(".modal-body").within(() => {
      cy.contains("Owner").should("be.visible");
    });

    cy.get(".css-1xc3v61-indicatorContainer").click();
    cy.get("#react-select-3-option-0").click();
    //Power OF Attorneys Card Section

    cy.get(".table").within(() => {
      cy.contains("No#");
      cy.get("tbody > tr > :nth-child(1)");
      cy.contains("Admin");

      cy.contains("POA Type");
      cy.get(".form-select").select("Limited");

      cy.contains("Year Set up");
      cy.get("#yearSetUp").type("2012");

      cy.contains("Name of POA");
      cy.get("#POAName").type("Frankled");

      cy.contains("DOB");
      cy.get("#DOB").type(12 - 1 - 2021);
    });

    cy.contains("Relationship Status");
    cy.get(
      ".css-1dq17ye-control > .css-d07bj1 > .css-1xc3v61-indicatorContainer"
    ).click();

    cy.get("#react-select-4-option-0").click();

    //Inner Card Footer
    cy.contains("Close").should("be.visible");
    cy.contains("Submit").should("be.visible").click();

    cy.get("#clientPOA").should("not.have.value", "");

    //Professional Advisers

    cy.get(":nth-child(3) > .py-4").within(() => {
      cy.contains("Professional Advisers");
      cy.get("img");
      cy.contains("Admin");
      cy.wait(1000);
      cy.get(
        ".mb-0.bg-secondary.rounded-circle.text-light.py-1.px-2.curser-pointer"
      )
        .should("be.visible") // Ensure the element is now visible
        .click({ multiple: true, force: true });
    });

    // Professional Advisers Card Header
    cy.get(".modal-header").within(() => {
      cy.contains("Professional Advisers");
      cy.get(".btn-close").should("be.visible");
    });

    cy.get(".modal-body").within(() => {
      cy.contains("How many Professional Advisers does Admin have :").should(
        "be.visible"
      );
    });

    cy.get("#NumberOfMap")
      .clear()
      .type("1") // Type "1" into the element
      .should("have.value", "1") // Assert the value is "1"
      .then(($input) => {
        const enteredValue = $input.val(); // Store the entered value in a variable
        cy.wrap(enteredValue).as("savedValue"); // Alias the value for later use
      });

    // Professional Advisers Card Section
    cy.get(".table").within(() => {
      // Assert and interact with "No#"
      cy.contains("No#").should("be.visible"); // Ensure "No#" text is visible
      cy.get("tbody > tr > :nth-child(1)").should("be.visible"); // Assert the cell is visible
      cy.contains("1").should("be.visible"); // Ensure the value "1" is displayed

      // Assert and select "Adviser Type"
      cy.contains("Adviser Type").should("be.visible"); // Ensure "Adviser Type" is visible
      cy.get("#POAType0")
        .should("exist") // Assert the dropdown exists
        .should("be.visible") // Assert the dropdown is visible
        .select("Doctor") // Select "Doctor" from the dropdown
        .should("have.value", "Doctor"); // Ensure the selected value is correct

      // Assert and type in "Adviser Name"
      cy.contains("Adviser Name").should("be.visible"); // Ensure "Adviser Name" is visible
      cy.get("#adviserName0")
        .should("exist") // Assert the input exists
        .should("be.visible")
        .clear() // Assert the input is visible
        .type("Automation Engineer") // Type the value
        .should("have.value", "Automation Engineer"); // Verify the typed value

      // Assert and type in "Company"
      cy.contains("Company").should("be.visible"); // Ensure "Company" text is visible
      cy.get("#company0")
        .should("exist") // Assert the input exists
        .should("be.visible")
        .clear() // Assert the input is visible
        .type("FTS") // Type the company name
        .should("have.value", "FTS"); // Verify the typed value

      // Assert and type in "Phone"
      cy.contains("Phone").should("be.visible"); // Ensure "Phone" text is visible
      cy.get("#phone0")
        .should("exist") // Assert the input exists
        .should("be.visible")
        .clear() // Assert the input is visible
        .type("907"); // Type the phone number

      // Assert and type in "Email"
      cy.contains("Email").should("be.visible"); // Ensure "Email" text is visible
      cy.get("#email0")
        .should("exist") // Assert the input exists
        .should("be.visible")
        .clear() // Assert the input is visible
        .type("automation@gmail.com") // Type the email
        .should("have.value", "automation@gmail.com"); // Verify the typed value
    });

    cy.contains("Close").should("be.visible");
    cy.contains("Submit").should("be.visible").click();

    cy.get("#clientprofessionalAdviser").should(
      "not.have.value",
      this.savedValue
    );
  }
}

export default EstatePlanningAndProfessionalAdviser;
