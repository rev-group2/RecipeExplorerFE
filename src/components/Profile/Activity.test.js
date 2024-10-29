import { fireEvent, render, screen, within, waitFor, getByDisplayValue } from "@testing-library/react";
import axios from 'axios';
import RouterController, { BrowserRouter } from 'react-router-dom';
import ProfileController from "./ProfileController";
import ActivityController from "./ActivityController";

const fakeUser1 = { uuid: "1", username: "dave", email: "test@email.com", description: "I love food", picture: "fakeURL" };
const fakeUser2 = { uuid: "2", username: "alex", email: "test2@email.com", description: "I hate food", picture: "fakeURL2" };
const fakeRecipe = { uuid: "3", recipeName: "Pizza", recipeThumb: "fakeURL3", type: "recipe" }
const fakeComment = { uuid: "4", authorUuid: "2", recipeUuid: "3", rating: 3, description: "this author hates food", type:"comment" }

jest.mock('axios', () => ({
    ...jest.requireActual('axios'),
    get: jest.fn()
}));
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));



describe('Activity Container Tests where the user is viewing their profile', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    function buildPage() {
        return render(
            <BrowserRouter>
                <ActivityController profile={fakeUser1} isUserProfile={true} />
            </BrowserRouter>
        );
    }

    test('If the id points to a user who a comment, the page displays the user\'s posts', async () => {
        axios.get.mockResolvedValueOnce({ status: 200, data: [fakeComment] });
        axios.get.mockResolvedValueOnce({ status: 200, data: fakeRecipe });
        const screen = buildPage();

        await waitFor(() => {
            expect(screen.getByText("Pizza", { exact: false })).toBeInTheDocument();
            expect(screen.getByText("3", {exact: false})).toBeInTheDocument();
            expect(screen.getByText("this author hates food", { exact: false })).toBeInTheDocument();
        });
    });

    test('If the id points to a user who a has recipe posted, the page displays the user\'s posts', async () => {
        axios.get.mockResolvedValueOnce({ status: 200, data: [fakeRecipe] });
        const screen = buildPage();

        await waitFor(() => {
            expect(screen.getByText("Pizza", { exact: false })).toBeInTheDocument();
        });
    });

    test('If the id points to a user who a comment, the page displays the a delete and view recipe button', async () => {
        axios.get.mockResolvedValueOnce({ status: 200, data: [fakeComment] });
        axios.get.mockResolvedValueOnce({ status: 200, data: fakeRecipe });
        const screen = buildPage();

        await waitFor(() => {
            expect(screen.getByText("Delete", { exact: false })).toBeInTheDocument();
            expect(screen.getByText("View Recipe", { exact: false })).toBeInTheDocument();
        });
    });

});

describe('Activity Container Tests where the user is viewing their profile with no user', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    function buildPage() {
        return render(
            <BrowserRouter>
                <ActivityController profile={fakeUser1} isUserProfile={false} />
            </BrowserRouter>
        );
    }

    test('If the id points to a user who a comment, the page displays the user\'s posts  with no user', async () => {
        axios.get.mockResolvedValueOnce({ status: 200, data: [fakeComment] });
        axios.get.mockResolvedValueOnce({ status: 200, data: fakeRecipe });
        const screen = buildPage();

        await waitFor(() => {
            expect(screen.getByText("Pizza", { exact: false })).toBeInTheDocument();
            expect(screen.getByText("3", { exact: false })).toBeInTheDocument();
            expect(screen.getByText("this author hates food", { exact: false })).toBeInTheDocument();
        });
    });

    test('If the id points to a user who a has recipe posted, the page displays the user\'s posts with no user', async () => {
        axios.get.mockResolvedValueOnce({ status: 200, data: [fakeRecipe] });
        const screen = buildPage();

        await waitFor(() => {
            expect(screen.getByText("Pizza", { exact: false })).toBeInTheDocument();
        });
    });

    test('If the id points to a user who a comment, the page displays the a view recipe button with no user', async () => {
        axios.get.mockResolvedValueOnce({ status: 200, data: [fakeComment] });
        axios.get.mockResolvedValueOnce({ status: 200, data: fakeRecipe });
        const screen = buildPage();

        await waitFor(() => {
            expect(screen.getByText("View Recipe", { exact: false })).toBeInTheDocument();
        });
    });

});