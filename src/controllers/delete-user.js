import { DeleteUserUseCase } from '../use-cases/index.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
    userNotFoundResponse,
} from './helpers/index.js'

export class DeleteUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            // verificar se id passado é válido
            if (!checkIfIdIsValid(userId)) {
                return invalidIdResponse()
            }

            const deleteUserUseCase = new DeleteUserUseCase()

            const deleteUser = await deleteUserUseCase.execute(userId)

            if (!deleteUser) {
                return userNotFoundResponse()
            }

            return ok(deleteUser)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}