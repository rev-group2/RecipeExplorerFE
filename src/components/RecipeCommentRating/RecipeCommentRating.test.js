import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import RecipeCommentController from "./RecipeCommentController";
import { UserContext } from "../Context/UserContext";
import config from "../../config";
import RouterController, { BrowserRouter } from 'react-router-dom';
 

const mockCommentSubmission = jest.fn();

const mockUser = {
  uuid: "user-uuid",
  token: "user-token"
};

const mockComments = [
  { id: "comment1", content: "Nice recipe!", authorUuid: "user-uuid" },
  { id: "comment2", content: "Looks delicious!", authorUuid: "user-uuid" }
];

const recipeUuid = "recipe-uuid";

const setup = (hasCommented, user = mockUser) => {
  return render(
    <RouterController>
    <UserContext.Provider value={user}>
      <RecipeCommentController
        recipeUuid={recipeUuid}
        comments={mockComments}
        commentSubmission={mockCommentSubmission}
        hasCommented={hasCommented}
      />
    </UserContext.Provider>
    </RouterController>
  );
};

describe("RecipeCommentController Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({})
      })
    );
  });

  it("renders RecipeCommentView if user has not commented and has a token", () => {
    setup(false);

    expect(screen.getByTestId("comment-form")).toBeInTheDocument();
  });

  it("does not render RecipeCommentView if user has already commented", () => {
    setup(true);

    expect(screen.queryByTestId("comment-form")).toBeNull();
  });

  it("renders CommentsView with comments", () => {
    setup(false);

    mockComments.forEach(async (comment) => {
      expect(
        await screen.findByText(new RegExp(comment.content, "i"))
      ).toBeInTheDocument();
    });
  });

  it("submits a comment form with correct data", async () => {
    setup(false);

    const commentContent = "Amazing recipe!";
    fireEvent.change(screen.getByPlaceholderText("leave a review", {exact: false}), {
      target: { value: commentContent }
    });
    fireEvent.change(screen.getByLabelText(/rate/i), {
      target: { value: "8" }
    });
    fireEvent.submit(screen.getByTestId("comment-form"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${config.path}/comments`,
        expect.objectContaining({
          method: "POST",
          headers: {
            Authorization: `Bearer ${mockUser.token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            description: commentContent,
            rating: "8",
            authorUuid: mockUser.uuid,
            recipeUuid
          })
        })
      );
    });
    expect(mockCommentSubmission).toHaveBeenCalled();
  });

  it("handles API errors gracefully", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    global.fetch.mockRejectedValueOnce(new Error("API Error"));
    setup(false);

    fireEvent.submit(screen.getByTestId("comment-form"));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));
    });

    consoleErrorSpy.mockRestore();
  });
});
