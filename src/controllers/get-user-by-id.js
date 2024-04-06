import validator from 'validator'
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import { badRequest, ok, serverError } from './helpers.js'

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const uuidIsValid = validator.isUUID(httpRequest.params.userId)

            if (!uuidIsValid) {
                return badRequest({
                    message: 'The provided id is not valid.',
                })
            }

            const getUserByIdUseCase = new GetUserByIdUseCase()

            const user = await getUserByIdUseCase.execute(
                httpRequest.params.userId,
            )

            return ok(user)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}