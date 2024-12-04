/// <reference types="cypress" />

// Describe block to group related test cases under a single scenario
describe("Scenario: User Login", () => {
  // Test Case 1: Practice on Demo website
  it("Test Case 1: Practice on Demo website", () => {
    // Set the viewport size for the test
    cy.viewport(1280, 720);

    // Visit the specified URL
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");

    // Find the "ADD TO CART" button and click it
    cy.get(".products").find(".product").contains("ADD TO CART").click();

    // Search for "Broccoli" in the search bar
    cy.get(".search-keyword").type("Brocolli");

    // Get the brand name and log it to the console
    cy.get(".brand.greenLogo")
      .invoke("text") // Invoke jQuery's text method to get the brand name
      .then((value) => {
        // Log the brand name value to Cypress' console
        cy.log(value);
      });

    // Click on the cart icon to view the cart
    cy.get("a.cart-icon").click();

    // Click on "PROCEED TO CHECKOUT" to proceed with the checkout process
    cy.contains("PROCEED TO CHECKOUT").click();
  });

  // Test Case 2: Add Carrot to Cart
  it("Test Case 2: Add Carrot to Cart", () => {
    // Visit the specified URL again
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");

    // Type "Ca" in the search bar to find products
    cy.get(".search-keyword").type("Ca");

    // Loop through each product to find "Carrot" and add it to the cart
    cy.get(".products")
      .find(".product")
      .each((ele) => {
        // Check if the product name includes "Carrot"
        if (ele.text().includes("Carrot")) {
          // If it does, wrap the element and click the button to add it to the cart
          cy.wrap(ele).find("[type='button']").click();
        }
      });
  });

  // Test Case 3: Select from Dropdown
  it("Test Case 3: Select from Dropdown", () => {
    // Visit the Automation Practice URL
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

    // Select "option2" from the dropdown menu
    cy.get("#dropdown-class-example")
      .select("option2")
      .should("have.value", "option2");

    cy.get("#autocomplete").type("am");

    // Wait for a moment to allow suggestions to appear (optional)
    cy.wait(500);

    // Get all the autocomplete suggestions
    cy.get(".ui-menu-item-wrapper").each((ele) => {
      // Check if the suggestion text is "American Samoa"
      if (ele.text() === "American Samoa") {
        // Click on the matched suggestion
        cy.wrap(ele).click(); // Wrap the element to use Cypress commands
      }
    });

    // Select the checkbox with the id "checkBoxOption1"
    cy.get("#checkBoxOption1").click();

    // Get a common attribute and use .check to select specific option that you want to show
    cy.get("[type='checkbox']").check(["option2", "option3"]);

    // Get by class and use .unchecked for the specific value that you do not want to select
    cy.get("#checkBoxOption1").uncheck().should("not.be.checked");

    // Select the radio button with value "radio1"
    cy.get("[value='radio1']").check().should("be.checked");

    // Log the text of each table cell
    cy.get(".table-display").each(($cell) => {
      cy.log($cell.text()); // This will print each cell's text to the Cypress log
    });

    // Visit the courses page
    cy.visit("https://courses.rahulshettyacademy.com");

    // Wait for the "Courses" link to appear and be visible
    cy.contains("Courses", { timeout: 15000 }).should("be.visible").click();

    // Go back to the previous page
    cy.go(-1);

    // Clear cookies and local storage
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  // Test Case 4: Select from Dropdown
  it("Test Case 4 : Select from Dropdown", () => {
    // Step 1: Visit the website and wait for 4 seconds
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

    //Alert (for only ok option)
    cy.get("#alertbtn").click();
    //window alert is a command in cypress in this command we create a function ()
    cy.on("window:alert", (popup) => {
      //in this function we call the msg
      expect(popup).to.be.equal(
        "Hello , share this practice page and share your knowledge"
      );
    });

    //Alert (submit for ok and cancel option)

    // Listen for the window confirm dialog event
    cy.on("window:confirm", (message) => {
      // Assert that the message in the confirm box matches the expected text
      expect(message).to.equal("Hello , Are you sure you want to confirm?");
      // Return false to simulate clicking the "Cancel" button on the confirm popup
      //False ke jga true b use kr skta ho depend on your requirment
      return true;
    });
    // Trigger the click event on the button with id 'confirmbtn' to open the confirm popup
    cy.get("#confirmbtn").click();

    //get value from hover drop down

    //cy.get('.mouse-hover-content').contains('Top').click();  // Clicks on the element that contains 'Top'
    //cy.url().should('include', 'Top');  // Verifies that the URL includes 'Top'
  });
  it("Test Case 5: Preactice ", () => {
    // Visit the specified URL again
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

    //get value from hover drop down

    cy.get(".mouse-hover-content") // Finds the element with the class 'mouse-hover-content'
      .contains("Top") // Looks for text inside this element that says 'Top'
      .click({ force: true }); // Clicks on the element even if it's not visible or interactable (forceful click)
    cy.url() // Gets the current URL of the page
      .should("include", "#top"); // Verifies that the URL contains '#top' as part of the address
  });

  it("Intercepting API", () => {
    cy.intercept("GET", "**/AutomationPractice/").as("userInfo");
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
      .wait("@userInfo")
      .then((res) => cy.log(res));
  });
});

///table
//get table data in cypress
// tableTest.cy.js
describe("Table Tests", () => {
  beforeEach(() => {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
  });

  it("should verify table contents", () => {
    // Ensure the table exists and is visible
    cy.get("#product")
      .should("exist")
      .and("be.visible")
      .should("have.length", 6);
    cy.get("thead > tr > :nth-child(1)").eq(0).should("have.text", "No#");
    cy.get("thead > tr > :nth-child(2)").eq(1).should("have.text", "Name");
    cy.get("thead > tr > :nth-child(3)").eq(2).should("have.text", "Dob");
    cy.get("thead > tr > :nth-child(4)").eq(3).should("have.text", "Gender");
    cy.get("thead > tr > :nth-child(5)")
      .eq(4)
      .should("have.text", "Add in Relationship");
    cy.get("thead > tr > :nth-child(6)")
      .eq(5)
      .should("have.text", "Add in is Child Depenant");

    // Verify first data row contents (second row in tbody)
    cy.get("#product tbody tr")
      .eq(1) // Select second row (first data row)
      .should("be.visible")
      .within(() => {
        // Verify Instructor column
        cy.get("td").eq(0).should("have.text", "Rahul Shetty");

        // Verify Course column
        cy.get("td")
          .eq(1)
          .should(
            "have.text",
            "Selenium Webdriver with Java Basics + Advanced + Interview Guide"
          );

        // Verify Price column
        cy.get("td").eq(2).should("have.text", "30");
      });

    // Additional tests for other rows
    cy.get("#product tbody tr")
      .eq(2) // Third row (second data row)
      .within(() => {
        cy.get("td").eq(0).should("have.text", "Rahul Shetty");
        cy.get("td")
          .eq(1)
          .should(
            "have.text",
            "Learn SQL in Practical + Database Testing from Scratch"
          );
        cy.get("td").eq(2).should("have.text", "25");
      });

    cy.get("#product tbody tr")
      .eq(3) // Fourth row (third data row)
      .within(() => {
        cy.get("td").eq(0).should("have.text", "Rahul Shetty");
        cy.get("td")
          .eq(1)
          .should(
            "have.text",
            "Appium (Selenium) - Mobile Automation Testing from Scratch"
          );
        cy.get("td").eq(2).should("have.text", "30");
      });
  });
});
///learning
/// <reference types="cypress" />

import LoginPage from "./LoginPage.cy";

describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://example.cypress.io");
    cy.get(
      ":nth-child(4) > .row > .col-xs-12 > .home-list > :nth-child(1) > ul > :nth-child(1) > a"
    ).click();
    // Assertion (should-contain)
    cy.get("#query-btn").should("contain", "Button");

    cy.visit("https://example.cypress.io");
    cy.get(
      ":nth-child(4) > .row > .col-xs-12 > .home-list > :nth-child(1) > ul > :nth-child(1) > a"
    ).click();
    // Assertion (should-have) also use this (have.class,have.text,have.html)
    cy.get("#query-btn")
      .should("have.class", "query-btn")
      .click()
      .should("be.visible");

    //should-be  .should('be.visible)
    //be.selected
    //be.disable
    //be.enable
    //be.focused = have.focus
    //implicit assections myea 2 trha ka assections hota ha .should() or .and()
    //.and() myea simply .should() ke jga pa .and() use kr skta ha us yahi difference ha dono myea like   .and ('be.visible)

    //if else example
    // enterTax(tax) {
    //   if (tax === "Yes") {
    //     cy.get('.col-md-8 > .row > :nth-child(32) > .form-check > .radiobutton > .label1 > span')
    //       .contains("Yes")
    //       .click();
    //   } else {
    //     cy.get('.col-md-8 > .row > :nth-child(32) > .form-check > .radiobutton > .label2 > span')
    //       .contains("No")
    //       .click();
    //   }
    // }
  });
});

