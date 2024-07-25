import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPage from "../LoginPage";
import { BrowserRouter } from "react-router-dom";

// Helper function to render LoginPage with router context
function renderLoginPage() {
  return render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );
}

describe("LoginPage", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("renders LoginPage component", () => {
    renderLoginPage();
    expect(screen.getByText(/dapp penalty login/i)).toBeInTheDocument();
  });

  test("allows input fields to be changed", () => {
    renderLoginPage();
    const usernameInput = screen.getByTestId("login-username");
    const passwordInput = screen.getByTestId("login-password");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    expect(usernameInput.value).toBe("testuser");
    expect(passwordInput.value).toBe("password");
  });

  test("submits the form and calls fetch with correct data", async () => {
    fetch.mockResponseOnce(
      JSON.stringify([{ id: 1, username: "testuser", password: "password" }])
    );

    renderLoginPage();
    const usernameInput = screen.getByTestId("login-username");
    const passwordInput = screen.getByTestId("login-password");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `http://localhost:3001/users?username=testuser`
      );
    });
  });

  test("handles successful login", async () => {
    fetch.mockResponseOnce(
      JSON.stringify([{ id: 1, username: "testuser", password: "password" }])
    );

    renderLoginPage();
    const usernameInput = screen.getByTestId("login-username");
    const passwordInput = screen.getByTestId("login-password");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(sessionStorage.getItem("user")).toEqual(
        JSON.stringify({ id: 1, isLoggedIn: true, username: "testuser" })
      );
    });
  });

  test("displays error on failed login", async () => {
    fetch.mockResponseOnce(JSON.stringify([])); // Mock no user found

    renderLoginPage();
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId("login-status")).toHaveTextContent(
        "Invalid username or password."
      );
    });
  });

  test("displays error on fetch failure", async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    fetch.mockReject(() => Promise.reject("API is down"));

    renderLoginPage();
    const usernameInput = screen.getByTestId("login-username");
    const passwordInput = screen.getByTestId("login-password");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId("login-status")).toHaveTextContent(
        "Failed to fetch user data."
      );
    });
    console.error.mockRestore();
  });
});
