// import firebase from 'firebase'
import firebase from 'firebase'
import { 
    EMAIL_INPUT_CHANGED, 
    PASSWORD_INPUT_CHANGED, 
    AUTHORIZATION_START, 
    AUTHORIZATION_SUCCESS,
    AUTHORIZATION_FAIL
} from './types'

export const emailInputChanged = (text) => {
    return {
        type: EMAIL_INPUT_CHANGED,
        payload: text
    }
}

export const passwordInputChanged = (text) => {
    return {
        type: PASSWORD_INPUT_CHANGED,
        payload: text
    }
} 

export const createNewUserAccount = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: AUTHORIZATION_START })
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => authorizationSuccess(dispatch, user))
            .catch(() => authorizationFail(dispatch))
    }
}

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: AUTHORIZATION_START })
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => authorizationSuccess(dispatch, user))
        .catch(() => authorizationFail(dispatch))
    }
}

export const authorizationSuccess = (dispatch, user) => {
    dispatch({
        type: AUTHORIZATION_SUCCESS, 
        payload: user 
    })
}

export const authorizationFail = (dispatch) => {
    dispatch({
        type: AUTHORIZATION_FAIL
    })
}
