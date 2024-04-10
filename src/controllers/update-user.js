import validator from 'validator'
import { UpdateUserUseCase } from '../use-cases/update-user.js'
import { EmailAlreadyInUseError } from '../errors/user.js'
import { badRequest, ok, serverError } from './helpers/http.js'
import {
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
    emailIsAlreadyInUseReponse,
    invalidIdResponse,
    invalidPasswordResponse,
} from './helpers/user.js'

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body
            const userId = httpRequest.params.userId

            if (!validator.isUUID(userId)) {
                return invalidIdResponse()
            }

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            const someFieldIsNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field),
            )

            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some provided field is not allowed',
                })
            }

            if (params.password && !checkIfPasswordIsValid(params.password)) {
                return invalidPasswordResponse()
            }

            if (params.email && !checkIfEmailIsValid(params.email)) {
                return emailIsAlreadyInUseReponse()
            }

            const updateUserUseCase = new UpdateUserUseCase()

            const userUpdated = await updateUserUseCase.execute(userId, params)

            return ok(userUpdated)
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }
            console.error(error)
            return serverError()
        }
    }
}
