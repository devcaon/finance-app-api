import validator from 'validator'
import { badRequest } from './http.js'

export const invalidPasswordResponse = () => {
    return badRequest({
        message: 'Password must be at least 6 characters',
    })
}

export const emailIsAlreadyInUseReponse = () => {
    return badRequest({
        message: 'Invalid email. Please provide a valid one.',
    })
}

export const invalidIdResponse = () => {
    return badRequest({
        message: 'The provided id is not valid.',
    })
}

export const checkIfPasswordIsValid = (password) => password.length >= 6

export const checkIfEmailIsValid = (email) => validator.isEmail(email)