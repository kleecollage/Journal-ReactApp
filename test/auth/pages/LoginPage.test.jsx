import { MemoryRouter } from "react-router-dom"
import { Provider, useDispatch } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { fireEvent, render, screen } from "@testing-library/react"
import { expect } from "@jest/globals"
import { LoginPage } from "../../../src/auth/pages/LoginPage"
import { authSlice } from "../../../src/store/auth/"
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../../src/store/auth/thunks"
import { notAuthenticatedState } from "../../fixtures/authFixtures";

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
});

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({ email, password }) => {
        return () => mockStartLoginWithEmailPassword({ email, password })
    },
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn()
}));



describe('Pruebas en componente <LoginPage/>', () => { 
    beforeEach( () => jest.clearAllMocks() );
    // ***************************************************** //
    test('debe de mostrar el componente correctamente', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )
        // screen.debug()
        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
    });
    // ***************************************************** //
    test('boton de google debe llamar startGoogleSignIn', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )
        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click(googleBtn);

        expect(mockStartGoogleSignIn).toHaveBeenCalled()
    });
    // ***************************************************** //
    test('submit debe llamar startLoginWithEmailPassword', () => {
        const email = 'antonio@email.com';
        const password = '456789';
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );
        const emailField = screen.getByRole('textbox', { name: 'Correo' })
        fireEvent.change(emailField, { target: { name: 'email', value: email } });

        const passwordField = screen.getByTestId('password');
        fireEvent.change(passwordField, { target: { name: 'password', value: password } });

        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit(loginForm);

        expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
            email: email,
            password: password,
        })
    });
})