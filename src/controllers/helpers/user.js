import { badRequest, notFound } from './http.js'

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

export const userNotFoundResponse = () =>
    notFound({ message: 'User not found.' })
