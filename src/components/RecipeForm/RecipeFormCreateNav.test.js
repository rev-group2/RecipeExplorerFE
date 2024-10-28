import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import RecipeFormController from "./RecipeFormController";
import { UserContext } from "../Context/UserContext";
import uploadImage from "../../helpers/uploadImage";
import config from "../../config";

jest.mock("../../helpers/uploadImage", () => jest.fn());

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate
}));

beforeAll(() => {
  global.URL.revokeObjectURL = jest.fn();
});

describe("RecipeFormController navigate to new recipe", () => {
  const mockUser = { token: "test-token" };

  const renderComponent = () =>
    render(
      <UserContext.Provider value={mockUser}>
        <Router>
          <RecipeFormController />
        </Router>
      </UserContext.Provider>
    );

  it("navigates to the new recipe page upon successful recipe creation", async () => {
    const uploadedImageUrl = "http://s3bucket/test.png";
    uploadImage.mockResolvedValueOnce(uploadedImageUrl);

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ uuid: "123456" })
    });

    renderComponent();

    fireEvent.change(screen.getByLabelText(/recipe name/i), {
      target: { value: "Test Recipe" }
    });
    fireEvent.change(screen.getByLabelText(/category/i), {
      target: { value: "Dessert" }
    });
    fireEvent.change(screen.getByLabelText(/cuisine/i), {
      target: { value: "French" }
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "A delicious dessert." }
    });
    fireEvent.change(screen.getByLabelText(/instructions/i), {
      target: { value: "Mix ingredients and bake." }
    });
    fireEvent.change(screen.getByLabelText(/ingredients/i), {
      target: { value: "Flour, Sugar, Eggs" }
    });

    const file = new File(["dummy content"], "test.png", { type: "image/png" });
    const fileInput = screen.getByTestId("recipe-image-upload");
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(fileInput.files[0]).toBe(file);
    });

    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(uploadImage).toHaveBeenCalledWith(file, mockUser.token);
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${config.path}/recipes`,
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            Authorization: "Bearer mocked_token",
            "Content-Type": "application/json"
          }),
          body: JSON.stringify(
            expect.objectContaining({
              recipeName: "Test Recipe",
              category: "Dessert",
              cuisine: "French",
              description: "A delicious dessert.",
              instructions: "Mix ingredients and bake.",
              ingredients: "Flour, Sugar, Eggs",
              recipeThumb: uploadedImageUrl
            })
          )
        })
      );
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(`/recipes/123456`);
    });

    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
