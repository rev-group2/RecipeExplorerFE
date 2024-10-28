import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import RecipeFormController from "./RecipeFormController";
import { UserContext } from "../Context/UserContext";
import uploadImage from "../../helpers/uploadImage";

jest.mock("../../helpers/uploadImage", () => jest.fn());

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useParams: () => ({ uuid: "test-uuid" })
}));

beforeAll(() => {
  global.URL.revokeObjectURL = jest.fn();
});

afterAll(() => {
  global.URL.revokeObjectURL.mockRestore();
});

describe("RecipeFormController", () => {
  const mockUser = { token: "test-token" };

  const renderComponent = async () =>
    act(
      render(
        <UserContext.Provider value={mockUser}>
          <Router>
            <RecipeFormController />
          </Router>
        </UserContext.Provider>
      )
    )

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form with initial data when editing a recipe", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        uuid: "test-uuid",
        recipeName: "Test Recipe",
        recipeThumb: "test-thumbnail.jpg"
      })
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByDisplayValue("Test Recipe")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByTestId("recipe-thumbnail")).toBeInTheDocument();
    });
  });

  it("displays an error message if all fields aren't filled out", async () => {
    uploadImage.mockResolvedValueOnce("http://s3bucket/image.jpg");

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ uuid: "test-uuid" })
    });

    renderComponent();

    const file = new File(["dummy content"], "test.png", { type: "image/png" });
    const fileInput = screen.getByLabelText(/image/i);

    fireEvent.change(fileInput, { target: { files: [file] } });
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.click(submitButton);

    expect(await screen.findByTestId("recipe-form-message")).toHaveTextContent(
      /all fields are required/i
    );
  });

  it("resets form data after submission", async () => {
    uploadImage.mockResolvedValueOnce("http://s3bucket/image.jpg");

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ uuid: "123456" })
    });

    renderComponent();

    const file = new File(["dummy content"], "test.png", { type: "image/png" });
    const fileInput = screen.getByLabelText(/image/i);
    fireEvent.change(fileInput, { target: { files: [file] } });

    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByDisplayValue("Test Recipe")).not.toBeInTheDocument();
    });
  });
});
