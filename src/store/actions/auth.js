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
            dispatch(authSuccess(response.data.idToken, response.data.localId));
        })
        .catch(err=> {
            dispatch(authFail(err.response.data.error));
        })
    }
}