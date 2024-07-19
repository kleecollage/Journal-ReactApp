import { expect } from "@jest/globals"
import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures"

describe('pruebas de Redux Toolkit en authSlice', () => { 
    // *********************************************************** //
    test('debe retornar el estado actual y llamarse "auth"', () => { 
        const state = authSlice.reducer(initialState, {});
        // console.log(state);
        
        expect(authSlice.name).toBe('auth');
        expect(state).toEqual(initialState);
    })
    // *********************************************************** //
    test('debe realizar la autenticacion', () => {
        // console.log(login(demoUser))
        const state = authSlice.reducer(initialState, login(demoUser));

        expect(state).toEqual({
            status: 'authenticated',
            uid: '123ABC',
            email: 'demo_test@mail.testing.com',
            displayName: 'Demo User',
            photoURL: 'https://test-demo.jpg',
            errorMessage: null,
        });
     })
    // *********************************************************** //
    test('debe realizar el logout sin argumentos', () => { 
        const state = authSlice.reducer(authenticatedState, logout());

        expect(state).toEqual(notAuthenticatedState);
     })
    // *********************************************************** //
    test('debe realizar el logout y mostrar un mensaje de error', () => { 
        const errorMessage = 'Credenciales incorrectas';
        const state = authSlice.reducer(demoUser, logout({errorMessage}));

        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage,
        })
     })
    // *********************************************************** //
    test('debe cambiar el status a checking', () => { 
        const state = authSlice.reducer(authenticatedState, checkingCredentials());

        expect(state.status).toBe('checking')
     })
})