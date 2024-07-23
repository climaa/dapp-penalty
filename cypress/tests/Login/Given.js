import { Given } from '@badeball/cypress-cucumber-preprocessor';

Given("the system open the login page", function () {
  cy.visit("/login");
});