///
class AddClient {
  selectTitle(title) {
    cy.get("#clientTitle ").select(title, { force: true }).wait(1000); // Open the dropdown
  }

  enterSurname(surname) {
    cy.get("#clientSurname").type(surname).wait(1000);
  }

  enterGivenname(givenname) {
    cy.get("#clientGivenName").type(givenname).wait(1000);
  }

  enterPreferredName(preferredName) {
    cy.get("#clientPreferredName").type(preferredName).wait(2000);
  }

  enterMiddleName(middleName) {
    cy.get("#clientMiddleName").type(middleName).wait(1000);
  }

  selectGender(gender) {
    cy.get("#clientGender").select(gender).wait(1000); // Open the dropdown
  }

  enterDOB(dob) {
    cy.get("#clientDOB").should("be.visible"); // Ensure the field is visible.should("not.be.disabled") // Ensure the field is not disabled.wait(1000) // Optional delay.type(dob); // Use the actual value of dob
  }

  selectMaritalStatus(maritalStatus) {
    cy.get('select[name="client.clientMaritalStatus"]').select(maritalStatus, {
      force: true,
    });
  }

  selectEmploymentStatus(employmentstatus) {
    cy.get("#clientEmploymentStatus").select(employmentstatus); // Open the dropdown
  }

