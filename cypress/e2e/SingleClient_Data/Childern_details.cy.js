class Childern_Details {
  fillDetails() {
    // Visiting the site
    cy.visit("http://ec2-54-66-20-19.ap-southeast-2.compute.amazonaws.com/");

    // Navigating through the page
    cy.get("img").click();
    cy.get(
      ".mx-0 > .Custom_Accordion > .accordion-item > .accordion-header > .accordion-button"
    ).click();
    cy.get("#Client").click();
    cy.get(".px-5 > img").click();

    // Entering email
    cy.contains("label", "Email").should("be.visible");
    cy.get("#Email").type("Automation12131@gmail.com"); // Replace with actual selector

    // Clicking Submit button
    cy.contains("Submit");
    cy.get(".btn").click();

    // Verifying Children Details page
    cy.contains("Children Details", { timeout: 10000 });
    cy.contains("Do you have any Children/Dependants");

    // Selecting children option
    cy.get(".label2 > span").contains("Yes").click();
    cy.contains("How many children do you have :");
    cy.get("#numberOfChildren").type("5");

    // Verify table headers
    cy.get("thead > tr > :nth-child(1)").should("have.text", "No#").wait(1000);
    cy.get("thead > tr > :nth-child(2)").should("have.text", "Name").wait(1000);
    cy.get("thead > tr > :nth-child(3)").should("have.text", "Dob").wait(1000);
    cy.get("thead > tr > :nth-child(4)")
      .should("have.text", "Gender")
      .wait(1000);
    cy.get("thead > tr > :nth-child(5)")
      .should("have.text", "Add in Relationship")
      .wait(1000);
    cy.get("thead > tr > :nth-child(6)")
      .should("have.text", "Add in is Child Depenant")
      .wait(1000);

    // Verify first row
    cy.get("tbody tr")
      .eq(0)
      .within(() => {
        // Verify No# column
        cy.get("td").eq(0).should("contain", "1");

        // Verify Name input field exists
        cy.get("#Name0").type("Childern No 1 ").should("exist");

        // Verify DOB field exists
        cy.get("#DOB0").type("06/11/2024").should("exist");

        // Verify Gender dropdown exists
        cy.get("#Gender0").select("Male").eq(0).should("have.value", "Male");

        // Verify Relationship dropdown exists
        cy.get("#relationship0").select("Son").eq(0);

        // Verify Yes/No options exist
        cy.contains("No").should("exist");
        cy.contains("Yes").should("exist").click();
      });

    cy.get("tbody tr")
      .eq(1)
      .within(() => {
        // Verify No# column
        cy.get("td").eq(0).should("contain", "2");

        // Verify Name input field exists
        cy.get("#Name1").type("Childern No 1 ").should("exist");

        // Verify DOB field exists
        cy.get("#DOB1").type("06/11/2024").should("exist");

        // Verify Gender dropdown exists
        cy.get("#Gender1").select("Male").should("have.value", "Male");

        // Verify Relationship dropdown exists
        cy.get("#relationship1").select("Son");

        // Verify Yes/No options exist
        cy.contains("No").should("exist");
        cy.contains("Yes").should("exist").click();
      });

    cy.get("tbody tr")
      .eq(2)
      .within(() => {
        // Verify No# column
        cy.get("td").eq(0).should("contain", "3");

        // Verify Name input field exists
        cy.get("#Name2").type("Childern No 1 ").should("exist");

        // Verify DOB field exists
        cy.get("#DOB2").type("06/11/2024").should("exist");

        // Verify Gender dropdown exists
        cy.get("#Gender2").select("Male").should("have.value", "Male");

        // Verify Relationship dropdown exists
        cy.get("#relationship2").select("Son");

        // Verify Yes/No options exist
        cy.contains("No").should("exist");
        cy.contains("Yes").should("exist").click();
      });

    cy.get("tbody tr")
      .eq(3)
      .within(() => {
        // Verify No# column
        cy.get("td").eq(0).should("contain", "4");

        // Verify Name input field exists
        cy.get("#Name3").type("Childern No 1 ").should("exist");

        // Verify DOB field exists
        cy.get("#DOB3").type("06/11/2024").should("exist");

        // Verify Gender dropdown exists
        cy.get("#Gender3").select("Male").should("have.value", "Male");

        // Verify Relationship dropdown exists
        cy.get("#relationship3").select("Son");

        // Verify Yes/No options exist
        cy.contains("No").should("exist");
        cy.contains("Yes").should("exist").click();
      });

    cy.get("tbody tr")
      .eq(4)
      .within(() => {
        // Verify No# column
        cy.get("td").eq(0).should("contain", "5");

        // Verify Name input field exists
        cy.get("#Name4").type("Childern No 1 ").should("exist");

        // Verify DOB field exists
        cy.get("#DOB4").type("06/11/2024").should("exist");

        // Verify Gender dropdown exists
        cy.get("#Gender4").select("Male").should("have.value", "Male");

        // Verify Relationship dropdown exists
        cy.get("#relationship4").select("Son");

        // Verify Yes/No options exist
        cy.contains("No").should("exist");
        cy.contains("Yes").should("exist").click();
      });

    // Clicking Back and Submit buttons
    cy.contains("Back").should("exist");
    cy.get(":nth-child(2) > .btn").contains("Submit").should("exist").click();
  }
}

