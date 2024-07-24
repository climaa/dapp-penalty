import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import LoginPage from "../LoginPage";

// Mock the database module
jest.mock("../../../assets/database/database", () => [
  { user: "testUser", password: "testPass" },
]);

// Step 1: Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Import and spread the actual module
  useNavigate: () => jest.fn(), // Mock useNavigate with a jest function
}));

describe("LoginPage Component", () => {
  test("renders the login form with inputs and button", () => {
    render(<LoginPage />);
    screen.getByText('Dapp Penalty Login');
    expect(screen.getByTestId("login-username")).toBeInTheDocument();
    expect(screen.getByTestId("login-password")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  test("allows the user to enter username and password", () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByTestId("login-username"), {
      target: { value: "testUser" },
    });
    fireEvent.change(screen.getByTestId("login-password"), {
      target: { value: "testPass" },
    });
    expect(screen.getByTestId("login-username").value).toBe("testUser");
    expect(screen.getByTestId("login-password").value).toBe("testPass");
  });

  test("displays a success message with correct credentials", async () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByTestId("login-username"), {
      target: { value: "testUser" },
    });
    fireEvent.change(screen.getByTestId("login-password"), {
      target: { value: "testPass" },
    });
    fireEvent.click(screen.getByTestId("submit-button"));
  });

  test("displays an error message with incorrect credentials", async () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByTestId("login-username"), {
      target: { value: "wrongUser" },
    });
    fireEvent.change(screen.getByTestId("login-password"), {
      target: { value: "wrongPass" },
    });
    fireEvent.click(screen.getByTestId("submit-button"));
    expect(
      await screen.findByText("Invalid username or password.")
    ).toBeInTheDocument();
  });
});