  enterOccupationID(occupation) {
    cy.get("#clientOccupationID").type(occupation);
  }

  enterPRAge(plannedRetirementAge) {
    cy.get("#clientPlannedRetirementAge").type(plannedRetirementAge); // Type the value, forcing the action
  }

  selectHealth(health) {
    cy.get("#clientHealth", { timeout: 10000 })
      .should("exist")
      .and("be.visible")
      .select(health, { force: true });
  }

  enterSmoker(smoker) {
    {
      cy.get(
        ".col-md-8 > .row > :nth-child(30) > .form-check > .radiobutton > .label2 > span"
      )
        .contains("Yes")
        .click();
    }
  }

  enterTax() {
    {
      cy.get(
        ".col-md-8 > .row > :nth-child(32) > .form-check > .radiobutton > .label2 > span"
      )
        .contains("Yes")
        .click();
    }
  }

  enterphc() {
    {
      cy.get(
        ".col-md-8 > .row > :nth-child(34) > .form-check > .radiobutton > .label1 > span"
      )
        .contains("No")
        .click();
    }
  }

  enterhelpdebt() {
    cy.get(
      ".col-md-8 > .row > :nth-child(36) > .form-check > .radiobutton > .label2 > span"
    )
      .contains("Yes")
      .click();
  }

  enterHomeAddress(homeAddress) {
    cy.get("#clientHomeAddress").type(homeAddress); // Use the parameter passed to the function
  }

  enterPostCode(postcode) {
    cy.get("#clientPostcode").type(postcode); // Use the parameter passed to the function
  }

  enterCheckbox() {
    cy.get("#clientSameAsAbove").click();
  }

  typeMobilenumbr(number) {
    cy.get("#clientMobile") // Select the input field by its ID
      .type(number); // Type the given number into the field
  }

  typeHomePhome(homephone) {
    cy.get("#clientHomePhone") // Select the input field by its ID
      .type(homephone); // Type the given number into the field
  }

  typeWorkPhone(workphone) {
    cy.get("#clientWorkPhone") // Select the input field by its ID
      .type(workphone); // Type the given number into the field
  }

