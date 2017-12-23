import * as actionTypes from './actionTypes';
import axios from 'axios';

// To set a loading state and show spinner
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}


export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    };
}


export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
}

export const auth = (email, password, registerMode) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDW0dC5k_vp5-UHmLZnzqPQLuh9aLnO40k';
        if(!registerMode) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDW0dC5k_vp5-UHmLZnzqPQLuh9aLnO40k';
        }
        axios.post(url, authData)
        .then(response => {
            const expirationDate = new Date(new Date().getTime() + (response.data.expiresIn * 1000));
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err=> {
            dispatch(authFail(err.response.data.error));
        })
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(()=> {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(token) {
            const expirationDate = new Date(localStorage.getItem('expirationDate')); // what you retrieve from local storage is string
            if(expirationDate >= new Date()) {
                dispatch(authSuccess(token, localStorage.getItem('userId')));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) /1000));
            } else {
                dispatch(logout());
            }
        }
        return;
    }
}