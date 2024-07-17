import { loginWithEmailPassword, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./"

export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();
        if (!result.ok) return dispatch(logout(result.errorMessage));
        dispatch(login(result))
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const {ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });
        // console.log(resp);
        if (!ok) return dispatch(logout({errorMessage}))
        dispatch(login ({uid, displayName, email, photoURL}))
    }
}

export const startLoginWithEmailPassword = ({email, password, displayName}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await loginWithEmailPassword({ email, password, displayName })
        if (!result.ok) return dispatch(logout( result ))
        dispatch(login(result))
    }
}