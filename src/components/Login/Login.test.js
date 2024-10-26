import { fireEvent, render, screen, within } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import LoginController from "./LoginController";

describe('Login Tests', () => {
    test('The login page should greet the user with Sign in', () => {
        render(
            <BrowserRouter>
                <LoginController/>
            </BrowserRouter>
        );

        const element = screen.getByText('Sign in', {exact: false});

        expect(element).toBeInTheDocument();
    });

    test('There is a form with two inputs', () => {
        render(
            <BrowserRouter>
                <LoginController/>
            </BrowserRouter>
        );

        const formElement = screen.getByRole('form');
        const usernameInputElement = within(formElement).getByPlaceholderText('username');
        const passwordInputElement = within(formElement).getByPlaceholderText('password');

        expect(formElement).toBeInTheDocument();
        expect(usernameInputElement).toBeInTheDocument();
        expect(passwordInputElement).toBeInTheDocument();
    });

    test('There is a link to register', () => {
        render(
            <BrowserRouter>
                <LoginController/>
            </BrowserRouter>
        );

        const element = screen.getByText('Sign up', {exact: false});
        // console.log(element)

        expect(element).toBeInTheDocument();
        expect(element).toHaveAttribute('href', '/register');
    });
})