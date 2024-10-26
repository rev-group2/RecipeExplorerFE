import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import HomeController from "./HomeController";
import config from "../../config";

jest.mock("./HomeView", () => {
  return function MockHomeView() {
    return <div>Mocked HomeView</div>;
  };
});

describe("HomeController and HomeView Tests", () => {
  const api = "https://www.themealdb.com/api/json/v1/1/random.php";

  const mockRecipe = {
    uuid: "12345",
    recipeName: "Test Recipe",
    cuisine: "Test Cuisine",
    category: "Test Category",
    instructions: "Test Instructions",
    recipeThumb: "Test Thumb",
    ingredients: ["Ingredient1", "Ingredient2"],
    description: "Test description"
  };

  const mockComment = {
    authorUuid: "author1",
    creationDate: 1234567890,
    description: "Test comment",
    rating: 5,
    recipeUuid: "12345",
    type: "comment",
    uuid: "comment1"
  };

  const mockRecipes = [mockRecipe];
  const mockComments = [mockComment];

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the HomeView component from HomeController", async () => {
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({ recipes: mockRecipes })
    });

    render(<HomeController />);

    const mockedView = await screen.findByText("Mocked HomeView");
    expect(mockedView).toBeInTheDocument();
  });

  it("fetches and sets a random recipe from HomeController", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ recipes: mockRecipes })
    });

    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ meals: [mockRecipe] })
    });

    render(<HomeController />);

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(`${config.path}/recipes`)
    );
    await waitFor(() => expect(fetch).toHaveBeenCalledWith(api));

    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it("fetches and sets recipe comments from HomeController", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ recipes: mockRecipes })
    });

    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ meals: [mockRecipe] })
    });

    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ comments: mockComments })
    });

    render(<HomeController />);

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(`${config.path}/recipes`)
    );

    await waitFor(() => expect(fetch).toHaveBeenCalledWith(api));

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        `${config.path}/comments/recipe/?recipe=${mockRecipes[0].uuid}`
      )
    );

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(3));
  });

  it("handles errors in API calls from HomeController", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: jest.fn()
    });

    render(<HomeController />);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  });
});
