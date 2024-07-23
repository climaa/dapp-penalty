import { Then } from "@badeball/cypress-cucumber-preprocessor";

Then(
  "the user fill the input with placeholder {string} type {string}",
  function (placeholder, text) {
    const input = cy.get(`[placeholder="${placeholder}"]`);
    input.type(text);
  }
);

Then("press the button with text {string}", function (text) {
  const button = cy.contains("button", text);
  button.click("center");
});

Then("the system show the message {string}", function (string) {
  const message = cy.contains("p", string);
  message.should("be.visible");
});
