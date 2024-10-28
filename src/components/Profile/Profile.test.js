import { fireEvent, render, screen, within, waitFor, getByDisplayValue} from "@testing-library/react";
import axios from 'axios';
import RouterController, { BrowserRouter} from 'react-router-dom';
import ProfileController from "./ProfileController";

const fakeUser1 = { uuid: "1", username: "dave", email: "test@email.com", description: "I love food", picture: "fakeURL" };
const fakeUser2 = { uuid: "2", username: "alex", email: "test2@email.com", description: "I hate food", picture: "fakeURL2" };
const fakeRecipe = { uuid: "3", recipeName: "Pizza", recipeThumb: "fakeURL3"}
const fakeComment = {uuid: "4", authorUuid: "2", recipeUuid: "3", rating: 3, description: "this author hates food"}

jest.mock('axios', () => ({
    ...jest.requireActual('axios'),
    get: jest.fn()
}));
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));

function buildPage() {
    return render(
        <BrowserRouter>
            <ProfileController />
        </BrowserRouter>
    );
}

describe('Profile Container Tests', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('If the id does not point to a user, the page displays \"No Profile Found\"', () => {
        axios.get.mockResolvedValue({ status: 200, data: {}});
        RouterController.useParams.mockReturnValue({id: "0"});
        const screen = buildPage();
        const element = screen.getByText('No Profile Found', { exact: false });

        expect(element).toBeInTheDocument();
        expect(axios.get).toHaveBeenCalledTimes(1);
    })

    test('If the id points to a user, the page displays the user\'s info', async () => {
        RouterController.useParams.mockReturnValue({ id: "1" });
        axios.get.mockResolvedValueOnce({ status: 200, data: fakeUser1 });
        axios.get.mockReturnValueOnce({status:200, data: []});
        const screen = buildPage();
        
        await waitFor(() => {
            expect(screen.getByDisplayValue("dave")).toBeInTheDocument();
            expect(screen.getByDisplayValue("test@email.com")).toBeInTheDocument();
            expect(screen.getByDisplayValue("I love food")).toBeInTheDocument();
        });
    })

})