  enterEmail(Email) {
    cy.get("#Email").type(Email);
  }
}

export default AddClient;

////import AddClient from "./AddClient.cy"; // Remove duplicate import

/// <reference types="cypress" />
describe("Adviser Simplicity", () => {
  const addClient = new AddClient();

  it("passes", () => {
    cy.visit("http://ec2-3-25-227-176.ap-southeast-2.compute.amazonaws.com/");
    cy.get("img").click();
    cy.get(
      ".mx-0 > .Custom_Accordion > .accordion-item > .accordion-header > .accordion-button"
    ).click();
    cy.get("#Client").click();
    cy.get(".px-5 > img").click();

    // cy.contains("label", "Title").should("be.visible");
    // addClient.selectTitle("Mr");

    // cy.contains("label", "Surname").should("be.visible");
    // addClient.enterSurname("User"); // Use the instance created

    // cy.contains("label", "Given Name").should("be.visible");
    // addClient.enterGivenname("Quality Assurance");

    // cy.contains("label", "Middle Name").should("be.visible");
    // addClient.enterMiddleName("Admin");

    // cy.contains("label", "Preferred Name").should("be.visible");
    // addClient.enterPreferredName("Admin");

    // cy.contains("label", "Gender").should("be.visible");
    // addClient.selectGender("Male");

    // cy.contains("label", "Date of Birth").should("be.visible");
    // addClient.enterDOB("8/10/2004");

    // cy.contains("label", "Age").should("be.visible");
    // // If needed, implement this function, otherwise, remove it
    // // addClient.enterAGE('');

    // cy.contains("label", "Marital Status").should("be.visible");
    // addClient.selectMaritalStatus("Single");

    // cy.contains("label", "Employment Status");
    // addClient.selectEmploymentStatus("Employee");

    // cy.contains("label", "Occupation").should("be.visible");
    // addClient.enterOccupationID("Amet ut consectetur");

    // cy.contains("label", "Planned Retirement Age").should("be.visible");
    // // Enter a valid planned retirement age in the input field
    // cy.get("#clientPlannedRetirementAge") // Select the input field by ID
    //   .type("65") // Enter the desired number
    //   .should("have.value", "65"); // Verify the value entered

    // cy.contains("label", "Health").should("be.visible");
    // addClient.selectHealth("Good");

    // cy.contains("label", "Smoker").should("be.visible");
    // addClient.enterSmoker("Yes");

    // cy.contains("label", "Tax Resident").should("be.visible"); // Click the "Tax Resident" section or button
    // addClient.enterTax("Yes"); // Call the function and pass the desired value, e.g., "Yes" or "No"

    // cy.contains("label", "Private Health Cover").should("be.visible");
    // addClient.enterphc("No");

    // cy.contains("label", "HELPS Debt").should("be.visible");
    // addClient.enterhelpdebt("Yes");

    // cy.contains("label", "Home Address").should("be.visible");
    // addClient.enterHomeAddress("House NO 2-A , Punjab, Lahore  ");

    // cy.contains("label", "Postcode/Suburb").should("be.visible");
    // addClient.enterPostCode("99");

    // cy.contains("label", "Same as home address").should("be.visible");
    // addClient.enterCheckbox();

    // cy.contains("label", "Mobile Number").should("be.visible");
    // addClient.typeMobilenumbr("+71 323 435 1223");

    // cy.contains("label", "Home Phone").should("be.visible");
    // addClient.typeHomePhome("+71 665 432 7896");

    // cy.contains("label", "Work Phone").should("be.visible");
    // addClient.typeWorkPhone("+71 009 877 099");

    cy.contains("label", "Email").should("be.visible");
    addClient.enterEmail("Automation@gmail.com");

    cy.contains("Submit");
    cy.get(".btn").click();

    cy.contains("Children Details").should("be.visible");

    cy.contains("Do you have any Children/Dependants").should("be.visible");

    // Interact with the Yes button using the provided selector
    cy.get(".label2 > span").contains("Yes").click();

    cy.contains("How many children do you have :");

    cy.get("#numberOfChildren").type("5");
  });
});
