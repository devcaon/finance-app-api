import validator from 'validator'
import { badRequest, ok, serverError } from './helpers.js'
import { UpdateUserUseCase } from '../use-cases/update-user.js'

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const updateUserParams = httpRequest.body
            const userId = httpRequest.params.userId

            if (!validator.isUUID(userId)) {
                return badRequest({
                    message: 'The provided ID is not valid.',
                })
            }

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            const someFieldIsNotAllowed = Object.keys(updateUserParams).some(
                (field) => !allowedFields.includes(field),
            )

            if (!someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some provided field is not allowed',
                })
            }

            if (
                updateUserParams.password &&
                updateUserParams.password.length < 6
            ) {
                return badRequest({
                    message: 'Password must be at least 6 characters',
                })
            }

            if (
                updateUserParams.email &&
                !validator.isEmail(updateUserParams.email)
            ) {
                return badRequest({
                    message: 'Invalid e-mail. Please provide a valid one.',
                })
            }

            const updateUserUseCase = new UpdateUserUseCase()

            const userUpdated = await updateUserUseCase.execute(
                userId,
                updateUserParams,
            )

            return ok(userUpdated)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
