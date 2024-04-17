import { UserNotFoundError } from '../../errors/user.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    requiredFieldsIsMissingResponse,
    serverError,
    userNotFoundResponse,
} from '../helpers/index.js'

export class GetTransactionsByUserIdController {
    constructor(getTransactionsByUserIdUseCase) {
        this.getTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.query.userId

            // verifica se userId foi passado
            if (!userId) {
                return requiredFieldsIsMissingResponse('userId')
            }

            // verificar se userid é válido
            if (!checkIfIdIsValid(userId)) {
                return invalidIdResponse()
            }

            // chamar o use case
            const transactions =
                await this.getTransactionsByUserIdUseCase.execute({ userId })

            // retornar resposta http
            return ok(transactions)
        } catch (error) {
            console.error(error)
            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse()
            }
            return serverError()
        }
    }
}
