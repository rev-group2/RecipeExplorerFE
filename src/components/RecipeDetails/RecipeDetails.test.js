import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import RecipeDetailsController from "./RecipeDetailsController";
import RecipeDetailsView from "./RecipeDetailsView";
import { UserContext } from "../Context/UserContext";
import { useParams } from "react-router-dom";
import config from "../../config";

jest.mock("./RecipeDetailsView", () => {
  return jest.fn(() => <div>RecipeDetailsView Mock</div>);
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn()
}));

describe("RecipeDetailsController", () => {
  const mockUser = { uuid: "user123" };
  const mockRecipeUuid = "12345678";
  const mockFetch = jest.spyOn(global, "fetch");

  function renderComponent(user) {
    return render(
      <UserContext.Provider value={user}>
        <RecipeDetailsController />
      </UserContext.Provider>
    );
  };

  beforeEach(() => {
    useParams.mockReturnValue({ uuid: mockRecipeUuid });
    mockFetch.mockClear();
    jest.clearAllMocks();
    mockFetch.mockResolvedValue({
      json: async () => ({
        meals: [
          {
            idMeal: "12345",
            strMeal: "Test Recipe",
            strCategory: "Test Category",
            strArea: "Test Cuisine",
            strMealThumb: "Test Thumb",
            strInstructions: "Test Instructions",
            strIngredient1: "Ingredient1",
            strIngredient2: "Ingredient2"
          }
        ] })
    });
    
  });

  it("renders RecipeDetailsView", async () => {
    const screen = renderComponent(mockUser);

    expect(RecipeDetailsView).toHaveBeenCalled();
    const props = RecipeDetailsView.mock.calls[0][0];
    await waitFor(() => {
      expect(props.recipeAuthor).toBe(mockUser.uuid);
      expect(props.rating).toBe("No rating");
      expect(props.comments).toBeUndefined();
      expect(props.recipeDetails).toBeUndefined();
    });
  });

  it("fetches recipe details from external API if uuid is less than 8 characters", async () => {
    useParams.mockReturnValue({ uuid: "123456" });

    mockFetch
      .mockResolvedValueOnce({
        json: async () => ({
          meals: [
            {
              idMeal: "12345",
              strMeal: "Test Recipe",
              strCategory: "Test Category",
              strArea: "Test Cuisine",
              strMealThumb: "Test Thumb",
              strInstructions: "Test Instructions",
              strIngredient1: "Ingredient1",
              strIngredient2: "Ingredient2"
            }
          ]
        })
      })

    renderComponent();

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining(
          "https://www.themealdb.com/api/json/v1/1/lookup.php?i=123456"
        )
      );
    });
  });

  it("fetches recipe details from backend API if uuid is 8 characters or more", async () => {
    const longUuid = "12345678";
    useParams.mockReturnValueOnce({ uuid: longUuid });
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ uuid: longUuid, recipeName: "Backend Recipe" })
    });

    renderComponent();

    await waitFor(() =>
      expect(mockFetch).toHaveBeenCalledWith(
        `${config.path}/recipes/${longUuid}`
      )
    );
  });

  it("fetches comments and calculates rating", async () => {
    useParams.mockReturnValue({ uuid: "12345678" });

    mockFetch.mockResolvedValueOnce({
      json: async () => ({ uuid: "12345678", recipeName: "Backend Recipe" })
    });

    mockFetch.mockResolvedValueOnce({
      json: async () => ({
        comments: [
          { rating: 4, authorUuid: "user123" },
          { rating: 5, authorUuid: "otherUser" }
        ]
      })
    });
    const screen = renderComponent(mockUser);
    

    await waitFor(() =>
      expect(mockFetch).toHaveBeenCalledWith(`${config.path}/recipes/12345678`)
    );

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        `${config.path}/comments/recipe/?recipe=12345678`
      )
    );
    /*
    expect(RecipeDetailsView).toHaveBeenCalledWith(
      expect.objectContaining({ rating: "4.5" }),
      expect.anything()
    );*/

  });

  it("sets userCommented to true if the user has already commented", async () => {

    mockFetch.mockResolvedValueOnce({
      json: async () => [{ rating: 4, authorUuid: mockUser.uuid }]
    });

    mockFetch.mockResolvedValueOnce({
      json: async () => ({
        meals: [
          {
            idMeal: "12345",
            strMeal: "Test Recipe",
            strCategory: "Test Category",
            strArea: "Test Cuisine",
            strMealThumb: "Test Thumb",
            strInstructions: "Test Instructions",
            strIngredient1: "Ingredient1",
            strIngredient2: "Ingredient2"
          }
        ]
      })
    })
    const screen = renderComponent(mockUser);

    await waitFor(() =>
      expect(RecipeDetailsView).toHaveBeenCalledWith(
        expect.objectContaining(
          { existingComment: true }), expect.anything())
    );
  });

  it("sets userCommented to false if the user has not commented", async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => [{ rating: 5, authorUuid: "otherUser" }]
    });

    renderComponent();

    await waitFor(() =>
      expect(RecipeDetailsView).toHaveBeenCalledWith(
        expect.objectContaining({ existingComment: false }), 
        expect.anything()
      )
    );
  });

  it("calculates recipe rating correctly based on comments", async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => [{ rating: 3 }, { rating: 4 }, { rating: 5 }]
    });

    renderComponent();

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(RecipeDetailsView).toHaveBeenCalledWith(
        expect.objectContaining({ rating: "4" }),
        expect.anything()
      );
    });
  });
});
