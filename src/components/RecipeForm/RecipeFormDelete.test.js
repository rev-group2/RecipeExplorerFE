import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import RecipeFormController from "./RecipeFormController";
import { UserContext } from "../Context/UserContext";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useParams: () => ({ uuid: "test-uuid" })
}));

beforeAll(() => {
  global.URL.revokeObjectURL = jest.fn();
});

describe("RecipeFormController delete recipe", () => {
  const mockUser = { token: "test-token" };

  const renderComponent = () =>
    render(
      <UserContext.Provider value={mockUser}>
        <Router>
          <RecipeFormController />
        </Router>
      </UserContext.Provider>
    );

  it("calls the delete function and navigates back to the main page", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          uuid: "test-uuid",
          recipeName: "Test Recipe",
          recipeThumb: "test-thumbnail.jpg"
        })
      })
      .mockResolvedValueOnce({
        ok: true
      });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByDisplayValue("Test Recipe")).toBeInTheDocument();
    });

    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
