import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
} from '../helpers/index.js'

export class DeleteTransactionController {
    constructor(deleteTransactionUseCase) {
        this.deleteTransactionUseCase = deleteTransactionUseCase
    }
    async execute(httpRequest) {
        try {
            // verificar se id passado é válido
            const isIdValid = checkIfIdIsValid(httpRequest.params.transactionId)

            if (!isIdValid) return invalidIdResponse()

            // get use case
            const transaction = await this.deleteTransactionUseCase.execute(
                httpRequest.params.transactionId,
            )

            return ok(transaction)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
