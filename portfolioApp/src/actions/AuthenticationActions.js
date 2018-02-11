// import firebase from 'firebase'
import { EMAIL_INPUT_CHANGED, PASSWORD_INPUT_CHANGED } from './types'

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

