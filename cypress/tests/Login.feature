Feature: Login
    Scenario: Login with valid credentials
        Given the system open the login page
        When the user fill the input with placeholder "Username" type "user1"
        Then the user fill the input with placeholder "Password" type "asdf"
        And press the button with text "Login"

    Scenario: Login with invalid credentials
        Given the system open the login page
        When the user fill the input with placeholder "Username" type "user1"
        Then the user fill the input with placeholder "Password" type "wrongpassword"
        And press the button with text "Login"
        And the system show the message "Invalid username or password."