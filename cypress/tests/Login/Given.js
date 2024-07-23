import { Given } from '@badeball/cypress-cucumber-preprocessor';

Given("I open the login page", function () {
  cy.visit("/");
});
