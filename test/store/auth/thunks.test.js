import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth";
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks"
import { clearNotesLogout } from "../../../src/store/journal";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/providers');
jest.clearAllMocks

describe('Pruebas en AuthThunks', () => { 
    const dispatch = jest.fn();
    // ************************************************************ //
    test('debe de invocar el checkingCredentials', async () => {
        await checkingAuthentication()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    });
    // ************************************************************ //
    test('startGoogleSignIng debe de llamar checkingCredentials y login - Exito', async () => {
        const loginData = { ok: true, ...demoUser };
        await signInWithGoogle.mockResolvedValue(loginData);
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    });
    // ************************************************************ //
    test('startGoogleSignIng debe de llamar checkingCredentials y logout - Error', async () => {
        const loginData = { ok: false, errorMessage:'Error al iniciar sesion' };
        await signInWithGoogle.mockResolvedValue(loginData);
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
    });
    // ************************************************************ //
    test('startLoginWithEmailPassword debe llamar checkingCredentials y login - Exito', async () => {
        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456' };
        await loginWithEmailPassword.mockResolvedValue(loginData);
        await startLoginWithEmailPassword(formData)(dispatch)
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData))
    });
    // ************************************************************ //
    test('startLoginWithEmailPassword debe llamar checkingCredentials y logout - Eror', async () => {
        const loginData = { ok: false, ...demoUser };
        const formData = { email: 'error_mail@testing.com', password: '123456' };
        await loginWithEmailPassword.mockResolvedValue(loginData);
        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData))
    });
    // ************************************************************ //
    test('startLogout debe llamar logoutFirebase, clearNotes y logout', async () => {
        await startLogout()(dispatch);

        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout())
        expect(dispatch).toHaveBeenCalledWith(logout())
    });
    // ************************************************************ //
    test('startCreatingUserWithEmailPassword debe llamar checkingCredentials, registerUserWithEmailPassword y login - Exito', async () => { 
        const loginData = {ok: true, ...demoUser}
        const formData = {
            email: demoUser.email,
            password: demoUser.password,
            displayName: demoUser.displayName,
        }
        await registerUserWithEmailPassword.mockResolvedValue(loginData)
        await startCreatingUserWithEmailPassword(formData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData))
     })
})