export default Childern_Details;

// it("passes", () => {
//     cy.visit("http://ec2-54-66-20-19.ap-southeast-2.compute.amazonaws.com/");
//     cy.get("img").click();
//     cy.get(".mx-0 > .Custom_Accordion > .accordion-item > .accordion-header > .accordion-button").click();
//     cy.get("#Client").click();
//     cy.get(".px-5 > img").click();

//     cy.contains("label", "Email").should("be.visible");
//     addClient.enterEmail("Automation1211@gmail.com");

//     cy.contains("Submit");
//     cy.get(".btn").click();

//     cy.contains( 'Children Details', { timeout: 10000 });
// cy.contains('Do you have any Children/Dependants');

// cy.get('.label2 > span').contains('Yes').click();
// cy.contains('How many children do you have :');

// cy.get('#numberOfChildren') // Replace with the actual selector for where the value should appear
// .type('5') // Verify it contains the value '5'

//   ins('Yes').should('exist').click();
//   //   });

//     cy.get('tbody tr')
//     .eq(1)
//     .within(() => {
//       // Verify No# column
//       cy.get('td').eq(0).should('contain', '2');

//       // Verify Name input field exists
//       cy.get('#Name1').type("Childern No 1 ").should('exist');

//       // Verify DOB field exists
//       cy.get('#DOB1').type("06/11/2024").should('exist');

//       // Verify Gender dropdown exists
//       cy.get('#Gender1')
//       .select('Male')
//       .should('have.value', 'Male')

//       // Verify Relationship dropdown exists
//       cy.get('#relationship1').select("Son");

//       // Verify Yes/No options exist
//       cy.contains('No').should('exist');
//       cy.contains('Yes').should('exist').click();
//     });

//     cy.get('tbody tr')
//     .eq(2)
//     .within(() => {
//       // Verify No# column
//       cy.get('td').eq(0).should('contain', '3');

//       // Verify Name input field exists
//       cy.get('#Name2').type("Childern No 1 ").should('exist');

//       // Verify DOB field exists
//       cy.get('#DOB2').type("06/11/2024").should('exist');

//       // Verify Gender dropdown exists
//       cy.get('#Gender2')
//       .select('Male')
//       .should('have.value', 'Male')

//       // Verify Relationship dropdown exists
//       cy.get('#relationship2').select("Son");

//       // Verify Yes/No options exist
//       cy.contains('No').should('exist');
//       cy.contains('Yes').should('exist').click();
//     });

//     cy.get('tbody tr')
//     .eq(3)
//     .within(() => {
//       // Verify No# column
//       cy.get('td').eq(0).should('contain', '4');

//       // Verify Name input field exists
//       cy.get('#Name3').type("Childern No 1 ").should('exist');

//       // Verify DOB field exists
//       cy.get('#DOB3').type("06/11/2024").should('exist');

//       // Verify Gender dropdown exists
//       cy.get('#Gender3')
//       .select('Male')
//       .should('have.value', 'Male')

//       // Verify Relationship dropdown exists
//       cy.get('#relationship3').select("Son");

//       // Verify Yes/No options exist
//       cy.contains('No').should('exist');
//       cy.contains('Yes').should('exist').click();
//     });

//     cy.get('tbody tr')
//     .eq(4)
//     .within(() => {
//       // Verify No# column
//       cy.get('td').eq(0).should('contain', '5');

//       // Verify Name input field exists
//       cy.get('#Name4').type("Childern No 1 ").should('exist');

//       // Verify DOB field exists
//       cy.get('#DOB4').type("06/11/2024").should('exist');

//       // Verify Gender dropdown exists
//       cy.get('#Gender4')
//       .select('Male')
//       .should('have.value', 'Male')

//       // Verify Relationship dropdown exists
//       cy.get('#relationship4').select("Son");

//       // Verify Yes/No options exist
//       cy.contains('No').should('exist');
//       cy.contains('Yes').should('exist').click();
//     });

//     cy.contains('Back').should('exist');
//     cy.get(':nth-child(2) > .btn').contains('Submit').should('exist').click();

//   });
